'use client';

import { useState, useEffect } from 'react';
import { db, BusinessEntity, BankAccount, Profile } from '@/lib/db';
import Link from 'next/link';
import { Shield, Building2, Landmark, Smartphone } from 'lucide-react';

export default function EntitySettingsPage() {
  const [entities, setEntities] = useState<BusinessEntity[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  
  const [activeTab, setActiveTab] = useState<'CLTD' | 'CLLC'>('CLTD');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states matching active entity
  const [legalName, setLegalName] = useState('');
  const [address, setAddress] = useState('');
  const [regNum, setRegNum] = useState('');
  const [taxId, setTaxId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [paymentInstructions, setPaymentInstructions] = useState('');
  const [bkashMerchant, setBkashMerchant] = useState('');
  const [nagadMerchant, setNagadMerchant] = useState('');
  
  // Bank states matching active entity
  const [bankId, setBankId] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankHolder, setBankHolder] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [bankRouting, setBankRouting] = useState('');
  const [bankSwift, setBankSwift] = useState('');
  const [bankAddress, setBankAddress] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const u = await db.getCurrentUser();
        setCurrentUser(u);

        const ents = await db.getEntities();
        setEntities(ents);

        const banks = await db.getBankAccounts();
        setBankAccounts(banks);

        // Prepopulate active tab BDT (CLTD)
        populateForm('CLTD', ents, banks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const populateForm = (code: 'CLTD' | 'CLLC', entsList: BusinessEntity[], banksList: BankAccount[]) => {
    const ent = entsList.find(e => e.entity_code === code);
    if (ent) {
      setLegalName(ent.legal_name);
      setAddress(ent.registered_address);
      setRegNum(ent.registration_number);
      setTaxId(ent.tax_id);
      setEmail(ent.email);
      setPhone(ent.phone || '');
      setWebsite(ent.website || '');
      setPaymentInstructions(ent.payment_instructions || '');
      setBkashMerchant(ent.bkash_merchant || '');
      setNagadMerchant(ent.nagad_merchant || '');

      // Get bank
      const bank = banksList.find(b => b.entity_id === ent.id && b.is_active);
      if (bank) {
        setBankId(bank.id);
        setBankName(bank.bank_name);
        setBankHolder(bank.account_holder);
        setBankNumber(bank.account_number);
        setBankBranch(bank.branch || '');
        setBankRouting(bank.routing_number || '');
        setBankSwift(bank.swift_bic || '');
        setBankAddress(bank.bank_address || '');
      } else {
        setBankId('');
        setBankName('');
        setBankHolder('');
        setBankNumber('');
        setBankBranch('');
        setBankRouting('');
        setBankSwift('');
        setBankAddress('');
      }
    }
  };

  const handleTabChange = (code: 'CLTD' | 'CLLC') => {
    setActiveTab(code);
    populateForm(code, entities, bankAccounts);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.role_name !== 'Super Admin') {
      alert('Access Denied: Only Super Admins can save business configurations.');
      return;
    }

    setSaving(true);
    try {
      const activeEnt = entities.find(e => e.entity_code === activeTab);
      if (activeEnt) {
        // 1. Update Entity details
        const updatedEnt = await db.updateEntity(activeEnt.id, {
          legal_name: legalName,
          registered_address: address,
          registration_number: regNum,
          tax_id: taxId,
          email,
          phone,
          website,
          payment_instructions: paymentInstructions,
          bkash_merchant: bkashMerchant || undefined,
          nagad_merchant: nagadMerchant || undefined
        });

        // 2. Update Bank account details
        let updatedBank = null;
        if (bankId) {
          updatedBank = await db.updateBankAccount(bankId, {
            bank_name: bankName,
            account_holder: bankHolder,
            account_number: bankNumber,
            branch: bankBranch,
            routing_number: bankRouting,
            swift_bic: bankSwift,
            bank_address: bankAddress
          });
        }

        // Sync local states
        const nextEnts = entities.map(e => e.id === activeEnt.id ? updatedEnt : e);
        setEntities(nextEnts);
        
        if (updatedBank) {
          const nextBanks = bankAccounts.map(b => b.id === bankId ? updatedBank : b);
          setBankAccounts(nextBanks);
        }

        alert('Business entity credentials updated successfully!');
      }
    } catch (err) {
      alert('Save configuration failed.');
    } finally {
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

  const isSuperAdmin = currentUser.role_name === 'Super Admin';

  return (
    <div className="space-y-6">
      
      {/* Settings Navigation Bar tabs */}
      <div className="flex border-b border-gray-100 text-xs">
        <Link href="/billing/settings/entities" className="border-b-2 border-[#9B1C22] py-2.5 px-4 font-bold text-[#9B1C22]">
          Business Entities
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Business Entities Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure legal entity registration details, tax numbers, and default bank deposit accounts
        </p>
      </div>

      {/* Settings Grid Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Selector Left */}
        <div className="xl:col-span-3 bg-white border border-gray-100 rounded-2xl p-4 space-y-2">
          {[
            { code: 'CLTD', label: 'Creatiancy Limited (BDT)', desc: 'Bangladesh Entity' },
            { code: 'CLLC', label: 'Creatiancy LLC (USD)', desc: 'United States Entity' }
          ].map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleTabChange(item.code as any)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs transition ${
                activeTab === item.code
                  ? 'border-[#9B1C22] bg-[#9B1C22]/5 text-[#9B1C22]'
                  : 'border-gray-50 hover:bg-gray-50'
              }`}
            >
              <span className="font-extrabold block">{item.label}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">{item.desc}</span>
            </button>
          ))}
        </div>

        {/* Main Details Form (Right side) */}
        <div className="xl:col-span-9 bg-white border border-gray-100 rounded-2xl p-6">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Permission warning */}
            {!isSuperAdmin && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100 text-xs text-[#9B1C22] flex items-center space-x-2">
                <Shield className="h-4.5 w-4.5" />
                <span>Read-Only: Modifying these settings requires Super Admin configuration clearance.</span>
              </div>
            )}

            {/* Section 1: Entity particulars */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                <Building2 className="h-4 w-4" />
                <span>1. Legal Registration Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-550 mb-1">Legal Entity Name</label>
                  <input
                    type="text"
                    required
                    readOnly={!isSuperAdmin}
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-555 mb-1">Registration # / Code</label>
                  <input
                    type="text"
                    required
                    readOnly={!isSuperAdmin}
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-gray-555 mb-1">Registered Address</label>
                  <input
                    type="text"
                    required
                    readOnly={!isSuperAdmin}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-555 mb-1">
                    {activeTab === 'CLTD' ? 'TIN / BIN Code' : 'EIN Tax ID'}
                  </label>
                  <input
                    type="text"
                    required
                    readOnly={!isSuperAdmin}
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-555 mb-1">Entity Contact Email</label>
                  <input
                    type="email"
                    required
                    readOnly={!isSuperAdmin}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-555 mb-1">Entity Telephone</label>
                  <input
                    type="text"
                    readOnly={!isSuperAdmin}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-555 mb-1">Corporate Website</label>
                  <input
                    type="text"
                    readOnly={!isSuperAdmin}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Active Bank Details */}
            <div className="space-y-4 pt-6 border-t border-gray-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                <Landmark className="h-4 w-4" />
                <span>2. Default Bank Account Routing details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-550 mb-1">Bank Name</label>
                  <input
                    type="text"
                    required
                    readOnly={!isSuperAdmin}
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-555 mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    required
                    readOnly={!isSuperAdmin}
                    value={bankHolder}
                    onChange={(e) => setBankHolder(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-555 mb-1">Account Number</label>
                  <input
                    type="text"
                    required
                    readOnly={!isSuperAdmin}
                    value={bankNumber}
                    onChange={(e) => setBankNumber(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none font-mono"
                  />
                </div>

                {activeTab === 'CLTD' ? (
                  <div>
                    <label className="block font-semibold text-gray-555 mb-1">Bank Branch</label>
                    <input
                      type="text"
                      readOnly={!isSuperAdmin}
                      value={bankBranch}
                      onChange={(e) => setBankBranch(e.target.value)}
                      className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="block font-semibold text-gray-555 mb-1">Routing Transit Number</label>
                  <input
                    type="text"
                    readOnly={!isSuperAdmin}
                    value={bankRouting}
                    onChange={(e) => setBankRouting(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none font-mono"
                  />
                </div>

                {activeTab === 'CLLC' ? (
                  <div>
                    <label className="block font-semibold text-gray-555 mb-1">SWIFT / BIC Code</label>
                    <input
                      type="text"
                      readOnly={!isSuperAdmin}
                      value={bankSwift}
                      onChange={(e) => setBankSwift(e.target.value)}
                      className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none font-mono"
                    />
                  </div>
                ) : null}

                <div className="md:col-span-2">
                  <label className="block font-semibold text-gray-555 mb-1">Bank Address</label>
                  <input
                    type="text"
                    readOnly={!isSuperAdmin}
                    value={bankAddress}
                    onChange={(e) => setBankAddress(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Mobile Wallet Merchant IDs (BDT entity only) */}
            {activeTab === 'CLTD' && (
              <div className="space-y-4 pt-6 border-t border-gray-50">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                  <Smartphone className="h-4 w-4" />
                  <span>3. Mobile Wallet Merchant Accounts (Bangladesh)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-550 mb-1">
                      bKash Merchant Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-pink-500 font-bold text-xs pointer-events-none">b</span>
                      <input
                        type="text"
                        readOnly={!isSuperAdmin}
                        value={bkashMerchant}
                        onChange={(e) => setBkashMerchant(e.target.value)}
                        placeholder="e.g. 01XXXXXXXXX"
                        className="block w-full rounded-lg border border-gray-200 bg-white py-2 pl-7 pr-3 text-xs text-[#1E1E1E] focus:outline-none font-mono"
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-gray-400">bKash Merchant/Agent number for client payments</p>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-550 mb-1">
                      Nagad Merchant Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-orange-500 font-bold text-xs pointer-events-none">N</span>
                      <input
                        type="text"
                        readOnly={!isSuperAdmin}
                        value={nagadMerchant}
                        onChange={(e) => setNagadMerchant(e.target.value)}
                        placeholder="e.g. 01XXXXXXXXX"
                        className="block w-full rounded-lg border border-gray-200 bg-white py-2 pl-7 pr-3 text-xs text-[#1E1E1E] focus:outline-none font-mono"
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-gray-400">Nagad Merchant number for client payments</p>
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Default invoice instructions text */}
            <div className="space-y-4 pt-6 border-t border-gray-50">
              <label className="block font-bold text-xs uppercase tracking-wider text-gray-400">
                {activeTab === 'CLTD' ? '4.' : '3.'} default payment instructions rendered on invoice pdfs
              </label>
              <textarea
                rows={3}
                readOnly={!isSuperAdmin}
                value={paymentInstructions}
                onChange={(e) => setPaymentInstructions(e.target.value)}
                className="block w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-xs text-[#1E1E1E] focus:outline-none resize-y font-mono"
              />
            </div>

            {/* Save trigger */}
            {isSuperAdmin && (
              <div className="flex justify-end pt-6 border-t border-gray-50">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#9B1C22] py-2.5 px-6 text-xs font-bold text-[#FBFDF9] hover:bg-[#9B1C22]/90 shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving config...' : 'Save Configuration'}
                </button>
              </div>
            )}

          </form>
        </div>

      </div>

    </div>
  );
}
