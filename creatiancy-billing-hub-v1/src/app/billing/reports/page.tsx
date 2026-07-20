'use client';

import { useState, useEffect } from 'react';
import { db, Invoice, Payment, BillingClient, localStore } from '@/lib/db';
import { calculateTotals, formatCurrency } from '@/lib/calculations';
import { BarChart3, Download, Calendar, TrendingUp, CircleDollarSign } from 'lucide-react';

type DateFilter = 'this-month' | 'last-month' | 'this-quarter' | 'this-year' | 'all';

export default function ReportsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [clients, setClients] = useState<BillingClient[]>([]);
  
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [loading, setLoading] = useState(true);

  // Stats summaries
  const [reportData, setReportData] = useState({
    bdtInvoiced: 0,
    bdtCollected: 0,
    bdtOutstanding: 0,
    usdInvoiced: 0,
    usdCollected: 0,
    usdOutstanding: 0,
    invoiceStatusCounts: {} as Record<string, number>,
    paymentMethodCounts: {} as Record<string, number>
  });

  useEffect(() => {
    async function loadData() {
      try {
        const invs = await db.getInvoices();
        const pays = await db.getPayments();
        const cls = await db.getClients();
        setInvoices(invs);
        setPayments(pays);
        setClients(cls);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    calculateReportStats();
  }, [dateFilter, invoices, payments]);

  const calculateReportStats = () => {
    const now = new Date();

    const filterByDate = (dateStr: string) => {
      const recordDate = new Date(dateStr);
      if (dateFilter === 'this-month') {
        return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
      }
      if (dateFilter === 'last-month') {
        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        return recordDate.getMonth() === lastMonth && recordDate.getFullYear() === lastMonthYear;
      }
      if (dateFilter === 'this-quarter') {
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const recordQuarter = Math.floor(recordDate.getMonth() / 3);
        return recordQuarter === currentQuarter && recordDate.getFullYear() === now.getFullYear();
      }
      if (dateFilter === 'this-year') {
        return recordDate.getFullYear() === now.getFullYear();
      }
      return true; // 'all'
    };

    let bdtInv = 0;
    let bdtPaid = 0;
    let usdInv = 0;
    let usdPaid = 0;

    const statusCounts: Record<string, number> = {};
    const methodCounts: Record<string, number> = {};

    invoices.forEach(inv => {
      if (inv.status === 'void') return;
      if (!filterByDate(inv.issue_date)) return;

      // Status count
      statusCounts[inv.status] = (statusCounts[inv.status] || 0) + 1;

      // Financials
      if (inv.status === 'draft' || inv.status === 'pending_approval') return;
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

      if (inv.currency === 'BDT') {
        bdtInv += totals.totalPayable;
        bdtPaid += totals.amountPaid;
      } else {
        usdInv += totals.totalPayable;
        usdPaid += totals.amountPaid;
      }
    });

    payments.forEach(pay => {
      if (!filterByDate(pay.payment_date)) return;

      // Method count
      methodCounts[pay.payment_method] = (methodCounts[pay.payment_method] || 0) + 1;
    });

    setReportData({
      bdtInvoiced: bdtInv,
      bdtCollected: bdtPaid,
      bdtOutstanding: Math.max(0, bdtInv - bdtPaid),
      usdInvoiced: usdInv,
      usdCollected: usdPaid,
      usdOutstanding: Math.max(0, usdInv - usdPaid),
      invoiceStatusCounts: statusCounts,
      paymentMethodCounts: methodCounts
    });
  };

  const getClientName = (clientId: string) => {
    const c = clients.find(cl => cl.id === clientId);
    return c ? (c.company_name || c.contact_person) : '—';
  };

  // Zero-dependency Client-side CSV export generator
  const exportInvoicesToCSV = () => {
    const headers = ['Invoice Number', 'Client Company', 'Project Name', 'Issue Date', 'Due Date', 'Status', 'Currency', 'Total Amount'];
    const rows = invoices.map(inv => {
      const items = localStore.items.filter(itm => itm.invoice_id === inv.id);
      const totals = calculateTotals({
        items,
        discountType: inv.discount_type,
        discountValue: inv.discount_value,
        vatRate: inv.vat_rate,
        vatInclusive: inv.vat_inclusive,
        payments: []
      });
      return [
        inv.invoice_number || 'Draft',
        `"${getClientName(inv.client_id).replace(/"/g, '""')}"`,
        `"${inv.project_name.replace(/"/g, '""')}"`,
        inv.issue_date,
        inv.due_date,
        inv.status,
        inv.currency,
        totals.totalPayable.toFixed(2)
      ];
    });

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Creatiancy_Invoices_Report_${dateFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Financial Reports</h1>
          <p className="text-sm text-gray-500 mt-1">
            Aggregate revenue data, payment channels, and audit metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Date Filter selector */}
          <div className="flex items-center space-x-2 bg-white border border-gray-100 p-1.5 rounded-xl text-xs">
            <Calendar className="h-4 w-4 text-gray-400 ml-2" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              className="bg-transparent border-0 font-semibold focus:outline-none cursor-pointer pr-6 text-xs"
            >
              <option value="all">All-time</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
          </div>

          <button
            onClick={exportInvoicesToCSV}
            className="flex items-center space-x-1.5 rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs font-bold hover:bg-gray-50 cursor-pointer"
          >
            <Download className="h-4 w-4 text-gray-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Grid: Financial Ledgers summary (Separated BDT vs USD) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* BDT Revenue Details */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#9B1C22] flex items-center space-x-2">
            <CircleDollarSign className="h-4 w-4" />
            <span>Creatiancy Limited (BDT ৳) Ledger</span>
          </h3>

          <div className="space-y-3.5 pt-3 border-t border-gray-50 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Billed Invoices:</span>
              <span className="font-bold text-gray-800">{formatCurrency(reportData.bdtInvoiced, 'BDT')}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Total Revenue Collected:</span>
              <span className="font-bold">{formatCurrency(reportData.bdtCollected, 'BDT')}</span>
            </div>
            <div className="flex justify-between text-[#9B1C22]">
              <span>Outstanding Receivable Balance:</span>
              <span className="font-bold">{formatCurrency(reportData.bdtOutstanding, 'BDT')}</span>
            </div>
          </div>
        </div>

        {/* USD Revenue Details */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-blue-650 flex items-center space-x-2">
            <CircleDollarSign className="h-4 w-4" />
            <span>Creatiancy LLC (USD $) Ledger</span>
          </h3>

          <div className="space-y-3.5 pt-3 border-t border-gray-50 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Billed Invoices:</span>
              <span className="font-bold text-gray-800">{formatCurrency(reportData.usdInvoiced, 'USD')}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Total Revenue Collected:</span>
              <span className="font-bold">{formatCurrency(reportData.usdCollected, 'USD')}</span>
            </div>
            <div className="flex justify-between text-[#9B1C22]">
              <span>Outstanding Receivable Balance:</span>
              <span className="font-bold">{formatCurrency(reportData.usdOutstanding, 'USD')}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Layout Grid: Invoice Statuses and Payment Channel Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Invoice Statuses */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-gray-450 mb-4">Invoice Counts by Lifecycle Status</h3>
          <div className="space-y-2.5 text-xs">
            {Object.keys(reportData.invoiceStatusCounts).length === 0 ? (
              <p className="text-gray-400 italic text-center py-4">No records found for this period.</p>
            ) : (
              Object.entries(reportData.invoiceStatusCounts).map(([status, count]) => (
                <div key={status} className="flex justify-between py-1 border-b border-gray-50">
                  <span className="capitalize text-gray-650 font-semibold">{status.replace('_', ' ')}</span>
                  <span className="font-bold bg-gray-50 px-2 py-0.5 rounded text-gray-800">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payment Channels */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-gray-455 mb-4">Payment Methods Channel Distribution</h3>
          <div className="space-y-2.5 text-xs">
            {Object.keys(reportData.paymentMethodCounts).length === 0 ? (
              <p className="text-gray-400 italic text-center py-4">No payments recorded for this period.</p>
            ) : (
              Object.entries(reportData.paymentMethodCounts).map(([method, count]) => (
                <div key={method} className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-650 font-semibold">{method}</span>
                  <span className="font-bold bg-gray-50 px-2 py-0.5 rounded text-gray-800">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
