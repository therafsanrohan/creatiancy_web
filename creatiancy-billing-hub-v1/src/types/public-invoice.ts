export interface PublicInvoiceViewModel {
  invoiceId: string;
  invoiceNumber: string;
  status: string;
  issueDate: string;
  dueDate: string;
  currency: 'BDT' | 'USD';
  projectName: string;
  servicePeriod?: string;
  poNumber?: string;
  referenceNumber?: string;
  items: Array<{
    serviceName: string;
    description: string;
    quantity: number;
    unit: string;
    rate: number;
    amount: number;
  }>;
  totals: {
    subtotal: number;
    discountAmount: number;
    vatAmount: number;
    totalPayable: number;
    amountPaid: number;
    amountDue: number;
  };
  client: {
    companyName: string;
    contactPerson: string;
    billingAddress: string;
    city: string;
    country: string;
    taxNumber?: string;
  };
  entity: {
    name: string;
    code: string;
    address: string;
    registrationNumber?: string;
    taxId?: string;
    email?: string;
    phone?: string;
    website?: string;
    bkashMerchant?: string;
    nagadMerchant?: string;
  };
  bankAccount?: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    branch: string;
    routingNumber?: string;
    swiftBic?: string;
  };
  paymentInstructions?: string;
  termsConditions?: string;
  canonicalToken: string;
  verificationUrl?: string;
  shortUrl?: string;
}

export type PublicInvoiceResult = 
  | { success: true; invoice: PublicInvoiceViewModel }
  | { success: false; redirectTo?: string; error: string };
