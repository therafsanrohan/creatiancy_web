'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db, Invoice, BillingClient, InvoiceItem, Payment, BankAccount, BusinessEntity } from '@/lib/db';
import { calculateTotals, formatCurrency } from '@/lib/calculations';
import Link from 'next/link';
import { ArrowLeft, Printer, Send, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import NotificationModal from '@/components/NotificationModal';

export default function InvoicePreviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [client, setClient] = useState<BillingClient | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
  const [entity, setEntity] = useState<BusinessEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifyUrl, setVerifyUrl] = useState('');
  const [sharingWa, setSharingWa] = useState(false);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showNotif = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setModalState({ isOpen: true, title, message, type });
  };

  useEffect(() => {
    async function loadData() {
      try {
        const inv = await db.getInvoiceById(id);
        if (!inv) {
          router.push('/billing/invoices');
          return;
        }
        setInvoice(inv);

        // Build verification URL from token
        if (typeof window !== 'undefined' && inv.secure_token) {
          setVerifyUrl(`${window.location.origin}/invoice/${inv.secure_token}`);
        }
        
        // Set document title for PDF print filename
        if (typeof document !== 'undefined') {
          document.title = `Invoice_${inv.invoice_number || 'Draft'}`;
        }

        const cl = await db.getClientById(inv.client_id);
        if (cl) setClient(cl);

        const ents = await db.getEntities();
        const activeEnt = ents.find(e => e.id === inv.entity_id);
        if (activeEnt) setEntity(activeEnt);

        const invItems = await db.getInvoiceItems(id);
        setItems(invItems);

        const pays = await db.getPaymentsForInvoice(id);
        setPayments(pays);

        const banks = await db.getBankAccounts();
        const activeBank = banks.find(b => b.entity_id === inv.entity_id && b.is_active);
        if (activeBank) setBankAccount(activeBank);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, router]);

  useEffect(() => {
    if (!loading && invoice && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('whatsapp') === 'true') {
        window.history.replaceState({}, document.title, window.location.pathname);
        handleWhatsAppShare();
      }
    }
  }, [loading, invoice]);

  if (loading || !invoice) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  const totals = calculateTotals({
    items: items.map(i => ({ quantity: i.quantity, rate: i.rate })),
    discountType: invoice.discount_type,
    discountValue: invoice.discount_value,
    vatRate: invoice.vat_rate,
    vatInclusive: invoice.vat_inclusive,
    payments
  });

  const isBdt = invoice.currency === 'BDT';

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = async () => {
    try {
      setSharingWa(true);
      const element = document.getElementById('print-area') as HTMLElement;
      // @ts-ignore
      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt: any = {
        margin:       [5, 5, 5, 5],
        filename:     `Invoice_${invoice.invoice_number || 'Draft'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, allowTaint: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // 1. Generate & download PDF
      await html2pdf().set(opt).from(element).save();

      // 2. Build WhatsApp message with direct verification/public invoice URL
      const docLink = verifyUrl || (typeof window !== 'undefined' ? window.location.href : '');
      const message = `Hi ${client?.contact_person || 'there'},\n\nPlease find attached invoice *${invoice.invoice_number || 'Draft'}* for *${invoice.project_name}*.\n\n📄 *View & Download Digital Invoice:* ${docLink}\n\nThank you,\n${entity ? entity.legal_name : (isBdt ? 'Creatiancy Limited' : 'Creatiancy LLC')}`;

      // 3. Open WhatsApp Web / App directly
      const cleanPhone = client?.phone ? client.phone.replace(/[^0-9]/g, '') : '';
      const waUrl = cleanPhone
        ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`
        : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);
      // Direct fallback: open WhatsApp even if PDF stream encountered browser restriction
      const docLink = verifyUrl || (typeof window !== 'undefined' ? window.location.href : '');
      const message = `Hi ${client?.contact_person || 'there'},\n\nPlease find invoice *${invoice.invoice_number || 'Draft'}* for *${invoice.project_name}*.\n\n📄 *View Digital Invoice:* ${docLink}\n\nThank you,\n${entity ? entity.legal_name : (isBdt ? 'Creatiancy Limited' : 'Creatiancy LLC')}`;
      const cleanPhone = client?.phone ? client.phone.replace(/[^0-9]/g, '') : '';
      const waUrl = cleanPhone
        ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`
        : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }
    } finally {
      setSharingWa(false);
    }
  };

  const statusColor: Record<string, string> = {
    paid: 'bg-green-100 text-green-700 border-green-200',
    partially_paid: 'bg-amber-100 text-amber-700 border-amber-200',
    overdue: 'bg-red-100 text-red-700 border-red-200',
    sent: 'bg-blue-100 text-blue-700 border-blue-200',
    draft: 'bg-gray-100 text-gray-500 border-gray-200',
    void: 'bg-gray-100 text-gray-400 border-gray-200',
    approved: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] py-4 sm:py-8 px-2 sm:px-4">
      
      {/* Action Controls Header - hidden during print */}
      <div className="max-w-[210mm] mx-auto mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 bg-white border border-gray-100 p-3 sm:p-4 rounded-2xl shadow-sm no-print">
        <Link href={`/billing/invoices/${id}`} className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Invoice Ledger Details</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleWhatsAppShare}
            disabled={sharingWa}
            className="flex items-center space-x-1.5 rounded-lg bg-[#25D366] py-2 px-4 text-xs font-bold text-white hover:bg-[#128C7E] shadow-sm transition cursor-pointer disabled:opacity-50"
          >
            {sharingWa ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span>Send via WhatsApp</span>
          </button>
          <button
            id="btn-print-invoice-preview"
            onClick={handlePrint}
            className="flex items-center space-x-1.5 rounded-lg bg-[#9B1C22] py-2 px-4 text-xs font-bold text-white hover:bg-[#7d1219] shadow-sm transition cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* A4 Canvas - scrollable horizontally on mobile */}
      <div className="overflow-x-auto">
      <div
        id="print-area"
        className="min-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg border border-gray-100 p-6 sm:p-12 text-[#1E1E1E] flex flex-col justify-between font-sans relative select-none"
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        <div className="print-watermark">Creatiancy Original</div>
        
        {/* Document Top */}
        <div>
          {/* Header block */}
          <div className="flex justify-between items-start pb-8 border-b border-gray-100">
            <div>
              {/* Creatiancy Logo */}
              <div className="flex items-center space-x-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/Creatiancy%20logo.svg"
                  alt="Creatiancy"
                  className="h-7 sm:h-8 md:h-9 w-auto max-w-[200px] object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/logos/Creatiancy logo.svg'; }}
                />
              </div>

              {/* Entity address particulars */}
              <div className="mt-5 text-[10px] text-gray-500 space-y-0.5 leading-normal">
                <span className="font-bold text-gray-800 block">
                  {entity ? entity.legal_name : (isBdt ? 'Creatiancy Limited' : 'Creatiancy LLC')}
                </span>
                <span>
                  {entity ? entity.registered_address : (isBdt
                    ? 'House 12, Road 4, Banani, Dhaka 1213, Bangladesh'
                    : '1619 Broadway, Suite 500, New York, NY 10019, USA')}
                </span>
                <span className="block">
                  Registration: {entity ? entity.registration_number : (isBdt ? 'C-CLTD-DHAKA-2026' : 'NY-CLLC-2026-98765')}
                </span>
                <span className="block">
                  {isBdt ? 'TIN / BIN: ' : 'EIN: '}{entity ? entity.tax_id : (isBdt ? 'TIN-BIN-CLTD-123456' : 'EIN-12-3456789')}
                </span>
                <span>Email: {entity ? entity.email : 'billing@creatiancy.com'} • Phone: {entity ? entity.phone : '+880 1325 078 941'}</span>
              </div>
            </div>

            {/* Invoice meta + status */}
            <div className="text-right flex flex-col items-end space-y-4">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-200 tracking-widest uppercase">INVOICE</h2>
                {invoice.status && (
                  <span className={`mt-1 inline-block rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${statusColor[invoice.status] || 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                    {invoice.status.replace(/_/g, ' ')}
                  </span>
                )}
              </div>
              
              <div className="space-y-1.5 text-xs text-gray-500">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Invoice Number</span>
                  <span className="font-bold text-gray-800">{invoice.invoice_number || 'DRAFT-PENDING'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Issue Date</span>
                  <span className="font-bold text-gray-800">{invoice.issue_date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Due Date</span>
                  <span className="font-bold text-[#9B1C22]">{invoice.due_date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing particulars split */}
          <div className="grid grid-cols-2 gap-8 py-8 border-b border-gray-100 text-xs">
            <div>
              <span className="font-bold text-gray-400 uppercase tracking-wider block text-[10px] mb-2">BILL TO:</span>
              {client ? (
                <div className="space-y-1 text-gray-600 leading-normal">
                  <p className="font-bold text-gray-800 text-sm">{client.company_name || client.contact_person}</p>
                  {client.company_name && <p className="font-semibold text-xs">{client.contact_person}</p>}
                  <p>{client.billing_address}</p>
                  <p>{client.city}, {client.country}</p>
                  <p>Email: {client.billing_email}</p>
                  {client.tax_number && <p className="font-semibold">Tax/VAT ID: {client.tax_number}</p>}
                </div>
              ) : (
                <span className="text-gray-400 italic">No client profile mapped</span>
              )}
            </div>

            <div>
              <span className="font-bold text-gray-400 uppercase tracking-wider block text-[10px] mb-2">PROJECT INFORMATION:</span>
              <div className="space-y-1 text-gray-600">
                <p className="font-bold text-gray-800 text-sm">{invoice.project_name}</p>
                {invoice.service_period && (
                  <p className="text-xs">
                    <span className="font-semibold text-gray-400 block text-[9px] uppercase">Service Period</span>
                    <span className="font-semibold">{invoice.service_period}</span>
                  </p>
                )}
                {invoice.po_number && <p>PO Number: <span className="font-semibold">{invoice.po_number}</span></p>}
                {invoice.reference_number && <p>Reference: <span className="font-semibold">{invoice.reference_number}</span></p>}
              </div>
            </div>
          </div>

          {/* Items table */}
          <div className="py-8">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[9px]">
                  <th className="py-2.5">Service Lines Description</th>
                  <th className="py-2.5 text-right">Quantity</th>
                  <th className="py-2.5 text-right">Rate</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {items.map((itm) => (
                  <tr key={itm.id} className="align-top">
                    <td className="py-4">
                      <span className="font-bold text-gray-800 block text-xs">{itm.service_name}</span>
                      {itm.description && <span className="text-[10px] text-gray-400 leading-normal block mt-0.5">{itm.description}</span>}
                    </td>
                    <td className="py-4 text-right">{itm.quantity} {itm.unit}</td>
                    <td className="py-4 text-right">{formatCurrency(itm.rate, invoice.currency)}</td>
                    <td className="py-4 text-right font-bold text-gray-800">{formatCurrency(itm.quantity * itm.rate, invoice.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Document Bottom */}
        <div>
          {/* Summary totals and Payment bank accounts split */}
          <div className="grid grid-cols-12 gap-6 border-t border-gray-150 pt-8">
            {/* Left side: Payment details + QR */}
            <div className="col-span-7 space-y-3.5 text-[9px] leading-relaxed">
              <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px] block">PAYMENT INSTRUCTIONS:</span>
              
              {bankAccount ? (
                <div className="space-y-1 text-gray-500 rounded-xl bg-gray-50 p-3 border border-gray-100">
                  <p className="font-bold text-gray-800 text-xs">{bankAccount.bank_name}</p>
                  <p><span className="font-semibold text-gray-400">Account Name:</span> {bankAccount.account_holder}</p>
                  <p><span className="font-semibold text-gray-400">Account Number:</span> {bankAccount.account_number}</p>
                  {bankAccount.branch && <p><span className="font-semibold text-gray-400">Branch Name:</span> {bankAccount.branch}</p>}
                  {bankAccount.routing_number && <p><span className="font-semibold text-gray-400">Routing Code:</span> {bankAccount.routing_number}</p>}
                  {bankAccount.swift_bic && <p><span className="font-semibold text-gray-400">SWIFT / BIC:</span> {bankAccount.swift_bic}</p>}
                  {bankAccount.bank_address && <p><span className="font-semibold text-gray-400">Bank Address:</span> {bankAccount.bank_address}</p>}
                </div>
              ) : (
                <p className="text-gray-400 italic">No default bank account configured.</p>
              )}

              {/* Mobile Wallets for BDT entity */}
              {isBdt && (entity?.bkash_merchant || entity?.nagad_merchant) && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-2">
                  <p className="font-semibold text-[10px] text-gray-400 uppercase tracking-wider">Mobile Wallet (Merchant)</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {entity.bkash_merchant && (
                      <div className="flex flex-col rounded-lg bg-white p-2 border border-gray-100/80">
                        <span className="text-[10px] font-semibold text-gray-500">bKash Merchant</span>
                        <span className="font-mono font-bold text-gray-900 mt-0.5">{entity.bkash_merchant}</span>
                      </div>
                    )}
                    {entity.nagad_merchant && (
                      <div className="flex flex-col rounded-lg bg-white p-2 border border-gray-100/80">
                        <span className="text-[10px] font-semibold text-gray-500">Nagad Merchant</span>
                        <span className="font-mono font-bold text-gray-900 mt-0.5">{entity.nagad_merchant}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {invoice.payment_instructions && (
                <p className="text-gray-400 italic block text-[8px]">{invoice.payment_instructions}</p>
              )}

              {/* QR Code Verification Block */}
              {verifyUrl && (
                <div className="mt-2 flex items-start space-x-2.5 rounded-xl border border-[#9B1C22]/20 bg-[#9B1C22]/4 p-2.5">
                  <QRCodeSVG
                    value={verifyUrl}
                    size={48}
                    bgColor="#ffffff"
                    fgColor="#9B1C22"
                    level="H"
                    marginSize={1}
                  />
                  <div>
                    <p className="font-bold text-[#9B1C22] text-[9px] uppercase tracking-wider">Verify Invoice Authenticity</p>
                    <p className="text-gray-500 text-[8px] leading-relaxed mt-0.5">
                      Scan this QR code to confirm this document was officially issued by Creatiancy. Any alteration will invalidate this verification.
                    </p>
                    <p className="mt-1 text-[7px] text-gray-400 break-all font-mono">{verifyUrl}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right side: Ledger totals */}
            <div className="col-span-5 flex flex-col justify-start">
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Subtotal:</span>
                  <span className="font-bold">{formatCurrency(totals.subtotal, invoice.currency)}</span>
                </div>
                
                {invoice.discount_type !== 'none' && (
                  <div className="flex justify-between text-[#9B1C22]">
                    <span className="font-semibold">Discount Adjustment:</span>
                    <span className="font-bold">-{formatCurrency(totals.discountAmount, invoice.currency)}</span>
                  </div>
                )}

                {isBdt && invoice.vat_rate > 0 && (
                  <div className="flex justify-between text-gray-500">
                    <span className="font-semibold">
                      VAT ({invoice.vat_rate}% {invoice.vat_inclusive ? 'Included' : 'Exclusive'}):
                    </span>
                    <span className="font-bold">{formatCurrency(totals.vatAmount, invoice.currency)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-gray-100 pt-2 text-sm font-extrabold text-[#9B1C22]">
                  <span>Total Payable:</span>
                  <span>{formatCurrency(totals.totalPayable, invoice.currency)}</span>
                </div>

                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Amount Paid:</span>
                  <span>{formatCurrency(totals.amountPaid, invoice.currency)}</span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-2 text-xs font-bold text-gray-800">
                  <span>Amount Due:</span>
                  <span>{formatCurrency(totals.amountDue, invoice.currency)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal footer */}
          <div className="mt-8 pt-4 border-t border-gray-100 text-[8px] text-gray-400 text-center leading-normal space-y-1">
            <p className="font-bold text-[#9B1C22] tracking-wide">
              {entity ? entity.legal_name : (isBdt ? 'Creatiancy Limited' : 'Creatiancy LLC')}
            </p>
            <p className="text-gray-400">
              {isBdt
                ? 'All rates are inclusive of applicable VAT in accordance with the prevailing laws and regulations of Bangladesh.'
                : 'All rates are inclusive of applicable taxes in accordance with the prevailing laws and regulations.'}
            </p>
            <div className="pt-2 border-t border-dashed border-gray-200 text-[8px] text-gray-400">
              This invoice is computer-generated and requires no physical signature.
            </div>
          </div>
        </div>

      </div>
      </div>
      
      <NotificationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
      />
    </div>
  );
}
