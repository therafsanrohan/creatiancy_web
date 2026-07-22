'use client';

import { useState, useEffect } from 'react';
import { db, Invoice, BillingClient, Profile, localStore } from '@/lib/db';
import { calculateTotals, formatCurrency } from '@/lib/calculations';
import Link from 'next/link';
import { Plus, Search, Eye, AlertCircle } from 'lucide-react';

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<BillingClient[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currencyFilter, setCurrencyFilter] = useState<'all' | 'BDT' | 'USD'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const u = await db.getCurrentUser();
        setCurrentUser(u);
        const list = await db.getInvoices();
        setInvoices(list);
        const cls = await db.getClients();
        setClients(cls);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getClientName = (clientId: string) => {
    const c = clients.find(cl => cl.id === clientId);
    return c ? (c.company_name || c.contact_person) : 'Client';
  };

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

  const filteredInvoices = invoices.filter(inv => {
    const clientName = getClientName(inv.client_id).toLowerCase();
    const invoiceNum = (inv.invoice_number || '').toLowerCase();
    const projectName = inv.project_name.toLowerCase();
    const searchLower = search.toLowerCase();
    const matchesSearch = clientName.includes(searchLower) || invoiceNum.includes(searchLower) || projectName.includes(searchLower);
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const matchesCurrency = currencyFilter === 'all' || inv.currency === currencyFilter;
    return matchesSearch && matchesStatus && matchesCurrency;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  const isViewer = false;

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Invoices Ledger</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Track and process corporate client billing sequences</p>
        </div>
        {!isViewer && (
          <Link
            href="/billing/invoices/new"
            className="flex items-center justify-center space-x-2 rounded-xl bg-[#9B1C22] px-4 py-2.5 text-sm font-semibold text-[#FBFDF9] hover:bg-[#9B1C22]/90 shadow-md cursor-pointer transition w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Create Invoice</span>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white border border-gray-100 p-3 sm:p-4 rounded-2xl">
        <div className="relative sm:col-span-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search invoice #, client, project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm text-[#1E1E1E] placeholder-gray-400 focus:border-[#9B1C22] focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22] focus:outline-none cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="pending_approval">Pending Approval</option>
          <option value="approved">Approved</option>
          <option value="sent">Sent</option>
          <option value="partially_paid">Partially Paid</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="void">Void</option>
        </select>
        <select
          value={currencyFilter}
          onChange={(e) => setCurrencyFilter(e.target.value as any)}
          className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22] focus:outline-none cursor-pointer"
        >
          <option value="all">All Currencies</option>
          <option value="BDT">BDT (৳) — Limited</option>
          <option value="USD">USD ($) — LLC</option>
        </select>
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-sm text-gray-400">
          No invoices found matching the current filters.
        </div>
      ) : (
        <>
          {/* ── Desktop Table (md+) ── */}
          <div className="hidden md:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 bg-gray-50/50 font-bold uppercase tracking-wider">
                    <th className="p-4">Invoice #</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Project</th>
                    <th className="p-4">Issue Date</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Amount</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredInvoices.map((inv) => {
                    const isOverdue = new Date(inv.due_date) < new Date() && inv.status !== 'paid' && inv.status !== 'void' && inv.status !== 'draft';
                    return (
                      <tr key={inv.id} className={`hover:bg-gray-50/40 transition ${isOverdue ? 'bg-red-50/5' : ''}`}>
                        <td className="p-4 font-bold">
                          {inv.invoice_number ? (
                            <Link href={`/billing/invoices/${inv.id}`} className="hover:text-[#9B1C22]">{inv.invoice_number}</Link>
                          ) : (
                            <span className="text-gray-450 italic flex items-center space-x-1">
                              <span>Draft</span>
                              <span className="text-[9px] uppercase bg-gray-100 text-gray-500 rounded px-1 font-semibold">Pending ID</span>
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <Link href={`/billing/clients/${inv.client_id}`} className="hover:underline font-semibold">{getClientName(inv.client_id)}</Link>
                        </td>
                        <td className="p-4 truncate max-w-[140px]">{inv.project_name}</td>
                        <td className="p-4 text-gray-500">{inv.issue_date}</td>
                        <td className="p-4">
                          <span className={`flex items-center space-x-1 ${isOverdue ? 'text-[#9B1C22] font-semibold' : 'text-gray-500'}`}>
                            <span>{inv.due_date}</span>
                            {isOverdue && <AlertCircle className="h-3 w-3 text-[#9B1C22]" />}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-wide font-bold ${getStatusBadgeColor(inv.status)}`}>
                            {inv.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="p-4 text-right font-extrabold text-gray-800">{formatCurrency(getInvoiceTotal(inv), inv.currency)}</td>
                        <td className="p-4 text-center">
                          <Link href={`/billing/invoices/${inv.id}`} className="inline-flex items-center space-x-1 text-xs font-semibold text-[#9B1C22] hover:underline">
                            <Eye className="h-3.5 w-3.5" />
                            <span>Details</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Mobile Card View (< md) ── */}
          <div className="md:hidden space-y-3">
            {filteredInvoices.map((inv) => {
              const isOverdue = new Date(inv.due_date) < new Date() && inv.status !== 'paid' && inv.status !== 'void' && inv.status !== 'draft';
              return (
                <div key={inv.id} className={`bg-white border rounded-2xl p-4 shadow-sm ${isOverdue ? 'border-red-200 bg-red-50/10' : 'border-gray-100'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="min-w-0 flex-1">
                      <Link href={`/billing/invoices/${inv.id}`} className="font-bold text-sm text-[#1E1E1E] hover:text-[#9B1C22] block truncate">
                        {inv.invoice_number || 'Draft — Pending ID'}
                      </Link>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{inv.project_name}</p>
                    </div>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] uppercase font-bold shrink-0 ml-2 ${getStatusBadgeColor(inv.status)}`}>
                      {inv.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-3">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Client</p>
                      <Link href={`/billing/clients/${inv.client_id}`} className="font-semibold text-gray-700 hover:text-[#9B1C22] truncate block">
                        {getClientName(inv.client_id)}
                      </Link>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Amount</p>
                      <span className="font-extrabold text-gray-800">{formatCurrency(getInvoiceTotal(inv), inv.currency)}</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Issued</p>
                      <span className="text-gray-700">{inv.issue_date}</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Due</p>
                      <span className={`flex items-center gap-1 ${isOverdue ? 'text-[#9B1C22] font-bold' : 'text-gray-700'}`}>
                        {inv.due_date}
                        {isOverdue && <AlertCircle className="h-3 w-3" />}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/billing/invoices/${inv.id}`}
                    className="flex items-center justify-center space-x-1.5 w-full text-xs font-semibold text-[#9B1C22] bg-[#9B1C22]/5 hover:bg-[#9B1C22]/10 py-2 rounded-xl transition border border-[#9B1C22]/10"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View Invoice Details</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
