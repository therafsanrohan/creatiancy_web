'use client';

import { useState, useEffect } from 'react';
import { db, Payment, Invoice, BillingClient, Profile, localStore } from '@/lib/db';
import { calculateTotals, formatCurrency } from '@/lib/calculations';
import Link from 'next/link';
import { CircleDollarSign, Plus, Eye, Receipt, FileText } from 'lucide-react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<BillingClient[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  
  const [recordingPayment, setRecordingPayment] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states for manual recording
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [payDate, setPayDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [payAmount, setPayAmount] = useState(0);
  const [payMethod, setPayMethod] = useState('Bank Transfer');
  const [payRef, setPayRef] = useState('');
  const [payNote, setPayNote] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const u = await db.getCurrentUser();
        setCurrentUser(u);

        const allPays = await db.getPayments();
        setPayments(allPays);

        const allInvs = await db.getInvoices();
        setInvoices(allInvs);

        const allClients = await db.getClients();
        setClients(allClients);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getInvoiceNumber = (invoiceId: string) => {
    const inv = invoices.find(i => i.id === invoiceId);
    return inv ? (inv.invoice_number || 'Draft') : '—';
  };

  const getClientName = (invoiceId: string) => {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return '—';
    const c = clients.find(cl => cl.id === inv.client_id);
    return c ? (c.company_name || c.contact_person) : '—';
  };

  // Get only approved/sent/partially_paid invoices that still have balance due
  const getEligibleInvoices = () => {
    return invoices.filter(inv => {
      if (inv.status === 'draft' || inv.status === 'void' || inv.status === 'paid') return false;
      return true;
    });
  };

  const handleInvoiceChange = (invId: string) => {
    setSelectedInvoiceId(invId);
    const inv = invoices.find(i => i.id === invId);
    if (inv) {
      // Calculate outstanding balance automatically
      const items = localStore.items.filter(itm => itm.invoice_id === inv.id);
      const invPays = payments.filter(p => p.invoice_id === inv.id);
      const totals = calculateTotals({
        items,
        discountType: inv.discount_type,
        discountValue: inv.discount_value,
        vatRate: inv.vat_rate,
        vatInclusive: inv.vat_inclusive,
        payments: invPays
      });
      setPayAmount(totals.amountDue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceId) {
      alert('Please select an invoice.');
      return;
    }
    if (payAmount <= 0) {
      alert('Payment amount must be greater than zero.');
      return;
    }

    try {
      const inv = invoices.find(i => i.id === selectedInvoiceId);
      if (!inv) return;

      const p = await db.recordPayment({
        invoice_id: selectedInvoiceId,
        payment_date: payDate,
        amount: payAmount,
        currency: inv.currency,
        payment_method: payMethod,
        transaction_reference: payRef.trim(),
        bank_gateway: '',
        recorded_by: currentUser?.id || '',
        processing_fee: 0,
        internal_note: payNote.trim(),
        proof_url: null
      });

      setPayments([p, ...payments]);
      setRecordingPayment(false);
      
      // Reset form
      setSelectedInvoiceId('');
      setPayAmount(0);
      setPayRef('');
      setPayNote('');

      window.location.reload();
    } catch (err: any) {
      alert(err.message || 'Payment failed.');
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  const isSuperAdmin = currentUser.role_name === 'Super Admin';
  const isFinanceAdmin = currentUser.role_name === 'Finance Admin';
  const canRecord = isSuperAdmin || isFinanceAdmin;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Payments & Receipts Ledger</h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse payment logs and print official client money receipts
          </p>
        </div>
        {canRecord && (
          <button
            onClick={() => setRecordingPayment(true)}
            className="flex items-center space-x-2 rounded-xl bg-[#9B1C22] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9B1C22]/90 shadow-md cursor-pointer transition"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>Record Payment</span>
          </button>
        )}
      </div>

      {/* Payments Table list */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {payments.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400">
            No payments have been recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 bg-gray-50/50 font-bold uppercase tracking-wider">
                  <th className="p-4">Receipt Number</th>
                  <th className="p-4">Payment Date</th>
                  <th className="p-4">Client Company</th>
                  <th className="p-4">Invoice Ref</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Reference ID</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-bold">{p.receipt_number}</td>
                    <td className="p-4 text-gray-500">{p.payment_date}</td>
                    <td className="p-4 font-semibold">{getClientName(p.invoice_id)}</td>
                    <td className="p-4">
                      <Link href={`/billing/invoices/${p.invoice_id}`} className="hover:text-[#9B1C22] font-semibold">
                        {getInvoiceNumber(p.invoice_id)}
                      </Link>
                    </td>
                    <td className="p-4">{p.payment_method}</td>
                    <td className="p-4 text-gray-450">{p.transaction_reference || '—'}</td>
                    <td className="p-4 text-right font-extrabold text-green-600">
                      {formatCurrency(p.amount, p.currency)}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/billing/receipts/${p.id}`}
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#9B1C22] hover:underline"
                      >
                        <Receipt className="h-3.5 w-3.5" />
                        <span>View Receipt</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record Payment Dialog Modal */}
      {recordingPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
          <div className="bg-white border border-gray-100 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-md flex items-center space-x-2">
              <CircleDollarSign className="h-4.5 w-4.5 text-[#9B1C22]" />
              <span>Record Manual Payment Receipt</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-550 mb-1">Select Open Invoice</label>
                <select
                  required
                  value={selectedInvoiceId}
                  onChange={(e) => handleInvoiceChange(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 px-3 text-xs text-[#1E1E1E] focus:outline-none cursor-pointer"
                >
                  <option value="">-- Choose Unpaid Invoice --</option>
                  {getEligibleInvoices().map(inv => (
                    <option key={inv.id} value={inv.id}>
                      {inv.invoice_number} ({getClientName(inv.id)} - Project: {inv.project_name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-550 mb-1">Payment Date</label>
                <input
                  type="date"
                  required
                  value={payDate}
                  onChange={(e) => setPayDate(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-550 mb-1">Payment Amount</label>
                <input
                  type="number"
                  step="any"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(parseFloat(e.target.value) || 0)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Payment Method</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none cursor-pointer"
                >
                  {['Bank Transfer', 'Card', 'Stripe', 'Payoneer', 'Wise', 'Cheque', 'Cash', 'Mobile Financial Service', 'Other'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Transaction reference ID</label>
                <input
                  type="text"
                  value={payRef}
                  onChange={(e) => setPayRef(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  placeholder="Gateway transaction hash or wire reference"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Internal Note</label>
                <textarea
                  rows={2}
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none resize-y"
                  placeholder="Confidential ledger details"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setRecordingPayment(false)}
                  className="rounded-lg border border-gray-200 bg-white py-2 px-4 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#9B1C22] py-2 px-6 font-semibold text-white hover:bg-[#9B1C22]/90 cursor-pointer"
                >
                  Record Payment
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
