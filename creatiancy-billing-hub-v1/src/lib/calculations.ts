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
    // For simplicity of global founder view, we can use standard locale formatting with BDT symbol
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
