'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { db, isDemoMode, Profile } from '@/lib/db';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Receipt,
  BarChart3,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Percent,
  Mail,
  Calculator,
  Wallet
} from 'lucide-react';

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    // Check auth
    async function loadAuth() {
      const user = await db.getCurrentUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setCurrentUser(user);
      
      const allProfiles = await db.getProfiles();
      setProfiles(allProfiles);
    }
    loadAuth();
  }, [router]);

  const handleRoleChange = async (roleName: string) => {
    const matched = profiles.find(p => p.role_name === roleName);
    if (matched) {
      await db.setCurrentUser(matched);
      setCurrentUser(matched);
      setRoleDropdownOpen(false);
      // Reload current page to trigger authorization state refresh
      window.location.reload();
    }
  };

  const handleSignOut = async () => {
    // Clear user and redirect
    if (typeof window !== 'undefined') {
      localStorage.removeItem('billing_hub_current_user');
    }
    router.push('/login');
  };

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FBFDF9]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
          <p className="text-sm text-gray-500">Loading Billing Portal session...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/billing', icon: LayoutDashboard },
    { label: 'Clients', href: '/billing/clients', icon: Users },
    { label: 'Invoices', href: '/billing/invoices', icon: FileText },
    { label: 'Payments', href: '/billing/payments', icon: CreditCard },
    { label: 'Receipts', href: '/billing/payments', icon: Receipt, customMatch: '/billing/receipts' },
    { label: 'Reports', href: '/billing/reports', icon: BarChart3 },
    { label: 'Tax Ledger', href: '/billing/tax', icon: Calculator, customMatch: '/billing/tax' },
    { label: 'Cashflow', href: '/billing/expenses', icon: Wallet, customMatch: '/billing/expenses' },
    { label: 'Inbox', href: '/billing/inbox', icon: Mail },
    { label: 'Team', href: '/billing/team', icon: Shield },
    { label: 'Entity Settings', href: '/billing/settings/entities', icon: Settings, customMatch: '/billing/settings/entities' },
    { label: 'Gateway Rates', href: '/billing/settings/gateway-rates', icon: Percent, customMatch: '/billing/settings/gateway-rates' },
  ];

  const filteredNavItems = navItems.filter((item) => {
    const role = currentUser?.role_name;
    if (item.label === 'Team') {
      return role === 'Super Admin' || role === 'Admin';
    }
    if (item.label === 'Tax Ledger') {
      return role === 'Super Admin' || role === 'Admin' || role === 'Finance Admin';
    }
    if (item.label === 'Cashflow') {
      return role === 'Super Admin' || role === 'Admin' || role === 'Finance Admin';
    }
    if (item.label === 'Entity Settings') {
      return role === 'Super Admin' || role === 'Finance Admin';
    }
    if (item.label === 'Gateway Rates') {
      return role === 'Super Admin' || role === 'Admin' || role === 'Finance Admin';
    }
    return true;
  });

  const isLinkActive = (item: typeof navItems[0]) => {
    if (item.customMatch && pathname.startsWith(item.customMatch)) {
      return true;
    }
    return pathname === item.href || (item.href !== '/billing' && pathname.startsWith(item.href));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FBFDF9] text-[#1E1E1E]">
      


      <div className="flex flex-1">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-gray-100 bg-[#FBFDF9] p-4 space-y-6 no-print">
          <div className="flex flex-col items-start space-y-2 px-2 py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/Creatiancy logo.svg"
              alt="Creatiancy Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/logos/Creatiancy%20logo.svg'; }}
            />
            <div className="min-w-0">
              <span className="text-md font-bold tracking-tight block leading-tight text-gray-500">Billing Desk</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#9B1C22]/5 text-[#9B1C22]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User profile section */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between px-3 mb-2">
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">{currentUser.full_name}</p>
                <p className="text-[10px] text-gray-400 font-semibold truncate">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center space-x-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="h-4.5 w-4.5" />
              <span>Log out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Header / Navigation */}
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex md:hidden items-center justify-between border-b border-gray-100 bg-[#FBFDF9] px-6 py-4 no-print">
            <div className="flex items-center space-x-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/Creatiancy logo.svg"
                alt="Creatiancy"
                className="h-6 w-auto object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = '/logos/Creatiancy%20logo.svg'; }}
              />
              <span className="font-bold text-sm text-gray-500">Billing Desk</span>
            </div>
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </header>

          {/* Mobile Fullscreen Navigation menu */}
          {sidebarOpen && (
            <div className="md:hidden fixed inset-0 top-[60px] bg-[#FBFDF9] z-40 p-6 flex flex-col space-y-6 no-print">
              <nav className="flex-1 space-y-2">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isLinkActive(item);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 rounded-xl px-4 py-3.5 text-md font-semibold transition-all ${
                        active
                          ? 'bg-[#9B1C22]/5 text-[#9B1C22]'
                          : 'text-gray-500'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-md font-bold mb-1">{currentUser.full_name}</p>
                <p className="text-xs text-gray-400 font-semibold mb-4">{currentUser.email}</p>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center space-x-3 rounded-xl bg-red-50 py-3 text-md font-semibold text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
            {children}
          </main>

          {/* Mobile Bottom Navigation */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-[#FBFDF9]/95 backdrop-blur-md flex items-center justify-around py-2 px-2 no-print z-30" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex flex-col items-center space-y-1 ${
                    active ? 'text-[#9B1C22]' : 'text-gray-400 hover:text-gray-650'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] font-semibold">{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col items-center space-y-1 text-gray-400"
            >
              <Menu className="h-5 w-5" />
              <span className="text-[10px] font-semibold">More</span>
            </button>
          </nav>

        </div>
      </div>
    </div>
  );
}
