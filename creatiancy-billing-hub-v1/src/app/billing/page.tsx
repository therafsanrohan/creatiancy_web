'use client';

import { useState, useEffect } from 'react';
import { db, Invoice, Payment, BillingClient, Profile, localStore } from '@/lib/db';
import { calculateTotals, formatCurrency } from '@/lib/calculations';
import Link from 'next/link';
import {
  FilePlus,
  UserPlus,
  CircleDollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowUpRight,
  TrendingDown,
  CalendarDays,
  FileText
} from 'lucide-react';

type DateFilter = 'this-month' | 'last-month' | 'this-quarter' | 'this-year' | 'all';

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [clients, setClients] = useState<BillingClient[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [loading, setLoading] = useState(true);

  // Financial Stats States
  const [bdtStats, setBdtStats] = useState({ invoiced: 0, collected: 0, outstanding: 0, overdue: 0 });
  const [usdStats, setUsdStats] = useState({ invoiced: 0, collected: 0, outstanding: 0, overdue: 0 });

  const getInvoiceTotal = (inv: Invoice) => {
    const items = localStore.items.filter(itm => itm.invoice_id === inv.id);
    const totals = calculateTotals({
      items,
      discountType: inv.discount_type,
      discountValue: inv.discount_value,
      vatRate: inv.vat_rate,
      vatInclusive: inv.vat_inclusive,
      payments: []
    });
    return totals.totalPayable;
  };

  useEffect(() => {
    async function loadData() {
      try {
        const user = await db.getCurrentUser();
        setCurrentUser(user);
        
        const allInvoices = await db.getInvoices();
        const allPayments = await db.getPayments();
        const allClients = await db.getClients();

        setInvoices(allInvoices);
        setPayments(allPayments);
        setClients(allClients);
      } catch (err) {
        console.error('Error loading dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    // Recalculate stats when dateFilter or invoices/payments change
    calculateFinancials();
  }, [dateFilter, invoices, payments]);

  const calculateFinancials = () => {
    const now = new Date();
    
    // Filter records by date range
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

    let bdtInvoiced = 0;
    let bdtCollected = 0;
    let bdtOutstanding = 0;
    let bdtOverdue = 0;

    let usdInvoiced = 0;
    let usdCollected = 0;
    let usdOutstanding = 0;
    let usdOverdue = 0;

    // 1. Calculate Invoiced & Outstanding & Overdue amounts
    invoices.forEach(inv => {
      if (inv.status === 'draft' || inv.status === 'pending_approval' || inv.status === 'void') return;
      if (!filterByDate(inv.issue_date)) return;

      const items = localStore.items.filter(itm => itm.invoice_id === inv.id);
      const invPayments = payments.filter(p => p.invoice_id === inv.id);
      const totals = calculateTotals({
        items,
        discountType: inv.discount_type,
        discountValue: inv.discount_value,
        vatRate: inv.vat_rate,
        vatInclusive: inv.vat_inclusive,
        payments: invPayments
      });

      const isOverdue = new Date(inv.due_date) < now && inv.status !== 'paid';

      if (inv.currency === 'BDT') {
        bdtInvoiced += totals.totalPayable;
        bdtOutstanding += totals.amountDue;
        if (isOverdue) bdtOverdue += totals.amountDue;
      } else {
        usdInvoiced += totals.totalPayable;
        usdOutstanding += totals.amountDue;
        if (isOverdue) usdOverdue += totals.amountDue;
      }
    });

    // 2. Calculate Collected amounts
    payments.forEach(pay => {
      if (!filterByDate(pay.payment_date)) return;

      if (pay.currency === 'BDT') {
        bdtCollected += pay.amount;
      } else {
        usdCollected += pay.amount;
      }
    });

    setBdtStats({ invoiced: bdtInvoiced, collected: bdtCollected, outstanding: bdtOutstanding, overdue: bdtOverdue });
    setUsdStats({ invoiced: usdInvoiced, collected: usdCollected, outstanding: usdOutstanding, overdue: usdOverdue });
  };

  const getClientName = (clientId: string) => {
    const c = clients.find(cl => cl.id === clientId);
    return c ? (c.company_name || c.contact_person) : 'Fictional Client';
  };

  const getRecentInvoices = () => {
    return invoices
      .filter(i => i.status !== 'draft')
      .sort((a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime())
      .slice(0, 5);
  };

  const getDraftInvoices = () => {
    return invoices
      .filter(i => i.status === 'draft')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  };

  const getOverdueInvoices = () => {
    const now = new Date();
    return invoices
      .filter(i => i.status !== 'paid' && i.status !== 'void' && i.status !== 'draft' && new Date(i.due_date) < now)
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
      .slice(0, 5);
  };

  const getRecentPayments = () => {
    return payments
      .sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime())
      .slice(0, 5);
  };

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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  const isViewer = false;
  const isPM = currentUser?.role_name === 'Project Manager';
  const isCS = currentUser?.role_name === 'Client Service';

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Billing Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time financial metrics for Creatiancy Limited (BDT) & Creatiancy LLC (USD)
          </p>
        </div>

        {/* Date Filters */}
        <div className="flex items-center space-x-2 bg-white border border-gray-100 p-1.5 rounded-xl">
          <CalendarDays className="h-4 w-4 text-gray-450 ml-2" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            className="text-sm bg-transparent border-0 font-semibold focus:outline-none focus:ring-0 cursor-pointer pr-8"
          >
            <option value="all">All-time Records</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
      </div>

      {/* Quick Action Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {!isViewer && (
          <Link
            href="/billing/invoices/new"
            className="flex items-center space-x-3 rounded-2xl bg-[#9B1C22] p-4 text-[#FBFDF9] hover:bg-[#9B1C22]/90 shadow-md transition duration-150"
          >
            <FilePlus className="h-6 w-6" />
            <div className="text-left">
              <span className="block font-bold text-sm">Create BDT / USD Invoice</span>
              <span className="text-[10px] text-red-250">Draft new transaction</span>
            </div>
          </Link>
        )}

        {!isViewer && !isPM && (
          <Link
            href="/billing/clients/new"
            className="flex items-center space-x-3 rounded-2xl border border-gray-100 bg-white p-4 text-[#1E1E1E] hover:border-[#9B1C22]/30 transition duration-150"
          >
            <UserPlus className="h-6 w-6 text-[#9B1C22]" />
            <div className="text-left">
              <span className="block font-bold text-sm">Add New Client Profile</span>
              <span className="text-[10px] text-gray-400">Save billing particulars</span>
            </div>
          </Link>
        )}

        {!isViewer && !isPM && !isCS && (
          <Link
            href="/billing/payments"
            className="flex items-center space-x-3 rounded-2xl border border-gray-100 bg-white p-4 text-[#1E1E1E] hover:border-[#9B1C22]/30 transition duration-150"
          >
            <CircleDollarSign className="h-6 w-6 text-green-600" />
            <div className="text-left">
              <span className="block font-bold text-sm">Record Manual Payment</span>
              <span className="text-[10px] text-gray-400">Register incoming bank transfer</span>
            </div>
          </Link>
        )}
      </div>

      {/* Main Ledger Split (BDT vs USD) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* BDT Ledgers - Creatiancy Limited */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-lg font-bold text-[#9B1C22] flex items-center space-x-2">
              <span>Creatiancy Limited (Bangladesh)</span>
              <span className="text-xs bg-red-50 text-[#9B1C22] px-2 py-0.5 rounded font-semibold">BDT ৳</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex justify-between items-start text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Total Invoiced</span>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>
              <p className="mt-2 text-xl font-bold tracking-tight">{formatCurrency(bdtStats.invoiced, 'BDT')}</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex justify-between items-start text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Collected</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="mt-2 text-xl font-bold tracking-tight text-green-600">
                {formatCurrency(bdtStats.collected, 'BDT')}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex justify-between items-start text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Outstanding</span>
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <p className="mt-2 text-xl font-bold tracking-tight text-blue-600">
                {formatCurrency(bdtStats.outstanding, 'BDT')}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex justify-between items-start text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Overdue</span>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <p className="mt-2 text-xl font-bold tracking-tight text-[#9B1C22]">
                {formatCurrency(bdtStats.overdue, 'BDT')}
              </p>
            </div>
          </div>
        </div>

        {/* USD Ledgers - Creatiancy LLC */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-lg font-bold text-[#9B1C22] flex items-center space-x-2">
              <span>Creatiancy LLC (United States)</span>
              <span className="text-xs bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-semibold">USD $</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex justify-between items-start text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Total Invoiced</span>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>
              <p className="mt-2 text-xl font-bold tracking-tight">{formatCurrency(usdStats.invoiced, 'USD')}</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex justify-between items-start text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Collected</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="mt-2 text-xl font-bold tracking-tight text-green-600">
                {formatCurrency(usdStats.collected, 'USD')}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex justify-between items-start text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Outstanding</span>
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <p className="mt-2 text-xl font-bold tracking-tight text-blue-600">
                {formatCurrency(usdStats.outstanding, 'USD')}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex justify-between items-start text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Overdue</span>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <p className="mt-2 text-xl font-bold tracking-tight text-[#9B1C22]">
                {formatCurrency(usdStats.overdue, 'USD')}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Lists Section: Recent Invoices, Drafts, Overdues, Payments */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Left Column: Recent Invoices & Drafts */}
        <div className="space-y-8">
          
          {/* Recent Finalized Invoices */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-md">Recent Finalized Invoices</h3>
              <Link href="/billing/invoices" className="text-xs font-bold text-[#9B1C22] flex items-center">
                <span>View all</span>
                <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </Link>
            </div>
            
            <div className="divide-y divide-gray-50">
              {getRecentInvoices().length === 0 ? (
                <div className="py-6 text-center text-sm text-gray-400">No finalized invoices found.</div>
              ) : (
                getRecentInvoices().map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center py-3">
                    <div className="min-w-0">
                      <Link href={`/billing/invoices/${inv.id}`} className="font-semibold text-sm hover:text-[#9B1C22] truncate block">
                        {inv.invoice_number}
                      </Link>
                      <span className="text-xs text-gray-450 block truncate">{getClientName(inv.client_id)} • {inv.project_name}</span>
                    </div>
                    <div className="text-right ml-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadgeColor(inv.status)} mb-1`}>
                        {inv.status}
                      </span>
                      <span className="block text-sm font-bold">{formatCurrency(getInvoiceTotal(inv), inv.currency)}</span> 
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Draft Invoices */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-md">Invoices in Draft</h3>
              <Link href="/billing/invoices" className="text-xs font-bold text-[#9B1C22] flex items-center">
                <span>View drafts</span>
                <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </Link>
            </div>
            
            <div className="divide-y divide-gray-50">
              {getDraftInvoices().length === 0 ? (
                <div className="py-6 text-center text-sm text-gray-400">No draft invoices found.</div>
              ) : (
                getDraftInvoices().map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center py-3">
                    <div className="min-w-0">
                      <Link href={`/billing/invoices/${inv.id}`} className="font-semibold text-sm hover:text-[#9B1C22] truncate block">
                        Draft: {inv.project_name}
                      </Link>
                      <span className="text-xs text-gray-450 block truncate">{getClientName(inv.client_id)} • Issued {inv.issue_date}</span>
                    </div>
                    <div className="text-right ml-4">
                      <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-800 mb-1">
                        draft
                      </span>
                      <Link
                        href={`/billing/invoices/${inv.id}/edit`}
                        className="block text-xs font-semibold text-[#9B1C22] hover:underline"
                      >
                        Edit Draft
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Overdue Invoices & Recent Payments */}
        <div className="space-y-8">
          
          {/* Overdue Invoices */}
          <div className="rounded-2xl border border-gray-100 bg-[#9B1C22]/5 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-md text-[#9B1C22] flex items-center space-x-1.5">
                <AlertCircle className="h-4 w-4" />
                <span>Overdue Unpaid Invoices</span>
              </h3>
            </div>
            
            <div className="divide-y divide-[#9B1C22]/10">
              {getOverdueInvoices().length === 0 ? (
                <div className="py-6 text-center text-sm text-gray-400">No overdue invoices! Good job.</div>
              ) : (
                getOverdueInvoices().map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center py-3">
                    <div className="min-w-0">
                      <Link href={`/billing/invoices/${inv.id}`} className="font-semibold text-sm hover:text-[#9B1C22] truncate block">
                        {inv.invoice_number}
                      </Link>
                      <span className="text-xs text-gray-450 block truncate">
                        {getClientName(inv.client_id)} • Due since {inv.due_date}
                      </span>
                    </div>
                    <div className="text-right ml-4">
                      <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-red-100 text-red-800 mb-1">
                        overdue
                      </span>
                      <span className="block text-sm font-bold text-[#9B1C22]">Due: {inv.currency}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Payments Received */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-md">Recent Payments Received</h3>
              <Link href="/billing/payments" className="text-xs font-bold text-[#9B1C22] flex items-center">
                <span>View payments</span>
                <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </Link>
            </div>
            
            <div className="divide-y divide-gray-50">
              {getRecentPayments().length === 0 ? (
                <div className="py-6 text-center text-sm text-gray-400">No payments recorded yet.</div>
              ) : (
                getRecentPayments().map((pay) => (
                  <div key={pay.id} className="flex justify-between items-center py-3">
                    <div className="min-w-0">
                      <span className="font-semibold text-sm block">
                        {formatCurrency(pay.amount, pay.currency)}
                      </span>
                      <span className="text-xs text-gray-455 block truncate">
                        via {pay.payment_method} • Ref: {pay.transaction_reference || 'N/A'}
                      </span>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-xs text-gray-400 block mb-1">
                        {pay.payment_date}
                      </span>
                      <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold bg-green-50 text-green-700">
                        {pay.receipt_number}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
