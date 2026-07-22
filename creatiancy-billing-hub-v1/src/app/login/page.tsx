'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { authService } from '@/lib/services/authService';
import { Eye, EyeOff, Lock, Mail, Terminal, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Forgot password state
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    authService.getCurrentUser().then(user => {
      if (user) {
        window.location.href = '/billing';
      }
    }).catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginId = email.trim();

      // 1. Authenticate with Supabase Auth or Local fallback
      let user = await authService.loginWithEmail(loginId, password);

      // 2. Fallback alias resolution for demo quick aliases
      if (!user) {
        const profiles = await db.getProfiles();
        const loginIdLower = loginId.toLowerCase();
        if (loginIdLower === 'superadmin' || loginIdLower === 'superadmin@creatiancy.com') {
          user = profiles.find(p => p.role_name === 'Super Admin') || null;
        } else if (loginIdLower === 'admin' || loginIdLower === 'admin@creatiancy.com' || loginIdLower === 'rafsan') {
          user = profiles.find(p => p.role_name === 'Super Admin' || p.role_name === 'Admin') || null;
        } else if (loginIdLower === 'manager' || loginIdLower === 'manager@creatiancy.com') {
          user = profiles.find(p => p.role_name === 'Admin') || null;
        } else if (loginIdLower === 'finance' || loginIdLower === 'finance@creatiancy.com') {
          user = profiles.find(p => p.role_name === 'Finance Admin') || null;
        }
      }

      if (!user) {
        throw new Error('Invalid credentials or username. Please check and try again.');
      }

      // Set user session and navigate
      await db.setCurrentUser(user);
      window.location.href = '/billing';
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setForgotSuccess('');

    try {
      const { supabase } = await import('@/lib/supabase');
      if (!supabase) throw new Error('Supabase is not configured');

      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (resetErr) throw resetErr;

      setForgotSuccess('A secure password reset link has been dispatched to your email.');
      setForgotEmail('');
    } catch (err: any) {
      setError(err.message || 'Failed to request password reset. Please try again.');
    } finally {
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
        await db.setCurrentUser(user);
        window.location.href = '/billing';
      } else {
        throw new Error(`Profile for ${roleName} not found`);
      }
    } catch (err: any) {
      setError(err.message || 'Quick access login failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFDF9] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <div className="text-center flex flex-col items-center">
          <img src="/logos/Creatiancy logo.svg" alt="Creatiancy Logo" className="h-12 w-auto mb-4" />
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Billing • Secure Authentication Portal
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700 font-medium leading-relaxed">
            {error}
          </div>
        )}

        {forgotSuccess && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3.5 text-xs text-green-700 font-medium leading-relaxed">
            {forgotSuccess}
          </div>
        )}

        {!forgotMode ? (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4 rounded-md">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Email Address or Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="email"
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
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setForgotMode(true); setError(''); }}
                    className="text-xs font-semibold text-[#9B1C22] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
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
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
            <div className="space-y-4 rounded-md">
              <div>
                <label htmlFor="forgotEmail" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="forgotEmail"
                    name="forgotEmail"
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-[#1E1E1E] placeholder-gray-400 focus:border-[#9B1C22] focus:outline-none focus:ring-1 focus:ring-[#9B1C22]"
                    placeholder="name@creatiancy.com"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-lg bg-[#9B1C22] py-3 text-sm font-semibold text-[#FBFDF9] hover:bg-[#9B1C22]/90 focus:outline-none focus:ring-2 focus:ring-[#9B1C22] focus:ring-offset-2 disabled:opacity-50 transition duration-150 cursor-pointer"
              >
                {loading ? 'Requesting link...' : 'Send Recovery Email'}
              </button>

              <button
                type="button"
                onClick={() => { setForgotMode(false); setError(''); setForgotSuccess(''); }}
                className="flex items-center justify-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back to Login</span>
              </button>
            </div>
          </form>
        )}

        {/* Developer Sandbox Quick Login (Disabled in Production) */}
        {process.env.NODE_ENV !== 'production' && (
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
        )}

      </div>
    </div>
  );
}
