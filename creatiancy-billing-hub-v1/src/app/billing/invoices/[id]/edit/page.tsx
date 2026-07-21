'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db, BillingClient, Profile, BusinessEntity, InvoiceItem, Invoice, localStore } from '@/lib/db';
import { calculateTotals, formatCurrency } from '@/lib/calculations';
import { ArrowLeft, Plus, Trash2, Copy, Percent, DollarSign, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface FormItem {
  service_name: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
}

export default function EditInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Database lists
  const [clients, setClients] = useState<BillingClient[]>([]);
  const [entities, setEntities] = useState<BusinessEntity[]>([]);
  const [managers, setManagers] = useState<Profile[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  // Form states
  const [selectedClientId, setSelectedClientId] = useState('');
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('USD');
  const [issueDate, setIssueDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('30 Days');
  const [dueDate, setDueDate] = useState('');
  const [projectName, setProjectName] = useState('');
  const [servicePeriod, setServicePeriod] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [accountManagerId, setAccountManagerId] = useState('');
  
  // Discount states
  const [discountType, setDiscountType] = useState<'none' | 'fixed' | 'percentage'>('none');
  const [discountValue, setDiscountValue] = useState(0);
  
  // VAT states
  const [vatRate, setVatRate] = useState(15);
  const [vatInclusive, setVatInclusive] = useState(true);

  // Notes
  const [clientNote, setClientNote] = useState('');
  const [paymentInstructions, setPaymentInstructions] = useState('');
  const [termsConditions, setTermsConditions] = useState('');
  const [internalNote, setInternalNote] = useState('');

  // Items list
  const [items, setItems] = useState<FormItem[]>([
    { service_name: '', description: '', quantity: 1, unit: 'Project', rate: 0 }
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Auto-calculated entities
  const activeEntity = entities.find(e => e.entity_code === (currency === 'BDT' ? 'CLTD' : 'CLLC'));
  const activeClient = clients.find(c => c.id === selectedClientId);

  useEffect(() => {
    async function loadInvoiceData() {
      try {
        const u = await db.getCurrentUser();
        setCurrentUser(u);

        const cls = await db.getClients();
        setClients(cls.filter(c => c.status === 'active'));
        
        const ents = await db.getEntities();
        setEntities(ents);
        
        const profs = await db.getProfiles();
        setManagers(profs);

        const inv = await db.getInvoiceById(id);
        if (!inv) {
          router.push('/billing/invoices');
          return;
        }

        // Safety lock: if not draft or pending_approval, redirect
        if (inv.status !== 'draft' && inv.status !== 'pending_approval') {
          router.push(`/billing/invoices/${id}`);
          return;
        }

        setSelectedClientId(inv.client_id);
        setCurrency(inv.currency);
        setIssueDate(inv.issue_date);
        setPaymentTerms(inv.payment_terms);
        setDueDate(inv.due_date);
        setProjectName(inv.project_name);
        setServicePeriod(inv.service_period);
        setPoNumber(inv.po_number);
        setReferenceNumber(inv.reference_number);
        setAccountManagerId(inv.account_manager_id);
        setDiscountType(inv.discount_type);
        setDiscountValue(inv.discount_value);
        setVatRate(inv.vat_rate);
        setVatInclusive(inv.vat_inclusive);
        setClientNote(inv.client_note);
        setPaymentInstructions(inv.payment_instructions);
        setTermsConditions(inv.terms_conditions);
        setInternalNote(inv.internal_note);

        // Load items
        const invoiceItems = await db.getInvoiceItems(id);
        if (invoiceItems.length > 0) {
          setItems(invoiceItems.map(itm => ({
            service_name: itm.service_name,
            description: itm.description || '',
            quantity: itm.quantity,
            unit: itm.unit,
            rate: itm.rate
          })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadInvoiceData();
  }, [id, router]);

  // Sync due date calculation
  useEffect(() => {
    if (!issueDate) return;
    const date = new Date(issueDate);
    if (paymentTerms === 'Due on Receipt') {
      setDueDate(issueDate);
    } else if (paymentTerms === '7 Days') {
      date.setDate(date.getDate() + 7);
      setDueDate(date.toISOString().split('T')[0]);
    } else if (paymentTerms === '15 Days') {
      date.setDate(date.getDate() + 15);
      setDueDate(date.toISOString().split('T')[0]);
    } else if (paymentTerms === '30 Days') {
      date.setDate(date.getDate() + 30);
      setDueDate(date.toISOString().split('T')[0]);
    }
  }, [issueDate, paymentTerms]);

  // Items manipulation
  const handleItemChange = (index: number, field: keyof FormItem, val: any) => {
    const next = [...items];
    if (field === 'quantity' || field === 'rate') {
      next[index] = { ...next[index], [field]: parseFloat(val) || 0 };
    } else {
      next[index] = { ...next[index], [field]: val };
    }
    setItems(next);
  };

  const addItem = () => {
    setItems([...items, { service_name: '', description: '', quantity: 1, unit: 'Project', rate: 0 }]);
  };

  const duplicateItem = (index: number) => {
    const target = items[index];
    setItems([...items, { ...target }]);
  };

  const deleteItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Totals calculations
  const totals = calculateTotals({
    items: items.map(i => ({ quantity: i.quantity, rate: i.rate })),
    discountType,
    discountValue,
    vatRate: currency === 'BDT' ? vatRate : 0,
    vatInclusive
  });

  const handleSave = async (status: 'draft' | 'pending_approval') => {
    if (!selectedClientId) {
      setError('Please select a client.');
      return;
    }
    if (!projectName.trim()) {
      setError('Please enter a project name.');
      return;
    }
    if (items.some(i => !i.service_name.trim())) {
      setError('Please enter a service name for all line items.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await db.updateInvoice(id, {
        client_id: selectedClientId,
        currency,
        entity_id: activeEntity?.id || '',
        issue_date: issueDate,
        payment_terms: paymentTerms,
        due_date: dueDate,
        project_name: projectName.trim(),
        service_period: servicePeriod.trim(),
        po_number: poNumber.trim(),
        reference_number: referenceNumber.trim(),
        account_manager_id: accountManagerId,
        discount_type: discountType,
        discount_value: discountValue,
        vat_rate: currency === 'BDT' ? vatRate : 0,
        vat_inclusive: vatInclusive,
        client_note: clientNote.trim(),
        payment_instructions: paymentInstructions.trim(),
        terms_conditions: termsConditions.trim(),
        internal_note: internalNote.trim()
      }, items.map(i => ({
        service_name: i.service_name.trim(),
        description: i.description.trim(),
        quantity: i.quantity,
        unit: i.unit,
        rate: i.rate,
        amount: parseFloat((i.quantity * i.rate).toFixed(2)),
        sort_order: 0
      })));

      if (status === 'pending_approval') {
        await db.submitForApproval(id);
      }

      router.push(`/billing/invoices/${id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to save invoice.');
      setSaving(false);
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Back button */}
      <div>
        <Link href={`/billing/invoices/${id}`} className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Invoice Details</span>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Edit Draft Invoice</h1>
          <p className="text-sm text-gray-500 mt-1">Modify invoice particulars, currency entity alignment, and line items</p>
        </div>
      </div>

      {/* Split view panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Form panel */}
        <div className="xl:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-[#9B1C22]">
              {error}
            </div>
          )}

          {/* Section 1: Client Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">1. Client Particulars</h3>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22] focus:outline-none cursor-pointer"
            >
              <option value="">-- Choose Client --</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>
                  {c.company_name || c.contact_person} ({c.preferred_currency})
                </option>
              ))}
            </select>
          </div>

          {/* Section 2: Currency Mapping */}
          <div className="space-y-4 pt-6 border-t border-gray-50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">2. Billing Currency & Entity</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-550 mb-2">Select Invoice Currency</span>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="currency"
                      checked={currency === 'USD'}
                      onChange={() => setCurrency('USD')}
                      className="accent-[#9B1C22] h-4.5 w-4.5"
                    />
                    <span>USD ($)</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="currency"
                      checked={currency === 'BDT'}
                      onChange={() => setCurrency('BDT')}
                      className="accent-[#9B1C22] h-4.5 w-4.5"
                    />
                    <span>BDT (৳)</span>
                  </label>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 text-xs border border-gray-100">
                <span className="text-gray-400 font-semibold uppercase block">Locked Mapped Entity</span>
                <p className="font-extrabold text-sm text-gray-800 mt-1">
                  {currency === 'BDT' ? 'Creatiancy Limited' : 'Creatiancy LLC'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Details */}
          <div className="space-y-4 pt-6 border-t border-gray-50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">3. Details & Metadata</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-555 mb-1">Issue Date</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-555 mb-1">Payment Terms</label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22] cursor-pointer"
                >
                  <option value="Due on Receipt">Due on Receipt</option>
                  <option value="7 Days">7 Days</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-555 mb-1">Due Date</label>
                {paymentTerms === 'Custom' ? (
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22]"
                  />
                ) : (
                  <input
                    type="date"
                    readOnly
                    value={dueDate}
                    className="block w-full rounded-lg border border-gray-150 bg-gray-50 py-2 px-3 text-sm text-gray-500"
                  />
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-555 mb-1">Project Title / Name *</label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-555 mb-1">Billing Service Period</label>
                <input
                  type="text"
                  value={servicePeriod}
                  onChange={(e) => setServicePeriod(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-555 mb-1">Purchase Order (PO) #</label>
                <input
                  type="text"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-555 mb-1">Internal Reference #</label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-555 mb-1">Account Manager</label>
                <select
                  value={accountManagerId}
                  onChange={(e) => setAccountManagerId(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-[#1E1E1E] focus:border-[#9B1C22] cursor-pointer"
                >
                  {managers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Line Items */}
          <div className="space-y-4 pt-6 border-t border-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">4. Service Line Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center space-x-1 text-xs font-semibold text-[#9B1C22] border border-[#9B1C22] rounded-lg px-2.5 py-1 hover:bg-[#9B1C22]/5 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                    <span>Line #{idx + 1}</span>
                    <div className="flex items-center gap-1.5">
                      <button type="button" onClick={() => duplicateItem(idx)} className="p-1 hover:text-gray-700">
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem(idx)}
                        className="p-1 text-red-500 hover:text-red-700"
                        disabled={items.length === 1}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                    <div className="md:col-span-5">
                      <label className="block font-semibold text-gray-550 mb-0.5">Service Name</label>
                      <input
                        type="text"
                        required
                        value={item.service_name}
                        onChange={(e) => handleItemChange(idx, 'service_name', e.target.value)}
                        className="block w-full rounded-lg border border-gray-200 bg-white py-1.5 px-2.5 text-xs text-[#1E1E1E] focus:outline-none"
                      />
                    </div>
                    
                    <div className="md:col-span-7">
                      <label className="block font-semibold text-gray-550 mb-0.5">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        className="block w-full rounded-lg border border-gray-200 bg-white py-1.5 px-2.5 text-xs text-[#1E1E1E] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block font-semibold text-gray-550 mb-0.5">Quantity</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.quantity}
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                        onChange={(e) => handleItemChange(idx, 'quantity', Math.max(0, parseFloat(e.target.value) || 0))}
                        className="block w-full rounded-lg border border-gray-200 bg-white py-1.5 px-2.5 text-xs text-[#1E1E1E] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block font-semibold text-gray-555 mb-0.5">Unit</label>
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                        className="block w-full rounded-lg border border-gray-200 bg-white py-1.5 px-2.5 text-xs text-[#1E1E1E] focus:outline-none cursor-pointer"
                      >
                        {['Project', 'Month', 'Item', 'Design', 'Video', 'Hour', 'Day', 'Campaign', 'Milestone', 'Package'].map(u => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block font-semibold text-gray-555 mb-0.5">Rate / Unit Price</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                        onChange={(e) => handleItemChange(idx, 'rate', Math.max(0, parseFloat(e.target.value) || 0))}
                        className="block w-full rounded-lg border border-gray-200 bg-white py-1.5 px-2.5 text-xs text-[#1E1E1E] focus:outline-none font-semibold"
                      />
                    </div>

                    <div className="md:col-span-3 flex flex-col justify-end">
                      <label className="block font-semibold text-gray-400 mb-0.5 text-right">Line Total</label>
                      <div className="text-right text-xs font-bold py-1.5 pr-1">
                        {formatCurrency(item.quantity * item.rate, currency)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Discount & VAT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
            <div className="space-y-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Discount Adjustment</span>
              <div className="flex gap-2">
                <select
                  value={discountType}
                  onChange={(e) => {
                    setDiscountType(e.target.value as any);
                    setDiscountValue(0);
                  }}
                  className="rounded-lg border border-gray-200 bg-white py-2 px-2.5 text-xs text-[#1E1E1E] cursor-pointer"
                >
                  <option value="none">No Discount</option>
                  <option value="fixed">Fixed</option>
                  <option value="percentage">Percentage</option>
                </select>

                {discountType !== 'none' && (
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                    className="block w-24 rounded-lg border border-gray-200 bg-white py-2 px-2.5 text-xs text-[#1E1E1E]"
                  />
                )}
              </div>
            </div>

            {currency === 'BDT' ? (
              <div className="space-y-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">VAT (Value Added Tax)</span>
                <div className="flex gap-3 items-center">
                  <div className="flex items-center space-x-1.5">
                    <input
                      type="number"
                      step="any"
                      value={vatRate}
                      onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                      className="block w-16 rounded-lg border border-gray-200 bg-white py-2 px-2 text-xs text-[#1E1E1E]"
                    />
                    <span className="text-xs font-semibold text-gray-500">%</span>
                  </div>
                  <label className="flex items-center space-x-1.5 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vatInclusive}
                      onChange={(e) => setVatInclusive(e.target.checked)}
                      className="accent-[#9B1C22] h-4 w-4"
                    />
                    <span className="font-semibold text-gray-650">Inclusive in Rates</span>
                  </label>
                </div>
              </div>
            ) : null}
          </div>

          {/* Section 6: Notes */}
          <div className="space-y-4 pt-6 border-t border-gray-50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">5. Terms & Payment Notes</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-550 mb-1">Client Notes</label>
                <textarea
                  rows={2}
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-2.5 text-xs text-[#1E1E1E] resize-y"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Payment Instructions</label>
                <textarea
                  rows={3}
                  value={paymentInstructions}
                  onChange={(e) => setPaymentInstructions(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-2.5 text-xs text-[#1E1E1E] resize-y font-mono text-[10px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1">Terms & Conditions</label>
                <textarea
                  rows={2}
                  value={termsConditions}
                  onChange={(e) => setTermsConditions(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-2.5 text-xs text-[#1E1E1E] resize-y"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-555 mb-1 flex items-center space-x-1.5">
                  <span>Confidential Internal Notes</span>
                  <span className="text-[8px] font-bold text-[#9B1C22] bg-red-50 px-1 py-0.2 rounded uppercase font-semibold">Will not print</span>
                </label>
                <textarea
                  rows={2}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-2.5 text-xs text-[#1E1E1E] resize-y"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-50">
            <Link
              href={`/billing/invoices/${id}`}
              className="rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave('draft')}
              className="rounded-lg border border-gray-250 bg-white py-2.5 px-4 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave('pending_approval')}
              className="rounded-lg bg-[#9B1C22] py-2.5 px-6 text-xs font-semibold text-white hover:bg-[#9B1C22]/90 shadow-md transition disabled:opacity-50 cursor-pointer flex items-center space-x-1"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Submit for Approval</span>
            </button>
          </div>
        </div>

        {/* Live scale preview panel */}
        <div className="xl:col-span-5 space-y-4 sticky top-6 hidden xl:block no-print">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Scale A4 Preview</span>
          </div>

          <div className="border border-gray-150 rounded-2xl shadow-lg bg-white overflow-hidden p-6 text-[10px] text-gray-800 font-sans aspect-[1/1.414] select-none pointer-events-none">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                  <div>
                    <div className="h-6 w-6 rounded bg-[#9B1C22] flex items-center justify-center text-white font-bold text-xs">৳</div>
                    <span className="block font-bold text-sm mt-1">
                      {currency === 'BDT' ? 'Creatiancy Limited' : 'Creatiancy LLC'}
                    </span>
                  </div>
                  <div className="text-right">
                    <h2 className="text-lg font-bold text-gray-400 uppercase">INVOICE</h2>
                    <span className="block text-[8px] mt-1 text-gray-500">Draft Status</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-100 text-[8px]">
                  <div>
                    <span className="font-bold text-gray-400 block uppercase">BILL TO:</span>
                    <p className="font-bold text-gray-800 mt-0.5">{activeClient ? (activeClient.company_name || activeClient.contact_person) : 'Client'}</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-400 block uppercase">PROJECT:</span>
                    <p className="font-bold mt-0.5 text-gray-700">{projectName || 'Project Details'}</p>
                  </div>
                </div>

                <table className="w-full text-left text-[8px] border-collapse mt-4">
                  <thead>
                    <tr className="border-b border-gray-100 font-bold text-gray-400 uppercase">
                      <th className="py-1">Service</th>
                      <th className="py-1 text-right">Qty</th>
                      <th className="py-1 text-right">Rate</th>
                      <th className="py-1 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((itm, i) => (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="py-1.5 font-bold">{itm.service_name || 'Line Item'}</td>
                        <td className="py-1.5 text-right">{itm.quantity} {itm.unit}</td>
                        <td className="py-1.5 text-right">{formatCurrency(itm.rate, currency)}</td>
                        <td className="py-1.5 text-right font-bold">{formatCurrency(itm.quantity * itm.rate, currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <div className="w-40 space-y-1.5 text-[8px]">
                    <div className="flex justify-between">
                      <span className="text-gray-450">Subtotal:</span>
                      <span className="font-bold">{formatCurrency(totals.subtotal, currency)}</span>
                    </div>
                    {discountType !== 'none' && (
                      <div className="flex justify-between text-[#9B1C22]">
                        <span>Discount:</span>
                        <span>-{formatCurrency(totals.discountAmount, currency)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-gray-100 pt-1 text-xs font-extrabold text-[#9B1C22]">
                      <span>Total Payable:</span>
                      <span>{formatCurrency(totals.totalPayable, currency)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
