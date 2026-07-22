'use client';

import { useState, useEffect } from 'react';
import {
  db, Invoice, Payment, InvoiceItem, TaxPayment, BusinessEntity, Profile, Expense,
  TaxConfiguration, TaxServiceCategory, TaxCalculation, TaxAuditLog
} from '@/lib/db';
import { calculateTotals, formatCurrency, calculateBangladeshCorporateTax, BdCorporateTaxResult } from '@/lib/calculations';
import NotificationModal from '@/components/NotificationModal';
import {
  Calculator, TrendingUp, DollarSign, CheckCircle, Plus,
  Receipt, AlertCircle, Loader2, Calendar, Download, Pencil, Globe,
  Scale, ShieldCheck, ArrowRight, Info, X, Settings, History, Lock, RefreshCw, Send, HelpCircle
} from 'lucide-react';

type TabView = 'calculator' | 'configurations' | 'audit_logs' | 'challan_ledger';

export default function TaxLedgerPage() {
  const [activeTab, setActiveTab] = useState<TabView>('calculator');
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  // Core Data
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [allItems, setAllItems] = useState<InvoiceItem[]>([]);
  const [allPayments, setAllPayments] = useState<Payment[]>([]);
  const [taxPayments, setTaxPayments] = useState<TaxPayment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [entities, setEntities] = useState<BusinessEntity[]>([]);
  const [taxConfigs, setTaxConfigs] = useState<TaxConfiguration[]>([]);
  const [activeConfig, setActiveConfig] = useState<TaxConfiguration | null>(null);
  const [serviceCategories, setServiceCategories] = useState<TaxServiceCategory[]>([]);
  const [auditLogs, setAuditLogs] = useState<TaxAuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Financial Year Selection
  const [financialYear, setFinancialYear] = useState<string>('2026-2027');
  const financialYears = ['2026-2027', '2025-2026', '2024-2025'];

  // Tax Calculator State Inputs
  const [grossReceipts, setGrossReceipts] = useState<number>(0);
  const [allowableExpenses, setAllowableExpenses] = useState<number>(0);
  const [disallowedExpenses, setDisallowedExpenses] = useState<number>(0);
  const [otherAdjustments, setOtherAdjustments] = useState<number>(0);
  const [allTransactionsViaBank, setAllTransactionsViaBank] = useState<boolean>(true);
  const [certifiedTds, setCertifiedTds] = useState<number>(0);
  const [advanceTaxPaid, setAdvanceTaxPaid] = useState<number>(0);
  const [manualTaxAdjustment, setManualTaxAdjustment] = useState<number>(0);

  // Override Modal state
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideAmount, setOverrideAmount] = useState<string>('');
  const [overrideReason, setOverrideReason] = useState<string>('');
  const [activeOverrideVal, setActiveOverrideVal] = useState<number | null>(null);
  const [activeOverrideReason, setActiveOverrideReason] = useState<string | null>(null);
  const [savingOverride, setSavingOverride] = useState(false);

  // Config Management Modal state
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [cfgName, setCfgName] = useState('');
  const [cfgFy, setCfgFy] = useState('2026-2027');
  const [cfgBankRate, setCfgBankRate] = useState(25.0);
  const [cfgStdRate, setCfgStdRate] = useState(27.5);
  const [cfgThreshold, setCfgThreshold] = useState(5000000);
  const [cfgTurnoverRate, setCfgTurnoverRate] = useState(0.60);
  const [cfgSourceRef, setCfgSourceRef] = useState('Income Tax Act 2023, Section 163');
  const [cfgSummary, setCfgSummary] = useState('Updated corporate tax parameters per NBR circular.');
  const [publishToNoticeBoard, setPublishToNoticeBoard] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);

  // Record Payment Modal state
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [formEntityId, setFormEntityId] = useState('');
  const [formTaxType, setFormTaxType] = useState<'VAT' | 'Corporate Tax'>('Corporate Tax');
  const [formAmount, setFormAmount] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10));
  const [formChallan, setFormChallan] = useState('');
  const [formPeriodStart, setFormPeriodStart] = useState('');
  const [formPeriodEnd, setFormPeriodEnd] = useState('');
  const [savingPayment, setSavingPayment] = useState(false);

  // Notification Modal
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'success' | 'error' | 'info'; title: string; message: string; }>({ isOpen: false, type: 'info', title: '', message: '' });
  const showNotif = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => setModalState({ isOpen: true, title, message, type });

  // Permissions check (Super Admin, Admin, Finance Admin allowed to edit config & override)
  const canManageTax = currentUser && ['Super Admin', 'Admin', 'Finance Admin'].includes(currentUser.role_name);

  useEffect(() => {
    async function loadData() {
      try {
        const [user, invs, pays, exps, ents, taxPays, cfgs, logs] = await Promise.all([
          db.getCurrentUser(),
          db.getInvoices(),
          db.getPayments(),
          db.getExpenses(),
          db.getEntities(),
          db.getTaxPayments(),
          db.getTaxConfigurations(),
          db.getTaxAuditLogs()
        ]);

        setCurrentUser(user);
        setInvoices(invs);
        setAllPayments(pays);
        setExpenses(exps);
        setEntities(ents);
        setTaxPayments(taxPays);
        setTaxConfigs(cfgs);
        setAuditLogs(logs);

        const currentActive = cfgs.find(c => c.financial_year === financialYear && c.status === 'ACTIVE') || cfgs[0] || null;
        setActiveConfig(currentActive);

        if (currentActive) {
          const cats = await db.getTaxServiceCategories(currentActive.id);
          setServiceCategories(cats);
        }

        const itemLists = await Promise.all(invs.map(i => db.getInvoiceItems(i.id)));
        const flatItems = itemLists.flat();
        setAllItems(flatItems);

        // Auto-calculate live gross receipts & allowable expenses for current FY
        const [startYear] = financialYear.split('-').map(Number);
        const fyStartDate = `${startYear}-07-01`;
        const fyEndDate = `${startYear + 1}-06-30`;

        const fyInvoices = invs.filter(inv =>
          inv.currency === 'BDT' &&
          ['paid', 'partially_paid', 'sent', 'approved', 'overdue'].includes(inv.status) &&
          inv.issue_date >= fyStartDate && inv.issue_date <= fyEndDate
        );

        let liveGross = 0;
        for (const inv of fyInvoices) {
          const items = flatItems.filter(i => i.invoice_id === inv.id);
          const paysForInv = pays.filter(p => p.invoice_id === inv.id);
          const totals = calculateTotals({ items: items.map(i => ({ quantity: i.quantity, rate: i.rate })), discountType: inv.discount_type, discountValue: inv.discount_value, vatRate: inv.vat_rate, vatInclusive: inv.vat_inclusive, payments: paysForInv });
          liveGross += (totals.totalPayable - totals.vatAmount);
        }
        setGrossReceipts(liveGross);

        const fyExpenses = exps
          .filter(e => e.currency === 'BDT' && e.expense_date >= fyStartDate && e.expense_date <= fyEndDate)
          .reduce((sum, e) => sum + e.amount, 0);
        setAllowableExpenses(fyExpenses);

        if (ents[0]) setFormEntityId(ents[0].id);

      } catch (e) {
        console.error('Failed to load tax module data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [financialYear]);

  // Compute Income Tax Liability using decimal-safe calculation engine
  const bankRate = activeConfig ? activeConfig.bank_compliant_tax_rate : 0.25;
  const stdRate = activeConfig ? activeConfig.standard_tax_rate : 0.275;
  const turnThreshold = activeConfig ? activeConfig.turnover_threshold : 5000000;
  const turnRate = activeConfig ? activeConfig.turnover_minimum_rate : 0.006;

  const taxResult: BdCorporateTaxResult = calculateBangladeshCorporateTax({
    grossReceipts,
    allowableExpenses,
    disallowedExpenses,
    otherAdjustments,
    allTransactionsViaBank,
    bankCompliantTaxRate: bankRate,
    standardTaxRate: stdRate,
    turnoverThreshold: turnThreshold,
    turnoverMinimumTaxRate: turnRate,
    certifiedTds,
    advanceTaxPaid,
    manualTaxAdjustment,
    manualOverrideTax: activeOverrideVal
  });

  // Handle Saving New / Updated Tax Configuration
  const handleSaveConfiguration = async () => {
    if (!canManageTax) {
      showNotif('Access Denied', 'Only Super Admin, Admin, or Finance Admin can manage tax configurations.', 'error');
      return;
    }
    if (!cfgFy || !cfgName) {
      showNotif('Validation Error', 'Financial Year and Configuration Name are required.', 'error');
      return;
    }

    try {
      setSavingConfig(true);
      const saved = await db.saveTaxConfiguration({
        financial_year: cfgFy,
        assessment_year: `${parseInt(cfgFy.split('-')[0]) + 1}-${parseInt(cfgFy.split('-')[1]) + 1}`,
        configuration_name: cfgName,
        bank_compliant_tax_rate: cfgBankRate / 100,
        standard_tax_rate: cfgStdRate / 100,
        turnover_threshold: cfgThreshold,
        turnover_minimum_rate: cfgTurnoverRate / 100,
        change_summary: cfgSummary,
        source_reference: cfgSourceRef,
        status: 'ACTIVE'
      }, currentUser || { id: 'usr-1', full_name: 'Admin', email: 'admin@creatiancy.com', role_name: 'Super Admin' });

      if (publishToNoticeBoard) {
        await db.publishTaxNotice(saved, currentUser || { id: 'usr-1', full_name: 'Admin', email: 'admin@creatiancy.com', role_name: 'Super Admin' });
      }

      const refreshed = await db.getTaxConfigurations();
      setTaxConfigs(refreshed);
      setActiveConfig(saved);
      const logs = await db.getTaxAuditLogs();
      setAuditLogs(logs);

      setShowConfigModal(false);
      showNotif('Tax Configuration Live', `Financial Year ${cfgFy} tax rates updated and published. All income tax calculations recalculated dynamically.`, 'success');
    } catch (e) {
      console.error(e);
      showNotif('Error', 'Failed to save tax configuration.', 'error');
    } finally {
      setSavingConfig(false);
    }
  };

  // Handle Manual Tax Override
  const handleSaveOverride = async () => {
    if (!canManageTax) {
      showNotif('Access Denied', 'Only authorized administrators can override system tax calculations.', 'error');
      return;
    }
    if (!overrideReason.trim()) {
      showNotif('Validation Error', 'A detailed written reason is mandatory for manual tax overrides.', 'error');
      return;
    }
    const val = parseFloat(overrideAmount);
    if (isNaN(val) || val < 0) {
      showNotif('Validation Error', 'Please enter a valid positive tax override amount.', 'error');
      return;
    }

    try {
      setSavingOverride(true);
      setActiveOverrideVal(val);
      setActiveOverrideReason(overrideReason);

      await db.addTaxAuditLog({
        entity_type: 'tax_override',
        entity_id: `calc-${financialYear}`,
        action_type: 'OVERRIDE',
        previous_value: { system_tax: taxResult.systemCalculatedTax, override_tax: activeOverrideVal },
        new_value: { override_tax: val, reason: overrideReason },
        reason: overrideReason,
        performed_by: currentUser?.full_name || currentUser?.email || 'Admin'
      });

      const logs = await db.getTaxAuditLogs();
      setAuditLogs(logs);

      setShowOverrideModal(false);
      showNotif('Manual Tax Override Applied', `Final Tax Payable overridden to ৳${val.toLocaleString()}. Original system calculation (৳${taxResult.systemCalculatedTax.toLocaleString()}) preserved in audit log.`, 'success');
    } catch (e) {
      console.error(e);
      showNotif('Error', 'Failed to record manual override.', 'error');
    } finally {
      setSavingOverride(false);
    }
  };

  const handleClearOverride = () => {
    setActiveOverrideVal(null);
    setActiveOverrideReason(null);
    setOverrideAmount('');
    setOverrideReason('');
    showNotif('Override Reset', 'Manual override removed. Reverted to system-calculated tax.', 'info');
  };

  // Handle Recording Tax Payment (Challan)
  const handleRecordPayment = async () => {
    if (!formAmount || !formChallan || !formDate || !formPeriodStart || !formPeriodEnd) {
      showNotif('Validation Error', 'All fields are required.', 'error');
      return;
    }
    const amount = parseFloat(formAmount);
    if (isNaN(amount) || amount <= 0) {
      showNotif('Validation Error', 'Enter a valid positive amount.', 'error');
      return;
    }
    try {
      setSavingPayment(true);
      await db.recordTaxPayment({
        entity_id: formEntityId,
        tax_type: formTaxType,
        amount,
        payment_date: formDate,
        challan_number: formChallan,
        period_start: formPeriodStart,
        period_end: formPeriodEnd,
        recorded_by: currentUser?.id || ''
      });
      const refreshed = await db.getTaxPayments();
      setTaxPayments(refreshed);
      setShowRecordModal(false);
      setFormAmount(''); setFormChallan('');
      showNotif('Payment Recorded', `${formatCurrency(amount, 'BDT')} recorded as ${formTaxType} with Challan #${formChallan}.`, 'success');
    } catch {
      showNotif('Error', 'Failed to record payment.', 'error');
    } finally {
      setSavingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <NotificationModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onClose={() => setModalState(s => ({ ...s, isOpen: false }))}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                <Calculator className="h-5.5 w-5.5 text-[#9B1C22]" />
                Bangladesh Corporate Income Tax Module
              </h1>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Creatiancy Limited (Private Ltd)
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Financial-year tax engine per NBR Bangladesh Income Tax Act 2023 (Section 163).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Financial Year Selector */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <span className="font-semibold text-gray-500">FY:</span>
              <select
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                className="bg-transparent font-extrabold text-gray-900 focus:outline-none cursor-pointer"
              >
                {financialYears.map(fy => (
                  <option key={fy} value={fy}>FY {fy} (AY {parseInt(fy.split('-')[0]) + 1}-{parseInt(fy.split('-')[1]) + 1})</option>
                ))}
              </select>
            </div>

            {canManageTax && (
              <button
                onClick={() => {
                  setCfgFy(financialYear);
                  setCfgName(`Creatiancy Ltd Corporate Tax FY ${financialYear}`);
                  setCfgBankRate(bankRate * 100);
                  setCfgStdRate(stdRate * 100);
                  setCfgThreshold(turnThreshold);
                  setCfgTurnoverRate(turnRate * 100);
                  setShowConfigModal(true);
                }}
                className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs"
              >
                <Settings className="h-3.5 w-3.5 text-gray-500" />
                <span>Configure Tax Rates</span>
              </button>
            )}

            <button
              onClick={() => setShowRecordModal(true)}
              className="flex items-center gap-1.5 bg-[#9B1C22] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#7d1219] shadow-sm transition cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Record Challan Payment
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-gray-100 pt-3">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'calculator' ? 'bg-[#9B1C22] text-white shadow-2xs' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Income Tax Calculator &amp; Ledger
          </button>
          <button
            onClick={() => setActiveTab('configurations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'configurations' ? 'bg-[#9B1C22] text-white shadow-2xs' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Tax Rate Configurations ({taxConfigs.length})
          </button>
          <button
            onClick={() => setActiveTab('audit_logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'audit_logs' ? 'bg-[#9B1C22] text-white shadow-2xs' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Audit Trail &amp; Override History ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 space-y-6">

        {/* Legal Disclaimer Banner */}
        <div className="flex items-start gap-3 bg-amber-50/80 border border-amber-200 rounded-2xl px-5 py-4 text-xs text-amber-900">
          <Info className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
          <div className="leading-relaxed">
            <strong>Official Legal &amp; Compliance Notice:</strong> This calculator provides an estimated corporate income tax calculation based on the tax configuration selected for Financial Year <strong>{financialYear}</strong>. Final taxable income, tax classification, disallowed adjustments, certified TDS credits, and payable amounts must be reviewed by an authorized accountant or tax professional before submission to the National Board of Revenue (NBR).
          </div>
        </div>

        {activeTab === 'calculator' && (
          <>
            {/* Active Configuration Reference Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-gray-900">{activeConfig?.configuration_name || `Tax Config FY ${financialYear}`}</span>
                  <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-bold uppercase text-[10px]">
                    v{activeConfig?.version_number || 1} ACTIVE
                  </span>
                </div>
                <p className="text-gray-500">
                  Banking-Compliant Rate: <strong>{(bankRate * 100).toFixed(1)}%</strong> · Standard Rate: <strong>{(stdRate * 100).toFixed(1)}%</strong> · Turnover Min Tax: <strong>{(turnRate * 100).toFixed(2)}%</strong> above <strong>৳{turnThreshold.toLocaleString()} BDT</strong>
                </p>
                <p className="text-gray-400 text-[11px]">
                  Ref: {activeConfig?.source_reference || 'Income Tax Act 2023'}
                </p>
              </div>

              {canManageTax && (
                <button
                  onClick={async () => {
                    if (activeConfig) {
                      await db.publishTaxNotice(activeConfig, currentUser!);
                      showNotif('Notice Broadcasted', `Tax rates for FY ${financialYear} published to dynamic notice board and team inbox.`, 'success');
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#9B1C22] bg-[#9B1C22]/5 border border-[#9B1C22]/20 hover:bg-[#9B1C22]/10 px-3.5 py-2 rounded-xl transition cursor-pointer shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Publish to Notice Board</span>
                </button>
              )}
            </div>

            {/* Tax Calculator Form Inputs & Realtime Calculations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left Column: Financial & Tax Inputs (2 Cols wide on desktop) */}
              <div className="lg:col-span-2 space-y-6">

                {/* Section A: Business Revenue & Expenses */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-6 space-y-4">
                  <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <DollarSign className="h-4 w-4 text-[#9B1C22]" />
                    1. Financial Statements Input (Excluding VAT)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Gross Receipts / Revenue (BDT)</label>
                      <input
                        type="number"
                        min="0"
                        value={grossReceipts}
                        onChange={(e) => setGrossReceipts(parseFloat(e.target.value) || 0)}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-extrabold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30"
                      />
                      <span className="text-[11px] text-gray-400 mt-1 block">Auto-synced from BDT invoice totals</span>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Allowable Business Expenses (BDT)</label>
                      <input
                        type="number"
                        min="0"
                        value={allowableExpenses}
                        onChange={(e) => setAllowableExpenses(parseFloat(e.target.value) || 0)}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-extrabold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30"
                      />
                      <span className="text-[11px] text-gray-400 mt-1 block">Auto-synced from recorded expenses</span>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Disallowed Expenses (Add Back)</label>
                      <input
                        type="number"
                        min="0"
                        value={disallowedExpenses}
                        onChange={(e) => setDisallowedExpenses(parseFloat(e.target.value) || 0)}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30"
                        placeholder="0"
                      />
                      <span className="text-[11px] text-gray-400 mt-1 block">Non-deductible accounting expenses</span>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Other Tax Adjustments (BDT)</label>
                      <input
                        type="number"
                        value={otherAdjustments}
                        onChange={(e) => setOtherAdjustments(parseFloat(e.target.value) || 0)}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30"
                        placeholder="0"
                      />
                      <span className="text-[11px] text-gray-400 mt-1 block">Depreciation, exemptions, accountant adjustments</span>
                    </div>
                  </div>

                  {/* Profit Calculation Summary */}
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 space-y-2 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Accounting Profit (Gross Receipts - Allowable Expenses):</span>
                      <span className="font-bold text-gray-900">{formatCurrency(taxResult.accountingProfit, 'BDT')}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 text-sm font-extrabold text-emerald-800">
                      <span>Net Taxable Profit (for Tax Computation):</span>
                      <span>{formatCurrency(taxResult.taxableProfit, 'BDT')}</span>
                    </div>
                  </div>
                </div>

                {/* Section B: Banking Compliance & Tax Credits */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-6 space-y-4">
                  <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <ShieldCheck className="h-4 w-4 text-amber-600" />
                    2. Banking Channel Compliance &amp; Tax Credits
                  </h3>

                  <div className="space-y-4 text-xs">
                    {/* Banking Channel Compliance Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                      <div>
                        <span className="font-extrabold text-blue-900 block">All Transactions Conducted via Formal Banking Channel</span>
                        <span className="text-blue-700 text-[11px]">
                          Qualifies for reduced banking-compliant rate ({(bankRate * 100).toFixed(1)}%) vs standard rate ({(stdRate * 100).toFixed(1)}%).
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={allTransactionsViaBank}
                        onChange={(e) => setAllTransactionsViaBank(e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-[#9B1C22] focus:ring-[#9B1C22] cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1.5">Certified TDS Amount (BDT)</label>
                        <input
                          type="number"
                          min="0"
                          value={certifiedTds}
                          onChange={(e) => setCertifiedTds(parseFloat(e.target.value) || 0)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30"
                          placeholder="0"
                        />
                        <span className="text-[11px] text-gray-400 mt-1 block">Verified client tax deduction certificates</span>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1.5">Advance Tax Paid (BDT)</label>
                        <input
                          type="number"
                          min="0"
                          value={advanceTaxPaid}
                          onChange={(e) => setAdvanceTaxPaid(parseFloat(e.target.value) || 0)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30"
                          placeholder="0"
                        />
                        <span className="text-[11px] text-gray-400 mt-1 block">Direct quarterly advance tax deposits</span>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1.5">Manual Tax Adjustment</label>
                        <input
                          type="number"
                          value={manualTaxAdjustment}
                          onChange={(e) => setManualTaxAdjustment(parseFloat(e.target.value) || 0)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30"
                          placeholder="0"
                        />
                        <span className="text-[11px] text-gray-400 mt-1 block">Post-calculation additions or deductions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section C: Three-Route Tax Liability Comparison Visualizer */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-6 space-y-4">
                  <h3 className="text-sm font-extrabold text-gray-900 flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-purple-600" />
                      3. Multi-Route Tax Liability Breakdown (Section 163 Rule)
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full">
                      MAX Rule Applied
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    {/* Route A */}
                    <div className={`rounded-xl border-2 p-4 space-y-2 transition ${taxResult.liabilityDeterminedBy === 'REGULAR_CORPORATE_TAX' ? 'border-[#9B1C22] bg-red-50/40' : 'border-gray-200 bg-gray-50/50'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">Route A: Regular Corp. Tax</span>
                        {taxResult.liabilityDeterminedBy === 'REGULAR_CORPORATE_TAX' && (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#9B1C22] text-white">Determines Tax</span>
                        )}
                      </div>
                      <p className="text-xl font-extrabold text-gray-900">{formatCurrency(taxResult.regularCorporateTax, 'BDT')}</p>
                      <p className="text-[11px] text-gray-500">
                        {(taxResult.appliedCorporateTaxRate * 100).toFixed(1)}% on profit ({formatCurrency(taxResult.taxableProfitForTax, 'BDT')})
                      </p>
                    </div>

                    {/* Route B */}
                    <div className={`rounded-xl border-2 p-4 space-y-2 transition ${taxResult.liabilityDeterminedBy === 'SOURCE_MINIMUM_TAX' ? 'border-amber-500 bg-amber-50/40' : 'border-gray-200 bg-gray-50/50'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">Route B: Source Min. Tax</span>
                        {taxResult.liabilityDeterminedBy === 'SOURCE_MINIMUM_TAX' && (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-600 text-white">Determines Tax</span>
                        )}
                      </div>
                      <p className="text-xl font-extrabold text-gray-900">{formatCurrency(taxResult.sourceMinimumTax, 'BDT')}</p>
                      <p className="text-[11px] text-gray-500">
                        Sum of source tax deducted on invoices
                      </p>
                    </div>

                    {/* Route C */}
                    <div className={`rounded-xl border-2 p-4 space-y-2 transition ${taxResult.liabilityDeterminedBy === 'TURNOVER_MINIMUM_TAX' ? 'border-purple-600 bg-purple-50/40' : 'border-gray-200 bg-gray-50/50'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">Route C: Turnover Min. Tax</span>
                        {taxResult.liabilityDeterminedBy === 'TURNOVER_MINIMUM_TAX' && (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-600 text-white">Determines Tax</span>
                        )}
                      </div>
                      <p className="text-xl font-extrabold text-gray-900">{formatCurrency(taxResult.turnoverMinimumTax, 'BDT')}</p>
                      <p className="text-[11px] text-gray-500">
                        {(turnRate * 100).toFixed(2)}% on turnover (gross ≥ ৳{turnThreshold.toLocaleString()})
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Final Tax Summary Card & Manual Override Panel */}
              <div className="space-y-6">

                {/* Final Tax Liability Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 space-y-5">
                  <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                    <span>Tax Calculation Verdict</span>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">FY {financialYear}</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gross Tax Liability:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(taxResult.grossTaxLiability, 'BDT')}</span>
                    </div>

                    <div className="flex justify-between text-emerald-700">
                      <span>Available Tax Credit (TDS + Advance):</span>
                      <span className="font-bold">-{formatCurrency(taxResult.availableTaxCredit, 'BDT')}</span>
                    </div>

                    {manualTaxAdjustment !== 0 && (
                      <div className="flex justify-between text-blue-700">
                        <span>Manual Adjustment:</span>
                        <span className="font-bold">{manualTaxAdjustment > 0 ? '+' : ''}{formatCurrency(manualTaxAdjustment, 'BDT')}</span>
                      </div>
                    )}

                    <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                      <span className="font-bold text-gray-700 text-sm">System Calculated Tax:</span>
                      <span className="font-extrabold text-lg text-gray-900">{formatCurrency(taxResult.systemCalculatedTax, 'BDT')}</span>
                    </div>

                    {taxResult.manualOverrideTax !== null && (
                      <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 space-y-1.5">
                        <div className="flex justify-between items-center text-amber-900 font-extrabold">
                          <span className="flex items-center gap-1">
                            <Lock className="h-3.5 w-3.5 text-amber-600" />
                            Manual Tax Override:
                          </span>
                          <span className="text-base text-[#9B1C22]">{formatCurrency(taxResult.manualOverrideTax, 'BDT')}</span>
                        </div>
                        <p className="text-[11px] text-amber-800 italic">
                          Reason: &ldquo;{taxResult.manualOverrideTax !== null ? activeOverrideReason : ''}&rdquo;
                        </p>
                        {canManageTax && (
                          <button
                            onClick={handleClearOverride}
                            className="text-[10px] font-bold text-amber-700 hover:underline pt-1 cursor-pointer"
                          >
                            Reset to System Calculation →
                          </button>
                        )}
                      </div>
                    )}

                    <div className="rounded-xl bg-[#9B1C22] text-white p-4 space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-red-200 font-bold block">Final Income Tax Payable</span>
                      <p className="text-2xl font-black">{formatCurrency(taxResult.finalTaxPayable, 'BDT')}</p>
                    </div>

                    {/* Unadjusted Tax Credit Display */}
                    {taxResult.unadjustedTaxCredit > 0 && (
                      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3 space-y-1 text-xs">
                        <span className="font-bold text-blue-900 block">Unadjusted Tax Credit, subject to tax assessment:</span>
                        <p className="text-sm font-extrabold text-blue-800">{formatCurrency(taxResult.unadjustedTaxCredit, 'BDT')}</p>
                      </div>
                    )}

                    {canManageTax && (
                      <button
                        onClick={() => {
                          setOverrideAmount(taxResult.finalTaxPayable.toString());
                          setShowOverrideModal(true);
                        }}
                        className="w-full mt-2 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Pencil className="h-3.5 w-3.5 text-gray-500" />
                        <span>Override Final Payable Tax Amount</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </>
        )}

        {/* Configurations Tab */}
        {activeTab === 'configurations' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Tax Configurations &amp; Rates Manager</h2>
                <p className="text-xs text-gray-400 mt-0.5">Manage financial-year corporate tax parameters, banking thresholds, and TDS service rates.</p>
              </div>
              {canManageTax && (
                <button
                  onClick={() => {
                    setCfgFy(financialYear);
                    setCfgName(`Creatiancy Ltd Corporate Tax FY ${financialYear}`);
                    setCfgBankRate(bankRate * 100);
                    setCfgStdRate(stdRate * 100);
                    setCfgThreshold(turnThreshold);
                    setCfgTurnoverRate(turnRate * 100);
                    setShowConfigModal(true);
                  }}
                  className="flex items-center gap-1.5 bg-[#9B1C22] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-[#7d1219] shadow-sm transition cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Create / Edit Configuration
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="py-3 px-4">Financial Year</th>
                    <th className="py-3 px-4">Config Name</th>
                    <th className="py-3 px-4">Bank Compliant Rate</th>
                    <th className="py-3 px-4">Standard Rate</th>
                    <th className="py-3 px-4">Turnover Threshold</th>
                    <th className="py-3 px-4">Turnover Rate</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {taxConfigs.map(cfg => (
                    <tr key={cfg.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-extrabold text-gray-900">FY {cfg.financial_year}</td>
                      <td className="py-3.5 px-4 text-gray-700">{cfg.configuration_name}</td>
                      <td className="py-3.5 px-4 font-bold text-blue-700">{(cfg.bank_compliant_tax_rate * 100).toFixed(1)}%</td>
                      <td className="py-3.5 px-4 font-bold text-[#9B1C22]">{(cfg.standard_tax_rate * 100).toFixed(1)}%</td>
                      <td className="py-3.5 px-4 font-mono text-gray-700">৳{cfg.turnover_threshold.toLocaleString()}</td>
                      <td className="py-3.5 px-4 font-bold text-purple-700">{(cfg.turnover_minimum_rate * 100).toFixed(2)}%</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                          {cfg.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            setActiveConfig(cfg);
                            setFinancialYear(cfg.financial_year);
                            setActiveTab('calculator');
                          }}
                          className="text-xs font-bold text-[#9B1C22] hover:underline cursor-pointer"
                        >
                          Use in Calculator →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === 'audit_logs' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Tax System Audit Trail &amp; Override Log</h2>
              <p className="text-xs text-gray-400 mt-0.5">Complete chronological history of rate edits, configuration activations, and manual tax overrides.</p>
            </div>

            {auditLogs.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs font-semibold">
                No tax audit logs recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Entity Type</th>
                      <th className="py-3 px-4">Performed By</th>
                      <th className="py-3 px-4">Reason / Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map(log => (
                      <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                        <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">{new Date(log.performed_at).toLocaleString()}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${log.action_type === 'OVERRIDE' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                            {log.action_type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-700 font-semibold">{log.entity_type}</td>
                        <td className="py-3.5 px-4 font-bold text-gray-900">{log.performed_by}</td>
                        <td className="py-3.5 px-4 text-gray-600">{log.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal A: Configure Tax Rates Drawer */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#9B1C22]" />
                <span>Configure Income Tax Parameters</span>
              </h3>
              <button onClick={() => setShowConfigModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer p-1">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Financial Year</label>
                  <input
                    type="text"
                    value={cfgFy}
                    onChange={(e) => setCfgFy(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 font-bold text-gray-900 focus:outline-none"
                    placeholder="2026-2027"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Configuration Name</label>
                  <input
                    type="text"
                    value={cfgName}
                    onChange={(e) => setCfgName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-gray-900 focus:outline-none"
                    placeholder="NBR Standard FY 2026-27"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Banking Compliant Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={cfgBankRate}
                    onChange={(e) => setCfgBankRate(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 font-bold text-blue-700 focus:outline-none"
                    placeholder="25.0"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Standard Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={cfgStdRate}
                    onChange={(e) => setCfgStdRate(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 font-bold text-[#9B1C22] focus:outline-none"
                    placeholder="27.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Turnover Threshold (BDT)</label>
                  <input
                    type="number"
                    value={cfgThreshold}
                    onChange={(e) => setCfgThreshold(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 font-mono text-gray-900 focus:outline-none"
                    placeholder="5000000"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Turnover Min Tax Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={cfgTurnoverRate}
                    onChange={(e) => setCfgTurnoverRate(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 font-bold text-purple-700 focus:outline-none"
                    placeholder="0.60"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Source / Official NBR Reference</label>
                <input
                  type="text"
                  value={cfgSourceRef}
                  onChange={(e) => setCfgSourceRef(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-gray-900 focus:outline-none"
                  placeholder="Income Tax Act 2023, Sec. 163"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Change Summary / Notes</label>
                <textarea
                  rows={2}
                  value={cfgSummary}
                  onChange={(e) => setCfgSummary(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-gray-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <input
                  type="checkbox"
                  id="pubNotice"
                  checked={publishToNoticeBoard}
                  onChange={(e) => setPublishToNoticeBoard(e.target.checked)}
                  className="h-4 w-4 text-[#9B1C22] rounded focus:ring-[#9B1C22] cursor-pointer"
                />
                <label htmlFor="pubNotice" className="text-xs font-bold text-blue-900 cursor-pointer">
                  Publish rate updates to Notice Board &amp; Inbox automatically
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfigModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConfiguration}
                disabled={savingConfig}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#9B1C22] text-white text-xs font-bold hover:bg-[#7d1219] shadow-sm transition disabled:opacity-50 cursor-pointer"
              >
                {savingConfig ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                Activate &amp; Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal B: Manual Tax Override Modal */}
      {showOverrideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <Lock className="h-5 w-5 text-[#9B1C22]" />
                <span>Manual Tax Payable Override</span>
              </h3>
              <button onClick={() => setShowOverrideModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer p-1">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <span className="text-gray-500 block">System Calculated Tax:</span>
                <span className="text-lg font-extrabold text-gray-900">{formatCurrency(taxResult.systemCalculatedTax, 'BDT')}</span>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Overridden Tax Amount (BDT)</label>
                <input
                  type="number"
                  min="0"
                  value={overrideAmount}
                  onChange={(e) => setOverrideAmount(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-extrabold text-[#9B1C22] text-base focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30"
                  placeholder="Enter custom tax amount"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Mandatory Override Reason *</label>
                <textarea
                  rows={3}
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C22]/30"
                  placeholder="Enter official accountant / board approval justification..."
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowOverrideModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOverride}
                disabled={savingOverride}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#9B1C22] text-white text-xs font-bold hover:bg-[#7d1219] shadow-sm transition disabled:opacity-50 cursor-pointer"
              >
                {savingOverride ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                Apply Tax Override
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal C: Record Challan Payment Modal */}
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
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Amount Paid (BDT)</label>
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
              <button onClick={handleRecordPayment} disabled={savingPayment} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#9B1C22] text-white text-sm font-bold hover:bg-[#7d1219] shadow-sm transition disabled:opacity-50 cursor-pointer">
                {savingPayment ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
