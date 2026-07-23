import { calculateTotals } from './calculations';

export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  username?: string;
  role_name: 'Super Admin' | 'Admin' | 'Finance Admin' | 'Client Service' | 'Project Manager';
  password_hash?: string;
  created_at?: string;
}

export interface CustomGateway {
  id: string;
  name: string;
  rate: number;
  currency: 'BDT' | 'USD' | 'Both';
  color: string;
}

export interface GatewayRates {
  bkash: number;
  nagad: number;
  card: number;
  amex: number;
  stripe: number;
  payoneer: number;
  wise: number;
  customGateways?: CustomGateway[];
}

export interface BusinessEntity {
  id: string;
  legal_name: string;
  entity_code: 'CLTD' | 'CLLC';
  logo_url: string;
  registered_address: string;
  registration_number: string;
  tax_id: string;
  email: string;
  phone: string;
  website: string;
  payment_instructions: string;
  invoice_prefix: string;
  receipt_prefix: string;
  vat_footer: string;
  bkash_merchant?: string;
  nagad_merchant?: string;
  corporate_tax_rate: number;
  default_vat_rate?: number;
}

export interface TaxPayment {
  id: string;
  entity_id: string;
  tax_type: 'VAT' | 'Corporate Tax';
  amount: number;
  payment_date: string;
  challan_number: string;
  period_start: string;
  period_end: string;
  recorded_by: string;
  created_at: string;
}

export type ExpenseCategory =
  | 'Payroll'
  | 'Office Rent'
  | 'Utilities'
  | 'Software & Subscriptions'
  | 'Marketing'
  | 'Equipment'
  | 'Maintenance'
  | 'Professional Fees'
  | 'Travel'
  | 'Other';

export interface Expense {
  id: string;
  entity_id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  currency: 'BDT' | 'USD';
  expense_date: string;
  vendor: string;
  invoice_ref: string;
  recorded_by: string;
  vendor_bin?: string;
  mushak_6_3_number?: string;
  input_vat_amount?: number;
  input_credit_status?: 'ELIGIBLE_INPUT_CREDIT' | 'PARTIALLY_ELIGIBLE' | 'INELIGIBLE' | 'CLAIMED' | 'REJECTED';
  verification_status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  tax_period?: string;
  created_at: string;
}

export interface BankAccount {
  id: string;
  entity_id: string;
  bank_name: string;
  account_holder: string;
  account_number: string;
  branch: string;
  routing_number: string;
  swift_bic: string;
  bank_address: string;
  is_active: boolean;
}

export interface BillingClient {
  id: string;
  client_type: 'company' | 'individual';
  company_name: string;
  contact_person: string;
  billing_email: string;
  additional_emails: string[];
  phone: string;
  billing_address: string;
  city: string;
  country: string;
  tax_number: string;
  preferred_currency: 'BDT' | 'USD';
  default_payment_terms: 'Due on Receipt' | '7 Days' | '15 Days' | '30 Days' | 'Custom';
  account_manager_id: string | null;
  internal_note: string;
  status: 'active' | 'archived';
  bin_number?: string;
  is_vat_withholding_entity?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ClientServiceRate {
  id: string;
  client_id: string;
  service_name: string;
  unit_price: number;
  unit: string;
  is_paid_media?: boolean;
  usd_budget?: number;
  usd_rate?: number;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  service_name: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  sort_order: number;
  is_paid_media?: boolean;
  usd_amount?: number;
  usd_rate?: number;
  service_category_code?: string;
  service_code?: string;
  vat_pricing_mode?: 'VAT_EXCLUSIVE' | 'VAT_INCLUSIVE' | 'ZERO_RATED' | 'EXEMPT' | 'OUT_OF_SCOPE';
  vat_rate?: number;
  vat_amount?: number;
  taxable_value?: number;
  vds_rate?: number;
  expected_vds?: number;
}

export interface Invoice {
  id: string;
  secure_token: string;
  client_id: string;
  currency: 'BDT' | 'USD';
  usd_rate?: number;
  entity_id: string;
  invoice_number: string | null;
  status: 'draft' | 'pending_approval' | 'approved' | 'sent' | 'viewed' | 'partially_paid' | 'paid' | 'overdue' | 'void' | 'rejected';
  issue_date: string;
  payment_terms: string;
  due_date: string;
  project_name: string;
  service_period: string;
  po_number: string;
  reference_number: string;
  account_manager_id: string | null;
  discount_type: 'none' | 'fixed' | 'percentage';
  discount_value: number;
  vat_rate: number;
  vat_inclusive: boolean;
  vds_applicable?: boolean;
  expected_vds?: number;
  actual_vds_deducted?: number;
  vds_status?: 'NOT_APPLICABLE' | 'EXPECTED' | 'DEDUCTED' | 'CERTIFICATE_PENDING' | 'CERTIFICATE_RECEIVED' | 'VERIFIED' | 'REJECTED' | 'ADJUSTED_IN_RETURN';
  mushak_6_3_number?: string;
  mushak_6_3_date?: string;
  mushak_6_3_status?: 'NOT_GENERATED' | 'DRAFT' | 'GENERATED' | 'ISSUED' | 'CANCELLED' | 'REPLACED';
  mushak_6_6_number?: string;
  mushak_6_6_date?: string;
  mushak_6_6_status?: 'PENDING' | 'RECEIVED' | 'VERIFIED' | 'REJECTED' | 'DUPLICATE' | 'EXPIRED_FOR_ADJUSTMENT' | 'CLAIMED';
  zero_rate_evidence_ref?: string;
  zero_rate_status?: 'NOT_REQUESTED' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'MORE_INFORMATION_REQUIRED';
  tds_category_code?: string;
  tds_rate?: number;
  expected_tds?: number;
  certified_tds?: number;
  tds_certificate_ref?: string;
  include_in_source_min_tax?: boolean;
  client_note: string;
  payment_instructions: string;
  terms_conditions: string;
  internal_note: string;
  pdf_file_url: string | null;
  pdf_generated_at: string | null;
  created_by: string;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvoiceSnapshot {
  invoice_id: string;
  entity_snapshot: Partial<BusinessEntity>;
  bank_snapshot: Partial<BankAccount>;
  client_snapshot: Partial<BillingClient>;
  totals_snapshot: {
    subtotal: number;
    discount_amount: number;
    total_payable: number;
    amount_paid: number;
    amount_due: number;
  };
}

export interface Payment {
  id: string;
  invoice_id: string;
  payment_date: string;
  amount: number;
  currency: 'BDT' | 'USD';
  payment_method: string;
  transaction_reference: string;
  bank_gateway: string;
  processing_fee: number;
  internal_note: string;
  reference_number?: string;
  note?: string;
  proof_url: string | null;
  recorded_by: string;
  receipt_number: string;
  created_at: string;
}

export interface SystemNotification {
  id: string;
  sender_name: string;
  sender_role: string;
  title: string;
  message: string;
  category: 'invoice_created' | 'approval_required' | 'invoice_approved' | 'payment_recorded' | 'tax_recorded' | 'client_added' | 'broadcast' | 'emergency';
  target_roles: string[];
  link_url?: string;
  timestamp: string;
  read_by: string[];
}

export interface EmailLog {
  id: string;
  invoice_id: string;
  recipient: string;
  cc: string;
  email_type: 'invoice' | 'reminder' | 'receipt';
  subject: string;
  message_body: string;
  provider_message_id: string | null;
  delivery_status: 'pending' | 'success' | 'failed';
  error_message: string | null;
  sent_by: string;
  sent_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  module: string;
  record_id: string;
  previous_value: any;
  new_value: any;
  timestamp: string;
}

// Configurable Financial-Year Based Income Tax System Interfaces
export interface TaxConfiguration {
  id: string;
  country_code: 'BD' | 'US';
  entity_type: 'NON_PUBLICLY_TRADED_COMPANY';
  financial_year: string; // e.g. "2026-2027"
  assessment_year: string; // e.g. "2027-2028"
  configuration_name: string;
  bank_compliant_tax_rate: number; // e.g. 0.25 (25%)
  standard_tax_rate: number;      // e.g. 0.275 (27.5%)
  turnover_threshold: number;   // e.g. 5000000 (BDT 5,000,000)
  turnover_minimum_rate: number; // e.g. 0.006 (0.60%)
  effective_from: string;
  effective_until?: string;
  status: 'DRAFT' | 'UNDER_REVIEW' | 'SCHEDULED' | 'ACTIVE' | 'ARCHIVED';
  version_number: number;
  change_summary: string;
  source_reference: string;
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  approved_by?: string;
  approved_at?: string;
  published_at?: string;
}

export interface TaxServiceCategory {
  id: string;
  tax_configuration_id: string;
  category_code: 'CREATIVE_AGENCY' | 'PROFESSIONAL_SERVICE' | 'TECHNICAL_SERVICE' | 'NO_TDS' | 'CUSTOM';
  category_name: string;
  description: string;
  tds_rate: number; // e.g. 0.04 (4%)
  is_custom_rate_allowed: boolean;
  is_active: boolean;
  effective_from: string;
  effective_until?: string;
  created_at: string;
  updated_at: string;
}

export interface TaxCalculation {
  id: string;
  company_id: string;
  tax_configuration_id: string;
  financial_year: string;
  assessment_year: string;
  gross_receipts: number;
  allowable_expenses: number;
  disallowed_expenses: number;
  other_adjustments: number;
  accounting_profit: number;
  taxable_profit: number;
  bank_condition_verified: boolean;
  applied_corporate_tax_rate: number;
  regular_corporate_tax: number;
  source_minimum_tax: number;
  turnover_minimum_tax: number;
  gross_tax_liability: number;
  certified_tds: number;
  advance_tax_paid: number;
  available_tax_credit: number;
  manual_tax_adjustment: number;
  estimated_final_tax_payable: number;
  system_calculated_tax: number;
  manual_override_tax: number | null;
  manual_override_reason: string | null;
  final_tax_payable: number;
  unadjusted_tax_credit: number;
  liability_determined_by: 'REGULAR_CORPORATE_TAX' | 'SOURCE_MINIMUM_TAX' | 'TURNOVER_MINIMUM_TAX';
  status: 'DRAFT' | 'CALCULATED' | 'UNDER_REVIEW' | 'APPROVED' | 'LOCKED' | 'SUPERSEDED';
  calculated_by: string;
  calculated_at: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TaxCalculationVersion {
  id: string;
  tax_calculation_id: string;
  version_number: number;
  calculation_snapshot: TaxCalculation;
  change_reason: string;
  created_by: string;
  created_at: string;
}

export interface TaxAuditLog {
  id: string;
  entity_type: 'tax_configuration' | 'tax_calculation' | 'tax_override';
  entity_id: string;
  action_type: 'CREATE' | 'UPDATE' | 'ACTIVATE' | 'OVERRIDE' | 'ARCHIVE' | 'PUBLISH';
  previous_value: any;
  new_value: any;
  reason: string;
  performed_by: string;
  performed_at: string;
}

export interface VatRegistrationProfile {
  id: string;
  company_id: string;
  business_name: string;
  bin_number: string;
  bin_status: 'VAT_REGISTERED' | 'TURNOVER_TAX_ENLISTED' | 'VOLUNTARILY_REGISTERED' | 'REGISTRATION_PENDING' | 'SUSPENDED' | 'CANCELLED' | 'NOT_CONFIGURED';
  registration_effective_date: string;
  vat_circle: string;
  vat_division: string;
  registered_address: string;
  default_return_frequency: 'MONTHLY' | 'QUARTERLY' | 'FOUR_MONTHLY' | 'ANNUAL';
  default_currency: 'BDT';
  status: 'ACTIVE' | 'INACTIVE';
  updated_at: string;
}

export interface VatConfiguration {
  id: string;
  country_code: 'BD';
  financial_year: string;
  configuration_name: string;
  registration_type: 'VAT_REGISTERED' | 'TURNOVER_TAX_ENLISTED';
  return_frequency: 'MONTHLY' | 'QUARTERLY' | 'FOUR_MONTHLY' | 'ANNUAL';
  effective_from: string;
  effective_until?: string;
  status: 'DRAFT' | 'UNDER_REVIEW' | 'SCHEDULED' | 'ACTIVE' | 'ARCHIVED';
  version_number: number;
  change_summary: string;
  source_reference: string;
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  approved_by?: string;
  approved_at?: string;
  published_at?: string;
}

export interface VatServiceCategory {
  id: string;
  vat_configuration_id: string;
  category_code: 'ADVERTISING_AGENCY' | 'GRAPHIC_DESIGN' | 'CONSULTANCY' | 'IT_ENABLED_SERVICE' | 'SOFTWARE_DEVELOPMENT' | 'WEB_DEVELOPMENT' | 'DIGITAL_MARKETING' | 'MEDIA_BUYING' | 'PRODUCTION_SERVICE' | 'MISCELLANEOUS_SERVICE' | 'ZERO_RATED_EXPORT_SERVICE' | 'EXEMPT_SERVICE' | 'CUSTOM_SERVICE';
  category_name: string;
  official_service_code: string;
  description: string;
  vat_rate: number;
  vds_rate: number;
  is_vds_applicable: boolean;
  is_input_credit_allowed: boolean;
  is_zero_rated: boolean;
  is_exempt: boolean;
  is_custom_rate_allowed: boolean;
  effective_from: string;
  effective_until?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface VatDocument {
  id: string;
  document_type: 'MUSHAK_6_3' | 'MUSHAK_6_6' | 'PURCHASE_VAT_INVOICE' | 'ZERO_RATE_EVIDENCE' | 'PAYMENT_CHALLAN';
  document_number: string;
  document_date: string;
  invoice_id?: string;
  client_id?: string;
  vendor_id?: string;
  tax_period: string;
  amount: number;
  attachment_url?: string;
  verification_status: 'PENDING' | 'RECEIVED' | 'VERIFIED' | 'REJECTED' | 'DUPLICATE' | 'CLAIMED';
  verified_by?: string;
  verified_at?: string;
  created_at: string;
}

export interface InputVatEntry {
  id: string;
  vendor_name: string;
  expense_id?: string;
  vendor_bin: string;
  purchase_invoice_number: string;
  mushak_6_3_number: string;
  purchase_date: string;
  taxable_value: number;
  input_vat_amount: number;
  approved_input_vat: number;
  eligibility_status: 'ELIGIBLE_INPUT_CREDIT' | 'PARTIALLY_ELIGIBLE' | 'INELIGIBLE' | 'CLAIMED' | 'REJECTED';
  verification_status: 'PENDING' | 'APPROVED' | 'REJECTED';
  tax_period: string;
  claimed_return_id?: string;
  supporting_document?: string;
  created_by: string;
  approved_by?: string;
  created_at: string;
}

export interface VatReturn {
  id: string;
  company_id: string;
  vat_configuration_id: string;
  financial_year: string;
  tax_period: string;
  tax_period_start: string;
  tax_period_end: string;
  opening_balance: number;
  output_vat: number;
  eligible_input_vat: number;
  vds_decreasing_adjustment: number;
  increasing_adjustments: number;
  decreasing_adjustments: number;
  net_vat_payable: number;
  carried_forward_credit: number;
  status: 'DRAFT' | 'DATA_COLLECTION' | 'UNDER_REVIEW' | 'APPROVED' | 'FILED' | 'PAID' | 'LOCKED';
  prepared_by: string;
  reviewed_by?: string;
  approved_by?: string;
  filed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface VatAuditLog {
  id: string;
  entity_type: 'vat_configuration' | 'vds_certificate' | 'mushak_document' | 'input_vat' | 'vat_override';
  entity_id: string;
  action_type: 'CREATE' | 'UPDATE' | 'ACTIVATE' | 'VERIFY' | 'OVERRIDE' | 'CLAIM' | 'PUBLISH';
  previous_value: any;
  new_value: any;
  reason: string;
  performed_by: string;
  performed_at: string;
}

export interface ReserveSettings {
  id: string;
  reserve_percentage: number;
  target_type: 'FIXED_AMOUNT' | 'EXPENSE_MONTHS' | 'REVENUE_PERCENTAGE';
  target_value: number;
  target_fixed_bdt: number;
  target_fixed_usd: number;
  updated_by?: string;
  updated_at: string;
}

export interface ReserveSettingsHistory {
  id: string;
  previous_percentage: number;
  new_percentage: number;
  changed_by: string;
  effective_date: string;
  reason: string;
  created_at: string;
}

export type ReserveTransactionType =
  | 'AUTOMATIC_RESERVE_ALLOCATION'
  | 'MANUAL_DEPOSIT'
  | 'RESERVE_ADJUSTMENT'
  | 'RESERVE_WITHDRAWAL'
  | 'TRANSFER_TO_FDR'
  | 'TRANSFER_TO_DPS'
  | 'TRANSFER_FROM_FDR'
  | 'TRANSFER_FROM_DPS'
  | 'INTEREST_RECEIVED'
  | 'BANK_CHARGE'
  | 'TAX_DEDUCTION'
  | 'PENALTY'
  | 'MATURITY_PROCEEDS'
  | 'RENEWAL'
  | 'REFUND_ADJUSTMENT'
  | 'CURRENCY_ADJUSTMENT'
  | 'OPENING_BALANCE';

export interface ReserveLedgerEntry {
  id: string;
  entity_id: string;
  currency: 'BDT' | 'USD';
  transaction_type: ReserveTransactionType;
  amount: number;
  source: string;
  payment_id?: string;
  invoice_id?: string;
  client_id?: string;
  deposit_date: string;
  withdrawal_date?: string;
  destination_account?: string;
  reason?: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'REVERSED';
  created_by?: string;
  verified_by?: string;
  approved_by?: string;
  notes?: string;
  created_at: string;
}

export interface FdrAccount {
  id: string;
  entity_id: string;
  bank_name: string;
  branch_name?: string;
  account_title: string;
  fdr_reference_number: string;
  principal_amount: number;
  currency: 'BDT' | 'USD';
  interest_rate: number;
  rate_type: 'SIMPLE' | 'COMPOUND';
  start_date: string;
  maturity_date: string;
  tenure_months: number;
  expected_gross_return: number;
  expected_tax_deduction: number;
  expected_bank_charges: number;
  expected_net_maturity_value: number;
  actual_maturity_value?: number;
  auto_renewal: boolean;
  renewal_instruction?: string;
  nominee_name?: string;
  lien_status: boolean;
  linked_bank_account?: string;
  funding_source: string;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'NEAR_MATURITY' | 'MATURED' | 'RENEWED' | 'PARTIALLY_ENCUMBERED' | 'CLOSED' | 'CANCELLED';
  notes?: string;
  created_by: string;
  created_at: string;
}

export interface DpsAccount {
  id: string;
  entity_id: string;
  bank_name: string;
  branch_name?: string;
  account_title: string;
  dps_account_number: string;
  currency: 'BDT' | 'USD';
  installment_amount: number;
  payment_frequency: 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY' | 'CUSTOM';
  start_date: string;
  next_installment_date: string;
  maturity_date: string;
  total_installments: number;
  paid_installments: number;
  remaining_installments: number;
  total_deposited_amount: number;
  expected_interest_amount: number;
  expected_maturity_value: number;
  actual_maturity_value?: number;
  late_payment_charge: number;
  missed_installments_count: number;
  grace_period_days: number;
  auto_debit: boolean;
  linked_bank_account?: string;
  funding_source: string;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'PAYMENT_DUE' | 'OVERDUE' | 'MATURED' | 'CLOSED' | 'CANCELLED';
  notes?: string;
  created_by: string;
  created_at: string;
}

export interface DpsInstallment {
  id: string;
  dps_account_id: string;
  installment_number: number;
  due_date: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'SKIPPED';
  paid_date?: string;
  transaction_reference?: string;
  paid_from_account?: string;
  late_fee: number;
  notes?: string;
  verified_by?: string;
  created_at: string;
}

export interface ReserveWithdrawalRequest {
  id: string;
  requested_amount: number;
  currency: 'BDT' | 'USD';
  entity_id: string;
  purpose: string;
  detailed_reason: string;
  emergency_category: 'EMERGENCY_OPERATIONS' | 'TAX_SURGE' | 'CAPITAL_INVESTMENT' | 'LEGAL' | 'OTHER';
  requested_by: string;
  request_date: string;
  destination_account?: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'PAID' | 'CANCELLED';
  approved_by?: string;
  approved_at?: string;
  approval_comment?: string;
  override_reason?: string;
  created_at: string;
}

export interface SavingsDocument {
  id: string;
  document_type: 'FDR_CERTIFICATE' | 'DPS_CERTIFICATE' | 'BANK_STATEMENT' | 'DEPOSIT_SLIP' | 'WITHDRAWAL_APPROVAL' | 'TAX_CERTIFICATE' | 'MATURITY_STATEMENT';
  document_name: string;
  file_url: string;
  related_fdr_id?: string;
  related_dps_id?: string;
  related_withdrawal_id?: string;
  entity_id: string;
  uploaded_by: string;
  uploaded_at: string;
}

export interface FinancialReconciliation {
  id: string;
  account_type: 'RESERVE_CASH' | 'FDR' | 'DPS';
  target_id: string;
  statement_date: string;
  system_balance: number;
  statement_balance: number;
  discrepancy_amount: number;
  status: 'MATCHED' | 'PARTIALLY_MATCHED' | 'MISMATCHED' | 'PENDING_REVIEW';
  notes?: string;
  reconciled_by: string;
  created_at: string;
}

export interface FinancialAuditLog {
  id: string;
  user_id: string;
  user_role: string;
  action: string;
  module: string;
  record_id: string;
  previous_value: any;
  new_value: any;
  ip_address?: string;
  timestamp: string;
}

import { supabase, isSupabaseConfigured } from './supabase';

export const isDemoMode = !isSupabaseConfigured;

// Workspace default entity and seed configurations
const MOCK_PROFILES: Profile[] = [
  { id: '88888888-8888-4888-8888-888888888888', full_name: 'Rafsan Rohan', email: 'admin@creatiancy.com', username: 'rafsan', role_name: 'Super Admin' }
];

const MOCK_ENTITIES: BusinessEntity[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    legal_name: 'Creatiancy Limited',
    entity_code: 'CLTD',
    logo_url: '',
    registered_address: 'House 12, Road 4, Banani, Dhaka 1213, Bangladesh',
    registration_number: 'C-CLTD-DHAKA-2026',
    tax_id: 'BIN-1234567890',
    email: 'billing@creatiancy.com',
    phone: '+880 1325 078 941',
    website: 'www.creatiancy.com',
    payment_instructions: 'Please transfer to our BDT bank account or use our bKash/Nagad merchant wallets. Reference invoice number.',
    invoice_prefix: 'CLTD-BDT',
    receipt_prefix: 'CLTD-REC',
    vat_footer: 'All rates are inclusive of applicable VAT in accordance with the prevailing laws and regulations.',
    bkash_merchant: '01711223344',
    nagad_merchant: '01888776655',
    corporate_tax_rate: 27.5,
    default_vat_rate: 15.0
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    legal_name: 'Creatiancy LLC',
    entity_code: 'CLLC',
    logo_url: '',
    registered_address: '160 Greentree Dr, Suite 101, Dover, DE 19904, USA',
    registration_number: 'DE-LLC-7890123',
    tax_id: 'EIN-12-3456789',
    email: 'billing@creatiancy.com',
    phone: '+1 212 555 0199',
    website: 'www.creatiancy.com',
    payment_instructions: 'Please wire transfer to our USD bank account. SWIFT/Routing code details below.',
    invoice_prefix: 'CLLC-USD',
    receipt_prefix: 'CLLC-REC',
    vat_footer: 'All rates are inclusive of applicable taxes in accordance with the prevailing laws.',
    bkash_merchant: '',
    nagad_merchant: '',
    corporate_tax_rate: 21.0,
    default_vat_rate: 0.0
  }
];

const MOCK_BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'a00000b0-0000-4000-8000-000000000001',
    entity_id: '11111111-1111-4111-8111-111111111111',
    bank_name: 'City Bank PLC (Bangladesh)',
    account_holder: 'Creatiancy Limited',
    account_number: 'BDT-ACC-1002003004005',
    branch: 'Banani Branch',
    routing_number: '123456789',
    swift_bic: 'TRSTBDDH',
    bank_address: 'Banani, Dhaka, Bangladesh',
    is_active: true
  },
  {
    id: 'a00000b0-0000-4000-8000-000000000002',
    entity_id: '22222222-2222-4222-8222-222222222222',
    bank_name: 'JPMorgan Chase Bank, N.A. (USA)',
    account_holder: 'Creatiancy LLC',
    account_number: 'USD-ACC-9876543210',
    branch: 'Wall Street Branch',
    routing_number: '987654321',
    swift_bic: 'CHASUS33XXX',
    bank_address: 'Wall Street, New York, NY, USA',
    is_active: true
  }
];

const MOCK_CLIENTS: BillingClient[] = [];
const MOCK_INVOICES: Invoice[] = [];
const MOCK_ITEMS: InvoiceItem[] = [];
const MOCK_SNAPSHOTS: InvoiceSnapshot[] = [];
const MOCK_PAYMENTS: Payment[] = [];
const MOCK_EMAIL_LOGS: EmailLog[] = [];
const MOCK_AUDIT_LOGS: AuditLog[] = [];
const MOCK_TAX_PAYMENTS: TaxPayment[] = [];
const MOCK_EXPENSES: Expense[] = [];

const MOCK_RESERVE_SETTINGS: ReserveSettings = {
  id: '11111111-0000-4000-8000-000000000000',
  reserve_percentage: 20.00,
  target_type: 'EXPENSE_MONTHS',
  target_value: 6.00,
  target_fixed_bdt: 5000000.00,
  target_fixed_usd: 50000.00,
  updated_by: '88888888-8888-4888-8888-888888888888',
  updated_at: '2026-07-01T00:00:00Z'
};

const MOCK_RESERVE_SETTINGS_HISTORY: ReserveSettingsHistory[] = [
  {
    id: 'a00000d0-0000-4000-8000-000000000001',
    previous_percentage: 15.00,
    new_percentage: 20.00,
    changed_by: 'Rafsan Rohan (Super Admin)',
    effective_date: '2026-01-01',
    reason: 'Updated corporate policy for higher 6-month safety buffer.',
    created_at: '2026-01-01T00:00:00Z'
  }
];

const MOCK_RESERVE_LEDGER: ReserveLedgerEntry[] = [];
const MOCK_FDR_ACCOUNTS: FdrAccount[] = [];
const MOCK_DPS_ACCOUNTS: DpsAccount[] = [];
const MOCK_DPS_INSTALLMENTS: DpsInstallment[] = [];

const MOCK_WITHDRAWAL_REQUESTS: ReserveWithdrawalRequest[] = [];
const MOCK_SAVINGS_DOCUMENTS: SavingsDocument[] = [];
const MOCK_FINANCIAL_RECONCILIATIONS: FinancialReconciliation[] = [];
const MOCK_FINANCIAL_AUDIT_LOGS: FinancialAuditLog[] = [];

const MOCK_CLIENT_SERVICE_RATES: ClientServiceRate[] = [
  { id: 'a0000080-0000-4000-8000-000000000001', client_id: 'a0000080-0000-4000-8000-000000000001', service_name: 'Static Banner Design', unit_price: 1300, unit: 'pcs', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'a0000080-0000-4000-8000-000000000002', client_id: 'a0000080-0000-4000-8000-000000000001', service_name: 'Meta Ads Media Buying ($1,000)', unit_price: 125500, unit: 'budget', is_paid_media: true, usd_budget: 1000, usd_rate: 125.5, updated_at: '2026-07-01T00:00:00Z' },
  { id: 'a0000080-0000-4000-8000-000000000003', client_id: 'a0000080-0000-4000-8000-000000000002', service_name: 'Static Banner Design', unit_price: 5000, unit: 'pcs', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'a0000080-0000-4000-8000-000000000004', client_id: 'a0000080-0000-4000-8000-000000000002', service_name: 'Full Stack Web Development', unit_price: 45000, unit: 'project', updated_at: '2026-07-01T00:00:00Z' }
];

const MOCK_SYSTEM_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'a0000000-0000-4000-8000-000000000001',
    sender_name: 'Rafsan Rohan',
    sender_role: 'Super Admin',
    title: 'Security Compliance & Data Protection Policy Active',
    message: 'All team members must ensure billing records adhere to legal entity and verification standards.',
    category: 'emergency',
    target_roles: ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
    link_url: '/billing/team',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    read_by: []
  },
  {
    id: 'a0000000-0000-4000-8000-000000000002',
    sender_name: 'Finance Executive',
    sender_role: 'Finance Admin',
    title: 'Custom Payment Gateway Fee Rates Updated',
    message: 'Platform processing fee cutoffs can now be set dynamically under Gateway Rates setting page.',
    category: 'broadcast',
    target_roles: ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
    link_url: '/billing/settings/gateway-rates',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    read_by: []
  }
];

const MOCK_TAX_CONFIGURATIONS: TaxConfiguration[] = [
  {
    id: 'tax-cfg-2026-2027',
    country_code: 'BD',
    entity_type: 'NON_PUBLICLY_TRADED_COMPANY',
    financial_year: '2026-2027',
    assessment_year: '2027-2028',
    configuration_name: 'Bangladesh Corporate Income Tax FY 2026-27 (NBR Standard)',
    bank_compliant_tax_rate: 0.25,
    standard_tax_rate: 0.275,
    turnover_threshold: 5000000,
    turnover_minimum_rate: 0.006,
    effective_from: '2026-07-01',
    status: 'ACTIVE',
    version_number: 1,
    change_summary: 'Initial seed tax configuration for FY 2026-2027 per NBR guidelines (25% banking compliant, 27.5% standard, 0.60% turnover minimum tax above 50L BDT).',
    source_reference: 'Income Tax Act 2023, Section 163 & Finance Act 2026',
    created_by: '88888888-8888-4888-8888-888888888888',
    created_at: '2026-07-01T00:00:00Z',
    approved_by: '88888888-8888-4888-8888-888888888888',
    approved_at: '2026-07-01T00:00:00Z',
    published_at: '2026-07-01T00:00:00Z'
  }
];

const MOCK_TAX_SERVICE_CATEGORIES: TaxServiceCategory[] = [
  { id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', tax_configuration_id: 'tax-cfg-2026-2027', category_code: 'CREATIVE_AGENCY', category_name: 'Creative Agency Services', description: 'Advertising, design, branding, and media services', tds_rate: 0.04, is_custom_rate_allowed: true, is_active: true, effective_from: '2026-07-01', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', tax_configuration_id: 'tax-cfg-2026-2027', category_code: 'PROFESSIONAL_SERVICE', category_name: 'Professional Services', description: 'Consulting, advisory, and professional fees', tds_rate: 0.075, is_custom_rate_allowed: true, is_active: true, effective_from: '2026-07-01', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', tax_configuration_id: 'tax-cfg-2026-2027', category_code: 'TECHNICAL_SERVICE', category_name: 'Technical & IT Services', description: 'Software engineering, maintenance, and IT consulting', tds_rate: 0.10, is_custom_rate_allowed: true, is_active: true, effective_from: '2026-07-01', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', tax_configuration_id: 'tax-cfg-2026-2027', category_code: 'NO_TDS', category_name: 'Exempt / No TDS', description: 'Zero source tax deducted at source', tds_rate: 0.0, is_custom_rate_allowed: false, is_active: true, effective_from: '2026-07-01', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' }
];

const MOCK_TAX_CALCULATIONS: TaxCalculation[] = [];
const MOCK_TAX_AUDIT_LOGS: TaxAuditLog[] = [];

// VAT Seed Data
const MOCK_VAT_REGISTRATION_PROFILE: any = null;

const MOCK_VAT_CONFIGURATIONS: VatConfiguration[] = [];
const MOCK_VAT_SERVICE_CATEGORIES: VatServiceCategory[] = [];

const MOCK_VAT_DOCUMENTS: VatDocument[] = [];
const MOCK_INPUT_VAT_ENTRIES: InputVatEntry[] = [];
const MOCK_VAT_RETURNS: VatReturn[] = [];
const MOCK_VAT_AUDIT_LOGS: VatAuditLog[] = [];

// Persistent state storage adapter (browser & SSR fallback)
class LocalStore {
  private memoryCache: Record<string, any> = {};

  constructor() {
    // Retain and protect all user-entered live testing data
  }

  private getVal(key: string, def: any): any {
    // Enforcing Cloud-Only: Completely bypass browser localStorage
    // This prevents stale IDs (like "ent-1") from crashing Supabase Sync.
    if (this.memoryCache[key] !== undefined) {
      return this.memoryCache[key];
    }
    return def;
  }

  private setVal(key: string, val: any) {
    // Save only to active memory session, NEVER to browser storage.
    this.memoryCache[key] = val;
  }

  get vatRegistrationProfile(): VatRegistrationProfile {
    return this.getVal('vat_registration_profile', null);
  }

  set vatRegistrationProfile(val: VatRegistrationProfile) {
    this.setVal('vat_registration_profile', val);
  }

  get vatConfigurations(): VatConfiguration[] {
    return this.getVal('vat_configurations', []);
  }

  set vatConfigurations(val: VatConfiguration[]) {
    this.setVal('vat_configurations', [...val]);
  }

  get vatServiceCategories(): VatServiceCategory[] {
    return this.getVal('vat_service_categories', []);
  }

  set vatServiceCategories(val: VatServiceCategory[]) {
    this.setVal('vat_service_categories', [...val]);
  }

  get vatDocuments(): VatDocument[] {
    return this.getVal('vat_documents', MOCK_VAT_DOCUMENTS);
  }

  set vatDocuments(val: VatDocument[]) {
    this.setVal('vat_documents', [...val]);
  }

  get inputVatEntries(): InputVatEntry[] {
    return this.getVal('input_vat_entries', MOCK_INPUT_VAT_ENTRIES);
  }

  set inputVatEntries(val: InputVatEntry[]) {
    this.setVal('input_vat_entries', [...val]);
  }

  get vatReturns(): VatReturn[] {
    return this.getVal('vat_returns', MOCK_VAT_RETURNS);
  }

  set vatReturns(val: VatReturn[]) {
    this.setVal('vat_returns', [...val]);
  }

  get vatAuditLogs(): VatAuditLog[] {
    return this.getVal('vat_audit_logs', MOCK_VAT_AUDIT_LOGS);
  }

  set vatAuditLogs(val: VatAuditLog[]) {
    this.setVal('vat_audit_logs', [...val]);
  }

  get taxConfigurations(): TaxConfiguration[] {
    return this.getVal('tax_configurations', MOCK_TAX_CONFIGURATIONS);
  }

  set taxConfigurations(val: TaxConfiguration[]) {
    this.setVal('tax_configurations', [...val]);
  }

  get taxServiceCategories(): TaxServiceCategory[] {
    return this.getVal('tax_service_categories', MOCK_TAX_SERVICE_CATEGORIES);
  }

  set taxServiceCategories(val: TaxServiceCategory[]) {
    this.setVal('tax_service_categories', [...val]);
  }

  get taxCalculations(): TaxCalculation[] {
    return this.getVal('tax_calculations', MOCK_TAX_CALCULATIONS);
  }

  set taxCalculations(val: TaxCalculation[]) {
    this.setVal('tax_calculations', [...val]);
  }

  get taxAuditLogs(): TaxAuditLog[] {
    return this.getVal('tax_audit_logs', MOCK_TAX_AUDIT_LOGS);
  }

  set taxAuditLogs(val: TaxAuditLog[]) {
    this.setVal('tax_audit_logs', [...val]);
  }

  get currentUser(): Profile {
    return this.getVal('current_user', MOCK_PROFILES[0]);
  }

  set currentUser(user: Profile) {
    this.setVal('current_user', user);
  }

  get profiles(): Profile[] {
    const list = this.getVal('profiles', MOCK_PROFILES);
    const merged = Array.isArray(list) ? [...list] : [];
    MOCK_PROFILES.forEach(mockUser => {
      if (!merged.some(p => p.email.toLowerCase() === mockUser.email.toLowerCase() || (p.username && p.username.toLowerCase() === mockUser.username?.toLowerCase()))) {
        merged.push(mockUser);
      }
    });
    return merged;
  }

  set profiles(val: Profile[]) {
    this.setVal('profiles', [...val]);
  }

  get clients(): BillingClient[] {
    return this.getVal('clients', MOCK_CLIENTS);
  }

  set clients(val: BillingClient[]) {
    this.setVal('clients', [...val]);
  }

  get invoices(): Invoice[] {
    return this.getVal('invoices', MOCK_INVOICES);
  }

  set invoices(val: Invoice[]) {
    this.setVal('invoices', [...val]);
  }

  get items(): InvoiceItem[] {
    return this.getVal('items', MOCK_ITEMS);
  }

  set items(val: InvoiceItem[]) {
    this.setVal('items', [...val]);
  }

  get snapshots(): InvoiceSnapshot[] {
    return this.getVal('snapshots', MOCK_SNAPSHOTS);
  }

  set snapshots(val: InvoiceSnapshot[]) {
    this.setVal('snapshots', [...val]);
  }

  get payments(): Payment[] {
    return this.getVal('payments', MOCK_PAYMENTS);
  }

  set payments(val: Payment[]) {
    this.setVal('payments', [...val]);
  }

  get taxPayments(): TaxPayment[] {
    return this.getVal('tax_payments', MOCK_TAX_PAYMENTS);
  }

  set taxPayments(val: TaxPayment[]) {
    this.setVal('tax_payments', [...val]);
  }

  get expenses(): Expense[] {
    return this.getVal('expenses', MOCK_EXPENSES);
  }

  set expenses(val: Expense[]) {
    this.setVal('expenses', [...val]);
  }

  get clientServiceRates(): ClientServiceRate[] {
    return this.getVal('client_service_rates', MOCK_CLIENT_SERVICE_RATES);
  }

  set clientServiceRates(val: ClientServiceRate[]) {
    this.setVal('client_service_rates', [...val]);
  }

  get systemNotifications(): SystemNotification[] {
    const list: SystemNotification[] = this.getVal('system_notifications', MOCK_SYSTEM_NOTIFICATIONS);
    // Strict 48-Hour Auto-Clean Purge Rule:
    const cutoff48h = Date.now() - 48 * 60 * 60 * 1000;
    const cleanList = list.filter(n => new Date(n.timestamp).getTime() > cutoff48h);
    if (cleanList.length !== list.length) {
      this.setVal('system_notifications', cleanList);
    }
    return cleanList;
  }

  set systemNotifications(val: SystemNotification[]) {
    this.setVal('system_notifications', [...val]);
  }

  get emailLogs(): EmailLog[] {
    return this.getVal('email_logs', MOCK_EMAIL_LOGS);
  }

  set emailLogs(val: EmailLog[]) {
    this.setVal('email_logs', [...val]);
  }

  get auditLogs(): AuditLog[] {
    return this.getVal('audit_logs', MOCK_AUDIT_LOGS);
  }

  set auditLogs(val: AuditLog[]) {
    this.setVal('audit_logs', [...val]);
  }

  get entities(): BusinessEntity[] {
    return this.getVal('entities', MOCK_ENTITIES);
  }

  set entities(val: BusinessEntity[]) {
    this.setVal('entities', [...val]);
  }

  get bankAccounts(): BankAccount[] {
    return this.getVal('bank_accounts', MOCK_BANK_ACCOUNTS);
  }

  set bankAccounts(val: BankAccount[]) {
    this.setVal('bank_accounts', [...val]);
  }

  get gatewayRates(): GatewayRates {
    const defaults: GatewayRates = {
      bkash: 1.85,
      nagad: 1.50,
      card: 2.50,
      amex: 3.50,
      stripe: 2.90,
      payoneer: 2.00,
      wise: 0.50,
      customGateways: []
    };
    const stored = this.getVal('gateway_rates', defaults) as GatewayRates;
    // Ensure customGateways always exists (backward compat)
    if (!stored.customGateways) stored.customGateways = [];
    return stored;
  }

  set gatewayRates(val: GatewayRates) {
    this.setVal('gateway_rates', val);
  }

  get fromEmail(): string {
    return this.getVal('from_email', 'Creatiancy@gmail.com');
  }

  set fromEmail(val: string) {
    this.setVal('from_email', val);
  }

  get reserveSettings(): ReserveSettings {
    return this.getVal('reserve_settings', MOCK_RESERVE_SETTINGS);
  }

  set reserveSettings(val: ReserveSettings) {
    this.setVal('reserve_settings', val);
  }

  get reserveSettingsHistory(): ReserveSettingsHistory[] {
    return this.getVal('reserve_settings_history', MOCK_RESERVE_SETTINGS_HISTORY);
  }

  set reserveSettingsHistory(val: ReserveSettingsHistory[]) {
    this.setVal('reserve_settings_history', [...val]);
  }

  get reserveLedger(): ReserveLedgerEntry[] {
    return this.getVal('reserve_ledger', MOCK_RESERVE_LEDGER);
  }

  set reserveLedger(val: ReserveLedgerEntry[]) {
    this.setVal('reserve_ledger', [...val]);
  }

  get fdrAccounts(): FdrAccount[] {
    return this.getVal('fdr_accounts', MOCK_FDR_ACCOUNTS);
  }

  set fdrAccounts(val: FdrAccount[]) {
    this.setVal('fdr_accounts', [...val]);
  }

  get dpsAccounts(): DpsAccount[] {
    return this.getVal('dps_accounts', MOCK_DPS_ACCOUNTS);
  }

  set dpsAccounts(val: DpsAccount[]) {
    this.setVal('dps_accounts', [...val]);
  }

  get dpsInstallments(): DpsInstallment[] {
    return this.getVal('dps_installments', MOCK_DPS_INSTALLMENTS);
  }

  set dpsInstallments(val: DpsInstallment[]) {
    this.setVal('dps_installments', [...val]);
  }

  get withdrawalRequests(): ReserveWithdrawalRequest[] {
    return this.getVal('withdrawal_requests', MOCK_WITHDRAWAL_REQUESTS);
  }

  set withdrawalRequests(val: ReserveWithdrawalRequest[]) {
    this.setVal('withdrawal_requests', [...val]);
  }

  get savingsDocuments(): SavingsDocument[] {
    return this.getVal('savings_documents', MOCK_SAVINGS_DOCUMENTS);
  }

  set savingsDocuments(val: SavingsDocument[]) {
    this.setVal('savings_documents', [...val]);
  }

  get financialReconciliations(): FinancialReconciliation[] {
    return this.getVal('financial_reconciliations', MOCK_FINANCIAL_RECONCILIATIONS);
  }

  set financialReconciliations(val: FinancialReconciliation[]) {
    this.setVal('financial_reconciliations', [...val]);
  }

  get financialAuditLogs(): FinancialAuditLog[] {
    return this.getVal('financial_audit_logs', MOCK_FINANCIAL_AUDIT_LOGS);
  }

  set financialAuditLogs(val: FinancialAuditLog[]) {
    this.setVal('financial_audit_logs', [...val]);
  }
}

export const localStore = new LocalStore();

// UNIFIED EXPORTS FOR MUTATIONS AND QUERIES
export const db = {
  // Authentication Actions
  getCurrentUser: async (): Promise<Profile> => {
    return localStore.currentUser;
  },

  setCurrentUser: async (user: Profile): Promise<void> => {
    localStore.currentUser = user;
    db.logAudit(user.id, 'switch_role', 'users', user.id, null, { role: user.role_name });
  },

  getProfiles: async (): Promise<Profile[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: true });
        if (!error && data && data.length > 0) {
          localStore.profiles = data;
          return data;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.profiles;
  },

  createProfile: async (profile: Omit<Profile, 'id' | 'created_at'> & { password?: string }): Promise<Profile> => {
    const list = localStore.profiles;
    // Check email uniqueness
    if (list.some(p => p.email.toLowerCase() === profile.email.toLowerCase())) {
      throw new Error('A team member with this email address already exists.');
    }
    // Check username uniqueness if provided
    if (profile.username && list.some(p => p.username && p.username.toLowerCase() === profile.username?.toLowerCase())) {
      throw new Error('This username is already taken. Please choose a unique username.');
    }

    let authUserId = generateUUID();

    // Register user in Supabase Auth if connected
    if (isSupabaseConfigured && supabase) {
      try {
        const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nefnjnngviaywjteduhm.supabase.co';
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_WwFaeFNaO5DRUGYa3FXWDw_SnsvbW9V';
        
        const tempSupabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
          }
        });

        const { data: authData, error: authErr } = await tempSupabase.auth.signUp({
          email: profile.email.toLowerCase(),
          password: profile.password || 'TemporaryPass123!',
          options: {
            data: {
              full_name: profile.full_name,
              role_name: profile.role_name
            }
          }
        });

        if (authErr) {
          throw new Error(`Auth registration failed: ${authErr.message}`);
        }

        if (authData?.user) {
          authUserId = authData.user.id;
        }
      } catch (err: any) {
        throw new Error(err.message || 'Supabase Auth registration failed');
      }
    }

    const newProfile: Profile = {
      ...profile,
      id: authUserId,
      created_at: new Date().toISOString()
    };
    // Sync to Supabase cloud if connected
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('profiles').upsert({
        id: newProfile.id,
        full_name: newProfile.full_name,
        email: newProfile.email,
        role_name: newProfile.role_name,
        username: newProfile.username,
        created_at: newProfile.created_at,
        updated_at: new Date().toISOString()
      });
      if (error) throw new Error(`Cloud create failed: ${error.message}`);
    }
    list.push(newProfile);
    localStore.profiles = list;
    const user = await db.getCurrentUser();
    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'create_team_account', 'users', newProfile.id, null, { full_name: newProfile.full_name, email: newProfile.email, username: newProfile.username, role: newProfile.role_name });
    return newProfile;
  },

  updateProfileRole: async (userId: string, newRole: Profile['role_name']): Promise<Profile> => {
    // 1. Update Supabase cloud if connected
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('profiles')
        .update({ role_name: newRole, updated_at: new Date().toISOString() })
        .eq('id', userId);
      if (error) throw new Error(`Cloud update failed: ${error.message}`);
    }
    // 2. Update local store
    const list = localStore.profiles;
    const idx = list.findIndex(p => p.id === userId);
    if (idx === -1) throw new Error('User not found');
    const oldRole = list[idx].role_name;
    list[idx].role_name = newRole;
    localStore.profiles = list;
    const user = await db.getCurrentUser();
    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'change_user_role', 'users', userId, { role: oldRole }, { role: newRole });
    return list[idx];
  },

  deleteProfile: async (userId: string): Promise<void> => {
    // 1. Delete from Supabase cloud if connected
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      if (error) throw new Error(`Cloud delete failed: ${error.message}`);
    }
    // 2. Delete from local store
    const list = localStore.profiles.filter(p => p.id !== userId);
    localStore.profiles = list;
    const user = await db.getCurrentUser();
    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'delete_team_account', 'users', userId, null, { deleted: true });
  },

  updateProfileCredentials: async (
    userId: string, 
    data: { full_name?: string; email?: string; username?: string; password_hash?: string }
  ): Promise<Profile> => {
    const list = localStore.profiles;
    const idx = list.findIndex(p => p.id === userId);
    if (idx === -1) throw new Error('User not found');
    
    if (data.email && data.email.toLowerCase() !== list[idx].email.toLowerCase()) {
      if (list.some((p, i) => i !== idx && p.email.toLowerCase() === data.email!.toLowerCase())) {
        throw new Error('Email is already associated with another account');
      }
    }
    if (data.username && data.username.toLowerCase() !== (list[idx].username || '').toLowerCase()) {
      if (list.some((p, i) => i !== idx && p.username && p.username.toLowerCase() === data.username!.toLowerCase())) {
        throw new Error('Username is already taken');
      }
    }

    const previous = { ...list[idx] };
    if (data.full_name !== undefined) list[idx].full_name = data.full_name;
    if (data.email !== undefined) list[idx].email = data.email;
    if (data.username !== undefined) list[idx].username = data.username;
    if (data.password_hash !== undefined) list[idx].password_hash = data.password_hash;

    if (isSupabaseConfigured && supabase) {
      const updates: any = {};
      if (data.full_name !== undefined) updates.full_name = data.full_name;
      if (data.email !== undefined) updates.email = data.email;
      if (data.username !== undefined) updates.username = data.username;
      updates.updated_at = new Date().toISOString();

      const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
      if (error) throw new Error(`Cloud credentials update failed: ${error.message}`);
    }
    
    localStore.profiles = list;
    const user = await db.getCurrentUser();
    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'update_user_credentials', 'users', userId, 
      { email: previous.email, username: previous.username }, 
      { email: list[idx].email, username: list[idx].username, passChanged: !!data.password_hash }
    );
    return list[idx];
  },

  // Gateway Rates
  getGatewayRates: async (): Promise<GatewayRates> => {
    return localStore.gatewayRates;
  },

  setGatewayRates: async (rates: GatewayRates): Promise<void> => {
    localStore.gatewayRates = rates;
    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'update_gateway_rates', 'settings', 'gateway_rates', null, rates);
  },

  // From Email
  getFromEmail: async (): Promise<string> => {
    return localStore.fromEmail;
  },

  setFromEmail: async (email: string): Promise<void> => {
    const old = localStore.fromEmail;
    localStore.fromEmail = email;
    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'update_from_email', 'settings', 'from_email', { email: old }, { email });
  },

  // Business Entities
  getEntities: async (): Promise<BusinessEntity[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('business_entities').select('*');
        if (!error && data && data.length > 0) {
          localStore.entities = data;
          return data;
        }
        
        // Auto-seed default entities into Supabase if empty
        const defaultEntities: BusinessEntity[] = [
          {
            id: '11111111-1111-1111-1111-111111111111',
            legal_name: 'Creatiancy Limited',
            entity_code: 'CLTD',
            logo_url: '',
            registered_address: 'House 12, Road 4, Banani, Dhaka 1213, Bangladesh',
            registration_number: 'C-CLTD-DHAKA-2026',
            tax_id: 'TIN-BIN-CLTD-123456',
            email: 'billing@creatiancy.com',
            phone: '+880 1325 078 941',
            website: 'www.creatiancy.com',
            payment_instructions: 'Bank Transfer to Creatiancy Limited (CLTD)',
            invoice_prefix: 'CLTD-BDT',
            receipt_prefix: 'CLTD-REC',
            vat_footer: 'All rates are inclusive of applicable VAT in accordance with prevailing laws.',
            corporate_tax_rate: 30,
            default_vat_rate: 15
          },
          {
            id: '22222222-2222-2222-2222-222222222222',
            legal_name: 'Creatiancy LLC',
            entity_code: 'CLLC',
            logo_url: '',
            registered_address: '1619 Broadway, Suite 500, New York, NY 10019, USA',
            registration_number: 'NY-CLLC-2026-98765',
            tax_id: 'EIN-12-3456789',
            email: 'billing@creatiancy.com',
            phone: '+1 212 555 0199',
            website: 'www.creatiancy.com',
            payment_instructions: 'Bank Wire / ACH to Creatiancy LLC (CLLC)',
            invoice_prefix: 'CLLC-USD',
            receipt_prefix: 'CLLC-REC',
            vat_footer: 'All rates are inclusive of applicable taxes.',
            corporate_tax_rate: 21,
            default_vat_rate: 0
          }
        ];

        const { data: inserted, error: insertErr } = await supabase
          .from('business_entities')
          .insert(defaultEntities)
          .select();

        if (!insertErr && inserted && inserted.length > 0) {
          localStore.entities = inserted;
          return inserted;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.entities;
  },

  updateEntity: async (id: string, updates: Partial<BusinessEntity>): Promise<BusinessEntity> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('business_entities')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw new Error(`Cloud entity update failed: ${error.message}`);
    }

    const list = localStore.entities;
    const idx = list.findIndex(e => e.id === id);
    if (idx !== -1) {
      const updated = { ...list[idx], ...updates };
      list[idx] = updated;
      localStore.entities = list;
    }

    const user = await db.getCurrentUser();
    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'update_entity', 'entities', id, null, updates);
    return localStore.entities.find(e => e.id === id) || (updates as BusinessEntity);
  },

  // Bank Accounts
  getBankAccounts: async (): Promise<BankAccount[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('entity_bank_accounts').select('*');
        if (!error && data && data.length > 0) {
          localStore.bankAccounts = data;
          return data;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.bankAccounts;
  },

  updateBankAccount: async (id: string, updates: Partial<BankAccount>): Promise<BankAccount> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('entity_bank_accounts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw new Error(`Cloud bank account update failed: ${error.message}`);
    }

    const list = localStore.bankAccounts;
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) {
      const updated = { ...list[idx], ...updates };
      list[idx] = updated;
      localStore.bankAccounts = list;
    }

    const user = await db.getCurrentUser();
    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'update_bank', 'bank_accounts', id, null, updates);
    return localStore.bankAccounts.find(b => b.id === id) || (updates as BankAccount);
  },

  // Client Actions
  getClients: async (): Promise<BillingClient[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('billing_clients').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          localStore.clients = data;
          return data;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.clients;
  },

  getClientById: async (id: string): Promise<BillingClient | undefined> => {
    const clients = await db.getClients();
    return clients.find(c => c.id === id);
  },

  createClient: async (client: Omit<BillingClient, 'id' | 'status'>): Promise<BillingClient> => {
    const newClient: BillingClient = {
      ...client,
      id: generateUUID(),
      status: 'active'
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('billing_clients').insert(newClient);
      if (error) throw new Error(`Cloud client create failed: ${error.message}`);
    }

    const list = localStore.clients;
    list.push(newClient);
    localStore.clients = list;

    const user = await db.getCurrentUser();
    await db.notifyAction({
      sender_name: user?.full_name || 'System',
      sender_role: user?.role_name || 'Super Admin',
      title: `New Client Registered: ${newClient.company_name || newClient.contact_person}`,
      message: `Corporate client ${newClient.company_name} registered under ${newClient.preferred_currency} billing.`,
      category: 'client_added',
      target_roles: ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
      link_url: `/billing/clients/${newClient.id}`
    });

    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'create_client', 'clients', newClient.id, null, newClient);
    return newClient;
  },

  updateClient: async (id: string, updates: Partial<BillingClient>): Promise<BillingClient> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('billing_clients')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw new Error(`Cloud client update failed: ${error.message}`);
    }

    const list = localStore.clients;
    const idx = list.findIndex(c => c.id === id);
    if (idx !== -1) {
      const updated = { ...list[idx], ...updates };
      list[idx] = updated;
      localStore.clients = list;
    }

    const user = await db.getCurrentUser();
    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'update_client', 'clients', id, null, updates);
    return localStore.clients.find(c => c.id === id) || (updates as BillingClient);
  },

  // Invoice Actions
  getInvoices: async (): Promise<Invoice[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('invoices').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          localStore.invoices = data;
          return data;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.invoices;
  },

  getInvoiceById: async (id: string): Promise<Invoice | undefined> => {
    const list = await db.getInvoices();
    return list.find(i => i.id === id);
  },

  getInvoiceByToken: async (token: string): Promise<Invoice | undefined> => {
    const list = await db.getInvoices();
    const cleanToken = token.trim();
    return list.find(i => 
      i.secure_token === cleanToken || 
      i.id === cleanToken || 
      i.invoice_number === cleanToken ||
      (i.secure_token && (i.secure_token.includes(cleanToken) || cleanToken.includes(i.secure_token))) ||
      (i.id && cleanToken.includes(i.id))
    );
  },

  getInvoiceItems: async (invoiceId: string): Promise<InvoiceItem[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('invoice_items').select('*').eq('invoice_id', invoiceId).order('sort_order', { ascending: true });
        if (!error && data) {
          return data;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.items.filter(item => item.invoice_id === invoiceId);
  },

  getSnapshotByInvoiceId: async (invoiceId: string): Promise<InvoiceSnapshot | undefined> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('invoice_snapshots').select('*').eq('invoice_id', invoiceId).single();
        if (!error && data) {
          return data;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.snapshots.find(s => s.invoice_id === invoiceId);
  },

  createInvoice: async (
    invoice: Omit<Invoice, 'id' | 'secure_token' | 'invoice_number' | 'status' | 'created_at' | 'updated_at' | 'pdf_file_url' | 'pdf_generated_at' | 'approved_by' | 'approved_at'>,
    items: Omit<InvoiceItem, 'id' | 'invoice_id'>[]
  ): Promise<Invoice> => {
    const user = await db.getCurrentUser();
    const entities = await db.getEntities();
    let entityId = invoice.entity_id;
    const matchedEntity = entities.find(e => e.id === entityId) || entities.find(e => (invoice.currency === 'USD' ? e.entity_code === 'CLLC' : e.entity_code === 'CLTD')) || entities[0];
    if (matchedEntity) {
      entityId = matchedEntity.id;
    }

    const newInvoice: Invoice = {
      ...invoice,
      entity_id: entityId,
      id: generateUUID(),
      secure_token: generateUUID(),
      invoice_number: null,
      status: 'draft',
      created_by: user?.id || '00000000-0000-0000-0000-000000000001',
      approved_by: null,
      approved_at: null,
      pdf_file_url: null,
      pdf_generated_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const newItems: InvoiceItem[] = items.map((itm, index) => ({
      ...itm,
      id: generateUUID(),
      invoice_id: newInvoice.id,
      sort_order: index
    }));

    if (isSupabaseConfigured && supabase) {
      const { error: invErr } = await supabase.from('invoices').insert(newInvoice);
      if (invErr) throw new Error(`Cloud invoice create failed: ${invErr.message}`);
      if (newItems.length > 0) {
        const { error: itemErr } = await supabase.from('invoice_items').insert(newItems);
        if (itemErr) console.warn('Cloud invoice items insert warning:', itemErr);
      }
    }

    // Save invoice in localStore cache
    const invoicesList = localStore.invoices;
    invoicesList.push(newInvoice);
    localStore.invoices = invoicesList;

    // Save items in localStore cache
    const itemsList = localStore.items;
    itemsList.push(...newItems);
    localStore.items = itemsList;

    const clients = await db.getClients();
    const clientsList = await db.getClients(); const clientObj = clientsList.find(c => c.id === newInvoice.client_id);
    const clientName = clientObj ? (clientObj.company_name || clientObj.contact_person) : 'Client';
    await db.notifyAction({
      sender_name: user?.full_name || 'System',
      sender_role: user?.role_name || 'Super Admin',
      title: `New Invoice Created: ${newInvoice.project_name || 'Draft'}`,
      message: `Invoice draft generated for ${clientName} (${newInvoice.currency}). Access detail page to review.`,
      category: 'invoice_created',
      target_roles: ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
      link_url: `/billing/invoices/${newInvoice.id}`
    });

    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'create_invoice', 'invoices', newInvoice.id, null, newInvoice);
    return newInvoice;
  },

  updateInvoice: async (
    id: string,
    updates: Partial<Invoice>,
    items?: Omit<InvoiceItem, 'id' | 'invoice_id'>[]
  ): Promise<Invoice> => {
    const invoicesList = localStore.invoices;
    const idx = invoicesList.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Invoice not found');

    const original = invoicesList[idx];
    if (original.status !== 'draft' && original.status !== 'pending_approval' && original.status !== 'rejected') {
      throw new Error('Only draft, pending_approval, or rejected invoices can be edited');
    }

    const updatedInvoice = {
      ...original,
      ...updates,
      updated_at: new Date().toISOString()
    };
    invoicesList[idx] = updatedInvoice;
    localStore.invoices = invoicesList;

    // Replace items if provided
    if (items) {
      // Remove old items
      let itemsList = localStore.items.filter(itm => itm.invoice_id !== id);
      const newItems: InvoiceItem[] = items.map((itm, index) => ({
        ...itm,
        id: `itm-${Date.now()}-${index}`,
        invoice_id: id,
        sort_order: index
      }));
      itemsList.push(...newItems);
      localStore.items = itemsList;

      // Auto-enlist & update Client Service Rates memory for this client
      const targetClientId = updatedInvoice.client_id;
      for (const itm of items) {
        if (targetClientId && itm.service_name && itm.rate > 0) {
          await db.saveClientServiceRate({
            client_id: targetClientId,
            service_name: itm.service_name,
            unit_price: itm.rate,
            unit: itm.unit || 'pcs',
            is_paid_media: itm.is_paid_media,
            usd_budget: itm.usd_amount,
            usd_rate: itm.usd_rate
          });
        }
      }
    }

    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'update_invoice', 'invoices', id, null, updates);
    return updatedInvoice;
  },

  submitForApproval: async (id: string): Promise<Invoice> => {
    const list = localStore.invoices;
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Invoice not found');

    const prevStatus = list[idx].status;
    list[idx].status = 'pending_approval';
    localStore.invoices = list;

    const user = await db.getCurrentUser();
    const inv = list[idx];
    await db.notifyAction({
      sender_name: user.full_name,
      sender_role: user.role_name,
      title: `Invoice Approval Requested: ${inv.project_name}`,
      message: `Invoice #${inv.invoice_number || inv.id} has been submitted for management review and final approval.`,
      category: 'approval_required',
      target_roles: ['Super Admin', 'Finance Admin'],
      link_url: `/billing/invoices/${id}`
    });

    db.logAudit(user.id, 'submit_approval', 'invoices', id, { status: prevStatus }, { status: 'pending_approval' });
    return list[idx];
  },

  rejectInvoice: async (id: string, reason?: string): Promise<Invoice> => {
    if (isSupabaseConfigured && supabase) {
      const existing = localStore.invoices.find(i => i.id === id);
      const existingNote = existing?.internal_note || '';
      const updatedNote = reason?.trim() 
        ? (existingNote ? `${existingNote}\n[Rejection Reason]: ${reason.trim()}` : `[Rejection Reason]: ${reason.trim()}`)
        : existingNote;

      const { error } = await supabase
        .from('invoices')
        .update({
          status: 'rejected',
          internal_note: updatedNote || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      if (error) throw new Error(`Cloud invoice rejection failed: ${error.message}`);
    }

    const list = localStore.invoices;
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Invoice not found');
    const originalStatus = list[idx].status;
    list[idx].status = 'rejected';
    if (reason && reason.trim()) {
      const existingNote = list[idx].internal_note || '';
      list[idx].internal_note = existingNote ? `${existingNote}\n[Rejection Reason]: ${reason.trim()}` : `[Rejection Reason]: ${reason.trim()}`;
    }
    localStore.invoices = list;

    const user = await db.getCurrentUser();
    const inv = list[idx];
    await db.notifyAction({
      sender_name: user?.full_name || 'System',
      sender_role: user?.role_name || 'Super Admin',
      title: `Invoice Rejected: ${inv.project_name}`,
      message: `Invoice for ${inv.project_name} was rejected during review.${reason ? ` Reason: ${reason}` : ''}`,
      category: 'approval_required',
      target_roles: ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
      link_url: `/billing/invoices/${id}`
    });

    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'reject_invoice', 'invoices', id, { status: originalStatus }, { status: 'rejected', reason });
    return list[idx];
  },

  deleteInvoice: async (id: string): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('invoice_items').delete().eq('invoice_id', id);
      await supabase.from('invoice_snapshots').delete().eq('invoice_id', id);
      const { error } = await supabase.from('invoices').delete().eq('id', id);
      if (error) throw new Error(`Cloud invoice delete failed: ${error.message}`);
    }

    const list = localStore.invoices;
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Invoice not found');

    const inv = list[idx];
    if (inv.status !== 'draft' && inv.status !== 'rejected') {
      throw new Error('Only draft or rejected invoices can be deleted');
    }

    localStore.invoices = list.filter(i => i.id !== id);
    localStore.items = localStore.items.filter(itm => itm.invoice_id !== id);

    const user = await db.getCurrentUser();
    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'delete_invoice', 'invoices', id, inv, null);
  },

  approveInvoice: async (id: string): Promise<Invoice> => {
    const invoicesList = localStore.invoices;
    const idx = invoicesList.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Invoice not found');

    const invoice = invoicesList[idx];
    const user = await db.getCurrentUser();

    // 1. Generate serial invoice number
    const entity = localStore.entities.find(e => e.id === invoice.entity_id);
    if (!entity) throw new Error('Entity not found');
    
    const year = parseInt(invoice.issue_date.split('-')[0]) || new Date().getFullYear();
    const entityPrefix = entity.entity_code;

    // Get sequence count from cloud first
    let nextSeq = 1;
    if (isSupabaseConfigured && supabase) {
      const { count, error: countErr } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true })
        .eq('entity_id', invoice.entity_id)
        .not('invoice_number', 'is', null);
      if (!countErr && count !== null) {
        nextSeq = count + 1;
      }
    } else {
      const sequenceKey = `${entityPrefix}_${year}`;
      nextSeq = Number(localStorage.getItem(`billing_seq_${sequenceKey}`) || '0') + 1;
      localStorage.setItem(`billing_seq_${sequenceKey}`, nextSeq.toString());
    }

    const serialStr = nextSeq.toString().padStart(4, '0');
    const invoiceNumber = `${entityPrefix}-${invoice.currency}-${year}-${serialStr}`;

    // 2. Compute static calculations
    const items = await db.getInvoiceItems(id);
    const clients = await db.getClients(); const client = clients.find(c => c.id === invoice.client_id);
    const banks = await db.getBankAccounts(); const bank = banks.find(b => b.entity_id === invoice.entity_id && b.is_active);

    const totals = calculateTotals({
      items,
      discountType: invoice.discount_type,
      discountValue: invoice.discount_value,
      vatRate: invoice.vat_rate,
      vatInclusive: invoice.vat_inclusive,
      payments: []
    });

    // 3. Store static snapshot
    const newSnapshot: InvoiceSnapshot = {
      invoice_id: id,
      entity_snapshot: entity,
      bank_snapshot: bank || {},
      client_snapshot: client || { company_name: 'Fictional Client', contact_person: 'Fictional Client' } as any,
      totals_snapshot: {
        subtotal: totals.subtotal,
        discount_amount: totals.discountAmount,
        total_payable: totals.totalPayable,
        amount_paid: 0,
        amount_due: totals.totalPayable
      }
    };

    if (isSupabaseConfigured && supabase) {
      const { error: invErr } = await supabase
        .from('invoices')
        .update({
          status: 'approved',
          invoice_number: invoiceNumber,
          approved_by: user?.id || '00000000-0000-4000-8000-000000000000',
          approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      if (invErr) throw new Error(`Cloud invoice approval failed: ${invErr.message}`);

      const { error: snapErr } = await supabase
        .from('invoice_snapshots')
        .insert({
          invoice_id: newSnapshot.invoice_id,
          entity_snapshot: newSnapshot.entity_snapshot,
          bank_snapshot: newSnapshot.bank_snapshot,
          client_snapshot: newSnapshot.client_snapshot,
          totals_snapshot: newSnapshot.totals_snapshot
        });
      if (snapErr) console.warn('Cloud snapshot insert warning:', snapErr);
    }

    const snapshotsList = localStore.snapshots;
    snapshotsList.push(newSnapshot);
    localStore.snapshots = snapshotsList;

    // 4. Update Invoice Status
    invoice.status = 'approved';
    invoice.invoice_number = invoiceNumber;
    invoice.approved_by = user?.id || '00000000-0000-4000-8000-000000000000';
    invoice.approved_at = new Date().toISOString();
    localStore.invoices = invoicesList;

    await db.notifyAction({
      sender_name: user?.full_name || 'System',
      sender_role: user?.role_name || 'Super Admin',
      title: `Invoice Approved: ${invoiceNumber}`,
      message: `Invoice ${invoiceNumber} for ${invoice.project_name} has been approved and sequence locked.`,
      category: 'invoice_approved',
      target_roles: ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
      link_url: `/billing/invoices/${id}`
    });

    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'approve_invoice', 'invoices', id, null, { status: 'approved', number: invoiceNumber });
    return invoice;
  },

  voidInvoice: async (id: string): Promise<Invoice> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('invoices')
        .update({ status: 'void', updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw new Error(`Cloud void invoice failed: ${error.message}`);
    }

    const list = localStore.invoices;
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Invoice not found');

    const originalStatus = list[idx].status;
    list[idx].status = 'void';
    localStore.invoices = list;

    const user = await db.getCurrentUser();
    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'void_invoice', 'invoices', id, { status: originalStatus }, { status: 'void' });
    return list[idx];
  },

  // Payment Actions
  getPayments: async (): Promise<Payment[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('invoice_payments').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          localStore.payments = data;
          return data;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.payments;
  },

  getPaymentsForInvoice: async (invoiceId: string): Promise<Payment[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('invoice_payments').select('*').eq('invoice_id', invoiceId).order('created_at', { ascending: false });
        if (!error && data) {
          return data;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.payments.filter(p => p.invoice_id === invoiceId);
  },

  getTaxPayments: async (): Promise<TaxPayment[]> => {
    return localStore.taxPayments;
  },

  recordTaxPayment: async (payment: Omit<TaxPayment, 'id' | 'created_at'>): Promise<TaxPayment> => {
    const list = localStore.taxPayments;
    const user = await db.getCurrentUser();
    const newPayment: TaxPayment = {
      ...payment,
      id: generateUUID(),
      created_at: new Date().toISOString()
    };
    list.push(newPayment);
    localStore.taxPayments = list;

    await db.notifyAction({
      sender_name: user?.full_name || 'System',
      sender_role: user?.role_name || 'Super Admin',
      title: `Treasury Tax Payment Recorded: ৳${payment.amount.toLocaleString()}`,
      message: `Challan #${payment.challan_number} tax payment recorded for ${payment.tax_type}.`,
      category: 'tax_recorded',
      target_roles: ['Super Admin', 'Finance Admin'],
      link_url: `/billing/tax`
    });

    db.logAudit(payment.recorded_by, 'record_tax_payment', 'tax', newPayment.id, null, newPayment);
    return newPayment;
  },

  getExpenses: async (): Promise<Expense[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('expenses').select('*').order('expense_date', { ascending: false });
        if (!error && data && data.length > 0) {
          localStore.expenses = data;
          return data;
        }
      } catch (e: any) { throw new Error(e.message || String(e)); }
    }
    return localStore.expenses;
  },

  addExpense: async (expense: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> => {
    const entities = await db.getEntities();
    let entityId = expense.entity_id;
    const matchedEntity = entities.find(e => e.id === entityId) || entities.find(e => (expense.currency === 'USD' ? e.entity_code === 'CLLC' : e.entity_code === 'CLTD')) || entities[0];
    if (matchedEntity) {
      entityId = matchedEntity.id;
    }

    const newExpense: Expense = {
      ...expense,
      entity_id: entityId,
      id: generateUUID(),
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('expenses').insert(newExpense);
      if (error) throw new Error(`Cloud expense create failed: ${error.message}`);
    }

    const list = localStore.expenses;
    list.push(newExpense);
    localStore.expenses = list;
    db.logAudit(expense.recorded_by, 'add_expense', 'expenses', newExpense.id, null, newExpense);
    return newExpense;
  },

  deleteExpense: async (id: string): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('expenses').delete().eq('id', id);
      if (error) throw new Error(`Cloud expense delete failed: ${error.message}`);
    }
    const list = localStore.expenses.filter(e => e.id !== id);
    localStore.expenses = list;
  },

  recordPayment: async (payment: Omit<Payment, 'id' | 'receipt_number' | 'created_at'>): Promise<Payment> => {
    const list = localStore.payments;
    const user = await db.getCurrentUser();

    // Generate receipt number e.g. CLTD-REC-2026-0001
    const invoice = localStore.invoices.find(i => i.id === payment.invoice_id);
    if (!invoice) throw new Error('Invoice not found');

    const entity = localStore.entities.find(e => e.id === invoice.entity_id);
    if (!entity) throw new Error('Entity not found');

    const year = new Date(payment.payment_date).getFullYear();
    const receiptPrefix = entity.receipt_prefix;

    // Get sequence count from cloud first
    let nextSeq = 1;
    if (isSupabaseConfigured && supabase) {
      const { count, error: countErr } = await supabase
        .from('invoice_payments')
        .select('*', { count: 'exact', head: true })
        .not('receipt_number', 'is', null);
      if (!countErr && count !== null) {
        nextSeq = count + 1;
      }
    } else {
      const sequenceKey = `rec_${receiptPrefix}_${year}`;
      nextSeq = Number(localStorage.getItem(`billing_seq_${sequenceKey}`) || '0') + 1;
      localStorage.setItem(`billing_seq_${sequenceKey}`, nextSeq.toString());
    }

    const serialStr = nextSeq.toString().padStart(4, '0');
    const receiptNumber = `${receiptPrefix}-${year}-${serialStr}`;

    const newPayment: Payment = {
      ...payment,
      id: generateUUID(),
      receipt_number: receiptNumber,
      created_at: new Date().toISOString()
    };

    const totals = calculateTotals({
      items: localStore.items.filter(itm => itm.invoice_id === invoice.id),
      discountType: invoice.discount_type,
      discountValue: invoice.discount_value,
      vatRate: invoice.vat_rate,
      vatInclusive: invoice.vat_inclusive,
      payments: [...list.filter(p => p.invoice_id === invoice.id), newPayment]
    });

    const reserveSettings = localStore.reserveSettings;
    const reservePct = reserveSettings ? reserveSettings.reserve_percentage : 20.00;
    const allocatedReserveAmount = Math.round((newPayment.amount * (reservePct / 100)) * 100) / 100;

    if (isSupabaseConfigured && supabase) {
      const { error: payErr } = await supabase.from('invoice_payments').insert(newPayment);
      if (payErr) throw new Error(`Cloud payment record failed: ${payErr.message}`);

      // Update invoice status
      const { error: invErr } = await supabase
        .from('invoices')
        .update({
          status: totals.amountDue === 0 ? 'paid' : 'partially_paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', payment.invoice_id);
      if (invErr) console.warn('Cloud invoice status update warning:', invErr);

      // Update snapshot totals
      const { error: snapErr } = await supabase
        .from('invoice_snapshots')
        .update({ totals_snapshot: {
          subtotal: totals.subtotal,
          discount_amount: totals.discountAmount,
          total_payable: totals.totalPayable,
          amount_paid: totals.amountPaid,
          amount_due: totals.amountDue
        }})
        .eq('invoice_id', payment.invoice_id);
      if (snapErr) console.warn('Cloud snapshot update warning:', snapErr);

      // Save automatic reserve transaction
      if (allocatedReserveAmount > 0) {
        const reserveTxn: ReserveLedgerEntry = {
          id: generateUUID(),
          entity_id: invoice.entity_id || '11111111-1111-1111-1111-111111111111',
          currency: newPayment.currency,
          transaction_type: 'AUTOMATIC_RESERVE_ALLOCATION',
          amount: allocatedReserveAmount,
          source: 'CLIENT_PAYMENT',
          payment_id: newPayment.id,
          invoice_id: invoice.id,
          client_id: invoice.client_id,
          deposit_date: newPayment.payment_date,
          reason: `${reservePct}% Automatic emergency reserve allocation from payment (Receipt #${newPayment.receipt_number})`,
          status: 'COMPLETED',
          created_by: 'SYSTEM',
          created_at: new Date().toISOString()
        };
        const { error: resErr } = await supabase.from('reserve_ledger').insert(reserveTxn);
        if (resErr) console.warn('Cloud reserve ledger allocation warning:', resErr);
      }
    }

    list.push(newPayment);
    localStore.payments = list;

    // Update invoice total paid state locally
    const invoices = localStore.invoices;
    const invIdx = invoices.findIndex(i => i.id === payment.invoice_id);
    if (invIdx !== -1) {
      invoices[invIdx].status = totals.amountDue === 0 ? 'paid' : 'partially_paid';
      localStore.invoices = invoices;

      // Update snapshot totals locally
      const snapshots = localStore.snapshots;
      const snapIdx = snapshots.findIndex(s => s.invoice_id === invoice.id);
      if (snapIdx !== -1) {
        snapshots[snapIdx].totals_snapshot.amount_paid = totals.amountPaid;
        snapshots[snapIdx].totals_snapshot.amount_due = totals.amountDue;
        localStore.snapshots = snapshots;
      }
    }

    // AUTOMATIC RESERVE ALLOCATION LOCALLY
    const reserveLedgerList = localStore.reserveLedger;
    const existingAllocation = reserveLedgerList.find(r => r.payment_id === newPayment.id);
    if (!existingAllocation && allocatedReserveAmount > 0) {
      const reserveTxn: ReserveLedgerEntry = {
        id: `res-tx-${Date.now()}`,
        entity_id: invoice.entity_id || '11111111-1111-1111-1111-111111111111',
        currency: newPayment.currency,
        transaction_type: 'AUTOMATIC_RESERVE_ALLOCATION',
        amount: allocatedReserveAmount,
        source: 'CLIENT_PAYMENT',
        payment_id: newPayment.id,
        invoice_id: invoice.id,
        client_id: invoice.client_id,
        deposit_date: newPayment.payment_date,
        reason: `${reservePct}% Automatic emergency reserve allocation from payment (Receipt #${newPayment.receipt_number})`,
        status: 'COMPLETED',
        created_by: 'SYSTEM',
        created_at: new Date().toISOString()
      };
      reserveLedgerList.unshift(reserveTxn);
      localStore.reserveLedger = reserveLedgerList;

      await db.logFinancialAudit({
        user_id: user?.id || '00000000-0000-4000-8000-000000000000',
        user_role: user?.role_name || 'Super Admin',
        action: 'AUTOMATIC_RESERVE_ALLOCATION',
        module: 'RESERVE_SAVINGS',
        record_id: reserveTxn.id,
        previous_value: null,
        new_value: { payment_id: newPayment.id, allocated_amount: allocatedReserveAmount, reserve_percentage: reservePct }
      });
    }

    await db.notifyAction({
      sender_name: user?.full_name || 'System',
      sender_role: user?.role_name || 'Super Admin',
      title: `Payment Recorded: ${newPayment.currency} ${newPayment.amount.toLocaleString()}`,
      message: `Payment received for ${invoice.invoice_number || invoice.id} via ${newPayment.payment_method} (Receipt #${newPayment.receipt_number}). ${reservePct}% allocated to Emergency Reserve.`,
      category: 'payment_recorded',
      target_roles: ['Super Admin', 'Finance Admin', 'Client Service'],
      link_url: `/billing/invoices/${invoice.id}`
    });

    db.logAudit(user?.id || '00000000-0000-4000-8000-000000000000', 'record_payment', 'payments', newPayment.id, null, newPayment);
    return newPayment;
  },

  // Reserve Settings Actions
  getReserveSettings: async (): Promise<ReserveSettings> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('reserve_settings').select('*').limit(1).maybeSingle();
      if (!error && data) {
        localStore.reserveSettings = data;
        return data;
      }
    }
    return localStore.reserveSettings;
  },

  updateReserveSettings: async (updates: Partial<ReserveSettings>, reason: string, user: Profile): Promise<ReserveSettings> => {
    const prev = localStore.reserveSettings;
    const updated: ReserveSettings = {
      ...prev,
      ...updates,
      updated_by: user.id,
      updated_at: new Date().toISOString()
    };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('reserve_settings').upsert({ ...updated, id: updated.id || '11111111-0000-4000-8000-000000000000' });
      if (error) throw new Error(`Failed to update reserve settings: ${error.message}`);
    }
    
    localStore.reserveSettings = updated;

    if (updates.reserve_percentage !== undefined && updates.reserve_percentage !== prev.reserve_percentage) {
      const historyEntry = {
        id: `rsh-${Date.now()}`,
        previous_percentage: prev.reserve_percentage,
        new_percentage: updates.reserve_percentage,
        changed_by: `${user.full_name} (${user.role_name})`,
        effective_date: new Date().toISOString().split('T')[0],
        reason: reason || 'Updated reserve allocation policy',
        created_at: new Date().toISOString()
      };
      
      if (isSupabaseConfigured && supabase) {
        const { error: histErr } = await supabase.from('reserve_settings_history').insert(historyEntry);
        if (histErr) console.warn('Failed to save reserve history to cloud:', histErr);
      }
      
      const historyList = localStore.reserveSettingsHistory;
      historyList.unshift(historyEntry);
      localStore.reserveSettingsHistory = historyList;

      await db.logFinancialAudit({
        user_id: user.id,
        user_role: user.role_name,
        action: 'UPDATE_RESERVE_PERCENTAGE',
        module: 'RESERVE_SAVINGS',
        record_id: '11111111-0000-4000-8000-000000000000',
        previous_value: { reserve_percentage: prev.reserve_percentage },
        new_value: { reserve_percentage: updates.reserve_percentage, reason }
      });
    }
    return updated;
  },

  getReserveSettingsHistory: async (): Promise<ReserveSettingsHistory[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('reserve_settings_history').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        localStore.reserveSettingsHistory = data;
        return data;
      }
    }
    return localStore.reserveSettingsHistory;
  },

  // Reserve Ledger Actions
  getReserveLedger: async (): Promise<ReserveLedgerEntry[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('reserve_ledger').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        localStore.reserveLedger = data;
        return data;
      }
    }
    return localStore.reserveLedger;
  },

  addReserveLedgerEntry: async (entry: Omit<ReserveLedgerEntry, 'id' | 'created_at'>, user: Profile): Promise<ReserveLedgerEntry> => {
    const list = localStore.reserveLedger;
    const newEntry: ReserveLedgerEntry = {
      ...entry,
      id: generateUUID(),
      created_at: new Date().toISOString()
    };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('reserve_ledger').insert(newEntry);
      if (error) throw new Error(`Failed to add reserve ledger entry: ${error.message}`);
    }
    
    list.unshift(newEntry);
    localStore.reserveLedger = list;

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'ADD_RESERVE_LEDGER_ENTRY',
      module: 'RESERVE_SAVINGS',
      record_id: newEntry.id,
      previous_value: null,
      new_value: newEntry
    });
    return newEntry;
  },

  // FDR Management Actions
  getFdrAccounts: async (): Promise<FdrAccount[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('fdr_accounts').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        localStore.fdrAccounts = data;
        return data;
      }
    }
    return localStore.fdrAccounts;
  },

  createFdrAccount: async (fdr: Omit<FdrAccount, 'id' | 'created_at'>, user: Profile): Promise<FdrAccount> => {
    const list = localStore.fdrAccounts;
    const newFdr: FdrAccount = {
      ...fdr,
      id: generateUUID(),
      created_at: new Date().toISOString()
    };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('fdr_accounts').insert(newFdr);
      if (error) throw new Error(`Failed to create FDR account: ${error.message}`);
    }
    
    list.unshift(newFdr);
    localStore.fdrAccounts = list;

    // Create corresponding TRANSFER_TO_FDR transaction in Reserve Ledger
    await db.addReserveLedgerEntry({
      entity_id: newFdr.entity_id,
      currency: newFdr.currency,
      transaction_type: 'TRANSFER_TO_FDR',
      amount: newFdr.principal_amount,
      source: newFdr.funding_source,
      deposit_date: newFdr.start_date,
      destination_account: `${newFdr.bank_name} - ${newFdr.fdr_reference_number}`,
      reason: `Internal asset transfer: Created FDR #${newFdr.fdr_reference_number} at ${newFdr.bank_name}`,
      status: 'COMPLETED',
      created_by: user.full_name,
      approved_by: user.full_name
    }, user);

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'CREATE_FDR_ACCOUNT',
      module: 'RESERVE_SAVINGS',
      record_id: newFdr.id,
      previous_value: null,
      new_value: newFdr
    });
    return newFdr;
  },

  updateFdrAccount: async (id: string, updates: Partial<FdrAccount>, user: Profile): Promise<FdrAccount> => {
    const list = localStore.fdrAccounts;
    const idx = list.findIndex(f => f.id === id);
    if (idx === -1) throw new Error('FDR account not found');

    const prev = list[idx];
    const updated = { ...prev, ...updates };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('fdr_accounts').update(updates).eq('id', id);
      if (error) throw new Error(`Failed to update FDR account: ${error.message}`);
    }
    
    list[idx] = updated;
    localStore.fdrAccounts = list;

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'UPDATE_FDR_ACCOUNT',
      module: 'RESERVE_SAVINGS',
      record_id: id,
      previous_value: prev,
      new_value: updated
    });
    return updated;
  },

  recordFdrMaturity: async (id: string, actualNetValue: number, action: 'CLOSE' | 'RENEW', renewalNotes: string, user: Profile): Promise<FdrAccount> => {
    const list = localStore.fdrAccounts;
    const idx = list.findIndex(f => f.id === id);
    if (idx === -1) throw new Error('FDR account not found');

    const fdr = list[idx];
    fdr.actual_maturity_value = actualNetValue;
    fdr.status = action === 'RENEW' ? 'RENEWED' : 'CLOSED';
    fdr.notes = renewalNotes ? `${fdr.notes || ''} | Maturity notes: ${renewalNotes}` : fdr.notes;
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('fdr_accounts').update({
        actual_maturity_value: fdr.actual_maturity_value,
        status: fdr.status,
        notes: fdr.notes
      }).eq('id', id);
      if (error) throw new Error(`Failed to record FDR maturity: ${error.message}`);
    }
    
    list[idx] = fdr;
    localStore.fdrAccounts = list;

    // Record maturity proceeds entry in Reserve Ledger
    await db.addReserveLedgerEntry({
      entity_id: fdr.entity_id,
      currency: fdr.currency,
      transaction_type: action === 'RENEW' ? 'RENEWAL' : 'MATURITY_PROCEEDS',
      amount: actualNetValue,
      source: `${fdr.bank_name} FDR #${fdr.fdr_reference_number}`,
      deposit_date: new Date().toISOString().split('T')[0],
      reason: `FDR ${action === 'RENEW' ? 'Renewal' : 'Maturity'} proceeds realized. Net amount: ${fdr.currency} ${actualNetValue.toLocaleString()}`,
      status: 'COMPLETED',
      created_by: user.full_name,
      approved_by: user.full_name
    }, user);

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: action === 'RENEW' ? 'RENEW_FDR' : 'CLOSE_FDR',
      module: 'RESERVE_SAVINGS',
      record_id: id,
      previous_value: { status: 'ACTIVE' },
      new_value: { status: fdr.status, actual_maturity_value: actualNetValue }
    });

    return fdr;
  },

  deleteFdrAccount: async (id: string, user: Profile): Promise<void> => {
    const list = localStore.fdrAccounts;
    const fdr = list.find(f => f.id === id);
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('fdr_accounts').delete().eq('id', id);
      if (error) throw new Error(`Failed to delete FDR account: ${error.message}`);
    }
    
    localStore.fdrAccounts = list.filter(f => f.id !== id);

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'DELETE_FDR_ACCOUNT',
      module: 'RESERVE_SAVINGS',
      record_id: id,
      previous_value: fdr,
      new_value: null
    });
  },

  // DPS Management Actions
  getDpsAccounts: async (): Promise<DpsAccount[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('dps_accounts').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        localStore.dpsAccounts = data;
        return data;
      }
    }
    return localStore.dpsAccounts;
  },

  getDpsInstallments: async (dpsId?: string): Promise<DpsInstallment[]> => {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('dps_installments').select('*').order('installment_number', { ascending: true });
      if (dpsId) query = query.eq('dps_account_id', dpsId);
      const { data, error } = await query;
      if (!error && data) {
        if (dpsId) {
          const others = localStore.dpsInstallments.filter(i => i.dps_account_id !== dpsId);
          localStore.dpsInstallments = [...others, ...data];
        } else {
          localStore.dpsInstallments = data;
        }
        return data;
      }
    }
    
    const list = localStore.dpsInstallments;
    if (dpsId) return list.filter(i => i.dps_account_id === dpsId);
    return list;
  },

  createDpsAccount: async (dps: Omit<DpsAccount, 'id' | 'created_at'>, user: Profile): Promise<DpsAccount> => {
    const list = localStore.dpsAccounts;
    const newDps: DpsAccount = {
      ...dps,
      id: generateUUID(),
      created_at: new Date().toISOString()
    };

    // Automatically generate installment schedules
    const installments: DpsInstallment[] = [];
    let currDate = new Date(newDps.start_date);
    for (let i = 1; i <= newDps.total_installments; i++) {
      installments.push({
        id: generateUUID(),
        dps_account_id: newDps.id,
        installment_number: i,
        due_date: currDate.toISOString().split('T')[0],
        amount: newDps.installment_amount,
        status: i === 1 ? 'PAID' : 'PENDING',
        paid_date: i === 1 ? newDps.start_date : undefined,
        transaction_reference: i === 1 ? `INIT-DEPOSIT-${newDps.id}` : undefined,
        late_fee: 0,
        created_at: new Date().toISOString()
      });
      // Increment next month
      currDate.setMonth(currDate.getMonth() + 1);
    }

    if (isSupabaseConfigured && supabase) {
      const { error: dpsErr } = await supabase.from('dps_accounts').insert(newDps);
      if (dpsErr) throw new Error(`Failed to create DPS account: ${dpsErr.message}`);
      
      const { error: instErr } = await supabase.from('dps_installments').insert(installments);
      if (instErr) console.warn('Cloud DPS installments insert warning:', instErr);
    }
    
    list.unshift(newDps);
    localStore.dpsAccounts = list;

    const allInstallments = localStore.dpsInstallments;
    allInstallments.unshift(...installments);
    localStore.dpsInstallments = allInstallments;

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'CREATE_DPS_ACCOUNT',
      module: 'RESERVE_SAVINGS',
      record_id: newDps.id,
      previous_value: null,
      new_value: newDps
    });

    return newDps;
  },

  payDpsInstallment: async (installmentId: string, txnRef: string, paidFrom: string, user: Profile): Promise<DpsInstallment> => {
    const installments = localStore.dpsInstallments;
    const idx = installments.findIndex(i => i.id === installmentId);
    if (idx === -1) throw new Error('Installment not found');

    const inst = installments[idx];
    inst.status = 'PAID';
    inst.paid_date = new Date().toISOString().split('T')[0];
    inst.transaction_reference = txnRef;
    inst.paid_from_account = paidFrom;
    inst.verified_by = user.full_name;
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('dps_installments').update({
        status: inst.status,
        paid_date: inst.paid_date,
        transaction_reference: inst.transaction_reference,
        paid_from_account: inst.paid_from_account,
        verified_by: inst.verified_by
      }).eq('id', installmentId);
      if (error) throw new Error(`Failed to update DPS installment: ${error.message}`);
    }
    
    installments[idx] = inst;
    localStore.dpsInstallments = installments;

    // Update parent DPS account deposited amount and count
    const dpsList = localStore.dpsAccounts;
    const dpsIdx = dpsList.findIndex(d => d.id === inst.dps_account_id);
    if (dpsIdx !== -1) {
      const dps = dpsList[dpsIdx];
      dps.paid_installments = (dps.paid_installments || 0) + 1;
      dps.remaining_installments = Math.max(0, dps.total_installments - dps.paid_installments);
      dps.total_deposited_amount = (dps.total_deposited_amount || 0) + inst.amount;

      // Update next installment date
      const nextPending = installments.find(i => i.dps_account_id === dps.id && i.status === 'PENDING');
      if (nextPending) dps.next_installment_date = nextPending.due_date;
      
      if (isSupabaseConfigured && supabase) {
        const { error: updDps } = await supabase.from('dps_accounts').update({
          paid_installments: dps.paid_installments,
          remaining_installments: dps.remaining_installments,
          total_deposited_amount: dps.total_deposited_amount,
          next_installment_date: dps.next_installment_date
        }).eq('id', dps.id);
        if (updDps) console.warn('Failed to update DPS account totals:', updDps.message);
      }
      
      dpsList[dpsIdx] = dps;
      localStore.dpsAccounts = dpsList;

      // Create ledger transfer entry
      await db.addReserveLedgerEntry({
        entity_id: dps.entity_id,
        currency: dps.currency,
        transaction_type: 'TRANSFER_TO_DPS',
        amount: inst.amount,
        source: paidFrom || 'COMPANY_RESERVE',
        deposit_date: inst.paid_date,
        destination_account: `${dps.bank_name} DPS #${dps.dps_account_number}`,
        reason: `Paid DPS Installment #${inst.installment_number} of ${dps.total_installments}`,
        status: 'COMPLETED',
        created_by: user.full_name
      }, user);
    }

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'PAY_DPS_INSTALLMENT',
      module: 'RESERVE_SAVINGS',
      record_id: installmentId,
      previous_value: { status: 'PENDING' },
      new_value: inst
    });

    return inst;
  },

  updateDpsAccount: async (id: string, updates: Partial<DpsAccount>, user: Profile): Promise<DpsAccount> => {
    const list = localStore.dpsAccounts;
    const idx = list.findIndex(d => d.id === id);
    if (idx === -1) throw new Error('DPS account not found');

    const prev = list[idx];
    const updated = { ...prev, ...updates };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('dps_accounts').update(updates).eq('id', id);
      if (error) throw new Error(`Failed to update DPS account: ${error.message}`);
    }
    
    list[idx] = updated;
    localStore.dpsAccounts = list;

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'UPDATE_DPS_ACCOUNT',
      module: 'RESERVE_SAVINGS',
      record_id: id,
      previous_value: prev,
      new_value: updated
    });
    return updated;
  },

  deleteDpsAccount: async (id: string, user: Profile): Promise<void> => {
    const list = localStore.dpsAccounts;
    const dps = list.find(d => d.id === id);
    
    if (isSupabaseConfigured && supabase) {
      await supabase.from('dps_installments').delete().eq('dps_account_id', id);
      const { error } = await supabase.from('dps_accounts').delete().eq('id', id);
      if (error) throw new Error(`Failed to delete DPS account: ${error.message}`);
    }
    
    localStore.dpsAccounts = list.filter(d => d.id !== id);
    localStore.dpsInstallments = localStore.dpsInstallments.filter(i => i.dps_account_id !== id);

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'DELETE_DPS_ACCOUNT',
      module: 'RESERVE_SAVINGS',
      record_id: id,
      previous_value: dps,
      new_value: null
    });
  },

  updateReserveLedgerEntry: async (id: string, updates: Partial<ReserveLedgerEntry>, user: Profile): Promise<ReserveLedgerEntry> => {
    const list = localStore.reserveLedger;
    const idx = list.findIndex(l => l.id === id);
    if (idx === -1) throw new Error('Ledger entry not found');

    const prev = list[idx];
    const updated = { ...prev, ...updates };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('reserve_ledger').update(updates).eq('id', id);
      if (error) throw new Error(`Failed to update reserve ledger entry: ${error.message}`);
    }
    
    list[idx] = updated;
    localStore.reserveLedger = list;

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'UPDATE_RESERVE_LEDGER_ENTRY',
      module: 'RESERVE_SAVINGS',
      record_id: id,
      previous_value: prev,
      new_value: updated
    });
    return updated;
  },

  deleteReserveLedgerEntry: async (id: string, user: Profile): Promise<void> => {
    const list = localStore.reserveLedger;
    const entry = list.find(l => l.id === id);
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('reserve_ledger').delete().eq('id', id);
      if (error) throw new Error(`Failed to delete reserve ledger entry: ${error.message}`);
    }
    
    localStore.reserveLedger = list.filter(l => l.id !== id);

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'DELETE_RESERVE_LEDGER_ENTRY',
      module: 'RESERVE_SAVINGS',
      record_id: id,
      previous_value: entry,
      new_value: null
    });
  },

  // Reserve Withdrawal Requests & Approvals
  getWithdrawalRequests: async (): Promise<ReserveWithdrawalRequest[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('reserve_withdrawal_requests').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        localStore.withdrawalRequests = data;
        return data;
      }
    }
    return localStore.withdrawalRequests;
  },

  createWithdrawalRequest: async (req: Omit<ReserveWithdrawalRequest, 'id' | 'status' | 'created_at'>, user: Profile): Promise<ReserveWithdrawalRequest> => {
    const list = localStore.withdrawalRequests;
    const newReq: ReserveWithdrawalRequest = {
      ...req,
      id: generateUUID(),
      status: 'SUBMITTED',
      created_at: new Date().toISOString()
    };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('reserve_withdrawal_requests').insert(newReq);
      if (error) throw new Error(`Failed to submit withdrawal request: ${error.message}`);
    }
    
    list.unshift(newReq);
    localStore.withdrawalRequests = list;

    await db.notifyAction({
      sender_name: user.full_name,
      sender_role: user.role_name,
      title: `Reserve Withdrawal Request: ${req.currency} ${req.requested_amount.toLocaleString()}`,
      message: `Emergency reserve withdrawal submitted by ${user.full_name} for purpose: ${req.purpose}`,
      category: 'approval_required',
      target_roles: ['Super Admin'],
      link_url: `/billing/reserve`
    });

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'SUBMIT_WITHDRAWAL_REQUEST',
      module: 'RESERVE_SAVINGS',
      record_id: newReq.id,
      previous_value: null,
      new_value: newReq
    });

    return newReq;
  },

  reviewWithdrawalRequest: async (id: string, status: 'APPROVED' | 'REJECTED', comment: string, user: Profile): Promise<ReserveWithdrawalRequest> => {
    if (user.role_name !== 'Super Admin') {
      throw new Error('Only Super Admin can approve or reject reserve withdrawal requests');
    }

    const list = localStore.withdrawalRequests;
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Withdrawal request not found');

    const req = list[idx];
    req.status = status;
    req.approved_by = `${user.full_name} (${user.role_name})`;
    req.approved_at = new Date().toISOString();
    req.approval_comment = comment;
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('reserve_withdrawal_requests').update({
        status: req.status,
        approved_by: req.approved_by,
        approved_at: req.approved_at,
        approval_comment: req.approval_comment
      }).eq('id', id);
      if (error) throw new Error(`Failed to review withdrawal request: ${error.message}`);
    }
    
    list[idx] = req;
    localStore.withdrawalRequests = list;

    // If approved, create RESERVE_WITHDRAWAL transaction in Reserve Ledger
    if (status === 'APPROVED') {
      await db.addReserveLedgerEntry({
        entity_id: req.entity_id,
        currency: req.currency,
        transaction_type: 'RESERVE_WITHDRAWAL',
        amount: req.requested_amount,
        source: 'COMPANY_RESERVE',
        deposit_date: new Date().toISOString().split('T')[0],
        withdrawal_date: new Date().toISOString().split('T')[0],
        destination_account: req.destination_account || 'Operating Cash Account',
        reason: `Approved Reserve Withdrawal: ${req.purpose} (${req.detailed_reason})`,
        status: 'COMPLETED',
        created_by: req.requested_by,
        approved_by: user.full_name
      }, user);
    }

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: status === 'APPROVED' ? 'APPROVE_WITHDRAWAL' : 'REJECT_WITHDRAWAL',
      module: 'RESERVE_SAVINGS',
      record_id: id,
      previous_value: { status: 'SUBMITTED' },
      new_value: { status, approved_by: user.full_name, comment }
    });

    return req;
  },

  // Document Management & Reconciliation Actions
  getSavingsDocuments: async (): Promise<SavingsDocument[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('savings_documents').select('*').order('uploaded_at', { ascending: false });
      if (!error && data) {
        localStore.savingsDocuments = data;
        return data;
      }
    }
    return localStore.savingsDocuments;
  },

  addSavingsDocument: async (doc: Omit<SavingsDocument, 'id' | 'uploaded_at'>, user: Profile): Promise<SavingsDocument> => {
    const list = localStore.savingsDocuments;
    const newDoc: SavingsDocument = {
      ...doc,
      id: generateUUID(),
      uploaded_at: new Date().toISOString()
    };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('savings_documents').insert(newDoc);
      if (error) throw new Error(`Failed to upload savings document: ${error.message}`);
    }
    
    list.unshift(newDoc);
    localStore.savingsDocuments = list;
    return newDoc;
  },

  getFinancialReconciliations: async (): Promise<FinancialReconciliation[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('financial_reconciliations').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        localStore.financialReconciliations = data;
        return data;
      }
    }
    return localStore.financialReconciliations;
  },

  addFinancialReconciliation: async (recon: Omit<FinancialReconciliation, 'id' | 'created_at'>, user: Profile): Promise<FinancialReconciliation> => {
    const list = localStore.financialReconciliations;
    const newRecon: FinancialReconciliation = {
      ...recon,
      id: generateUUID(),
      created_at: new Date().toISOString()
    };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('financial_reconciliations').insert(newRecon);
      if (error) throw new Error(`Failed to create reconciliation: ${error.message}`);
    }
    
    list.unshift(newRecon);
    localStore.financialReconciliations = list;

    await db.logFinancialAudit({
      user_id: user.id,
      user_role: user.role_name,
      action: 'CREATE_RECONCILIATION',
      module: 'RESERVE_SAVINGS',
      record_id: newRecon.id,
      previous_value: null,
      new_value: newRecon
    });

    return newRecon;
  },

  // Financial Audit Logs
  getFinancialAuditLogs: async (): Promise<FinancialAuditLog[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('financial_audit_logs').select('*').order('timestamp', { ascending: false });
      if (!error && data) {
        localStore.financialAuditLogs = data;
        return data;
      }
    }
    return localStore.financialAuditLogs;
  },

  logFinancialAudit: async (log: Omit<FinancialAuditLog, 'id' | 'timestamp'>): Promise<FinancialAuditLog> => {
    const list = localStore.financialAuditLogs;
    const newLog: FinancialAuditLog = {
      ...log,
      id: generateUUID(),
      timestamp: new Date().toISOString()
    };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('financial_audit_logs').insert(newLog);
      if (error) console.warn('Cloud financial audit log warning:', error);
    }
    
    list.unshift(newLog);
    localStore.financialAuditLogs = list;
    return newLog;
  },

  // Reserve Dashboard Aggregated Summary Engine
  getReserveDashboardSummary: async (entityFilter?: string, currencyFilter?: 'BDT' | 'USD') => {
    const settings = localStore.reserveSettings;
    const ledger = localStore.reserveLedger;
    const fdrs = localStore.fdrAccounts;
    const dpsList = localStore.dpsAccounts;
    const installments = localStore.dpsInstallments;
    const expenses = localStore.expenses;
    const payments = localStore.payments;

    // Filter by entity & currency
    const filteredLedger = ledger.filter(l => {
      if (entityFilter && entityFilter !== 'all' && l.entity_id !== entityFilter) return false;
      if (currencyFilter && l.currency !== currencyFilter) return false;
      return l.status === 'COMPLETED';
    });

    const filteredFdrs = fdrs.filter(f => {
      if (entityFilter && entityFilter !== 'all' && f.entity_id !== entityFilter) return false;
      if (currencyFilter && f.currency !== currencyFilter) return false;
      return f.status === 'ACTIVE' || f.status === 'NEAR_MATURITY';
    });

    const filteredDps = dpsList.filter(d => {
      if (entityFilter && entityFilter !== 'all' && d.entity_id !== entityFilter) return false;
      if (currencyFilter && d.currency !== currencyFilter) return false;
      return d.status === 'ACTIVE' || d.status === 'PAYMENT_DUE';
    });

    // 1. Calculate Net Reserve Cash Balance from Ledger
    let netReserveCash = 0;
    filteredLedger.forEach(entry => {
      const type = entry.transaction_type;
      if (['AUTOMATIC_RESERVE_ALLOCATION', 'MANUAL_DEPOSIT', 'TRANSFER_FROM_FDR', 'TRANSFER_FROM_DPS', 'INTEREST_RECEIVED', 'MATURITY_PROCEEDS', 'OPENING_BALANCE'].includes(type)) {
        netReserveCash += entry.amount;
      } else if (['RESERVE_WITHDRAWAL', 'TRANSFER_TO_FDR', 'TRANSFER_TO_DPS', 'BANK_CHARGE', 'TAX_DEDUCTION', 'PENALTY', 'REFUND_ADJUSTMENT'].includes(type)) {
        netReserveCash -= entry.amount;
      }
    });

    // 2. FDR & DPS Totals
    const totalFdrPrincipal = filteredFdrs.reduce((sum, f) => sum + f.principal_amount, 0);
    const expectedFdrReturns = filteredFdrs.reduce((sum, f) => sum + (f.expected_net_maturity_value - f.principal_amount), 0);

    const totalDpsDeposited = filteredDps.reduce((sum, d) => sum + d.total_deposited_amount, 0);
    const expectedDpsReturns = filteredDps.reduce((sum, d) => sum + d.expected_interest_amount, 0);

    // Total Savings = Reserve Cash + FDR Principal + DPS Deposited
    const totalCompanySavings = netReserveCash + totalFdrPrincipal + totalDpsDeposited;

    // 3. Operating Cash Calculation (80% of Payments minus Operating Expenses)
    const filteredPayments = payments.filter(p => {
      if (currencyFilter && p.currency !== currencyFilter) return false;
      return true;
    });
    const totalReceivedPayments = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalOperatingExpenses = expenses.filter(e => (!currencyFilter || e.currency === currencyFilter)).reduce((sum, e) => sum + e.amount, 0);
    const availableOperatingCash = Math.max(0, (totalReceivedPayments * 0.80) - totalOperatingExpenses);

    // 4. Safety Target Calculation
    const targetBdt = settings.target_fixed_bdt || 5000000;
    const targetUsd = settings.target_fixed_usd || 50000;
    const activeTargetAmount = (currencyFilter === 'USD') ? targetUsd : targetBdt;

    const avgMonthlyExpense = totalOperatingExpenses > 0 ? (totalOperatingExpenses / 6) : 250000;
    const coverageMonths = avgMonthlyExpense > 0 ? (totalCompanySavings / avgMonthlyExpense) : 12;

    const targetGap = Math.max(0, activeTargetAmount - totalCompanySavings);
    const targetCompletionPct = Math.min(100, Math.round((totalCompanySavings / (activeTargetAmount || 1)) * 100));

    // 5. Installment Alerts
    const nowStr = new Date().toISOString().split('T')[0];
    const overdueDpsCount = installments.filter(i => i.status === 'OVERDUE' || (i.status === 'PENDING' && i.due_date < nowStr)).length;
    const upcomingDpsCount = installments.filter(i => i.status === 'PENDING' && i.due_date >= nowStr).length;

    return {
      reserveSettings: settings,
      netReserveCash,
      availableOperatingCash,
      totalFdrPrincipal,
      expectedFdrReturns,
      totalDpsDeposited,
      expectedDpsReturns,
      totalCompanySavings,
      coverageMonths: parseFloat(coverageMonths.toFixed(1)),
      activeTargetAmount,
      targetGap,
      targetCompletionPct,
      overdueDpsCount,
      upcomingDpsCount,
      activeFdrCount: filteredFdrs.length,
      activeDpsCount: filteredDps.length
    };
  },

  // Email Actions
  getEmailLogs: async (): Promise<EmailLog[]> => {
    return localStore.emailLogs;
  },

  logEmail: async (log: Omit<EmailLog, 'id' | 'sent_at' | 'sent_by'>): Promise<EmailLog> => {
    const list = localStore.emailLogs;
    const user = await db.getCurrentUser();
    const newLog: EmailLog = {
      ...log,
      id: `eml-${Date.now()}`,
      sent_by: user.id,
      sent_at: new Date().toISOString()
    };
    list.push(newLog);
    localStore.emailLogs = list;

    // Mark invoice as sent if sent successfully
    if (log.delivery_status === 'success') {
      const invoices = localStore.invoices;
      const invIdx = invoices.findIndex(i => i.id === log.invoice_id);
      if (invIdx !== -1 && (invoices[invIdx].status === 'approved' || invoices[invIdx].status === 'viewed')) {
        invoices[invIdx].status = 'sent';
        localStore.invoices = invoices;
      }
    }

    return newLog;
  },

  // Audit Logs
  getAuditLogs: async (): Promise<AuditLog[]> => {
    return localStore.auditLogs;
  },

  logAudit: (
    userId: string,
    action: string,
    module: string,
    recordId: string,
    previousValue: any,
    newValue: any
  ) => {
    const list = localStore.auditLogs;
    const newLog: AuditLog = {
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      user_id: userId,
      action,
      module,
      record_id: recordId,
      previous_value: previousValue,
      new_value: newValue,
      timestamp: new Date().toISOString()
    };
    list.unshift(newLog); // Put new logs at top
    localStore.auditLogs = list;
  },

  // Client Service Rate Memory Engine
  getClientServiceRates: async (clientId?: string): Promise<ClientServiceRate[]> => {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('client_service_rates').select('*');
      if (clientId) query = query.eq('client_id', clientId);
      const { data, error } = await query;
      if (!error && data) {
        if (clientId) {
          const others = localStore.clientServiceRates.filter(r => r.client_id !== clientId);
          localStore.clientServiceRates = [...others, ...data];
        } else {
          localStore.clientServiceRates = data;
        }
        return data;
      }
    }
    const list = localStore.clientServiceRates;
    if (!clientId) return list;
    return list.filter(r => r.client_id === clientId);
  },

  saveClientServiceRate: async (rate: Omit<ClientServiceRate, 'id' | 'updated_at'> & { id?: string }): Promise<ClientServiceRate> => {
    const list = localStore.clientServiceRates;
    const existingIdx = list.findIndex(r => r.client_id === rate.client_id && r.service_name.trim().toLowerCase() === rate.service_name.trim().toLowerCase());
    const now = new Date().toISOString();
    let saved: ClientServiceRate;

    if (existingIdx >= 0) {
      saved = {
        ...list[existingIdx],
        unit_price: rate.unit_price,
        unit: rate.unit || list[existingIdx].unit || 'qty',
        is_paid_media: rate.is_paid_media,
        usd_budget: rate.usd_budget,
        usd_rate: rate.usd_rate,
        updated_at: now
      };
      
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('client_service_rates').update(saved).eq('id', saved.id);
        if (error) console.warn('Cloud CSR update warning:', error);
      }
      
      list[existingIdx] = saved;
    } else {
      saved = {
        id: rate.id || generateUUID(),
        client_id: rate.client_id,
        service_name: rate.service_name.trim(),
        unit_price: rate.unit_price,
        unit: rate.unit || 'qty',
        is_paid_media: rate.is_paid_media,
        usd_budget: rate.usd_budget,
        usd_rate: rate.usd_rate,
        updated_at: now
      };
      
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('client_service_rates').insert(saved);
        if (error) console.warn('Cloud CSR insert warning:', error);
      }
      
      list.push(saved);
    }
    localStore.clientServiceRates = list;
    return saved;
  },

  deleteClientServiceRate: async (id: string): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('client_service_rates').delete().eq('id', id);
      if (error) throw new Error(`Failed to delete client service rate: ${error.message}`);
    }
    const list = localStore.clientServiceRates.filter(r => r.id !== id);
    localStore.clientServiceRates = list;
  },

  // Dynamic Role-Based System Notifications & 48-Hour Purge Engine
  getSystemNotifications: async (userRole?: string, userId?: string): Promise<SystemNotification[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('system_notifications').select('*').order('timestamp', { ascending: false });
      if (!error && data) {
        localStore.systemNotifications = data;
        if (!userRole) return data;
        return data.filter(n => 
          n.target_roles.includes('all') || 
          n.target_roles.includes(userRole) ||
          (userId && n.read_by.includes(userId))
        );
      }
    }
    const list = localStore.systemNotifications;
    if (!userRole) return list;
    return list.filter(n => 
      n.target_roles.includes('all') || 
      n.target_roles.includes(userRole) ||
      (userId && n.read_by.includes(userId))
    );
  },

  notifyAction: async (notif: Omit<SystemNotification, 'id' | 'timestamp' | 'read_by'>): Promise<SystemNotification> => {
    const list = localStore.systemNotifications;
    const newNotif: SystemNotification = {
      ...notif,
      id: generateUUID(),
      timestamp: new Date().toISOString(),
      read_by: []
    };
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('system_notifications').insert(newNotif);
      if (error) console.warn('Cloud notification insert warning:', error);
    }
    
    list.unshift(newNotif);
    localStore.systemNotifications = list;
    return newNotif;
  },

  markNotificationRead: async (notifId: string, userId: string): Promise<void> => {
    const list = localStore.systemNotifications;
    const idx = list.findIndex(n => n.id === notifId);
    if (idx !== -1) {
      if (!list[idx].read_by.includes(userId)) {
        list[idx].read_by.push(userId);
        
        if (isSupabaseConfigured && supabase) {
          const { error } = await supabase.from('system_notifications').update({ read_by: list[idx].read_by }).eq('id', notifId);
          if (error) console.warn('Cloud notification read warning:', error);
        }
        
        localStore.systemNotifications = list;
      }
    }
  },

  deleteNotification: async (notifId: string): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('system_notifications').delete().eq('id', notifId);
      if (error) console.warn('Cloud notification delete warning:', error);
    }
    const list = localStore.systemNotifications.filter(n => n.id !== notifId);
    localStore.systemNotifications = list;
  },

  clearAllNotifications: async (): Promise<void> => {
    localStore.systemNotifications = [];
  },

  // Configurable Financial-Year Based Income Tax System DB API
  getTaxConfigurations: async (): Promise<TaxConfiguration[]> => {
    return localStore.taxConfigurations;
  },

  getActiveTaxConfiguration: async (financialYear?: string): Promise<TaxConfiguration | null> => {
    const list = localStore.taxConfigurations;
    if (financialYear) {
      const found = list.find(c => c.financial_year === financialYear && c.status === 'ACTIVE');
      if (found) return found;
    }
    const active = list.find(c => c.status === 'ACTIVE');
    return active || list[0] || null;
  },

  saveTaxConfiguration: async (
    configData: Partial<TaxConfiguration> & { financial_year: string; configuration_name: string },
    user: Profile
  ): Promise<TaxConfiguration> => {
    const list = localStore.taxConfigurations;
    const now = new Date().toISOString();
    const existingIdx = list.findIndex(c => c.id === configData.id || c.financial_year === configData.financial_year);
    
    let savedConfig: TaxConfiguration;
    
    if (existingIdx >= 0 && configData.id) {
      const prev = list[existingIdx];
      savedConfig = {
        ...prev,
        ...configData,
        updated_by: user.id,
        updated_at: now,
        version_number: (prev.version_number || 1) + 1
      } as TaxConfiguration;
      list[existingIdx] = savedConfig;
    } else {
      // Deactivate older active configs for same FY if new one is set to ACTIVE
      if (configData.status === 'ACTIVE') {
        list.forEach(c => {
          if (c.financial_year === configData.financial_year) {
            c.status = 'ARCHIVED';
          }
        });
      }

      savedConfig = {
        id: configData.id || `tax-cfg-${Date.now()}`,
        country_code: configData.country_code || 'BD',
        entity_type: configData.entity_type || 'NON_PUBLICLY_TRADED_COMPANY',
        financial_year: configData.financial_year,
        assessment_year: configData.assessment_year || `${parseInt(configData.financial_year.split('-')[0]) + 1}-${parseInt(configData.financial_year.split('-')[1]) + 1}`,
        configuration_name: configData.configuration_name,
        bank_compliant_tax_rate: configData.bank_compliant_tax_rate ?? 0.25,
        standard_tax_rate: configData.standard_tax_rate ?? 0.275,
        turnover_threshold: configData.turnover_threshold ?? 5000000,
        turnover_minimum_rate: configData.turnover_minimum_rate ?? 0.006,
        effective_from: configData.effective_from || now.slice(0, 10),
        status: configData.status || 'ACTIVE',
        version_number: 1,
        change_summary: configData.change_summary || 'Updated tax configuration parameters.',
        source_reference: configData.source_reference || 'Income Tax Act 2023, Sec. 163',
        created_by: user.id,
        created_at: now,
        approved_by: user.id,
        approved_at: now,
        published_at: configData.status === 'ACTIVE' ? now : undefined
      };
      list.unshift(savedConfig);
    }

    localStore.taxConfigurations = list;

    // Log audit action
    await db.addTaxAuditLog({
      entity_type: 'tax_configuration',
      entity_id: savedConfig.id,
      action_type: existingIdx >= 0 ? 'UPDATE' : 'CREATE',
      previous_value: existingIdx >= 0 ? list[existingIdx] : null,
      new_value: savedConfig,
      reason: configData.change_summary || 'Tax configuration modified',
      performed_by: user.full_name || user.email
    });

    return savedConfig;
  },

  publishTaxNotice: async (config: TaxConfiguration, user: Profile): Promise<SystemNotification> => {
    const title = `Income Tax Rates Active for Financial Year ${config.financial_year}`;
    const message = `Tax configurations for ${config.financial_year} (AY ${config.assessment_year}) are live: Corporate Tax ${(config.standard_tax_rate * 100).toFixed(1)}% (Standard) / ${(config.bank_compliant_tax_rate * 100).toFixed(1)}% (Banking Compliant), Turnover Minimum Tax ${(config.turnover_minimum_rate * 100).toFixed(2)}% on revenue above ৳${config.turnover_threshold.toLocaleString()}. Source: ${config.source_reference}.`;
    
    return db.notifyAction({
      sender_name: user.full_name || 'System Admin',
      sender_role: user.role_name || 'Super Admin',
      title,
      message,
      category: 'broadcast',
      target_roles: ['Super Admin', 'Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
      link_url: '/billing/tax'
    });
  },

  getTaxServiceCategories: async (configId?: string): Promise<TaxServiceCategory[]> => {
    const list = localStore.taxServiceCategories;
    if (!configId) return list;
    return list.filter(c => c.tax_configuration_id === configId);
  },

  saveTaxServiceCategory: async (category: Partial<TaxServiceCategory> & { category_code: TaxServiceCategory['category_code']; tds_rate: number }): Promise<TaxServiceCategory> => {
    const list = localStore.taxServiceCategories;
    const now = new Date().toISOString();
    const idx = list.findIndex(c => c.id === category.id);

    let saved: TaxServiceCategory;
    if (idx >= 0 && category.id) {
      saved = { ...list[idx], ...category, updated_at: now } as TaxServiceCategory;
      list[idx] = saved;
    } else {
      saved = {
        id: `cat-${Date.now()}`,
        tax_configuration_id: category.tax_configuration_id || 'tax-cfg-2026-2027',
        category_code: category.category_code,
        category_name: category.category_name || category.category_code,
        description: category.description || '',
        tds_rate: category.tds_rate,
        is_custom_rate_allowed: category.is_custom_rate_allowed ?? true,
        is_active: category.is_active ?? true,
        effective_from: category.effective_from || now.slice(0, 10),
        created_at: now,
        updated_at: now
      };
      list.push(saved);
    }
    localStore.taxServiceCategories = list;
    return saved;
  },

  getTaxCalculations: async (financialYear?: string): Promise<TaxCalculation[]> => {
    const list = localStore.taxCalculations;
    if (!financialYear) return list;
    return list.filter(c => c.financial_year === financialYear);
  },

  saveTaxCalculation: async (calcData: Omit<TaxCalculation, 'id' | 'created_at' | 'updated_at'> & { id?: string }): Promise<TaxCalculation> => {
    const list = localStore.taxCalculations;
    const now = new Date().toISOString();
    const idx = list.findIndex(c => c.id === calcData.id);

    let saved: TaxCalculation;
    if (idx >= 0 && calcData.id) {
      saved = { ...list[idx], ...calcData, updated_at: now };
      list[idx] = saved;
    } else {
      saved = {
        ...calcData,
        id: calcData.id || `tax-calc-${Date.now()}`,
        created_at: now,
        updated_at: now
      };
      list.unshift(saved);
    }
    localStore.taxCalculations = list;
    return saved;
  },

  overrideTaxCalculation: async (
    calcId: string,
    overrideAmount: number,
    overrideReason: string,
    user: Profile
  ): Promise<TaxCalculation> => {
    const list = localStore.taxCalculations;
    const idx = list.findIndex(c => c.id === calcId);
    if (idx === -1) throw new Error('Calculation record not found.');

    const prev = list[idx];
    const updated: TaxCalculation = {
      ...prev,
      manual_override_tax: overrideAmount,
      manual_override_reason: overrideReason,
      final_tax_payable: overrideAmount,
      updated_at: new Date().toISOString()
    };

    list[idx] = updated;
    localStore.taxCalculations = list;

    await db.addTaxAuditLog({
      entity_type: 'tax_override',
      entity_id: calcId,
      action_type: 'OVERRIDE',
      previous_value: { system_tax: prev.system_calculated_tax, override_tax: prev.manual_override_tax },
      new_value: { override_tax: overrideAmount, reason: overrideReason },
      reason: overrideReason,
      performed_by: user.full_name || user.email
    });

    return updated;
  },

  getTaxAuditLogs: async (): Promise<TaxAuditLog[]> => {
    return localStore.taxAuditLogs;
  },

  addTaxAuditLog: async (log: Omit<TaxAuditLog, 'id' | 'performed_at'>): Promise<TaxAuditLog> => {
    const list = localStore.taxAuditLogs;
    const newLog: TaxAuditLog = {
      ...log,
      id: `tax-audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      performed_at: new Date().toISOString()
    };
    list.unshift(newLog);
    localStore.taxAuditLogs = list;
    return newLog;
  },

  // Configurable Financial-Year Based VAT System DB API
  getVatRegistrationProfile: async (): Promise<VatRegistrationProfile> => {
    return localStore.vatRegistrationProfile;
  },

  saveVatRegistrationProfile: async (profile: Partial<VatRegistrationProfile>, user: Profile): Promise<VatRegistrationProfile> => {
    const current = localStore.vatRegistrationProfile;
    const updated: VatRegistrationProfile = {
      ...current,
      ...profile,
      updated_at: new Date().toISOString()
    };
    localStore.vatRegistrationProfile = updated;
    await db.addVatAuditLog({
      entity_type: 'vat_configuration',
      entity_id: updated.id,
      action_type: 'UPDATE',
      previous_value: current,
      new_value: updated,
      reason: 'Updated VAT registration profile',
      performed_by: user.full_name || user.email
    });
    return updated;
  },

  getVatConfigurations: async (): Promise<VatConfiguration[]> => {
    return localStore.vatConfigurations;
  },

  getActiveVatConfiguration: async (financialYear?: string): Promise<VatConfiguration | null> => {
    const list = localStore.vatConfigurations;
    if (financialYear) {
      const found = list.find(c => c.financial_year === financialYear && c.status === 'ACTIVE');
      if (found) return found;
    }
    const active = list.find(c => c.status === 'ACTIVE');
    return active || list[0] || null;
  },

  saveVatConfiguration: async (
    configData: Partial<VatConfiguration> & { financial_year: string; configuration_name: string },
    user: Profile
  ): Promise<VatConfiguration> => {
    const list = localStore.vatConfigurations;
    const now = new Date().toISOString();
    const existingIdx = list.findIndex(c => c.id === configData.id || c.financial_year === configData.financial_year);
    
    let savedConfig: VatConfiguration;
    if (existingIdx >= 0 && configData.id) {
      const prev = list[existingIdx];
      savedConfig = {
        ...prev,
        ...configData,
        updated_by: user.id,
        updated_at: now,
        version_number: (prev.version_number || 1) + 1
      } as VatConfiguration;
      list[existingIdx] = savedConfig;
    } else {
      if (configData.status === 'ACTIVE') {
        list.forEach(c => {
          if (c.financial_year === configData.financial_year) {
            c.status = 'ARCHIVED';
          }
        });
      }
      savedConfig = {
        id: configData.id || `vat-cfg-${Date.now()}`,
        country_code: 'BD',
        financial_year: configData.financial_year,
        configuration_name: configData.configuration_name,
        registration_type: configData.registration_type || 'VAT_REGISTERED',
        return_frequency: configData.return_frequency || 'MONTHLY',
        effective_from: configData.effective_from || now.slice(0, 10),
        status: configData.status || 'ACTIVE',
        version_number: 1,
        change_summary: configData.change_summary || 'Updated VAT configuration parameters.',
        source_reference: configData.source_reference || 'NBR Value Added Tax and Supplementary Duty Act 2012',
        created_by: user.id,
        created_at: now,
        approved_by: user.id,
        approved_at: now,
        published_at: configData.status === 'ACTIVE' ? now : undefined
      };
      list.unshift(savedConfig);
    }

    localStore.vatConfigurations = list;

    await db.addVatAuditLog({
      entity_type: 'vat_configuration',
      entity_id: savedConfig.id,
      action_type: existingIdx >= 0 ? 'UPDATE' : 'CREATE',
      previous_value: existingIdx >= 0 ? list[existingIdx] : null,
      new_value: savedConfig,
      reason: configData.change_summary || 'VAT configuration modified',
      performed_by: user.full_name || user.email
    });

    return savedConfig;
  },

  publishVatNotice: async (config: VatConfiguration, user: Profile): Promise<SystemNotification> => {
    const title = `VAT Rates Updated for Financial Year ${config.financial_year}`;
    const message = `Official VAT parameters updated for ${config.financial_year}: Registration Type ${config.registration_type}, Frequency: ${config.return_frequency}. Service category classifications and VDS withholding guidelines updated per NBR rules (${config.source_reference}).`;
    
    return db.notifyAction({
      sender_name: user.full_name || 'System Admin',
      sender_role: user.role_name || 'Super Admin',
      title,
      message,
      category: 'broadcast',
      target_roles: ['Super Admin', 'Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
      link_url: '/billing/tax'
    });
  },

  getVatServiceCategories: async (configId?: string): Promise<VatServiceCategory[]> => {
    const list = localStore.vatServiceCategories;
    if (!configId) return list;
    return list.filter(c => c.vat_configuration_id === configId);
  },

  saveVatServiceCategory: async (category: Partial<VatServiceCategory> & { category_code: VatServiceCategory['category_code']; vat_rate: number }): Promise<VatServiceCategory> => {
    const list = localStore.vatServiceCategories;
    const now = new Date().toISOString();
    const idx = list.findIndex(c => c.id === category.id);

    let saved: VatServiceCategory;
    if (idx >= 0 && category.id) {
      saved = { ...list[idx], ...category } as VatServiceCategory;
      list[idx] = saved;
    } else {
      saved = {
        id: `vsc-${Date.now()}`,
        vat_configuration_id: category.vat_configuration_id || '99999999-0000-4000-8000-000000000000',
        category_code: category.category_code,
        category_name: category.category_name || category.category_code,
        official_service_code: category.official_service_code || 'S099.20',
        description: category.description || '',
        vat_rate: category.vat_rate,
        vds_rate: category.vds_rate ?? category.vat_rate,
        is_vds_applicable: category.is_vds_applicable ?? true,
        is_input_credit_allowed: category.is_input_credit_allowed ?? true,
        is_zero_rated: category.is_zero_rated ?? false,
        is_exempt: category.is_exempt ?? false,
        is_custom_rate_allowed: category.is_custom_rate_allowed ?? true,
        effective_from: category.effective_from || now.slice(0, 10),
        status: category.status || 'ACTIVE'
      };
      list.push(saved);
    }
    localStore.vatServiceCategories = list;
    return saved;
  },

  getVatDocuments: async (type?: VatDocument['document_type']): Promise<VatDocument[]> => {
    const list = localStore.vatDocuments;
    if (!type) return list;
    return list.filter(d => d.document_type === type);
  },

  saveVatDocument: async (docData: Omit<VatDocument, 'id' | 'created_at'> & { id?: string }, user: Profile): Promise<VatDocument> => {
    const list = localStore.vatDocuments;
    const now = new Date().toISOString();

    // Duplicate Mushak 6.6 prevention check
    if (docData.document_type === 'MUSHAK_6_6') {
      const duplicate = list.find(d => 
        d.id !== docData.id &&
        d.document_type === 'MUSHAK_6_6' &&
        d.document_number.trim().toLowerCase() === docData.document_number.trim().toLowerCase()
      );
      if (duplicate) {
        throw new Error(`Mushak 6.6 Certificate #${docData.document_number} has already been registered in the system. Duplicate claims are prohibited.`);
      }
    }

    const idx = list.findIndex(d => d.id === docData.id);
    let savedDoc: VatDocument;

    if (idx >= 0 && docData.id) {
      savedDoc = { ...list[idx], ...docData };
      list[idx] = savedDoc;
    } else {
      savedDoc = {
        ...docData,
        id: `vat-doc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        created_at: now
      };
      list.unshift(savedDoc);
    }
    localStore.vatDocuments = list;

    await db.addVatAuditLog({
      entity_type: docData.document_type === 'MUSHAK_6_6' ? 'vds_certificate' : 'mushak_document',
      entity_id: savedDoc.id,
      action_type: idx >= 0 ? 'UPDATE' : 'CREATE',
      previous_value: idx >= 0 ? list[idx] : null,
      new_value: savedDoc,
      reason: `Recorded ${docData.document_type} #${docData.document_number}`,
      performed_by: user.full_name || user.email
    });

    return savedDoc;
  },

  verifyVatDocument: async (docId: string, status: VatDocument['verification_status'], user: Profile): Promise<VatDocument> => {
    const list = localStore.vatDocuments;
    const idx = list.findIndex(d => d.id === docId);
    if (idx === -1) throw new Error('VAT Document record not found.');

    const prev = list[idx];
    const updated: VatDocument = {
      ...prev,
      verification_status: status,
      verified_by: user.full_name || user.email,
      verified_at: new Date().toISOString()
    };

    list[idx] = updated;
    localStore.vatDocuments = list;

    await db.addVatAuditLog({
      entity_type: prev.document_type === 'MUSHAK_6_6' ? 'vds_certificate' : 'mushak_document',
      entity_id: docId,
      action_type: 'VERIFY',
      previous_value: { verification_status: prev.verification_status },
      new_value: { verification_status: status },
      reason: `Changed verification status to ${status}`,
      performed_by: user.full_name || user.email
    });

    return updated;
  },

  getInputVatEntries: async (): Promise<InputVatEntry[]> => {
    return localStore.inputVatEntries;
  },

  saveInputVatEntry: async (entryData: Omit<InputVatEntry, 'id' | 'created_at'> & { id?: string }, user: Profile): Promise<InputVatEntry> => {
    const list = localStore.inputVatEntries;
    const now = new Date().toISOString();
    const idx = list.findIndex(e => e.id === entryData.id);
    let saved: InputVatEntry;

    if (idx >= 0 && entryData.id) {
      saved = { ...list[idx], ...entryData };
      list[idx] = saved;
    } else {
      saved = {
        ...entryData,
        id: `ive-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        created_at: now
      };
      list.unshift(saved);
    }
    localStore.inputVatEntries = list;

    await db.addVatAuditLog({
      entity_type: 'input_vat',
      entity_id: saved.id,
      action_type: idx >= 0 ? 'UPDATE' : 'CREATE',
      previous_value: idx >= 0 ? list[idx] : null,
      new_value: saved,
      reason: `Recorded Input VAT from vendor ${entryData.vendor_name}`,
      performed_by: user.full_name || user.email
    });

    return saved;
  },

  approveInputVatEntry: async (entryId: string, approvedVatAmount: number, status: InputVatEntry['eligibility_status'], user: Profile): Promise<InputVatEntry> => {
    const list = localStore.inputVatEntries;
    const idx = list.findIndex(e => e.id === entryId);
    if (idx === -1) throw new Error('Input VAT record not found.');

    const prev = list[idx];
    const updated: InputVatEntry = {
      ...prev,
      approved_input_vat: approvedVatAmount,
      eligibility_status: status,
      verification_status: status === 'ELIGIBLE_INPUT_CREDIT' || status === 'PARTIALLY_ELIGIBLE' ? 'APPROVED' : 'REJECTED',
      approved_by: user.full_name || user.email
    };

    list[idx] = updated;
    localStore.inputVatEntries = list;

    await db.addVatAuditLog({
      entity_type: 'input_vat',
      entity_id: entryId,
      action_type: 'VERIFY',
      previous_value: { eligibility_status: prev.eligibility_status, approved_input_vat: prev.approved_input_vat },
      new_value: { eligibility_status: status, approved_input_vat: approvedVatAmount },
      reason: `Approved Input VAT credit of ৳${approvedVatAmount}`,
      performed_by: user.full_name || user.email
    });

    return updated;
  },

  getVatReturns: async (): Promise<VatReturn[]> => {
    return localStore.vatReturns;
  },

  saveVatReturn: async (returnData: Omit<VatReturn, 'id' | 'created_at' | 'updated_at'> & { id?: string }, user: Profile): Promise<VatReturn> => {
    const list = localStore.vatReturns;
    const now = new Date().toISOString();
    const idx = list.findIndex(r => r.id === returnData.id);
    let saved: VatReturn;

    if (idx >= 0 && returnData.id) {
      saved = { ...list[idx], ...returnData, updated_at: now };
      list[idx] = saved;
    } else {
      saved = {
        ...returnData,
        id: `vr-${Date.now()}`,
        created_at: now,
        updated_at: now
      };
      list.unshift(saved);
    }
    localStore.vatReturns = list;
    return saved;
  },

  getVatAuditLogs: async (): Promise<VatAuditLog[]> => {
    return localStore.vatAuditLogs;
  },

  addVatAuditLog: async (log: Omit<VatAuditLog, 'id' | 'performed_at'>): Promise<VatAuditLog> => {
    const list = localStore.vatAuditLogs;
    const newLog: VatAuditLog = {
      ...log,
      id: `vat-audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      performed_at: new Date().toISOString()
    };
    list.unshift(newLog);
    localStore.vatAuditLogs = list;
    return newLog;
  }
};
