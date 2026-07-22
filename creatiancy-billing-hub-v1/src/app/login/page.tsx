'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, localStore } from '@/lib/db';
import { Eye, EyeOff, Lock, Mail, Terminal } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Find matching profile by email or username in mock list
      const profiles = await db.getProfiles();
      const loginId = email.trim().toLowerCase();
      
      let user = profiles.find(p => 
        p.email.toLowerCase() === loginId || 
        (p.username && p.username.toLowerCase() === loginId)
      );
      
      // Fallback alias resolution for superadmin and admin logins across desktop and mobile devices
      if (!user) {
        if (loginId === 'superadmin' || loginId === 'superadmin@creatiancy.com') {
          user = profiles.find(p => p.role_name === 'Super Admin');
        } else if (loginId === 'admin' || loginId === 'admin@creatiancy.com' || loginId === 'rafsan') {
          user = profiles.find(p => p.role_name === 'Super Admin' || p.role_name === 'Admin');
        } else if (loginId === 'manager' || loginId === 'manager@creatiancy.com') {
          user = profiles.find(p => p.role_name === 'Admin');
        } else if (loginId === 'finance' || loginId === 'finance@creatiancy.com') {
          user = profiles.find(p => p.role_name === 'Finance Admin');
        }
      }

      if (!user) {
        throw new Error('Invalid email or username. Please check your credentials or select a quick access role below.');
      }

      // Log user in
      await db.setCurrentUser(user);
      router.push('/billing');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  const handleQuickLogin = async (roleName: string) => {
    setLoading(true);
    setError('');
    try {
      const profiles = await db.getProfiles();
      const user = profiles.find(p => p.role_name === roleName);
      if (user) {
        setEmail(user.email);
        setPassword('password123'); // Fictional password
        await db.setCurrentUser(user);
        
        // Wait a brief moment for transition effect
        setTimeout(() => {
          router.push('/billing');
        }, 500);
      }
    } catch (err: any) {
      setError('Quick login failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFDF9] p-6">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-100 bg-[#FBFDF9] p-8 shadow-xl">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/Creatiancy logo.svg"
              alt="Creatiancy Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/logos/Creatiancy%20logo.svg'; }}
            />
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Billing • Secure Authentication Portal
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-[#9B1C22]">
              {error}
            </div>
          )}

          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email-address" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Email Address or Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-[#1E1E1E] placeholder-gray-400 focus:border-[#9B1C22] focus:outline-none focus:ring-1 focus:ring-[#9B1C22]"
                  placeholder="name@creatiancy.com or username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-[#1E1E1E] placeholder-gray-400 focus:border-[#9B1C22] focus:outline-none focus:ring-1 focus:ring-[#9B1C22]"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-[#9B1C22] py-3 text-sm font-semibold text-[#FBFDF9] hover:bg-[#9B1C22]/90 focus:outline-none focus:ring-2 focus:ring-[#9B1C22] focus:ring-offset-2 disabled:opacity-50 transition duration-150 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Demo Quick Onboarding Selector */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            <Terminal className="h-3 w-3" />
            <span>Developer Sandbox Quick Login</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { role: 'Super Admin', desc: 'Full Access' },
              { role: 'Finance Admin', desc: 'Invoices & Payments' },
              { role: 'Client Service', desc: 'Drafts & Clients' },
              { role: 'Project Manager', desc: 'Create Drafts' }
            ].map((d) => (
              <button
                key={d.role}
                type="button"
                onClick={() => handleQuickLogin(d.role)}
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 text-center text-xs hover:border-[#9B1C22] hover:bg-gray-50 cursor-pointer"
              >
                <span className="font-semibold text-gray-800">{d.role}</span>
                <span className="text-[10px] text-gray-400">{d.desc}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
