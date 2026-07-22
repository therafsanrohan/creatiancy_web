'use client';

import { useState, useEffect } from 'react';
import { db, Invoice, Payment, InvoiceItem, TaxPayment, BusinessEntity, Profile, Expense, BillingClient } from '@/lib/db';
import { calculateTotals, formatCurrency } from '@/lib/calculations';
import NotificationModal from '@/components/NotificationModal';
import {
  Calculator, TrendingUp, DollarSign, CheckCircle, Plus,
  Receipt, AlertCircle, Loader2, Calendar, Download, Pencil, Globe,
  Scale, ShieldCheck, ArrowRight, Info, X
} from 'lucide-react';

type PeriodFilter = 'this-month' | 'last-month' | 'this-quarter' | 'this-year' | 'custom-year';
type RegionTab = 'BDT' | 'USD';

function StatCard({ label, amount, sub, color, icon: Icon, badge }: {
  label: string; amount: string; sub?: string; color: string; icon: React.ElementType;
  badge?: { text: string; type: 'warn' | 'ok' | 'info' };
}) {
  return (
    <div className="rounded-2xl border p-5 bg-white shadow-sm flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${color}`}><Icon className="h-5 w-5 text-white" /></div>
        {badge && (
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border
            ${badge.type === 'warn' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              badge.type === 'ok' ? 'bg-green-50 text-green-700 border-green-200' :
              'bg-blue-50 text-blue-700 border-blue-200'}`}>{badge.text}</span>
        )}
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{amount}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export default function TaxLedgerPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [allItems, setAllItems] = useState<InvoiceItem[]>([]);
  const [allPayments, setAllPayments] = useState<Payment[]>([]);
  const [taxPayments, setTaxPayments] = useState<TaxPayment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [entities, setEntities] = useState<BusinessEntity[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('this-year');
  const [regionTab, setRegionTab] = useState<RegionTab>('BDT');
  const [clients, setClients] = useState<BillingClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRecordModal, setShowRecordModal] = useState(false);

  // Inline rate editing for Corporate Tax % and VAT %
  const [editingRates, setEditingRates] = useState(false);
  const [localTaxRate, setLocalTaxRate] = useState(27.5);
  const [localVatRate, setLocalVatRate] = useState(15.0);
  const [savingRate, setSavingRate] = useState(false);

  // Year filter for monthly breakdown
  const [breakdownYear, setBreakdownYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  // Record payment form
  const [formEntityId, setFormEntityId] = useState('');
  const [formTaxType, setFormTaxType] = useState<'VAT' | 'Corporate Tax'>('VAT');
  const [formAmount, setFormAmount] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10));
  const [formChallan, setFormChallan] = useState('');
  const [formPeriodStart, setFormPeriodStart] = useState('');
  const [formPeriodEnd, setFormPeriodEnd] = useState('');
  const [saving, setSaving] = useState(false);

  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'success' | 'error' | 'info'; title: string; message: string; }>({ isOpen: false, type: 'info', title: '', message: '' });
  const showNotif = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => setModalState({ isOpen: true, title, message, type });

  const activeEntityCode = regionTab === 'BDT' ? 'CLTD' : 'CLLC';

  useEffect(() => {
    async function load() {
      try {
        const [invs, pays, ents, user, taxPays, exps, cls] = await Promise.all([
          db.getInvoices(), db.getPayments(), db.getEntities(), db.getCurrentUser(), db.getTaxPayments(), db.getExpenses(), db.getClients()
        ]);
        setInvoices(invs); setAllPayments(pays); setEntities(ents); setCurrentUser(user); setTaxPayments(taxPays); setExpenses(exps); setClients(cls);
        setFormEntityId(ents[0]?.id || '');
        const itemLists = await Promise.all(invs.map(inv => db.getInvoiceItems(inv.id)));
        setAllItems(itemLists.flat());
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    load();
  }, []);

  // Update local rates whenever regionTab or entities change
  useEffect(() => {
    const ent = entities.find(e => e.entity_code === activeEntityCode);
    if (ent) {
      setLocalTaxRate(ent.corporate_tax_rate ?? (regionTab === 'BDT' ? 27.5 : 21.0));
      setLocalVatRate(ent.default_vat_rate ?? (regionTab === 'BDT' ? 15.0 : 0.0));
    }
  }, [regionTab, entities, activeEntityCode]);

  const filterDate = (dateStr: string): boolean => {
    const d = new Date(dateStr);
    const now = new Date();
    if (periodFilter === 'this-month') return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    if (periodFilter === 'last-month') { const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1); return d.getFullYear() === lm.getFullYear() && d.getMonth() === lm.getMonth(); }
    if (periodFilter === 'this-quarter') { const qStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1); return d >= qStart && d <= now; }
    if (periodFilter === 'this-year') return d.getFullYear() === now.getFullYear();
    if (periodFilter === 'custom-year') return d.getFullYear() === breakdownYear;
    return true;
  };

  const computeAccruals = (currency: 'BDT' | 'USD', filterFn: (d: string) => boolean) => {
    const relevant = invoices.filter(inv =>
      inv.currency === currency &&
      ['paid', 'partially_paid', 'sent', 'approved', 'overdue'].includes(inv.status) &&
      filterFn(inv.issue_date)
    );
    let revenue = 0, vat = 0;
    for (const inv of relevant) {
      const items = allItems.filter(i => i.invoice_id === inv.id);
      const pays = allPayments.filter(p => p.invoice_id === inv.id);
      const t = calculateTotals({ items: items.map(i => ({ quantity: i.quantity, rate: i.rate })), discountType: inv.discount_type, discountValue: inv.discount_value, vatRate: inv.vat_rate, vatInclusive: inv.vat_inclusive, payments: pays });
      revenue += t.totalPayable;
      vat += t.vatAmount;
    }
    const relevantExpenses = expenses.filter(e => e.currency === currency && filterFn(e.expense_date)).reduce((s, e) => s + e.amount, 0);
    const preTaxRevenue = revenue - vat;
    const taxableProfit = Math.max(0, preTaxRevenue - relevantExpenses);

    /* Bangladesh Tax Law (Income Tax Act 2023, Section 163):
     * - Corporate tax: 27.5% on net taxable profit (non-listed company)
     * - Minimum tax: 1.0% of gross receipts/turnover (regardless of profit/loss)
     * - Effective liability = whichever is higher */
    const corporateTaxOnProfit = (taxableProfit * localTaxRate) / 100;
    const minimumTaxOnTurnover = currency === 'BDT' ? (preTaxRevenue * 1.0) / 100 : 0;
    const effectiveTax = currency === 'BDT'
      ? Math.max(corporateTaxOnProfit, minimumTaxOnTurnover)
      : corporateTaxOnProfit;
    const minimumTaxApplies = currency === 'BDT' && minimumTaxOnTurnover > corporateTaxOnProfit;

    return {
      revenue, vat, tax: effectiveTax, expenses: relevantExpenses,
      taxableProfit, preTaxRevenue,
      corporateTaxOnProfit, minimumTaxOnTurnover, minimumTaxApplies
    };
  };

  // Client Direct-Paid VAT Invoices (where vat_rate <= 0 or not charged by Creatiancy)
  const clientDirectVatInvoices = invoices.filter(inv =>
    inv.currency === regionTab &&
    ['paid', 'partially_paid', 'sent', 'approved', 'overdue'].includes(inv.status) &&
    (inv.vat_rate <= 0 || !inv.vat_rate) &&
    filterDate(inv.issue_date)
  );

  const accruals = computeAccruals(regionTab, filterDate);
  const {
    revenue: totalRevenue, vat: totalAccruedVAT, tax: totalAccruedTax,
    expenses: totalExpenses, taxableProfit: totalTaxableProfit,
    preTaxRevenue: totalPreTaxRevenue,
    corporateTaxOnProfit: totalCorpTaxCalc, minimumTaxOnTurnover: totalMinTaxCalc,
    minimumTaxApplies: minTaxApplies
  } = accruals;

  const filteredTaxPayments = taxPayments.filter(tp => filterDate(tp.payment_date));
  const totalVATPaid = filteredTaxPayments.filter(tp => tp.tax_type === 'VAT').reduce((s, tp) => s + tp.amount, 0);
  const totalCorpTaxPaid = filteredTaxPayments.filter(tp => tp.tax_type === 'Corporate Tax').reduce((s, tp) => s + tp.amount, 0);
  const vatBalance = totalAccruedVAT - totalVATPaid;
  const taxBalance = totalAccruedTax - totalCorpTaxPaid;

  // Monthly breakdown for selected year
  const monthlyBreakdown = Array.from({ length: 12 }, (_, m) => {
    const { revenue: rev, vat, tax } = computeAccruals(regionTab, (d: string) => {
      const date = new Date(d);
      return date.getFullYear() === breakdownYear && date.getMonth() === m;
    });
    return { month: new Date(breakdownYear, m, 1).toLocaleString('default', { month: 'long' }), revenue: rev, vatAccrued: vat, taxAccrued: tax };
  });

  const handleSaveRates = async () => {
    try {
      setSavingRate(true);
      const targetEntity = entities.find(e => e.entity_code === activeEntityCode);
      if (targetEntity) {
        await db.updateEntity(targetEntity.id, { corporate_tax_rate: localTaxRate, default_vat_rate: localVatRate });
        const refreshed = await db.getEntities();
        setEntities(refreshed);
        setEditingRates(false);
        showNotif('Tax Rates Updated', `Tax rates for ${regionTab} updated: Corp Tax ${localTaxRate}%, VAT ${localVatRate}%. All accruals recalculated.`, 'success');
      }
    } catch { showNotif('Error', 'Failed to update tax rates.', 'error'); }
    finally { setSavingRate(false); }
  };

  const handleRecordPayment = async () => {
    if (!formAmount || !formChallan || !formDate || !formPeriodStart || !formPeriodEnd) {
      showNotif('Validation Error', 'All fields are required.', 'error'); return;
    }
    const amount = parseFloat(formAmount);
    if (isNaN(amount) || amount <= 0) { showNotif('Validation Error', 'Enter a valid positive amount.', 'error'); return; }
    try {
      setSaving(true);
      await db.recordTaxPayment({ entity_id: formEntityId, tax_type: formTaxType, amount, payment_date: formDate, challan_number: formChallan, period_start: formPeriodStart, period_end: formPeriodEnd, recorded_by: currentUser?.id || '' });
      const refreshed = await db.getTaxPayments();
      setTaxPayments(refreshed);
      setShowRecordModal(false);
      setFormAmount(''); setFormChallan('');
      showNotif('Payment Recorded', `${formatCurrency(amount, regionTab)} recorded as ${formTaxType} with Challan #${formChallan}.`, 'success');
    } catch { showNotif('Error', 'Failed to record payment.', 'error'); }
    finally { setSaving(false); }
  };

  // CSV Export for monthly breakdown
  const handleExportCSV = () => {
    const rows = [
      ['Month', `${regionTab} Revenue`, 'VAT Accrued', `Corp Tax (${localTaxRate}%)`, 'Total Tax Burden'],
      ...monthlyBreakdown.map(r => [r.month, r.revenue.toFixed(2), r.vatAccrued.toFixed(2), r.taxAccrued.toFixed(2), (r.vatAccrued + r.taxAccrued).toFixed(2)])
    ];
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `Tax_Accruals_${regionTab}_${breakdownYear}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
    </div>
  );

  const periodLabels: Record<PeriodFilter, string> = {
    'this-month': 'This Month', 'last-month': 'Last Month', 'this-quarter': 'This Quarter',
    'this-year': 'This Year', 'custom-year': `FY ${breakdownYear}`,
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <NotificationModal isOpen={modalState.isOpen} type={modalState.type} title={modalState.title} message={modalState.message} onClose={() => setModalState(s => ({ ...s, isOpen: false }))} />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#9B1C22]" />
              Tax & VAT Ledger
            </h1>
            {/* Inline Tax & VAT Rate Editor for Active Region */}
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              {editingRates ? (
                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-gray-500">Corp Tax:</span>
                    <input type="number" min="0" max="50" step="0.5" value={localTaxRate}
                      onChange={e => setLocalTaxRate(parseFloat(e.target.value) || 0)}
                      className="w-16 text-xs font-bold border border-gray-300 bg-white rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30 font-mono" />
                    <span className="text-xs text-gray-400">%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-gray-500">VAT / Sales Tax:</span>
                    <input type="number" min="0" max="50" step="0.5" value={localVatRate}
                      onChange={e => setLocalVatRate(parseFloat(e.target.value) || 0)}
                      className="w-16 text-xs font-bold border border-gray-300 bg-white rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30 font-mono" />
                    <span className="text-xs text-gray-400">%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleSaveRates} disabled={savingRate}
                      className="text-[11px] font-bold bg-[#9B1C22] text-white px-3 py-1 rounded-lg hover:bg-[#7d1219] cursor-pointer flex items-center gap-1">
                      {savingRate ? <Loader2 className="h-3 w-3 animate-spin" /> : null} Save Rates
                    </button>
                    <button onClick={() => setEditingRates(false)} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 cursor-pointer">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {regionTab} Tax Rates: <strong className="text-gray-800">Corp Tax {localTaxRate}%</strong> · <strong className="text-gray-800">VAT {localVatRate}%</strong>
                  </span>
                  <button onClick={() => setEditingRates(true)} className="text-gray-400 hover:text-[#9B1C22] cursor-pointer transition flex items-center gap-1 text-xs font-semibold bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded-md">
                    <Pencil className="h-3 w-3" /> Edit %
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Region tabs (Clean text without flag icons as requested) */}
            <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white">
              {(['BDT', 'USD'] as RegionTab[]).map(r => (
                <button key={r} onClick={() => setRegionTab(r)}
                  className={`px-4 py-2 text-xs font-bold transition cursor-pointer ${regionTab === r ? 'bg-[#9B1C22] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                  {r}
                </button>
              ))}
            </div>
            {/* Period filter */}
            <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
              {(['this-month', 'this-quarter', 'this-year'] as PeriodFilter[]).map(p => (
                <button key={p} onClick={() => setPeriodFilter(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${periodFilter === p ? 'bg-[#9B1C22] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                  {periodLabels[p]}
                </button>
              ))}
            </div>
            <button onClick={() => setShowRecordModal(true)}
              className="flex items-center gap-1.5 bg-[#9B1C22] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#7d1219] shadow-sm transition cursor-pointer">
              <Plus className="h-3.5 w-3.5" /> Record Tax Payment
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 space-y-6">
        {/* Region-specific legal reference notice */}
        {regionTab === 'BDT' ? (
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 text-xs text-blue-800">
            <Scale className="h-4 w-4 mt-0.5 text-blue-500 shrink-0" />
            <div>
              <strong>Bangladesh Income Tax Act 2023 (FY 2025-26):</strong> Non-publicly traded companies pay Corporate Tax at <strong>{localTaxRate}%</strong> on net profit, or <strong>Minimum Tax at 1.0%</strong> of gross receipts (Section 163) — whichever is higher. Standard VAT rate is <strong>{localVatRate}%</strong> (applicable if annual turnover exceeds BDT 50 Lakh).
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-2xl px-5 py-4 text-xs text-purple-800">
            <Globe className="h-4 w-4 mt-0.5 text-purple-500 shrink-0" />
            <div><strong>US Entity USD Tax Obligations:</strong> Corporate Tax at <strong>{localTaxRate}%</strong> and Sales Tax at <strong>{localVatRate}%</strong> for Creatiancy LLC (USA).</div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label={`${regionTab} Revenue`} amount={formatCurrency(totalRevenue, regionTab)} sub={`Active ${regionTab} invoices`} color="bg-gray-700" icon={DollarSign} />
          <StatCard label={`Accrued VAT (${localVatRate}%)`} amount={formatCurrency(totalAccruedVAT, regionTab)} sub="Based on declared invoice VAT" color="bg-amber-500" icon={TrendingUp} badge={{ text: regionTab === 'BDT' ? 'BD VAT' : 'US Sales Tax', type: 'warn' }} />
          <StatCard label={`Effective Corp. Tax`} amount={formatCurrency(totalAccruedTax, regionTab)} sub={regionTab === 'BDT' ? (minTaxApplies ? 'Min. tax (1%) applies' : `${localTaxRate}% on net profit`) : `${localTaxRate}% on net profit`} color="bg-[#9B1C22]" icon={Calculator} badge={{ text: regionTab === 'BDT' ? (minTaxApplies ? 'MIN TAX' : 'CORP TAX') : regionTab, type: minTaxApplies ? 'warn' : 'info' }} />
          <StatCard label="Total Tax Burden" amount={formatCurrency(totalAccruedVAT + totalAccruedTax, regionTab)} sub="VAT + Corp Tax combined" color="bg-purple-600" icon={Receipt} />
        </div>

        {/* Smart Tax Advisory Panel (BDT only — BD law compliance) */}
        {regionTab === 'BDT' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <ShieldCheck className="h-4.5 w-4.5 text-[#9B1C22]" />
              <h2 className="text-sm font-bold text-gray-900">Tax Obligation Advisory</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200 ml-auto">Live Data</span>
            </div>
            <div className="p-6 space-y-5">
              {/* Financial Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                  <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Gross Revenue</p>
                  <p className="text-lg font-extrabold text-gray-900">{formatCurrency(totalRevenue, 'BDT')}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                  <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Pre-Tax Revenue (excl. VAT)</p>
                  <p className="text-lg font-extrabold text-gray-900">{formatCurrency(totalPreTaxRevenue, 'BDT')}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                  <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Total Expenses</p>
                  <p className="text-lg font-extrabold text-red-600">{formatCurrency(totalExpenses, 'BDT')}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                  <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Net Taxable Profit</p>
                  <p className="text-lg font-extrabold text-emerald-700">{formatCurrency(totalTaxableProfit, 'BDT')}</p>
                </div>
              </div>

              {/* Two-column comparison: Corporate Tax vs Minimum Tax */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Corporate Tax Route */}
                <div className={`rounded-xl border-2 p-4 space-y-2.5 transition ${!minTaxApplies ? 'border-[#9B1C22] bg-red-50/40' : 'border-gray-200 bg-gray-50/50'}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Route A: Corporate Tax</p>
                    {!minTaxApplies && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#9B1C22] text-white">Applies</span>
                    )}
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900">{formatCurrency(totalCorpTaxCalc, 'BDT')}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Net Taxable Profit</span>
                      <span className="font-semibold text-gray-700">{formatCurrency(totalTaxableProfit, 'BDT')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <ArrowRight className="h-3 w-3" />
                      <span>@ {localTaxRate}% (Income Tax Act, Sixth Schedule)</span>
                    </div>
                  </div>
                </div>

                {/* Minimum Tax Route */}
                <div className={`rounded-xl border-2 p-4 space-y-2.5 transition ${minTaxApplies ? 'border-amber-500 bg-amber-50/40' : 'border-gray-200 bg-gray-50/50'}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Route B: Minimum Tax (Sec. 163)</p>
                    {minTaxApplies && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-600 text-white">Applies</span>
                    )}
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900">{formatCurrency(totalMinTaxCalc, 'BDT')}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Gross Receipts (Pre-Tax)</span>
                      <span className="font-semibold text-gray-700">{formatCurrency(totalPreTaxRevenue, 'BDT')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <ArrowRight className="h-3 w-3" />
                      <span>@ 1.0% minimum (regardless of profit/loss)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verdict */}
              <div className={`rounded-xl p-4 flex items-start gap-3 ${minTaxApplies ? 'bg-amber-50 border border-amber-200' : totalTaxableProfit > 0 ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'}`}>
                <Info className="h-4 w-4 mt-0.5 shrink-0" style={{ color: minTaxApplies ? '#d97706' : totalTaxableProfit > 0 ? '#9B1C22' : '#059669' }} />
                <div className="text-xs leading-relaxed">
                  {totalPreTaxRevenue === 0 ? (
                    <p className="text-emerald-800"><strong>No taxable revenue detected.</strong> No corporate tax or minimum tax obligation for this period based on current data.</p>
                  ) : minTaxApplies ? (
                    <p className="text-amber-800">
                      <strong>Minimum Tax applies.</strong> Your corporate tax ({formatCurrency(totalCorpTaxCalc, 'BDT')}) is lower than the minimum tax ({formatCurrency(totalMinTaxCalc, 'BDT')}). Per Section 163 of the Income Tax Act 2023, you must pay <strong>{formatCurrency(totalMinTaxCalc, 'BDT')}</strong> as minimum tax on gross receipts, regardless of profit level.
                    </p>
                  ) : (
                    <p className="text-[#9B1C22]">
                      <strong>Corporate Tax applies.</strong> Your net taxable profit of {formatCurrency(totalTaxableProfit, 'BDT')} yields a corporate tax of <strong>{formatCurrency(totalCorpTaxCalc, 'BDT')}</strong> at {localTaxRate}%, which exceeds the minimum tax floor of {formatCurrency(totalMinTaxCalc, 'BDT')}. This is your effective tax liability for this period.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* VAT */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">VAT Status</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${vatBalance > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}`}>{vatBalance > 0 ? 'Payable' : 'Settled'}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-400">Accrued</span><span className="font-bold text-amber-700">{formatCurrency(totalAccruedVAT, regionTab)}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Paid to Govt.</span><span className="font-bold text-green-700">{formatCurrency(totalVATPaid, regionTab)}</span></div>
              <div className="flex justify-between border-t border-gray-100 pt-2"><span className="font-semibold text-gray-700">Net Due</span><span className={`font-extrabold ${vatBalance > 0 ? 'text-amber-700' : 'text-green-700'}`}>{formatCurrency(Math.abs(vatBalance), regionTab)}</span></div>
            </div>
          </div>
          {/* Corporate Tax */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Corporate Tax</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${taxBalance > 0 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>{taxBalance > 0 ? 'Payable' : 'Settled'}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-400">Accrued ({localTaxRate}%)</span><span className="font-bold text-[#9B1C22]">{formatCurrency(totalAccruedTax, regionTab)}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Paid to Govt.</span><span className="font-bold text-green-700">{formatCurrency(totalCorpTaxPaid, regionTab)}</span></div>
              <div className="flex justify-between border-t border-gray-100 pt-2"><span className="font-semibold text-gray-700">Net Due</span><span className={`font-extrabold ${taxBalance > 0 ? 'text-[#9B1C22]' : 'text-green-700'}`}>{formatCurrency(Math.abs(taxBalance), regionTab)}</span></div>
            </div>
          </div>
          {/* Combined */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Combined Outstanding</p>
              <CheckCircle className="h-4 w-4 text-gray-300" />
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-400">Total Accrued</span><span className="font-bold text-gray-800">{formatCurrency(totalAccruedVAT + totalAccruedTax, regionTab)}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Total Paid</span><span className="font-bold text-green-700">{formatCurrency(totalVATPaid + totalCorpTaxPaid, regionTab)}</span></div>
              <div className="flex justify-between border-t border-gray-100 pt-2"><span className="font-semibold text-gray-700">Total Outstanding</span><span className={`font-extrabold ${(vatBalance + taxBalance) > 0 ? 'text-[#9B1C22]' : 'text-green-700'}`}>{formatCurrency(Math.abs(vatBalance + taxBalance), regionTab)}</span></div>
            </div>
          </div>
        </div>

        {/* Monthly Breakdown Table with year picker + export */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-gray-100 gap-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Monthly Accrual Breakdown — {regionTab}</h2>
              <p className="text-xs text-gray-400 mt-0.5">VAT + Corporate Tax accrual by month for {regionTab}.</p>
            </div>
            <div className="flex items-center gap-2">
              <select value={breakdownYear} onChange={e => setBreakdownYear(Number(e.target.value))}
                className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-bold focus:outline-none cursor-pointer">
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <button onClick={handleExportCSV}
                className="flex items-center gap-1.5 border border-gray-200 text-gray-500 hover:bg-gray-50 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-3 px-4">Month</th>
                  <th className="py-3 px-4">{regionTab} Revenue</th>
                  <th className="py-3 px-4 text-amber-600">VAT Accrued</th>
                  <th className="py-3 px-4 text-[#9B1C22]">Corp. Tax ({localTaxRate}%)</th>
                  <th className="py-3 px-4">Total Tax</th>
                </tr>
              </thead>
              <tbody>
                {monthlyBreakdown.map(row => (
                  <tr key={row.month} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4 text-sm font-semibold text-gray-700">{row.month}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatCurrency(row.revenue, regionTab)}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-amber-700">{formatCurrency(row.vatAccrued, regionTab)}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-[#9B1C22]">{formatCurrency(row.taxAccrued, regionTab)}</td>
                    <td className="py-3 px-4 text-sm font-extrabold text-gray-900">{formatCurrency(row.vatAccrued + row.taxAccrued, regionTab)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-200">
                  <td className="py-3 px-4 text-xs font-extrabold text-gray-900">Annual Total</td>
                  <td className="py-3 px-4 text-xs font-extrabold text-gray-900">{formatCurrency(monthlyBreakdown.reduce((s, r) => s + r.revenue, 0), regionTab)}</td>
                  <td className="py-3 px-4 text-xs font-extrabold text-amber-700">{formatCurrency(monthlyBreakdown.reduce((s, r) => s + r.vatAccrued, 0), regionTab)}</td>
                  <td className="py-3 px-4 text-xs font-extrabold text-[#9B1C22]">{formatCurrency(monthlyBreakdown.reduce((s, r) => s + r.taxAccrued, 0), regionTab)}</td>
                  <td className="py-3 px-4 text-xs font-extrabold text-gray-900">{formatCurrency(monthlyBreakdown.reduce((s, r) => s + r.vatAccrued + r.taxAccrued, 0), regionTab)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Govt. Challan Payment Ledger */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Government Exchequer Payment Ledger</h2>
              <p className="text-xs text-gray-400 mt-0.5">Challan payments recorded for VAT &amp; Corporate Tax.</p>
            </div>
            <button onClick={() => setShowRecordModal(true)}
              className="flex items-center gap-1.5 bg-[#9B1C22] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#7d1219] shadow-sm transition cursor-pointer">
              <Plus className="h-3.5 w-3.5" /> Record
            </button>
          </div>
          {taxPayments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <Receipt className="h-10 w-10 text-gray-200" />
              <p className="text-sm font-semibold text-gray-400">No tax payments recorded yet</p>
              <button onClick={() => setShowRecordModal(true)} className="text-xs font-bold text-[#9B1C22] hover:underline cursor-pointer">Record your first Challan →</button>
            </div>
          ) : (
            <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Challan #</th>
                    <th className="py-3 px-4">Period Covered</th>
                  </tr>
                </thead>
                <tbody>
                  {[...taxPayments].sort((a, b) => b.payment_date.localeCompare(a.payment_date)).map(tp => (
                    <tr key={tp.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-700">{tp.payment_date}</td>
                      <td className="py-3 px-4"><span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${tp.tax_type === 'VAT' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{tp.tax_type}</span></td>
                      <td className="py-3 px-4 text-sm font-extrabold text-gray-900">{formatCurrency(tp.amount, regionTab)}</td>
                      <td className="py-3 px-4 text-sm font-mono text-gray-600">{tp.challan_number}</td>
                      <td className="py-3 px-4 text-xs text-gray-500">{tp.period_start} → {tp.period_end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-50">
              {[...taxPayments].sort((a, b) => b.payment_date.localeCompare(a.payment_date)).map(tp => (
                <div key={tp.id} className="px-4 py-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${tp.tax_type === 'VAT' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{tp.tax_type}</span>
                      <p className="text-xs text-gray-500 mt-1">{tp.payment_date}</p>
                    </div>
                    <p className="text-sm font-extrabold text-gray-900 shrink-0 ml-3">{formatCurrency(tp.amount, regionTab)}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="font-mono">{tp.challan_number}</span>
                    <span>{tp.period_start} → {tp.period_end}</span>
                  </div>
                </div>
              ))}
            </div>
            </>
          )}
        </div>

        {/* Client Direct-Paid VAT Ledger Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span>Client Direct-Paid VAT Invoices</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase">
                  {clientDirectVatInvoices.length} Invoices
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Invoices where client handles VAT payment directly to NBR on their end (0% charged by Creatiancy).
              </p>
            </div>
          </div>
          {clientDirectVatInvoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
              <Receipt className="h-8 w-8 text-gray-300" />
              <p className="text-xs font-semibold text-gray-400">No client direct-paid VAT invoices found for this period.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Issue Date</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">VAT Compliance Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {clientDirectVatInvoices.map(inv => {
                    const client = clients.find(c => c.id === inv.client_id);
                    const clientName = client?.company_name || client?.contact_person || 'Client';
                    const invItems = allItems.filter(i => i.invoice_id === inv.id);
                    const invPays = allPayments.filter(p => p.invoice_id === inv.id);
                    const t = calculateTotals({ items: invItems.map(i => ({ quantity: i.quantity, rate: i.rate })), discountType: inv.discount_type, discountValue: inv.discount_value, vatRate: inv.vat_rate, vatInclusive: inv.vat_inclusive, payments: invPays });

                    return (
                      <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-xs font-bold text-gray-900">{inv.invoice_number}</td>
                        <td className="py-3 px-4 text-xs text-gray-700 font-semibold">{clientName}</td>
                        <td className="py-3 px-4 text-xs text-gray-500">{inv.issue_date}</td>
                        <td className="py-3 px-4 text-xs font-extrabold text-gray-900">{formatCurrency(t.totalPayable, inv.currency)}</td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                            Client Pays VAT Directly
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Record Tax Payment</h3>
                <p className="text-xs text-gray-400 mt-1">Enter Challan details for the govt. exchequer payment.</p>
              </div>
              <button onClick={() => setShowRecordModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 transition">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            <div className="px-6 py-6 space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Business Entity</label>
                <select value={formEntityId} onChange={e => setFormEntityId(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30 cursor-pointer">
                  {entities.map(e => <option key={e.id} value={e.id}>{e.legal_name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Tax Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['VAT', 'Corporate Tax'] as const).map(t => (
                    <button key={t} onClick={() => setFormTaxType(t)} className={`py-3 rounded-xl text-sm font-bold border transition cursor-pointer ${formTaxType === t ? 'bg-[#9B1C22] text-white border-[#9B1C22]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Amount Paid ({regionTab})</label>
                <input type="number" min="0" step="0.01" value={formAmount} onChange={e => setFormAmount(e.target.value)} placeholder="e.g. 50000" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Payment Date</label>
                <input type="date" value={formDate} onChange={e => setFormDate(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Challan / Treasury Number</label>
                <input type="text" value={formChallan} onChange={e => setFormChallan(e.target.value)} placeholder="e.g. TC-2026-001234" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Period Start</label>
                  <input type="date" value={formPeriodStart} onChange={e => setFormPeriodStart(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Period End</label>
                  <input type="date" value={formPeriodEnd} onChange={e => setFormPeriodEnd(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30" />
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-2 flex gap-3 sticky bottom-0 bg-white border-t border-gray-50">
              <button onClick={() => setShowRecordModal(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer">Cancel</button>
              <button onClick={handleRecordPayment} disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#9B1C22] text-white text-sm font-bold hover:bg-[#7d1219] shadow-sm transition disabled:opacity-50 cursor-pointer">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
