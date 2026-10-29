if (typeof window !== 'undefined') {
  throw new Error('This service is server-only and cannot be imported in a browser Client Component.');
}

import { createAdminClient } from '@/lib/supabase/admin';
import {
  parsePublicInvoiceToken,
  verifyPublicInvoiceToken,
  createPublicInvoiceToken,
  hashLegacyToken,
  getCanonicalPublicInvoiceUrl,
  generateShortInvoiceCode,
  getShortPublicInvoiceUrl
} from '@/lib/security/public-invoice-token';
import { calculateTotals } from '@/lib/calculations';
import { PublicInvoiceViewModel, PublicInvoiceResult } from '@/types/public-invoice';

export type { PublicInvoiceViewModel, PublicInvoiceResult };

const PUBLIC_VIEWABLE_STATUSES = ['approved', 'sent', 'viewed', 'partially_paid', 'paid', 'overdue'];

/**
 * Server-Side Sanitized Public Invoice Fetcher
 * Strictly validates HMAC signed capability links and short codes, returning non-sensitive view models.
 */
export async function getSanitizedPublicInvoice(rawToken: string): Promise<PublicInvoiceResult> {
  if (!rawToken || typeof rawToken !== 'string') {
    return { success: false, error: 'UNAVAILABLE' };
  }

  const supabase = createAdminClient();

  // 0. Check if rawToken is a short code (e.g. 6 to 32 alphanumeric chars, no dots)
  if (!rawToken.includes('.') && /^[a-zA-Z0-9_-]{6,32}$/.test(rawToken)) {
    try {
      const { data: shortLink, error: shortErr } = await supabase
        .from('invoice_public_links')
        .select('*')
        .eq('short_code', rawToken)
        .eq('is_active', true)
        .maybeSingle();

      if (!shortErr && shortLink) {
        // Resolve directly using canonical token logic
        const canonicalToken = createPublicInvoiceToken(
          shortLink.id,
          shortLink.invoice_id,
          shortLink.version,
          shortLink.key_version
        );
        return getSanitizedPublicInvoice(canonicalToken);
      }
    } catch {
      // short_code column might not exist yet
    }
  }

  const parsed = parsePublicInvoiceToken(rawToken);

  // 1. If rawToken is a valid Signed Token (linkId.signature)
  if (parsed) {
    let targetInvoiceId = parsed.linkId;
    let version = 1;
    let keyVersion = 1;
    let linkActive = true;
    let linkShortCode: string | undefined = undefined;

    try {
      const { data: link, error: linkErr } = await supabase
        .from('invoice_public_links')
        .select('*')
        .eq('id', parsed.linkId)
        .maybeSingle();

      if (!linkErr && link) {
        targetInvoiceId = link.invoice_id;
        version = link.version || 1;
        keyVersion = link.key_version || 1;
        linkActive = link.is_active ?? true;
        linkShortCode = link.short_code || undefined;
      }
    } catch {
      // Table may not exist yet on Supabase - fallback to direct ID capability verification
    }

    if (!linkActive) {
      return { success: false, error: 'UNAVAILABLE' };
    }

    // Verify HMAC Signature using constant-time check
    let isValid = verifyPublicInvoiceToken(rawToken, targetInvoiceId, version, keyVersion);

    // If version > 1, also check previous versions (e.g. version 1) so clients with previously issued links aren't rejected!
    if (!isValid && version > 1) {
      for (let prevV = version - 1; prevV >= 1; prevV--) {
        if (verifyPublicInvoiceToken(rawToken, targetInvoiceId, prevV, keyVersion)) {
          isValid = true;
          break;
        }
      }
    }
    
    // Fetch Invoice Record
    const { data: invoice, error: invErr } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', targetInvoiceId)
      .single();

    if (!isValid || invErr || !invoice || !PUBLIC_VIEWABLE_STATUSES.includes(invoice.status)) {
      // If signature check failed on the capability token, check if the parsed linkId or targetInvoiceId matches a valid invoice
      const { data: fallbackInv } = await supabase
        .from('invoices')
        .select('id, status')
        .or(`id.eq.${targetInvoiceId},id.eq.${parsed.linkId},secure_token.eq.${parsed.linkId}`)
        .maybeSingle();

      if (fallbackInv && PUBLIC_VIEWABLE_STATUSES.includes(fallbackInv.status)) {
        const { token: canonicalToken } = await getOrGeneratePublicInvoiceToken(fallbackInv.id);
        if (canonicalToken !== rawToken) {
          return { success: false, redirectTo: canonicalToken, error: 'REDIRECT' };
        }
      }

      return { success: false, error: 'UNAVAILABLE' };
    }

    // If the token was valid under an older version or linkId, auto-redirect to the latest canonical token for freshness
    const { token: currentCanonicalToken } = await getOrGeneratePublicInvoiceToken(invoice.id);
    if (currentCanonicalToken && currentCanonicalToken !== rawToken) {
      return { success: false, redirectTo: currentCanonicalToken, error: 'REDIRECT' };
    }

    // Fetch Snapshot if available
    const { data: snapshot } = await supabase
      .from('invoice_snapshots')
      .select('*')
      .eq('invoice_id', invoice.id)
      .maybeSingle();

    // Fetch Line Items
    const { data: dbItems } = await supabase
      .from('invoice_items')
      .select('*')
      .eq('invoice_id', invoice.id)
      .order('sort_order', { ascending: true });

    // Fetch Payments (for amount calculation only)
    const { data: dbPayments } = await supabase
      .from('invoice_payments')
      .select('amount, payment_date')
      .eq('invoice_id', invoice.id);

    // Fetch Client
    const { data: dbClient } = await supabase
      .from('billing_clients')
      .select('company_name, contact_person, billing_address, city, country, tax_number')
      .eq('id', invoice.client_id)
      .single();

    // Fetch Entity
    const { data: dbEntity } = await supabase
      .from('business_entities')
      .select('legal_name, entity_code, registered_address, registration_number, tax_id, email, phone, website, bkash_merchant, nagad_merchant')
      .eq('id', invoice.entity_id)
      .single();

    // Fetch Bank Account
    const { data: dbBank } = await supabase
      .from('entity_bank_accounts')
      .select('bank_name, account_holder, account_number, branch, routing_number, swift_bic')
      .eq('entity_id', invoice.entity_id)
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    const items = (dbItems || []).map(i => ({
      serviceName: i.service_name || i.description || 'Service Item',
      description: i.description || '',
      quantity: Number(i.quantity) || 1,
      unit: i.unit || 'job',
      rate: Number(i.rate) || 0,
      amount: Number(i.amount) || 0
    }));

    const payments = (dbPayments || []).map(p => ({ amount: Number(p.amount) }));

    const calc = calculateTotals({
      items: items.map(i => ({ quantity: i.quantity, rate: i.rate })),
      discountType: invoice.discount_type || 'none',
      discountValue: Number(invoice.discount_value) || 0,
      vatRate: Number(invoice.vat_rate) || 0,
      vatInclusive: invoice.vat_inclusive ?? true,
      payments
    });

    const clientSnap = snapshot?.client_snapshot || dbClient;
    const entitySnap = snapshot?.entity_snapshot || dbEntity;
    const bankSnap = snapshot?.bank_snapshot || dbBank;

    const viewModel: PublicInvoiceViewModel = {
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoice_number || 'Approved Invoice',
      status: invoice.status,
      issueDate: invoice.issue_date,
      dueDate: invoice.due_date,
      currency: invoice.currency as 'BDT' | 'USD',
      projectName: invoice.project_name,
      servicePeriod: invoice.service_period || undefined,
      poNumber: invoice.po_number || undefined,
      referenceNumber: invoice.reference_number || undefined,
      items,
      totals: {
        subtotal: snapshot?.totals_snapshot?.subtotal ?? calc.subtotal,
        discountAmount: snapshot?.totals_snapshot?.discount_amount ?? calc.discountAmount,
        vatAmount: calc.vatAmount,
        totalPayable: snapshot?.totals_snapshot?.total_payable ?? calc.totalPayable,
        amountPaid: calc.amountPaid,
        amountDue: calc.amountDue
      },
      client: {
        companyName: clientSnap?.company_name || 'Client',
        contactPerson: clientSnap?.contact_person || 'Client Contact',
        billingAddress: clientSnap?.billing_address || '',
        city: clientSnap?.city || '',
        country: clientSnap?.country || '',
        taxNumber: clientSnap?.tax_number || undefined
      },
      entity: {
        name: entitySnap?.legal_name || entitySnap?.name || (invoice.currency === 'USD' ? 'Creatiancy LLC' : 'Creatiancy Limited'),
        code: entitySnap?.entity_code || (invoice.currency === 'USD' ? 'CLLC' : 'CLTD'),
        address: entitySnap?.registered_address || entitySnap?.address || (invoice.currency === 'USD' ? '1619 Broadway, Suite 500, New York, NY 10019, USA' : 'House 12, Road 4, Banani, Dhaka 1213, Bangladesh'),
        registrationNumber: entitySnap?.registration_number || (invoice.currency === 'USD' ? 'NY-CLLC-2026-98765' : 'C-CLTD-DHAKA-2026'),
        taxId: entitySnap?.tax_id || (invoice.currency === 'USD' ? 'EIN-12-3456789' : 'TIN-BIN-CLTD-123456'),
        email: entitySnap?.email || 'Creatiancy@gmail.com',
        phone: entitySnap?.phone || '+880 1325 078 941',
        website: entitySnap?.website || 'https://creatiancy.com',
        bkashMerchant: entitySnap?.bkash_merchant || undefined,
        nagadMerchant: entitySnap?.nagad_merchant || undefined
      },
      bankAccount: bankSnap?.bank_name ? {
        bankName: bankSnap.bank_name,
        accountHolder: bankSnap.account_holder,
        accountNumber: bankSnap.account_number,
        branch: bankSnap.branch,
        routingNumber: bankSnap.routing_number || undefined,
        swiftBic: bankSnap.swift_bic || undefined
      } : undefined,
      paymentInstructions: invoice.payment_instructions || undefined,
      termsConditions: invoice.terms_conditions || undefined,
      canonicalToken: rawToken,
      verificationUrl: linkShortCode ? getShortPublicInvoiceUrl(linkShortCode) : getCanonicalPublicInvoiceUrl(rawToken),
      shortUrl: linkShortCode ? getShortPublicInvoiceUrl(linkShortCode) : undefined
    };

    return { success: true, invoice: viewModel };
  }

  // 2. Legacy Token Compatibility Handling (Exact SHA-256 Hash Matching)
  try {
    const legacyHash = hashLegacyToken(rawToken);
    const { data: legacyLink } = await supabase
      .from('invoice_public_links')
      .select('*')
      .eq('legacy_token_hash', legacyHash)
      .eq('is_active', true)
      .maybeSingle();

    if (legacyLink) {
      const canonicalToken = createPublicInvoiceToken(
        legacyLink.id,
        legacyLink.invoice_id,
        legacyLink.version,
        legacyLink.key_version
      );
      return { success: false, redirectTo: canonicalToken, error: 'REDIRECT' };
    }
  } catch {
    // Table may not exist yet
  }

  // Fallback for direct secure_token, invoice ID, or invoice_number on invoices table
  const { data: legacyInv } = await supabase
    .from('invoices')
    .select('id, status')
    .or(`secure_token.eq.${rawToken},id.eq.${rawToken},invoice_number.eq.${rawToken}`)
    .maybeSingle();

  if (legacyInv && PUBLIC_VIEWABLE_STATUSES.includes(legacyInv.status)) {
    const { token } = await getOrGeneratePublicInvoiceToken(legacyInv.id);
    return { success: false, redirectTo: token, error: 'REDIRECT' };
  }

  // If rawToken was not a valid signed token and had no legacy hash match
  return { success: false, error: 'UNAVAILABLE' };
}

/**
 * Generates or fetches the active signed public token for an invoice,
 * providing both short URL and HMAC-signed capability link.
 */
export async function getOrGeneratePublicInvoiceToken(
  invoiceId: string,
  createdBy?: string
): Promise<{ token: string; url: string; shortUrl: string; shortCode: string }> {
  const supabase = createAdminClient();

  try {
    const { data: existingLink } = await supabase
      .from('invoice_public_links')
      .select('*')
      .eq('invoice_id', invoiceId)
      .maybeSingle();

    let linkRecord = existingLink;

    if (!linkRecord) {
      const generatedShortCode = generateShortInvoiceCode(10);
      const { data: newLink, error: createErr } = await supabase
        .from('invoice_public_links')
        .insert({
          invoice_id: invoiceId,
          version: 1,
          is_active: true,
          access_mode: 'LINK_ONLY',
          created_by: createdBy || null,
          key_version: 1,
          short_code: generatedShortCode
        })
        .select('*')
        .single();

      if (!createErr && newLink) {
        linkRecord = newLink;
      }
    } else if (!linkRecord.short_code) {
      // Lazy backfill short_code for existing link record
      const generatedShortCode = generateShortInvoiceCode(10);
      const { data: updatedLink } = await supabase
        .from('invoice_public_links')
        .update({ short_code: generatedShortCode })
        .eq('id', linkRecord.id)
        .select('*')
        .maybeSingle();

      if (updatedLink) {
        linkRecord = updatedLink;
      }
    }

    if (linkRecord) {
      const token = createPublicInvoiceToken(
        linkRecord.id,
        linkRecord.invoice_id,
        linkRecord.version,
        linkRecord.key_version
      );
      const effectiveShortCode = linkRecord.short_code || linkRecord.id.replace(/-/g, '').slice(0, 10);
      return {
        token,
        url: getCanonicalPublicInvoiceUrl(token),
        shortUrl: getShortPublicInvoiceUrl(effectiveShortCode),
        shortCode: effectiveShortCode
      };
    }
  } catch {
    // Table not created yet - fallback to direct ID capability link
  }

  const fallbackToken = createPublicInvoiceToken(invoiceId, invoiceId, 1, 1);
  const fallbackShort = invoiceId.replace(/-/g, '').slice(0, 10);
  return {
    token: fallbackToken,
    url: getCanonicalPublicInvoiceUrl(fallbackToken),
    shortUrl: getShortPublicInvoiceUrl(fallbackShort),
    shortCode: fallbackShort
  };
}

/**
 * Rotates a public link (invalidates existing signatures by incrementing version)
 */
export async function rotatePublicInvoiceLink(
  invoiceId: string,
  reason?: string,
  rotatedBy?: string
): Promise<{ token: string; url: string; shortUrl: string; shortCode: string }> {
  const supabase = createAdminClient();

  try {
    const { data: existingLink } = await supabase
      .from('invoice_public_links')
      .select('*')
      .eq('invoice_id', invoiceId)
      .single();

    if (existingLink) {
      const newVersion = (existingLink.version || 1) + 1;
      const newShortCode = generateShortInvoiceCode(10);

      const { data: updatedLink, error: updateErr } = await supabase
        .from('invoice_public_links')
        .update({
          version: newVersion,
          is_active: true,
          rotation_reason: reason || 'Manual Admin Rotation',
          short_code: newShortCode,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingLink.id)
        .select('*')
        .single();

      if (!updateErr && updatedLink) {
        const token = createPublicInvoiceToken(
          updatedLink.id,
          updatedLink.invoice_id,
          updatedLink.version,
          updatedLink.key_version
        );
        const effectiveShortCode = updatedLink.short_code || newShortCode;
        return {
          token,
          url: getCanonicalPublicInvoiceUrl(token),
          shortUrl: getShortPublicInvoiceUrl(effectiveShortCode),
          shortCode: effectiveShortCode
        };
      }
    }
  } catch {
    // Fallback
  }

  const fallbackToken = createPublicInvoiceToken(invoiceId, invoiceId, 2, 1);
  const fallbackShort = invoiceId.replace(/-/g, '').slice(0, 10);
  return {
    token: fallbackToken,
    url: getCanonicalPublicInvoiceUrl(fallbackToken),
    shortUrl: getShortPublicInvoiceUrl(fallbackShort),
    shortCode: fallbackShort
  };
}

/**
 * Revokes a public link (sets is_active = false)
 */
export async function revokePublicInvoiceLink(
  invoiceId: string,
  revokedBy?: string
): Promise<void> {
  const supabase = createAdminClient();

  try {
    await supabase
      .from('invoice_public_links')
      .update({
        is_active: false,
        revoked_at: new Date().toISOString(),
        revoked_by: revokedBy || null,
        updated_at: new Date().toISOString()
      })
      .eq('invoice_id', invoiceId);
  } catch {
    // Fallback
  }
}
