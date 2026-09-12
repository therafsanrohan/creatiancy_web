/**
 * Script: Delete receipt CLTD-REC-2026-0005 and revert invoice to unpaid
 * Invoice ID: 57e8e19e-35a7-46b1-9b83-92096794c1f5 (CLTD-BDT-INV-2026-0005)
 * Client: Zentech Limited
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nefnjnngviaywjteduhm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WwFaeFNaO5DRUGYa3FXWDw_SnsvbW9V';
const TARGET_RECEIPT_NUMBER = 'CLTD-REC-2026-0005';
const TARGET_INVOICE_ID = '57e8e19e-35a7-46b1-9b83-92096794c1f5';

async function main() {
  console.log('========================================');
  console.log(' Creatiancy: Delete Receipt & Unpay Invoice');
  console.log('========================================\n');

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // ── STEP 1: Fetch current invoice state ──────────────────────────────────
  console.log('📋 STEP 1: Fetching invoice info...');
  const { data: invoice, error: invFetchErr } = await supabase
    .from('invoices')
    .select('id, invoice_number, status, project_name')
    .eq('id', TARGET_INVOICE_ID)
    .single();

  if (invFetchErr) {
    console.error('❌ Cannot fetch invoice:', invFetchErr.message);
    process.exit(1);
  }
  console.log('  Invoice found:', JSON.stringify(invoice, null, 2));

  // ── STEP 2: Find ALL payments for this invoice ───────────────────────────
  console.log('\n📋 STEP 2: Finding ALL payments for this invoice...');
  const { data: allPaymentsForInvoice, error: allPayErr } = await supabase
    .from('invoice_payments')
    .select('id, invoice_id, receipt_number, amount, payment_method, payment_date')
    .eq('invoice_id', TARGET_INVOICE_ID);

  if (allPayErr) {
    console.error('  Error fetching payments:', allPayErr.message);
  } else {
    console.log('  All payments for this invoice:', JSON.stringify(allPaymentsForInvoice, null, 2));
  }

  // ── STEP 3: Find specific payment by receipt number ──────────────────────
  console.log('\n📋 STEP 3: Finding payment by receipt number:', TARGET_RECEIPT_NUMBER);
  const { data: payment, error: payFetchErr } = await supabase
    .from('invoice_payments')
    .select('id, invoice_id, receipt_number, amount, payment_method, payment_date')
    .eq('receipt_number', TARGET_RECEIPT_NUMBER)
    .maybeSingle();

  if (payFetchErr) {
    console.error('❌ Cannot find payment:', payFetchErr.message);
  } else if (!payment) {
    console.log('  ⚠️ No payment found with receipt number', TARGET_RECEIPT_NUMBER);
  } else {
    console.log('  Payment found:', JSON.stringify(payment, null, 2));
  }

  // ── STEP 4: Check money_receipts table ───────────────────────────────────
  console.log('\n📋 STEP 4: Checking money_receipts table...');
  const { data: receipt } = await supabase
    .from('money_receipts')
    .select('id, payment_id, receipt_number')
    .eq('receipt_number', TARGET_RECEIPT_NUMBER)
    .maybeSingle();

  if (!receipt) {
    console.log('  No entry in money_receipts table for this receipt number.');
  } else {
    console.log('  money_receipts entry:', JSON.stringify(receipt, null, 2));
  }

  // ── STEP 5: Delete invoice_payments record (cascades to money_receipts) ──
  if (payment) {
    console.log('\n🗑️  STEP 5: Deleting invoice_payment (will cascade delete money_receipt)...');
    const { error: deletePayErr } = await supabase
      .from('invoice_payments')
      .delete()
      .eq('id', payment.id);

    if (deletePayErr) {
      console.error('❌ Failed to delete payment:', deletePayErr.message);
    } else {
      console.log(`  ✅ Payment (${payment.id}) deleted. money_receipt cascade-deleted too.`);
    }
  }

  // ── STEP 6: Check remaining payments and update invoice status ───────────
  console.log('\n🔄 STEP 6: Checking remaining payments and updating invoice status...');

  const { data: remainingPayments } = await supabase
    .from('invoice_payments')
    .select('amount')
    .eq('invoice_id', TARGET_INVOICE_ID);

  const totalPaid = (remainingPayments || []).reduce((sum, p) => sum + Number(p.amount), 0);
  console.log(`  Total paid after deletion: ৳${totalPaid}`);
  console.log(`  Remaining payment records: ${remainingPayments?.length || 0}`);

  // Fetch invoice items total to determine subtotal
  const { data: items } = await supabase
    .from('invoice_items')
    .select('amount')
    .eq('invoice_id', TARGET_INVOICE_ID);
  const subtotal = (items || []).reduce((sum, i) => sum + Number(i.amount), 0);
  console.log(`  Invoice subtotal (from items): ৳${subtotal}`);

  // Determine new status
  let newStatus = 'sent';
  if (totalPaid > 0) {
    newStatus = totalPaid >= subtotal ? 'paid' : 'partially_paid';
  }
  console.log(`  New status: "${newStatus}"`);

  const { error: updateErr } = await supabase
    .from('invoices')
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', TARGET_INVOICE_ID);

  if (updateErr) {
    console.error('❌ Failed to update invoice status:', updateErr.message);
  } else {
    console.log(`  ✅ Invoice status updated to "${newStatus}"`);
  }

  // ── STEP 7: Verify final state ────────────────────────────────────────────
  console.log('\n✅ STEP 7: Final verification...');
  const { data: finalInvoice } = await supabase
    .from('invoices')
    .select('id, invoice_number, status, project_name')
    .eq('id', TARGET_INVOICE_ID)
    .single();
  console.log('  Invoice final state:', JSON.stringify(finalInvoice, null, 2));

  const { data: finalPayments } = await supabase
    .from('invoice_payments')
    .select('id, receipt_number, amount')
    .eq('invoice_id', TARGET_INVOICE_ID);
  console.log('  Remaining payments:', JSON.stringify(finalPayments, null, 2));

  console.log('\n========================================');
  console.log(' Done!');
  console.log('========================================');
}

main().catch(err => {
  console.error('❌ Script error:', err);
  process.exit(1);
});
