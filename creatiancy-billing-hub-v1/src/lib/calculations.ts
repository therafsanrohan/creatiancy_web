/**
 * Safe billing calculations to prevent JS floating-point precision issues.
 * All math is conducted by converting numbers to integer cents/paisa (multiplying by 100),
 * performing integer arithmetic, and converting back.
 */

export function roundToTwo(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function fromCents(cents: number): number {
  return cents / 100;
}

export interface LineItem {
  quantity: number;
  rate: number;
}

export interface CalculateTotalsInput {
  items: LineItem[];
  discountType: 'none' | 'fixed' | 'percentage';
  discountValue: number;
  vatRate: number;
  vatInclusive: boolean;
  payments?: { amount: number }[];
}

export interface BillingTotals {
  subtotal: number;
  discountAmount: number;
  vatAmount: number; // For detailed breakdown when inclusive
  totalPayable: number;
  amountPaid: number;
  amountDue: number;
}

export function calculateTotals(input: CalculateTotalsInput): BillingTotals {
  const {
    items,
    discountType,
    discountValue,
    payments = []
  } = input;

  // 1. Calculate line item totals safely in cents
  let subtotalCents = 0;
  for (const item of items) {
    const qty = Math.max(0, item.quantity);
    const rate = Math.max(0, item.rate);
    const lineTotalCents = Math.round(qty * rate * 100);
    subtotalCents += lineTotalCents;
  }

  // 2. Calculate discount safely in cents
  let discountCents = 0;
  if (discountType === 'fixed') {
    discountCents = Math.min(subtotalCents, toCents(Math.max(0, discountValue)));
  } else if (discountType === 'percentage') {
    const percentage = Math.min(100, Math.max(0, discountValue));
    // Multiply by percentage and divide by 100
    discountCents = Math.round((subtotalCents * percentage) / 100);
  }

  // 3. Calculate discounted subtotal in cents
  const discountedSubtotalCents = Math.max(0, subtotalCents - discountCents);

  // 4. Calculate VAT amount & Total Payable
  let vatCents = 0;
  let totalPayableCents = discountedSubtotalCents;

  if (input.vatRate > 0) {
    if (input.vatInclusive) {
      // VAT included in rates
      const vatRateDecimal = input.vatRate / 100;
      const preTaxCents = discountedSubtotalCents / (1 + vatRateDecimal);
      vatCents = Math.round(discountedSubtotalCents - preTaxCents);
      totalPayableCents = discountedSubtotalCents;
    } else {
      // VAT excluded (added on top)
      vatCents = Math.round((discountedSubtotalCents * input.vatRate) / 100);
      totalPayableCents = discountedSubtotalCents + vatCents;
    }
  }

  // 5. Calculate payments safely in cents
  let paymentsCents = 0;
  for (const p of payments) {
    paymentsCents += toCents(Math.max(0, p.amount));
  }

  // 6. Calculate amount due safely in cents
  const amountDueCents = Math.max(0, totalPayableCents - paymentsCents);

  return {
    subtotal: fromCents(subtotalCents),
    discountAmount: fromCents(discountCents),
    vatAmount: fromCents(vatCents),
    totalPayable: fromCents(totalPayableCents),
    amountPaid: fromCents(paymentsCents),
    amountDue: fromCents(amountDueCents)
  };
}

/**
 * Format currency helper
 */
export function formatCurrency(amount: number, currency: 'BDT' | 'USD'): string {
  if (currency === 'BDT') {
    // Standard BDT format (e.g. ৳ 1,20,000 or using Bangladesh numbering layout)
    return `৳${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })}`;
  } else {
    // USD format: $1,200.00
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
}

export interface BdCorporateTaxInput {
  grossReceipts: number;
  allowableExpenses: number;
  disallowedExpenses: number;
  otherAdjustments: number;
  allTransactionsViaBank: boolean;
  bankCompliantTaxRate: number; // e.g. 0.25 for 25%
  standardTaxRate: number;      // e.g. 0.275 for 27.5%
  turnoverThreshold: number;   // e.g. 5,000,000 BDT
  turnoverMinimumTaxRate: number; // e.g. 0.006 for 0.60%
  invoiceTdsSum?: number;      // Sum of source minimum tax from applicable invoices
  certifiedTds: number;
  advanceTaxPaid: number;
  manualTaxAdjustment: number;
  manualOverrideTax?: number | null;
}

export interface BdCorporateTaxResult {
  accountingProfit: number;
  taxableProfit: number;
  taxableProfitForTax: number;
  appliedCorporateTaxRate: number;
  regularCorporateTax: number;
  sourceMinimumTax: number;
  turnoverMinimumTax: number;
  grossTaxLiability: number;
  liabilityDeterminedBy: 'REGULAR_CORPORATE_TAX' | 'SOURCE_MINIMUM_TAX' | 'TURNOVER_MINIMUM_TAX';
  availableTaxCredit: number;
  systemCalculatedTax: number;
  manualOverrideTax: number | null;
  finalTaxPayable: number;
  unadjustedTaxCredit: number;
}

export function calculateBangladeshCorporateTax(input: BdCorporateTaxInput): BdCorporateTaxResult {
  const gross = Math.max(0, input.grossReceipts);
  const allowable = Math.max(0, input.allowableExpenses);
  const disallowed = Math.max(0, input.disallowedExpenses);
  const adjustments = input.otherAdjustments || 0;

  // 1. Accounting & Taxable profit
  const accountingProfit = roundToTwo(gross - allowable);
  const taxableProfit = roundToTwo(accountingProfit + disallowed + adjustments);
  const taxableProfitForTax = Math.max(0, taxableProfit);

  // 2. Applied corporate tax rate (25% bank compliant vs 27.5% standard)
  const appliedCorporateTaxRate = input.allTransactionsViaBank
    ? input.bankCompliantTaxRate
    : input.standardTaxRate;

  // 3. Regular Corporate Tax
  const regularCorporateTax = roundToTwo(taxableProfitForTax * appliedCorporateTaxRate);

  // 4. Source Minimum Tax
  const sourceMinimumTax = roundToTwo(Math.max(0, input.invoiceTdsSum || 0));

  // 5. Turnover Minimum Tax (Sec. 163, threshold check)
  const turnoverThreshold = input.turnoverThreshold || 5000000;
  const turnoverRate = input.turnoverMinimumTaxRate || 0.006;
  const turnoverMinimumTax = gross >= turnoverThreshold
    ? roundToTwo(gross * turnoverRate)
    : 0;

  // 6. Gross Tax Liability = MAX(regular, source_min, turnover_min)
  const grossTaxLiability = Math.max(regularCorporateTax, sourceMinimumTax, turnoverMinimumTax);

  let liabilityDeterminedBy: 'REGULAR_CORPORATE_TAX' | 'SOURCE_MINIMUM_TAX' | 'TURNOVER_MINIMUM_TAX' = 'REGULAR_CORPORATE_TAX';
  if (grossTaxLiability === turnoverMinimumTax && turnoverMinimumTax > regularCorporateTax && turnoverMinimumTax > sourceMinimumTax) {
    liabilityDeterminedBy = 'TURNOVER_MINIMUM_TAX';
  } else if (grossTaxLiability === sourceMinimumTax && sourceMinimumTax > regularCorporateTax) {
    liabilityDeterminedBy = 'SOURCE_MINIMUM_TAX';
  }

  // 7. Available Tax Credit = Verified Certified TDS + Advance Tax Paid
  const certifiedTds = Math.max(0, input.certifiedTds);
  const advanceTax = Math.max(0, input.advanceTaxPaid);
  const availableTaxCredit = roundToTwo(certifiedTds + advanceTax);

  // 8. System Calculated Tax
  const manualAdjustment = input.manualTaxAdjustment || 0;
  const systemCalculatedTax = Math.max(0, roundToTwo(grossTaxLiability - availableTaxCredit + manualAdjustment));

  // 9. Manual Override & Final Tax Payable
  const overrideVal = (input.manualOverrideTax !== undefined && input.manualOverrideTax !== null && !isNaN(input.manualOverrideTax))
    ? Math.max(0, input.manualOverrideTax)
    : null;
  const finalTaxPayable = overrideVal !== null ? overrideVal : systemCalculatedTax;

  // 10. Unadjusted Tax Credit (if credits exceed gross liability)
  const unadjustedTaxCredit = Math.max(0, roundToTwo(availableTaxCredit - grossTaxLiability));

  return {
    accountingProfit,
    taxableProfit,
    taxableProfitForTax,
    appliedCorporateTaxRate,
    regularCorporateTax,
    sourceMinimumTax,
    turnoverMinimumTax,
    grossTaxLiability,
    liabilityDeterminedBy,
    availableTaxCredit,
    systemCalculatedTax,
    manualOverrideTax: overrideVal,
    finalTaxPayable,
    unadjustedTaxCredit
  };
}
