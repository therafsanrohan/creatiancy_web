import { calculateTotals } from './calculations';

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
  account_manager_id: string;
  internal_note: string;
  status: 'active' | 'archived';
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
}

export interface Invoice {
  id: string;
  secure_token: string;
  client_id: string;
  currency: 'BDT' | 'USD';
  usd_rate?: number;
  entity_id: string;
  invoice_number: string | null;
  status: 'draft' | 'pending_approval' | 'approved' | 'sent' | 'viewed' | 'partially_paid' | 'paid' | 'overdue' | 'void';
  issue_date: string;
  payment_terms: string;
  due_date: string;
  project_name: string;
  service_period: string;
  po_number: string;
  reference_number: string;
  account_manager_id: string;
  discount_type: 'none' | 'fixed' | 'percentage';
  discount_value: number;
  vat_rate: number;
  vat_inclusive: boolean;
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

// Check if Supabase keys exist and are not templates
const hasSupabaseEnv =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project-id.supabase.co' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isDemoMode = !hasSupabaseEnv;

// Workspace default entity and seed configurations
const MOCK_PROFILES: Profile[] = [
  { id: 'usr-1', full_name: 'Rafsan Rohan', email: 'admin@creatiancy.com', username: 'rafsan', role_name: 'Super Admin' },
  { id: 'usr-5', full_name: 'Executive Director (Admin)', email: 'manager@creatiancy.com', username: 'manager', role_name: 'Admin' },
  { id: 'usr-2', full_name: 'Finance Executive', email: 'finance@creatiancy.com', username: 'finance', role_name: 'Finance Admin' },
  { id: 'usr-3', full_name: 'Client Manager', email: 'cs@creatiancy.com', username: 'cs', role_name: 'Client Service' },
  { id: 'usr-4', full_name: 'Project Coordinator', email: 'pm@creatiancy.com', username: 'pm', role_name: 'Project Manager' }
];

const MOCK_ENTITIES: BusinessEntity[] = [
  {
    id: 'ent-1',
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
    id: 'ent-2',
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
    id: 'bnk-1',
    entity_id: 'ent-1',
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
    id: 'bnk-2',
    entity_id: 'ent-2',
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

const MOCK_CLIENT_SERVICE_RATES: ClientServiceRate[] = [
  { id: 'csr-1', client_id: 'cli-1', service_name: 'Static Banner Design', unit_price: 1300, unit: 'pcs', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'csr-2', client_id: 'cli-1', service_name: 'Meta Ads Media Buying ($1,000)', unit_price: 125500, unit: 'budget', is_paid_media: true, usd_budget: 1000, usd_rate: 125.5, updated_at: '2026-07-01T00:00:00Z' },
  { id: 'csr-3', client_id: 'cli-2', service_name: 'Static Banner Design', unit_price: 5000, unit: 'pcs', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'csr-4', client_id: 'cli-2', service_name: 'Full Stack Web Development', unit_price: 45000, unit: 'project', updated_at: '2026-07-01T00:00:00Z' }
];

const MOCK_SYSTEM_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
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
    id: 'notif-2',
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
    created_by: 'usr-1',
    created_at: '2026-07-01T00:00:00Z',
    approved_by: 'usr-1',
    approved_at: '2026-07-01T00:00:00Z',
    published_at: '2026-07-01T00:00:00Z'
  }
];

const MOCK_TAX_SERVICE_CATEGORIES: TaxServiceCategory[] = [
  { id: 'cat-1', tax_configuration_id: 'tax-cfg-2026-2027', category_code: 'CREATIVE_AGENCY', category_name: 'Creative Agency Services', description: 'Advertising, design, branding, and media services', tds_rate: 0.04, is_custom_rate_allowed: true, is_active: true, effective_from: '2026-07-01', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'cat-2', tax_configuration_id: 'tax-cfg-2026-2027', category_code: 'PROFESSIONAL_SERVICE', category_name: 'Professional Services', description: 'Consulting, advisory, and professional fees', tds_rate: 0.075, is_custom_rate_allowed: true, is_active: true, effective_from: '2026-07-01', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'cat-3', tax_configuration_id: 'tax-cfg-2026-2027', category_code: 'TECHNICAL_SERVICE', category_name: 'Technical & IT Services', description: 'Software engineering, maintenance, and IT consulting', tds_rate: 0.10, is_custom_rate_allowed: true, is_active: true, effective_from: '2026-07-01', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'cat-4', tax_configuration_id: 'tax-cfg-2026-2027', category_code: 'NO_TDS', category_name: 'Exempt / No TDS', description: 'Zero source tax deducted at source', tds_rate: 0.0, is_custom_rate_allowed: false, is_active: true, effective_from: '2026-07-01', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' }
];

const MOCK_TAX_CALCULATIONS: TaxCalculation[] = [];
const MOCK_TAX_AUDIT_LOGS: TaxAuditLog[] = [];

// Persistent state storage adapter (browser & SSR fallback)
class LocalStore {
  constructor() {
    // Retain and protect all user-entered live testing data
  }

  private getVal(key: string, def: any): any {
    if (typeof window === 'undefined') return def;
    const val = localStorage.getItem(`billing_hub_${key}`);
    return val ? JSON.parse(val) : def;
  }

  private setVal(key: string, val: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`billing_hub_${key}`, JSON.stringify(val));
    }
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
    return localStore.profiles;
  },

  createProfile: async (profile: Omit<Profile, 'id' | 'created_at'>): Promise<Profile> => {
    const list = localStore.profiles;
    // Check email uniqueness
    if (list.some(p => p.email.toLowerCase() === profile.email.toLowerCase())) {
      throw new Error('A team member with this email address already exists.');
    }
    // Check username uniqueness if provided
    if (profile.username && list.some(p => p.username && p.username.toLowerCase() === profile.username?.toLowerCase())) {
      throw new Error('This username is already taken. Please choose a unique username.');
    }
    const newProfile: Profile = {
      ...profile,
      id: `usr-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    list.push(newProfile);
    localStore.profiles = list;
    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'create_team_account', 'users', newProfile.id, null, { full_name: newProfile.full_name, email: newProfile.email, username: newProfile.username, role: newProfile.role_name });
    return newProfile;
  },

  updateProfileRole: async (userId: string, newRole: Profile['role_name']): Promise<Profile> => {
    const list = localStore.profiles;
    const idx = list.findIndex(p => p.id === userId);
    if (idx === -1) throw new Error('User not found');
    const oldRole = list[idx].role_name;
    list[idx].role_name = newRole;
    localStore.profiles = list;
    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'change_user_role', 'users', userId, { role: oldRole }, { role: newRole });
    return list[idx];
  },

  deleteProfile: async (userId: string): Promise<void> => {
    const list = localStore.profiles.filter(p => p.id !== userId);
    localStore.profiles = list;
    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'delete_team_account', 'users', userId, null, { deleted: true });
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
    
    localStore.profiles = list;
    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'update_user_credentials', 'users', userId, 
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
    return localStore.entities;
  },

  updateEntity: async (id: string, updates: Partial<BusinessEntity>): Promise<BusinessEntity> => {
    const list = localStore.entities;
    const idx = list.findIndex(e => e.id === id);
    if (idx === -1) throw new Error('Entity not found');
    const updated = { ...list[idx], ...updates };
    list[idx] = updated;
    localStore.entities = list;

    // Update snapshots dynamically so live invoice previews reflect updated entity info
    const snapshotsList = localStore.snapshots;
    const invoicesList = localStore.invoices;
    let snapshotUpdated = false;
    for (let i = 0; i < snapshotsList.length; i++) {
      const inv = invoicesList.find(x => x.id === snapshotsList[i].invoice_id);
      const isMatch = (inv && inv.entity_id === id) ||
        (snapshotsList[i].entity_snapshot && (
          snapshotsList[i].entity_snapshot.id === id || 
          snapshotsList[i].entity_snapshot.entity_code === updated.entity_code
        ));
      if (isMatch) {
        snapshotsList[i].entity_snapshot = { ...snapshotsList[i].entity_snapshot, ...updated };
        snapshotUpdated = true;
      }
    }
    if (snapshotUpdated) {
      localStore.snapshots = snapshotsList;
    }

    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'update_entity', 'entities', id, null, updates);
    return updated;
  },

  // Bank Accounts
  getBankAccounts: async (): Promise<BankAccount[]> => {
    return localStore.bankAccounts;
  },

  updateBankAccount: async (id: string, updates: Partial<BankAccount>): Promise<BankAccount> => {
    const list = localStore.bankAccounts;
    const idx = list.findIndex(b => b.id === id);
    if (idx === -1) throw new Error('Bank account not found');
    const updated = { ...list[idx], ...updates };
    list[idx] = updated;
    localStore.bankAccounts = list;

    // Update bank snapshots dynamically
    const snapshotsList = localStore.snapshots;
    let snapshotUpdated = false;
    for (let i = 0; i < snapshotsList.length; i++) {
      if (snapshotsList[i].bank_snapshot && snapshotsList[i].bank_snapshot.id === id) {
        snapshotsList[i].bank_snapshot = { ...snapshotsList[i].bank_snapshot, ...updated };
        snapshotUpdated = true;
      }
    }
    if (snapshotUpdated) {
      localStore.snapshots = snapshotsList;
    }

    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'update_bank', 'bank_accounts', id, null, updates);
    return updated;
  },

  // Client Actions
  getClients: async (): Promise<BillingClient[]> => {
    return localStore.clients;
  },

  getClientById: async (id: string): Promise<BillingClient | undefined> => {
    return localStore.clients.find(c => c.id === id);
  },

  createClient: async (client: Omit<BillingClient, 'id' | 'status'>): Promise<BillingClient> => {
    const list = localStore.clients;
    const newClient: BillingClient = {
      ...client,
      id: `cli-${Date.now()}`,
      status: 'active'
    };
    list.push(newClient);
    localStore.clients = list;
    const user = await db.getCurrentUser();
    await db.notifyAction({
      sender_name: user.full_name,
      sender_role: user.role_name,
      title: `New Client Registered: ${newClient.company_name || newClient.contact_person}`,
      message: `Corporate client ${newClient.company_name} registered under ${newClient.preferred_currency} billing.`,
      category: 'client_added',
      target_roles: ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
      link_url: `/billing/clients/${newClient.id}`
    });

    db.logAudit(user.id, 'create_client', 'clients', newClient.id, null, newClient);
    return newClient;
  },

  updateClient: async (id: string, updates: Partial<BillingClient>): Promise<BillingClient> => {
    const list = localStore.clients;
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Client not found');
    const updated = { ...list[idx], ...updates };
    list[idx] = updated;
    localStore.clients = list;
    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'update_client', 'clients', id, null, updates);
    return updated;
  },

  // Invoice Actions
  getInvoices: async (): Promise<Invoice[]> => {
    return localStore.invoices;
  },

  getInvoiceById: async (id: string): Promise<Invoice | undefined> => {
    return localStore.invoices.find(i => i.id === id);
  },

  getInvoiceByToken: async (token: string): Promise<Invoice | undefined> => {
    const list = localStore.invoices;
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
    return localStore.items.filter(item => item.invoice_id === invoiceId);
  },

  getSnapshotByInvoiceId: async (invoiceId: string): Promise<InvoiceSnapshot | undefined> => {
    return localStore.snapshots.find(s => s.invoice_id === invoiceId);
  },

  createInvoice: async (
    invoice: Omit<Invoice, 'id' | 'secure_token' | 'invoice_number' | 'status' | 'created_at' | 'updated_at' | 'pdf_file_url' | 'pdf_generated_at' | 'approved_by' | 'approved_at'>,
    items: Omit<InvoiceItem, 'id' | 'invoice_id'>[]
  ): Promise<Invoice> => {
    const user = await db.getCurrentUser();
    const newInvoice: Invoice = {
      ...invoice,
      id: `inv-${Date.now()}`,
      secure_token: `token-${Date.now()}`,
      invoice_number: null,
      status: 'draft',
      created_by: user.id,
      approved_by: null,
      approved_at: null,
      pdf_file_url: null,
      pdf_generated_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save invoice
    const invoicesList = localStore.invoices;
    invoicesList.push(newInvoice);
    localStore.invoices = invoicesList;

    // Save items
    const itemsList = localStore.items;
    const newItems: InvoiceItem[] = items.map((itm, index) => ({
      ...itm,
      id: `itm-${Date.now()}-${index}`,
      invoice_id: newInvoice.id,
      sort_order: index
    }));
    itemsList.push(...newItems);
    localStore.items = itemsList;

    // Auto-enlist & update Client Service Rates memory for this client
    for (const itm of items) {
      if (newInvoice.client_id && itm.service_name && itm.rate > 0) {
        await db.saveClientServiceRate({
          client_id: newInvoice.client_id,
          service_name: itm.service_name,
          unit_price: itm.rate,
          unit: itm.unit || 'pcs',
          is_paid_media: itm.is_paid_media,
          usd_budget: itm.usd_amount,
          usd_rate: itm.usd_rate
        });
      }
    }

    const clientObj = localStore.clients.find(c => c.id === newInvoice.client_id);
    const clientName = clientObj ? (clientObj.company_name || clientObj.contact_person) : 'Client';
    await db.notifyAction({
      sender_name: user.full_name,
      sender_role: user.role_name,
      title: `New Invoice Created: ${newInvoice.project_name || 'Draft'}`,
      message: `Invoice draft generated for ${clientName} (${newInvoice.currency}). Access detail page to review.`,
      category: 'invoice_created',
      target_roles: ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
      link_url: `/billing/invoices/${newInvoice.id}`
    });

    db.logAudit(user.id, 'create_invoice', 'invoices', newInvoice.id, null, newInvoice);
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
    if (original.status !== 'draft' && original.status !== 'pending_approval') {
      throw new Error('Only draft or pending_approval invoices can be edited');
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

    db.logAudit(user.id, 'submit_approval', 'invoices', id, { status: 'draft' }, { status: 'pending_approval' });
    return list[idx];
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

    // Get sequence count
    const sequenceKey = `${entityPrefix}_${year}`;
    const currentSeq = Number(localStorage.getItem(`billing_seq_${sequenceKey}`) || '0') + 1;
    localStorage.setItem(`billing_seq_${sequenceKey}`, currentSeq.toString());

    const serialStr = currentSeq.toString().padStart(4, '0');
    const invoiceNumber = `${entityPrefix}-${invoice.currency}-${year}-${serialStr}`;

    // 2. Compute static calculations
    const items = localStore.items.filter(itm => itm.invoice_id === id);
    const client = localStore.clients.find(c => c.id === invoice.client_id);
    const bank = localStore.bankAccounts.find(b => b.entity_id === invoice.entity_id && b.is_active);

    const totals = calculateTotals({
      items,
      discountType: invoice.discount_type,
      discountValue: invoice.discount_value,
      vatRate: invoice.vat_rate,
      vatInclusive: invoice.vat_inclusive,
      payments: []
    });

    // 3. Store static snapshot
    const snapshotsList = localStore.snapshots;
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
    snapshotsList.push(newSnapshot);
    localStore.snapshots = snapshotsList;

    // 4. Update Invoice Status
    invoice.status = 'approved';
    invoice.invoice_number = invoiceNumber;
    invoice.approved_by = user.id;
    invoice.approved_at = new Date().toISOString();
    localStore.invoices = invoicesList;

    await db.notifyAction({
      sender_name: user.full_name,
      sender_role: user.role_name,
      title: `Invoice Approved: ${invoiceNumber}`,
      message: `Invoice ${invoiceNumber} for ${invoice.project_name} has been approved and sequence locked.`,
      category: 'invoice_approved',
      target_roles: ['Super Admin', 'Finance Admin', 'Client Service', 'Project Manager'],
      link_url: `/billing/invoices/${id}`
    });

    db.logAudit(user.id, 'approve_invoice', 'invoices', id, null, { status: 'approved', number: invoiceNumber });
    return invoice;
  },

  voidInvoice: async (id: string): Promise<Invoice> => {
    const list = localStore.invoices;
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Invoice not found');

    const originalStatus = list[idx].status;
    list[idx].status = 'void';
    localStore.invoices = list;

    const user = await db.getCurrentUser();
    db.logAudit(user.id, 'void_invoice', 'invoices', id, { status: originalStatus }, { status: 'void' });
    return list[idx];
  },

  // Payment Actions
  getPayments: async (): Promise<Payment[]> => {
    return localStore.payments;
  },

  getPaymentsForInvoice: async (invoiceId: string): Promise<Payment[]> => {
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
      id: `taxpay-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    list.push(newPayment);
    localStore.taxPayments = list;

    await db.notifyAction({
      sender_name: user.full_name,
      sender_role: user.role_name,
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
    return localStore.expenses;
  },

  addExpense: async (expense: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> => {
    const list = localStore.expenses;
    const newExpense: Expense = {
      ...expense,
      id: `exp-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    list.push(newExpense);
    localStore.expenses = list;
    db.logAudit(expense.recorded_by, 'add_expense', 'expenses', newExpense.id, null, newExpense);
    return newExpense;
  },

  deleteExpense: async (id: string): Promise<void> => {
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

    const sequenceKey = `rec_${receiptPrefix}_${year}`;
    const currentSeq = Number(localStorage.getItem(`billing_seq_${sequenceKey}`) || '0') + 1;
    localStorage.setItem(`billing_seq_${sequenceKey}`, currentSeq.toString());

    const serialStr = currentSeq.toString().padStart(4, '0');
    const receiptNumber = `${receiptPrefix}-${year}-${serialStr}`;

    const newPayment: Payment = {
      ...payment,
      id: `pay-${Date.now()}`,
      receipt_number: receiptNumber,
      created_at: new Date().toISOString()
    };
    list.push(newPayment);
    localStore.payments = list;

    // Update invoice total paid state
    const invoices = localStore.invoices;
    const invIdx = invoices.findIndex(i => i.id === payment.invoice_id);
    if (invIdx !== -1) {
      const inv = invoices[invIdx];
      
      // Calculate new totals including this payment
      const items = localStore.items.filter(itm => itm.invoice_id === inv.id);
      const invoicePayments = list.filter(p => p.invoice_id === inv.id);
      const totals = calculateTotals({
        items,
        discountType: inv.discount_type,
        discountValue: inv.discount_value,
        vatRate: inv.vat_rate,
        vatInclusive: inv.vat_inclusive,
        payments: invoicePayments
      });

      // Update invoice status based on remaining balance
      if (totals.amountDue === 0) {
        inv.status = 'paid';
      } else {
        inv.status = 'partially_paid';
      }
      localStore.invoices = invoices;

      // Update snapshot totals
      const snapshots = localStore.snapshots;
      const snapIdx = snapshots.findIndex(s => s.invoice_id === inv.id);
      if (snapIdx !== -1) {
        snapshots[snapIdx].totals_snapshot.amount_paid = totals.amountPaid;
        snapshots[snapIdx].totals_snapshot.amount_due = totals.amountDue;
        localStore.snapshots = snapshots;
      }
    }

    await db.notifyAction({
      sender_name: user.full_name,
      sender_role: user.role_name,
      title: `Payment Recorded: ${newPayment.currency} ${newPayment.amount.toLocaleString()}`,
      message: `Payment received for ${invoice.invoice_number || invoice.id} via ${newPayment.payment_method} (Receipt #${newPayment.receipt_number}).`,
      category: 'payment_recorded',
      target_roles: ['Super Admin', 'Finance Admin', 'Client Service'],
      link_url: `/billing/invoices/${invoice.id}`
    });

    db.logAudit(user.id, 'record_payment', 'payments', newPayment.id, null, newPayment);
    return newPayment;
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
      list[existingIdx] = saved;
    } else {
      saved = {
        id: `csr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        client_id: rate.client_id,
        service_name: rate.service_name.trim(),
        unit_price: rate.unit_price,
        unit: rate.unit || 'qty',
        is_paid_media: rate.is_paid_media,
        usd_budget: rate.usd_budget,
        usd_rate: rate.usd_rate,
        updated_at: now
      };
      list.push(saved);
    }
    localStore.clientServiceRates = list;
    return saved;
  },

  deleteClientServiceRate: async (id: string): Promise<void> => {
    const list = localStore.clientServiceRates.filter(r => r.id !== id);
    localStore.clientServiceRates = list;
  },

  // Dynamic Role-Based System Notifications & 48-Hour Purge Engine
  getSystemNotifications: async (userRole?: string, userId?: string): Promise<SystemNotification[]> => {
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
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      read_by: []
    };
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
        localStore.systemNotifications = list;
      }
    }
  },

  deleteNotification: async (notifId: string): Promise<void> => {
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
  }
};
