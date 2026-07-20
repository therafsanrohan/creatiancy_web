import { calculateTotals } from './calculations';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role_name: 'Super Admin' | 'Finance Admin' | 'Client Service' | 'Project Manager';
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
}

export interface Invoice {
  id: string;
  secure_token: string;
  client_id: string;
  currency: 'BDT' | 'USD';
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
  proof_url: string | null;
  recorded_by: string;
  receipt_number: string;
  created_at: string;
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

// Check if Supabase keys exist and are not templates
const hasSupabaseEnv =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project-id.supabase.co' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isDemoMode = !hasSupabaseEnv;

// SEED MOCK DATA FOR LOCAL DEMO MODE
const MOCK_PROFILES: Profile[] = [
  { id: 'usr-1', full_name: 'Rafsan Rohan', email: 'admin@creatiancy.com', role_name: 'Super Admin' },
  { id: 'usr-2', full_name: 'Finance Executive', email: 'finance@creatiancy.com', role_name: 'Finance Admin' },
  { id: 'usr-3', full_name: 'Client Manager', email: 'cs@creatiancy.com', role_name: 'Client Service' },
  { id: 'usr-4', full_name: 'Project Coordinator', email: 'pm@creatiancy.com', role_name: 'Project Manager' }
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
    nagad_merchant: '01888776655'
  },
  {
    id: 'ent-2',
    legal_name: 'Creatiancy LLC',
    entity_code: 'CLLC',
    logo_url: '',
    registered_address: '1619 Broadway, Suite 500, New York, NY 10019, USA',
    registration_number: 'NY-CLLC-2026-98765',
    tax_id: 'EIN-12-3456789',
    email: 'billing@creatiancy.com',
    phone: '+1 212 555 0199',
    website: 'www.creatiancy.com',
    payment_instructions: 'Please wire transfer to our USD bank account. SWIFT/Routing code details below.',
    invoice_prefix: 'CLLC-USD',
    receipt_prefix: 'CLLC-REC',
    vat_footer: 'All rates are inclusive of applicable taxes in accordance with the prevailing laws.',
    bkash_merchant: '',
    nagad_merchant: ''
  }
];

const MOCK_BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bnk-1',
    entity_id: 'ent-1',
    bank_name: 'Fictional Trust Bank Bangladesh',
    account_holder: 'Creatiancy Limited',
    account_number: 'BDT-ACC-1002003004005',
    branch: 'Banani Branch',
    routing_number: '123456789',
    swift_bic: '',
    bank_address: 'Banani, Dhaka, Bangladesh',
    is_active: true
  },
  {
    id: 'bnk-2',
    entity_id: 'ent-2',
    bank_name: 'Fictional Apex Bank USA',
    account_holder: 'Creatiancy LLC',
    account_number: 'USD-ACC-9876543210',
    branch: 'Wall Street Branch',
    routing_number: '987654321',
    swift_bic: 'APEXUS33XXX',
    bank_address: 'Wall Street, New York, NY, USA',
    is_active: true
  }
];

const MOCK_CLIENTS: BillingClient[] = [
  {
    id: 'cli-1',
    client_type: 'company',
    company_name: 'Fictional Dhaka Tech Ltd',
    contact_person: 'Rahim Ahmed',
    billing_email: 'billing@dhakatech.local',
    additional_emails: ['info@dhakatech.local'],
    phone: '+880 1711 223344',
    billing_address: 'Gulshan 2, Dhaka, Bangladesh',
    city: 'Dhaka',
    country: 'Bangladesh',
    tax_number: 'TIN-999888777',
    preferred_currency: 'BDT',
    default_payment_terms: '15 Days',
    account_manager_id: 'usr-3',
    internal_note: 'Important client. Always pays on time.',
    status: 'active'
  },
  {
    id: 'cli-2',
    client_type: 'company',
    company_name: 'Fictional Boston Studios Inc',
    contact_person: 'Sarah Connor',
    billing_email: 'accounting@bostonstudios.local',
    additional_emails: ['sarah@bostonstudios.local'],
    phone: '+1 617 555 0122',
    billing_address: '100 Main St, Boston, MA 02108, USA',
    city: 'Boston',
    country: 'USA',
    tax_number: 'EIN-00-1122334',
    preferred_currency: 'USD',
    default_payment_terms: '30 Days',
    account_manager_id: 'usr-3',
    internal_note: 'US campaign contracts.',
    status: 'active'
  }
];

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    secure_token: 'token-inv-1',
    client_id: 'cli-1',
    currency: 'BDT',
    entity_id: 'ent-1',
    invoice_number: null,
    status: 'draft',
    issue_date: '2026-07-01',
    payment_terms: '15 Days',
    due_date: '2026-07-16',
    project_name: 'Website Redesign',
    service_period: 'July 2026',
    po_number: 'PO-BDT-001',
    reference_number: 'REF-DHAKA-101',
    account_manager_id: 'usr-3',
    discount_type: 'none',
    discount_value: 0,
    vat_rate: 15.00,
    vat_inclusive: true,
    client_note: 'Thank you for your business.',
    payment_instructions: 'Please transfer to our BDT bank account. Reference invoice number.',
    terms_conditions: 'Standard terms apply.',
    internal_note: 'Client requested VAT inclusive.',
    pdf_file_url: null,
    pdf_generated_at: null,
    created_by: 'usr-3',
    approved_by: null,
    approved_at: null,
    created_at: '2026-07-01T00:00:00Z',
    updated_at: '2026-07-01T00:00:00Z'
  },
  {
    id: 'inv-2',
    secure_token: 'token-inv-2',
    client_id: 'cli-2',
    currency: 'USD',
    entity_id: 'ent-2',
    invoice_number: null,
    status: 'draft',
    issue_date: '2026-07-05',
    payment_terms: '30 Days',
    due_date: '2026-08-04',
    project_name: 'Brand Identity Design',
    service_period: 'Q3 2026',
    po_number: 'PO-USD-002',
    reference_number: 'REF-BOSTON-202',
    account_manager_id: 'usr-3',
    discount_type: 'percentage',
    discount_value: 10,
    vat_rate: 0,
    vat_inclusive: true,
    client_note: 'Initial drafts approved.',
    payment_instructions: 'Please wire transfer to our USD bank account. SWIFT/Routing code details below.',
    terms_conditions: 'Standard terms apply.',
    internal_note: '10% discount approved by CS Lead.',
    pdf_file_url: null,
    pdf_generated_at: null,
    created_by: 'usr-3',
    approved_by: null,
    approved_at: null,
    created_at: '2026-07-05T00:00:00Z',
    updated_at: '2026-07-05T00:00:00Z'
  },
  {
    id: 'inv-3',
    secure_token: 'token-inv-3',
    client_id: 'cli-1',
    currency: 'BDT',
    entity_id: 'ent-1',
    invoice_number: 'CLTD-BDT-2026-0001',
    status: 'approved',
    issue_date: '2026-07-10',
    payment_terms: '15 Days',
    due_date: '2026-07-25',
    project_name: 'Mobile App Strategy',
    service_period: 'July 2026',
    po_number: 'PO-BDT-003',
    reference_number: 'REF-DHAKA-103',
    account_manager_id: 'usr-3',
    discount_type: 'fixed',
    discount_value: 5000,
    vat_rate: 15.00,
    vat_inclusive: true,
    client_note: 'Strategy document finalized.',
    payment_instructions: 'Please transfer to our BDT bank account. Reference invoice number.',
    terms_conditions: 'Standard terms apply.',
    internal_note: 'Urgent strategy consultation.',
    pdf_file_url: null,
    pdf_generated_at: null,
    created_by: 'usr-3',
    approved_by: 'usr-1',
    approved_at: '2026-07-10T12:00:00Z',
    created_at: '2026-07-10T00:00:00Z',
    updated_at: '2026-07-10T12:00:00Z'
  }
];

const MOCK_ITEMS: InvoiceItem[] = [
  { id: 'itm-1', invoice_id: 'inv-1', service_name: 'UX design workshop', description: 'Creative design thinking session', quantity: 2, unit: 'Day', rate: 25000, amount: 50000, sort_order: 0 },
  { id: 'itm-2', invoice_id: 'inv-1', service_name: 'Prototype development', description: 'Figma dynamic wireframes', quantity: 1, unit: 'Project', rate: 120000, amount: 120000, sort_order: 1 },
  { id: 'itm-3', invoice_id: 'inv-2', service_name: 'Logo concepts', description: '3 custom brand guidelines', quantity: 1, unit: 'Project', rate: 1500, amount: 1500, sort_order: 0 },
  { id: 'itm-4', invoice_id: 'inv-2', service_name: 'Stationery kit', description: 'Business cards & letterheads', quantity: 1, unit: 'Item', rate: 500, amount: 500, sort_order: 1 },
  { id: 'itm-5', invoice_id: 'inv-3', service_name: 'Strategic planning consultation', description: 'Review of roadmap and milestones', quantity: 1, unit: 'Milestone', rate: 75000, amount: 75000, sort_order: 0 },
  { id: 'itm-6', invoice_id: 'inv-3', service_name: 'Market analysis research', description: 'Competitor benchmarking study', quantity: 1, unit: 'Project', rate: 50000, amount: 50000, sort_order: 1 }
];

const MOCK_SNAPSHOTS: InvoiceSnapshot[] = [
  {
    invoice_id: 'inv-3',
    entity_snapshot: MOCK_ENTITIES[0],
    bank_snapshot: MOCK_BANK_ACCOUNTS[0],
    client_snapshot: MOCK_CLIENTS[0],
    totals_snapshot: {
      subtotal: 125000,
      discount_amount: 5000,
      total_payable: 120000,
      amount_paid: 0,
      amount_due: 120000
    }
  }
];

const MOCK_PAYMENTS: Payment[] = [];
const MOCK_EMAIL_LOGS: EmailLog[] = [];
const MOCK_AUDIT_LOGS: AuditLog[] = [];

// HELPER STATE MANAGEMENT USING LOCALSTORAGE (DEMO MODE ENGINE)
class LocalStore {
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

  get currentUser(): Profile {
    return this.getVal('current_user', MOCK_PROFILES[0]);
  }

  set currentUser(user: Profile) {
    this.setVal('current_user', user);
  }

  get profiles(): Profile[] {
    return this.getVal('profiles', MOCK_PROFILES);
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
    return localStore.invoices.find(i => i.secure_token === token);
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
  }
};
