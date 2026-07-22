'use client';

import { useState, useEffect } from 'react';
import { db, Profile, localStore } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  Database,
  UploadCloud,
  Download,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  HardDrive,
  RefreshCw,
  Trash2,
  ShieldCheck
} from 'lucide-react';

export default function LegacyDataMigrationPage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  // Scanned storage stats
  const [stats, setStats] = useState({
    clients: 0,
    invoices: 0,
    payments: 0,
    expenses: 0,
    reserveLedger: 0,
    fdrs: 0,
    dps: 0,
    taxPayments: 0
  });

  // Migration summary results
  const [report, setReport] = useState<{
    imported: number;
    skipped: number;
    duplicates: number;
    failed: number;
    reconciliation: {
      totalClients: number;
      totalInvoices: number;
      totalPaid: number;
      totalExpenses: number;
      reserveBalance: number;
    };
  } | null>(null);

  useEffect(() => {
    initScan();
  }, []);

  const initScan = async () => {
    setLoading(true);
    const user = await db.getCurrentUser();
    setCurrentUser(user);

    // Scan localStorage keys
    const clients = localStore.clients;
    const invoices = localStore.invoices;
    const payments = localStore.payments;
    const expenses = localStore.expenses;
    const reserveLedger = localStore.reserveLedger;
    const fdrs = localStore.fdrAccounts;
    const dps = localStore.dpsAccounts;
    const taxPayments = localStore.taxPayments;

    setStats({
      clients: clients.length,
      invoices: invoices.length,
      payments: payments.length,
      expenses: expenses.length,
      reserveLedger: reserveLedger.length,
      fdrs: fdrs.length,
      dps: dps.length,
      taxPayments: taxPayments.length
    });

    setLoading(false);
  };

  const handleExportBackup = () => {
    const data = {
      timestamp: new Date().toISOString(),
      profiles: localStore.profiles,
      clients: localStore.clients,
      invoices: localStore.invoices,
      items: localStore.items,
      payments: localStore.payments,
      expenses: localStore.expenses,
      reserveSettings: localStore.reserveSettings,
      reserveLedger: localStore.reserveLedger,
      fdrAccounts: localStore.fdrAccounts,
      dpsAccounts: localStore.dpsAccounts,
      dpsInstallments: localStore.dpsInstallments,
      withdrawalRequests: localStore.withdrawalRequests,
      taxPayments: localStore.taxPayments
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Creatiancy_Billing_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunMigration = async () => {
    if (!isSupabaseConfigured || !supabase) {
      alert('Supabase is not configured yet! Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables first.');
      return;
    }

    setMigrating(true);
    setProgress(10);
    let imported = 0;
    let skipped = 0;
    let duplicates = 0;
    let failed = 0;

    try {
      // 1. Migrate Profiles
      setCurrentStep('Migrating User Profiles...');
      const profiles = localStore.profiles;
      for (const p of profiles) {
        const { error } = await supabase.from('profiles').upsert(p);
        if (error) failed++; else imported++;
      }
      setProgress(25);

      // 2. Migrate Clients
      setCurrentStep('Migrating Billing Clients...');
      const clients = localStore.clients;
      for (const c of clients) {
        const { data: existing } = await supabase.from('billing_clients').select('id').eq('id', c.id).single();
        if (existing) {
          duplicates++;
        } else {
          const { error } = await supabase.from('billing_clients').insert(c);
          if (error) failed++; else imported++;
        }
      }
      setProgress(45);

      // 3. Migrate Invoices & Items
      setCurrentStep('Migrating Invoices & Line Items...');
      const invoices = localStore.invoices;
      const items = localStore.items;
      for (const inv of invoices) {
        const { data: existing } = await supabase.from('invoices').select('id').eq('id', inv.id).single();
        if (existing) {
          duplicates++;
        } else {
          const { error } = await supabase.from('invoices').insert(inv);
          if (!error) {
            imported++;
            const invItems = items.filter(i => i.invoice_id === inv.id);
            if (invItems.length > 0) {
              await supabase.from('invoice_items').insert(invItems);
            }
          } else {
            failed++;
          }
        }
      }
      setProgress(70);

      // 4. Migrate Payments
      setCurrentStep('Migrating Client Payments...');
      const payments = localStore.payments;
      for (const pay of payments) {
        const { data: existing } = await supabase.from('invoice_payments').select('id').eq('id', pay.id).single();
        if (existing) {
          duplicates++;
        } else {
          const { error } = await supabase.from('invoice_payments').insert(pay);
          if (error) failed++; else imported++;
        }
      }
      setProgress(85);

      // 5. Migrate Reserve Ledger & Portfolios
      setCurrentStep('Migrating Reserve Ledger & FDR/DPS Portfolios...');
      const ledger = localStore.reserveLedger;
      if (ledger.length > 0) {
        await supabase.from('reserve_ledger').upsert(ledger);
      }
      const fdrs = localStore.fdrAccounts;
      if (fdrs.length > 0) {
        await supabase.from('fdr_accounts').upsert(fdrs);
      }
      const dps = localStore.dpsAccounts;
      if (dps.length > 0) {
        await supabase.from('dps_accounts').upsert(dps);
      }

      setProgress(100);

      // Reconciliation Summary
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      const totalExp = localStore.expenses.reduce((sum, e) => sum + e.amount, 0);
      const resBal = ledger.reduce((sum, l) => sum + l.amount, 0);

      setReport({
        imported,
        skipped,
        duplicates,
        failed,
        reconciliation: {
          totalClients: clients.length,
          totalInvoices: invoices.length,
          totalPaid,
          totalExpenses: totalExp,
          reserveBalance: resBal
        }
      });
    } catch (e: any) {
      alert(`Migration error: ${e.message}`);
    } finally {
      setMigrating(false);
    }
  };

  const handleClearLocalStorage = () => {
    if (!confirm('Are you sure you want to clear legacy browser localStorage? Ensure you have exported a JSON backup first!')) return;
    localStorage.clear();
    alert('Browser localStorage cleared successfully! Cloud database is now active.');
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
          <p className="text-xs font-semibold text-gray-500">Scanning local storage keys...</p>
        </div>
      </div>
    );
  }

  if (currentUser?.role_name !== 'Super Admin') {
    return (
      <div className="p-8 max-w-lg mx-auto text-center space-y-4 my-12 bg-white border rounded-2xl">
        <ShieldCheck className="h-12 w-12 text-rose-600 mx-auto" />
        <h2 className="text-lg font-bold">Super Admin Access Only</h2>
        <p className="text-xs text-gray-500">The legacy data migration tool is restricted to Super Admin users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex justify-between items-center">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Database className="h-5 w-5 text-[#9B1C22]" />
            Legacy LocalStorage to Supabase Cloud Migration Tool
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Convert browser-only localStorage data into permanent Supabase PostgreSQL cloud records across devices.
          </p>
        </div>
        <button
          onClick={handleExportBackup}
          className="flex items-center space-x-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>Export JSON Backup</span>
        </button>
      </div>

      {/* Scanned Local Storage Summary */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <HardDrive className="h-4 w-4 text-gray-500" />
          Detected Browser Storage Data Summary
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Clients</span>
            <span className="font-extrabold text-gray-900 text-lg">{stats.clients}</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Invoices</span>
            <span className="font-extrabold text-gray-900 text-lg">{stats.invoices}</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Payments</span>
            <span className="font-extrabold text-gray-900 text-lg">{stats.payments}</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Reserve Ledger</span>
            <span className="font-extrabold text-gray-900 text-lg">{stats.reserveLedger}</span>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {isSupabaseConfigured ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Supabase Cloud Database Connected
              </span>
            ) : (
              <span className="text-rose-600 font-bold flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" /> Supabase credentials missing from .env
              </span>
            )}
          </div>

          <button
            onClick={handleRunMigration}
            disabled={migrating}
            className="flex items-center space-x-2 bg-[#9B1C22] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold hover:bg-[#7d1219] transition cursor-pointer shadow-xs"
          >
            <UploadCloud className="h-4 w-4" />
            <span>{migrating ? 'Migrating Data...' : 'Start Cloud Migration'}</span>
          </button>
        </div>

        {migrating && (
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold text-gray-700">
              <span>{currentStep}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#9B1C22] transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Migration Report & Reconciliation Summary */}
      {report && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-emerald-600" />
            Migration & Financial Reconciliation Report
          </h3>

          <div className="grid grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-900 font-extrabold">
              Imported Rows: {report.imported}
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-900 font-extrabold">
              Duplicates Skipped: {report.duplicates}
            </div>
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 font-extrabold">
              Total Invoices: {report.reconciliation.totalInvoices}
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 font-extrabold">
              Total Paid: ৳{report.reconciliation.totalPaid.toLocaleString()}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleClearLocalStorage}
              className="flex items-center space-x-1.5 bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-rose-700"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Legacy Local Storage</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
