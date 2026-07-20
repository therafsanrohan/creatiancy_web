'use client';

import { useState, useEffect } from 'react';
import { db, BillingClient, Invoice, Payment, localStore } from '@/lib/db';
import { calculateTotals, formatCurrency } from '@/lib/calculations';
import Link from 'next/link';
import { Plus, Search, Archive, UserCheck, Mail, Phone, MapPin, ArrowRight, FileText } from 'lucide-react';

export default function ClientListPage() {
  const [clients, setClients] = useState<BillingClient[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'active' | 'archived' | 'all'>('active');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const list = await db.getClients();
        const invs = await db.getInvoices();
        const pays = await db.getPayments();
        setClients(list);
        setInvoices(invs);
        setPayments(pays);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleArchive = async (id: string, currentStatus: 'active' | 'archived') => {
    const nextStatus = currentStatus === 'active' ? 'archived' : 'active';
    const message = nextStatus === 'archived' ? 'Archive this client?' : 'Restore this client?';
    if (!confirm(message)) return;

    try {
      const updated = await db.updateClient(id, { status: nextStatus });
      setClients(clients.map(c => c.id === id ? updated : c));
    } catch (err) {
      alert('Error updating client status');
    }
  };

  const getClientBalances = (clientId: string) => {
    let bdtDue = 0;
    let usdDue = 0;

    const clientInvoices = invoices.filter(i => i.client_id === clientId && i.status !== 'draft' && i.status !== 'void');
    clientInvoices.forEach(inv => {
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

      if (inv.currency === 'BDT') {
        bdtDue += totals.amountDue;
      } else {
        usdDue += totals.amountDue;
      }
    });

    return { bdtDue, usdDue };
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch =
      c.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.contact_person.toLowerCase().includes(search.toLowerCase()) ||
      c.billing_email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Clients Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage corporate entities and individual billing accounts</p>
        </div>
        <Link
          href="/billing/clients/new"
          className="flex items-center space-x-2 rounded-xl bg-[#9B1C22] px-4 py-2.5 text-sm font-semibold text-[#FBFDF9] hover:bg-[#9B1C22]/90 shadow-md cursor-pointer transition"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Add Client</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-gray-100 p-4 rounded-2xl">
        <div className="relative sm:col-span-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search by company, contact person or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm text-[#1E1E1E] placeholder-gray-400 focus:border-[#9B1C22] focus:outline-none focus:ring-1 focus:ring-[#9B1C22]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22] focus:outline-none cursor-pointer"
        >
          <option value="active">Active Clients Only</option>
          <option value="archived">Archived Clients Only</option>
          <option value="all">All Clients</option>
        </select>
      </div>

      {/* Grid List */}
      {filteredClients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-sm text-gray-450">
          No clients found matching the selected criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => {
            const { bdtDue, usdDue } = getClientBalances(client.id);
            return (
              <div
                key={client.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm flex flex-col justify-between transition hover:shadow-md ${
                  client.status === 'archived'
                    ? 'border-gray-200 border-dashed bg-gray-50/50'
                    : 'border-gray-100'
                }`}
              >
                <div>
                  {/* Client title */}
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <div className="min-w-0">
                      <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold text-gray-500 mb-1">
                        {client.client_type}
                      </span>
                      <h2 className="font-bold text-md leading-tight text-[#1E1E1E] truncate">
                        {client.company_name || client.contact_person}
                      </h2>
                      {client.company_name && (
                        <p className="text-xs text-gray-400 font-semibold truncate mt-0.5">{client.contact_person}</p>
                      )}
                    </div>
                    {client.status === 'archived' && (
                      <span className="text-[10px] uppercase font-bold text-gray-450 border border-gray-200 rounded px-1.5 py-0.5 bg-white">
                        Archived
                      </span>
                    )}
                  </div>

                  {/* Core details */}
                  <div className="space-y-2 text-xs text-gray-500 mb-6">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{client.billing_email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{client.city}, {client.country}</span>
                    </div>
                  </div>
                </div>

                {/* Balance Split Ledger */}
                <div className="border-t border-gray-100 pt-4 space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Outstanding BDT:</span>
                    <span className={`font-bold ${bdtDue > 0 ? 'text-[#9B1C22]' : 'text-gray-600'}`}>
                      {formatCurrency(bdtDue, 'BDT')}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Outstanding USD:</span>
                    <span className={`font-bold ${usdDue > 0 ? 'text-[#9B1C22]' : 'text-gray-600'}`}>
                      {formatCurrency(usdDue, 'USD')}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                    <Link
                      href={`/billing/clients/${client.id}`}
                      className="flex-1 text-center bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-semibold py-2 px-3 rounded-lg transition"
                    >
                      View Profile
                    </Link>
                    
                    <button
                      onClick={() => handleArchive(client.id, client.status)}
                      className="rounded-lg border border-gray-200 hover:border-red-400 hover:bg-red-50 p-2 text-gray-450 hover:text-red-600 transition cursor-pointer"
                      title={client.status === 'active' ? 'Archive Client' : 'Restore Client'}
                    >
                      {client.status === 'active' ? <Archive className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
