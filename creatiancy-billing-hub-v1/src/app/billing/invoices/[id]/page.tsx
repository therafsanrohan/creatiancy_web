'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db, Invoice, BillingClient, BusinessEntity, Profile, InvoiceItem, Payment, EmailLog, GatewayRates, localStore } from '@/lib/db';
import { calculateTotals, formatCurrency } from '@/lib/calculations';
import NotificationModal from '@/components/NotificationModal';
import Link from 'next/link';
import {
  ArrowLeft,
  Printer,
  Mail,
  Download,
  CreditCard,
  Ban,
  CheckCircle,
  FileText,
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Send,
  Loader2,
  Percent,
  ArrowDownRight,
  MessageCircle
} from 'lucide-react';

export default function InvoiceDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [client, setClient] = useState<BillingClient | null>(null);
  const [entity, setEntity] = useState<BusinessEntity | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal and action states
  const [recordingPayment, setRecordingPayment] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form states for manual payment
  const [payDate, setPayDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [payAmount, setPayAmount] = useState(0);
  const [payMethod, setPayMethod] = useState('Bank Transfer');
  const [payRef, setPayRef] = useState('');
  const [payNote, setPayNote] = useState('');

  // Form states for emailing
  const [emailRecipient, setEmailRecipient] = useState('');
  const [emailCC, setEmailCC] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [fromEmail, setFromEmail] = useState('billing@creatiancy.com');

  // Platform Gateway Cutoff Fee states
  const [feePreset, setFeePreset] = useState<'none' | 'bkash' | 'nagad' | 'card' | 'amex' | 'stripe' | 'payoneer' | 'wise' | 'custom'>('none');
  const [feeRate, setFeeRate] = useState<number>(0);
  const [customFeeAmount, setCustomFeeAmount] = useState<number>(0);
  const [gatewayRates, setGatewayRates] = useState<GatewayRates>({
    bkash: 1.85, nagad: 1.50, card: 2.50, amex: 3.50,
    stripe: 2.90, payoneer: 2.00, wise: 0.50
  });

  // Modal notification state
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
    async function loadInvoiceDetails() {
      try {
        const u = await db.getCurrentUser();
        setCurrentUser(u);

        const inv = await db.getInvoiceById(id);
        if (!inv) {
          router.push('/billing/invoices');
          return;
        }
        setInvoice(inv);

        const ents = await db.getEntities();
        const activeEnt = ents.find(e => e.id === inv.entity_id) || ents.find(e => e.entity_code === (inv.currency === 'BDT' ? 'CLTD' : 'CLLC'));
        if (activeEnt) setEntity(activeEnt);

        const cl = await db.getClientById(inv.client_id);
        if (cl) {
          setClient(cl);
          setEmailRecipient(cl.billing_email);
          const companyEmail = activeEnt?.email || 'billing@creatiancy.com';
          const ccList = [companyEmail, ...(cl.additional_emails || [])].filter(Boolean).join(', ');
          setEmailCC(ccList);
          
          const subject = `Invoice ${inv.invoice_number || 'Draft'} from ${activeEnt?.legal_name || (inv.currency === 'BDT' ? 'Creatiancy Limited' : 'Creatiancy LLC')}`;
          setEmailSubject(subject);
          
          setEmailMessage(
            `Hi ${cl.contact_person},\n\nPlease find attached invoice ${inv.invoice_number || 'Draft'} for ${inv.project_name}.\n\nThank you,\n${activeEnt?.legal_name || 'Creatiancy Billing Team'}`
          );
        }

        const invItems = await db.getInvoiceItems(id);
        setItems(invItems);

        const pays = await db.getPaymentsForInvoice(id);
        setPayments(pays);

        const logs = await db.getEmailLogs();
        setEmailLogs(logs.filter(l => l.invoice_id === id));

        // Load from email setting
        const fEmail = await db.getFromEmail();
        setFromEmail(fEmail);

        // Load gateway rates
        const rates = await db.getGatewayRates();
        setGatewayRates(rates);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadInvoiceDetails();
  }, [id, router]);

  if (loading || !invoice || !currentUser) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  // Safe Math Totals
  const totals = calculateTotals({
    items: items.map(i => ({ quantity: i.quantity, rate: i.rate })),
    discountType: invoice.discount_type,
    discountValue: invoice.discount_value,
    vatRate: invoice.vat_rate,
    vatInclusive: invoice.vat_inclusive,
    payments
  });

  const getStatusBadgeColor = (status: Invoice['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-purple-100 text-purple-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partially_paid': return 'bg-cyan-100 text-cyan-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'void': return 'bg-gray-200 text-gray-500 line-through';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = async () => {
    if (!confirm('Approve this invoice? This will lock calculations and generate an immutable sequence number.')) return;
    setActionLoading(true);
    try {
      const updated = await db.approveInvoice(id);
      setInvoice({ ...updated });
      // Reload page to refresh snapshots
      window.location.reload();
    } catch (err: any) {
      showNotif('Approval Failed', err.message || 'Approval failed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleVoid = async () => {
    if (!confirm('Void this invoice? This action CANNOT be undone and the invoice sequence will remain locked.')) return;
    setActionLoading(true);
    try {
      const updated = await db.voidInvoice(id);
      setInvoice({ ...updated });
      window.location.reload();
    } catch (err: any) {
      showNotif('Void Failed', 'Void failed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmitApproval = async () => {
    setActionLoading(true);
    try {
      const updated = await db.submitForApproval(id);
      setInvoice({ ...updated });
      window.location.reload();
    } catch (err: any) {
      showNotif('Submission Failed', 'Submission failed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Calculate platform cutoff fee amount based on selection
  const calculatedProcessingFee = (): number => {
    if (feePreset === 'custom') {
      return customFeeAmount;
    }
    if (feeRate > 0 && payAmount > 0) {
      return parseFloat(((payAmount * feeRate) / 100).toFixed(2));
    }
    return 0;
  };

  const handlePresetSelect = (preset: 'none' | 'bkash' | 'nagad' | 'card' | 'amex' | 'stripe' | 'payoneer' | 'wise' | 'custom', rate: number = 0) => {
    setFeePreset(preset);
    setFeeRate(rate);
    if (preset !== 'custom') {
      setCustomFeeAmount(0);
    }
    if (preset === 'bkash') setPayMethod('Mobile Financial Service (bKash)');
    if (preset === 'nagad') setPayMethod('Mobile Financial Service (Nagad)');
    if (preset === 'card' || preset === 'amex') setPayMethod('Card Payment');
    if (preset === 'stripe') setPayMethod('Stripe');
    if (preset === 'payoneer') setPayMethod('Payoneer');
    if (preset === 'wise') setPayMethod('Wise (TransferWise)');
    if (preset === 'none') setPayMethod('Bank Transfer');
  };

  const handleRecordPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payAmount <= 0) {
      showNotif('Invalid Amount', 'Payment amount must be greater than zero.', 'error');
      return;
    }
    if (payAmount > totals.amountDue) {
      showNotif('Warning', 'Warning: Payment amount exceeds outstanding balance.', 'info');
      // Continue anyway or return? Usually warning is just informational but let's prevent or let it log.
    }

    setActionLoading(true);
    try {
      const pFee = calculatedProcessingFee();
      const p = await db.recordPayment({
        invoice_id: id,
        payment_date: payDate,
        amount: payAmount,
        currency: invoice.currency,
        payment_method: payMethod,
        transaction_reference: payRef.trim(),
        bank_gateway: feePreset !== 'none' ? feePreset.toUpperCase() : '',
        processing_fee: pFee,
        internal_note: payNote.trim(),
        proof_url: null,
        recorded_by: currentUser.id
      });
      
      setPayments([...payments, p]);
      setRecordingPayment(false);
      
      // Reload details
      window.location.reload();
    } catch (err: any) {
      showNotif('Payment Failed', err.message || 'Payment recording failed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      // Simulate Resend Email send request
      await new Promise(res => setTimeout(res, 1200));

      await db.logEmail({
        invoice_id: id,
        recipient: emailRecipient,
        cc: emailCC,
        email_type: 'invoice',
        subject: emailSubject,
        message_body: emailMessage,
        provider_message_id: `resend_msg_${Date.now()}`,
        delivery_status: 'success',
        error_message: null
      });

      // Save from email if changed by super admin
      await db.setFromEmail(fromEmail);

      setSendingEmail(false);
      showNotif('Email Dispatched', 'Billing email dispatched successfully with invoice attachment.', 'success');
      window.location.reload();
    } catch (err) {
      showNotif('Dispatch Failed', 'Email dispatch failed. Please try again.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const isSuperAdmin = currentUser.role_name === 'Super Admin';
  const isFinanceAdmin = currentUser.role_name === 'Finance Admin';
  const isCS = currentUser.role_name === 'Client Service';
  const isPM = currentUser.role_name === 'Project Manager';
  const isViewer = false;

  const canApprove = (isSuperAdmin || isFinanceAdmin) && (invoice.status === 'pending_approval' || invoice.status === 'draft');
  const canVoid = (isSuperAdmin || isFinanceAdmin) && invoice.status !== 'void' && invoice.status !== 'draft';
  const canEdit = invoice.status === 'draft' || invoice.status === 'pending_approval';
  const canRecordPay = (isSuperAdmin || isFinanceAdmin) && invoice.status !== 'paid' && invoice.status !== 'void' && invoice.status !== 'draft';
  const canSubmit = invoice.status === 'draft' && !isViewer;
  const canEmail = invoice.status !== 'draft' && invoice.status !== 'void' && !isViewer && !isPM;

  return (
    <div className="space-y-6">
      
      {/* Top back bar */}
      <div>
        <Link href="/billing/invoices" className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-900 no-print">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Invoices Ledger</span>
        </Link>
      </div>

      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-4 no-print">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {invoice.invoice_number || 'Draft Invoice'}
            </h1>
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${getStatusBadgeColor(invoice.status)}`}>
              {invoice.status}
            </span>
          </div>
          <p className="text-sm text-gray-550 mt-1">
            Project: {invoice.project_name} • Client: {client?.company_name || client?.contact_person}
          </p>
        </div>

        {/* Public view shortcut link */}
        {invoice.status !== 'draft' && (
          <Link
            href={`/invoice/${invoice.secure_token}`}
            target="_blank"
            className="text-xs font-bold text-[#9B1C22] flex items-center bg-[#9B1C22]/5 px-3 py-1.5 rounded-lg hover:bg-[#9B1C22]/10"
          >
            <span>Public Client Link</span>
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Link>
        )}
      </div>

      {/* Content Split: Details left, Actions column right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Details and Payments Log (Left side) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Invoice Summary Box */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs border-b border-gray-50 pb-6">
              <div>
                <span className="text-gray-400 font-semibold uppercase block">Issue Date</span>
                <span className="text-sm font-bold text-gray-800 block mt-1">{invoice.issue_date}</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold uppercase block">Terms</span>
                <span className="text-sm font-bold text-gray-800 block mt-1">{invoice.payment_terms}</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold uppercase block">Due Date</span>
                <span className="text-sm font-bold text-gray-850 block mt-1">{invoice.due_date}</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold uppercase block">Legal Entity</span>
                <span className="text-sm font-bold text-[#9B1C22] block mt-1">
                  {entity?.legal_name || (invoice.currency === 'BDT' ? 'Creatiancy Limited' : 'Creatiancy LLC')}
                </span>
              </div>
            </div>

            {/* Service Items Table */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Line Items breakdown</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold">
                      <th className="py-2 pr-2">Service description</th>
                      <th className="py-2 text-right">Quantity</th>
                      <th className="py-2 text-right">Rate</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {items.map((itm) => (
                      <tr key={itm.id}>
                        <td className="py-3 pr-2">
                          <span className="font-semibold block">{itm.service_name}</span>
                          {itm.description && <span className="text-[10px] text-gray-400 leading-normal block">{itm.description}</span>}
                        </td>
                        <td className="py-3 text-right text-gray-650">{itm.quantity} {itm.unit}</td>
                        <td className="py-3 text-right text-gray-650">{formatCurrency(itm.rate, invoice.currency)}</td>
                        <td className="py-3 text-right font-semibold">{formatCurrency(itm.quantity * itm.rate, invoice.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations Panel */}
            <div className="flex justify-end pt-6 border-t border-gray-100">
              <div className="w-64 space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Subtotal:</span>
                  <span className="font-bold">{formatCurrency(totals.subtotal, invoice.currency)}</span>
                </div>
                
                {invoice.discount_type !== 'none' && (
                  <div className="flex justify-between text-[#9B1C22]">
                    <span className="font-semibold">Discount ({invoice.discount_type === 'percentage' ? `${invoice.discount_value}%` : 'Fixed'}):</span>
                    <span className="font-bold">-{formatCurrency(totals.discountAmount, invoice.currency)}</span>
                  </div>
                )}

                {invoice.currency === 'BDT' && invoice.vat_rate > 0 && (
                  <div className="flex justify-between text-gray-450">
                    <span className="font-semibold">VAT ({invoice.vat_rate}% Included):</span>
                    <span className="font-bold">{formatCurrency(totals.vatAmount, invoice.currency)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-gray-100 pt-2.5 text-sm font-extrabold text-[#9B1C22]">
                  <span>Total Payable:</span>
                  <span>{formatCurrency(totals.totalPayable, invoice.currency)}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span className="font-semibold">Amount Paid:</span>
                  <span className="font-bold">{formatCurrency(totals.amountPaid, invoice.currency)}</span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-2 text-xs font-bold text-gray-800">
                  <span>Remaining Due:</span>
                  <span>{formatCurrency(totals.amountDue, invoice.currency)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Payment Transactions Log */}
          {invoice.status !== 'draft' && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-gray-450 uppercase tracking-wider">Payments Ledger Log</h3>
              
              {payments.length === 0 ? (
                <div className="text-sm text-gray-400 py-4 text-center">No payment transactions registered yet.</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {payments.map((p) => (
                    <div key={p.id} className="flex justify-between items-center py-3 text-xs">
                      <div>
                        <span className="font-bold block">Receipt: {p.receipt_number}</span>
                        <span className="text-gray-400 block mt-0.5">Method: {p.payment_method} • Ref: {p.transaction_reference || 'N/A'}</span>
                        {p.internal_note && <span className="text-[10px] text-gray-450 italic mt-1 block">Note: {p.internal_note}</span>}
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-green-600 block">{formatCurrency(p.amount, invoice.currency)}</span>
                        <span className="text-gray-400 block mt-0.5">{p.payment_date}</span>
                        <Link
                          href={`/billing/receipts/${p.id}`}
                          className="inline-block text-[10px] text-[#9B1C22] hover:underline mt-1 font-semibold"
                        >
                          View Receipt
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Email Logs */}
          {invoice.status !== 'draft' && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-gray-450 uppercase tracking-wider">CC Billing Email History Log</h3>
              
              {emailLogs.length === 0 ? (
                <div className="text-sm text-gray-400 py-4 text-center">No emails dispatched yet.</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {emailLogs.map((log) => (
                    <div key={log.id} className="py-3 text-xs">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-800">To: {log.recipient}</span>
                        <span className="text-gray-400">{log.sent_at.split('T')[0]}</span>
                      </div>
                      <p className="text-gray-600 mt-1 truncate">Subject: {log.subject}</p>
                      <div className="flex justify-between items-center mt-1.5">
                        <span className="text-[10px] text-gray-400 font-mono">ID: {log.provider_message_id}</span>
                        <span className={`inline-block rounded px-1.5 py-0.2 text-[9px] uppercase font-semibold ${
                          log.delivery_status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                        }`}>
                          {log.delivery_status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Action Controls Sidebar Panel (Right side) */}
        <div className="lg:col-span-4 space-y-6 no-print">
          
          <div className="bg-[#FBFDF9] border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Invoice Actions Panel</h3>

            <div className="flex flex-col gap-2.5">
              
              {/* Approve Trigger */}
              {canApprove && (
                <button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-green-600 py-3 text-xs font-bold text-white hover:bg-green-700 shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                  <span>Approve & Finalize</span>
                </button>
              )}

              {/* Submit for Approval */}
              {canSubmit && (
                <button
                  onClick={handleSubmitApproval}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#9B1C22] py-3 text-xs font-bold text-white hover:bg-[#9B1C22]/90 shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                  <span>Submit for Approval</span>
                </button>
              )}

              {/* Edit draft Link */}
              {canEdit && (
                <Link
                  href={`/billing/invoices/${id}/edit`}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold hover:bg-gray-50 text-center transition"
                >
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>Modify Draft Details</span>
                </Link>
              )}

              {/* Direct A4 Print and Browser Preview */}
              {invoice.status !== 'draft' && (
                <Link
                  href={`/billing/invoices/${id}/preview`}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold hover:bg-gray-50 text-center transition"
                >
                  <Printer className="h-4 w-4 text-gray-500" />
                  <span>A4 Print & Live Document</span>
                </Link>
              )}

              {/* Dispatch Email controls */}
              {canEmail && (
                <button
                  onClick={() => setSendingEmail(true)}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold hover:bg-gray-50 transition cursor-pointer"
                >
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>Send CC Invoice Email</span>
                </button>
              )}

              {/* Send via WhatsApp (Routes to preview with query param) */}
              {invoice.status !== 'draft' && (
                <Link
                  href={`/billing/invoices/${id}/preview?whatsapp=true`}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#25D366] py-3 text-xs font-bold text-white hover:bg-[#128C7E] shadow-sm transition"
                >
                  <Send className="h-4 w-4" />
                  <span>Send via WhatsApp</span>
                </Link>
              )}

              {/* Record manual payment trigger */}
              {canRecordPay && (
                <button
                  onClick={() => {
                    setPayAmount(totals.amountDue);
                    setRecordingPayment(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#1E1E1E] py-3 text-xs font-bold text-white hover:bg-black shadow-md transition cursor-pointer"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Record Cash/Wire Payment</span>
                </button>
              )}

              {/* Void Trigger */}
              {canVoid && (
                <button
                  onClick={handleVoid}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 py-3 text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                >
                  <Ban className="h-4 w-4" />
                  <span>Void Invoice Number</span>
                </button>
              )}

            </div>
          </div>

          {/* Confidential internal notes container */}
          {invoice.internal_note && (
            <div className="rounded-2xl border border-red-100 bg-red-50/20 p-5 space-y-2 text-xs">
              <span className="font-extrabold text-[#9B1C22] block uppercase tracking-wider">Internal Admin Notes</span>
              <p className="text-gray-600 leading-normal">{invoice.internal_note}</p>
            </div>
          )}

        </div>

      </div>

      {/* Manual Payment Recording Dialog Modal */}
      {recordingPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50 no-print">
          <div className="bg-white border border-gray-100 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-md flex items-center space-x-2">
              <CreditCard className="h-4.5 w-4.5 text-[#9B1C22]" />
              <span>Record Wire or Cash Payment & Gateway Cutoff</span>
            </h3>
            
            <form onSubmit={handleRecordPaymentSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1.5">Payment Date *</label>
                  <input
                    type="date"
                    required
                    value={payDate}
                    onChange={(e) => setPayDate(e.target.value)}
                    className="block w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#9B1C22]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1.5">Payment Amount ({invoice.currency}) *</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={payAmount}
                    onChange={(e) => setPayAmount(parseFloat(e.target.value) || 0)}
                    className="block w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-xs text-[#1E1E1E] focus:outline-none font-bold focus:border-[#9B1C22]"
                  />
                </div>
              </div>

              {/* Platform Gateway Cutoff Fee Section */}
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-[#1E1E1E] flex items-center space-x-1.5 text-xs">
                    <Percent className="h-3.5 w-3.5 text-[#9B1C22]" />
                    <span>Platform / Gateway Cutoff Fee</span>
                  </label>
                  <span className="text-[10px] text-gray-400 font-medium">Auto-deducted fee</span>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'none', label: 'No Fee (0%)', rate: 0 },
                    { id: 'bkash', label: `bKash (${gatewayRates.bkash}%)`, rate: gatewayRates.bkash },
                    { id: 'nagad', label: `Nagad (${gatewayRates.nagad}%)`, rate: gatewayRates.nagad },
                    { id: 'card', label: `Card (${gatewayRates.card}%)`, rate: gatewayRates.card },
                    { id: 'amex', label: `AMEX (${gatewayRates.amex}%)`, rate: gatewayRates.amex },
                    { id: 'stripe', label: `Stripe (${gatewayRates.stripe}%)`, rate: gatewayRates.stripe },
                    { id: 'payoneer', label: `Payoneer (${gatewayRates.payoneer}%)`, rate: gatewayRates.payoneer },
                    { id: 'wise', label: `Wise (${gatewayRates.wise}%)`, rate: gatewayRates.wise },
                    { id: 'custom', label: 'Custom Cutoff', rate: 0 }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePresetSelect(p.id as any, p.rate)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition cursor-pointer ${
                        feePreset === p.id
                          ? 'border-[#9B1C22] bg-[#9B1C22]/10 text-[#9B1C22]'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Custom Amount input if custom selected */}
                {feePreset === 'custom' && (
                  <div className="pt-2">
                    <label className="block text-[10px] font-semibold text-gray-555 mb-1">Enter Cutoff Fee Amount</label>
                    <input
                      type="number"
                      step="any"
                      value={customFeeAmount}
                      onChange={(e) => setCustomFeeAmount(parseFloat(e.target.value) || 0)}
                      className="block w-full rounded-lg border border-gray-200 bg-white py-1.5 px-3 text-xs focus:outline-none"
                      placeholder="Cutoff fee in currency"
                    />
                  </div>
                )}

                {/* Cutoff summary calculation */}
                <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Cutoff Money: <strong className="text-amber-700">{calculatedProcessingFee().toFixed(2)}</strong></span>
                  <span className="text-gray-700 font-bold">Net Received: <strong className="text-emerald-600 font-extrabold font-sans">{(payAmount - calculatedProcessingFee()).toFixed(2)}</strong></span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Payment Method</label>
                <input
                  type="text"
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  placeholder="e.g. Bank Transfer, bKash Merchant, Visa Card"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Transaction reference ID</label>
                <input
                  type="text"
                  value={payRef}
                  onChange={(e) => setPayRef(e.target.value)}
                  placeholder="e.g. TXN-9902030 or Bank wire code"
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Internal Note</label>
                <textarea
                  rows={2}
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none resize-y"
                  placeholder="Confidential transaction specifics"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setRecordingPayment(false)}
                  className="rounded-lg border border-gray-200 bg-white py-2 px-4 font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-lg bg-[#9B1C22] py-2 px-6 font-semibold text-white hover:bg-[#9B1C22]/90 disabled:opacity-50 cursor-pointer"
                >
                  {actionLoading ? 'Saving...' : 'Register Payment'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Sending CC Email Dialog Modal */}
      {sendingEmail && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50 no-print">
          <div className="bg-white border border-gray-100 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-md flex items-center space-x-2">
              <Mail className="h-4.5 w-4.5 text-[#9B1C22]" />
              <span>Send CC Invoice Email</span>
            </h3>
            
            <form onSubmit={handleSendEmail} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-555 mb-1 flex justify-between items-center">
                  <span>From Email (Sender)</span>
                  {!isSuperAdmin && <span className="text-[9px] text-gray-400 font-normal">(Only Super Admin can modify)</span>}
                </label>
                <input
                  type="email"
                  required
                  readOnly={!isSuperAdmin}
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none read-only:bg-gray-50 read-only:text-gray-500"
                />
                <span className="text-[10px] text-gray-400 mt-0.5 block">This is the sender address shown in the billing email. Only Super Admin can change it.</span>
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1 flex justify-between items-center">
                  <span>Billing Recipient</span>
                  {!isSuperAdmin && <span className="text-[9px] text-gray-400 font-normal">(Only Super Admin can modify)</span>}
                </label>
                <input
                  type="email"
                  required
                  readOnly={!isSuperAdmin}
                  value={emailRecipient}
                  onChange={(e) => setEmailRecipient(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none read-only:bg-gray-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">CC Recipients (Default: Company Mail)</label>
                <input
                  type="text"
                  value={emailCC}
                  onChange={(e) => setEmailCC(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  placeholder="billing@creatiancy.com, client@domain.com"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Email Subject</label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Message Body</label>
                <textarea
                  rows={4}
                  required
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none resize-y font-mono text-[10px]"
                />
              </div>

              <div className="rounded-lg bg-gray-50 p-3 text-[10px] text-gray-500 border border-gray-100">
                <span className="font-bold text-gray-700 block mb-0.5">Automated attachment:</span>
                This will automatically render and attach the invoice A4 PDF generated dynamically from the transaction records.
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setSendingEmail(false)}
                  className="rounded-lg border border-gray-200 bg-white py-2 px-4 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-lg bg-[#9B1C22] py-2 px-6 font-semibold text-white hover:bg-[#9B1C22]/90 disabled:opacity-50 cursor-pointer flex items-center space-x-1"
                >
                  {actionLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                  <span>Dispatch Email</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      <NotificationModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
      />

    </div>
  );
}
