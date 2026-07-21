# Creatiancy Billing Desk V1

Creatiancy Billing Desk V1 is an enterprise-grade, multi-entity financial management, invoicing, tax/VAT accounting, and cashflow tracking platform built for **Creatiancy Limited** (Bangladesh / BDT) and **Creatiancy LLC** (United States / USD).

---

## 🌟 Core Modules & Capabilities

### 1. Multi-Entity Corporate Billing
- **Dual Entity Management**: Native support for **Creatiancy Limited (CLTD - BDT)** and **Creatiancy LLC (CLLC - USD)**.
- **Dynamic Entity Mapping**: Invoice legal entities, prefixes, registered addresses, tax IDs, and payment instructions update dynamically when modified in Entity Settings.
- **Atomic Serial Numbering**: Sequential numbering per entity and calendar year (e.g. `CLTD-BDT-2026-0001`, `CLLC-USD-2026-0001`).
- **A4 PDF Export & Sharing**: Live-scaled A4 print previews, client share links (`/invoice/[secureToken]`), and PDF generation.

### 2. Cashflow & P&L Module (`/billing/expenses`)
- **Expense Tracking**: Categorized expense recording (Payroll, Rent, Software, Utilities, Marketing, etc.).
- **Net Margin & P&L Dashboard**: Real-time gross margin, incoming net revenue (minus gateway cutoffs), total operational expenses, and net taxable profit.

### 3. Tax & VAT Ledger (`/billing/tax`)
- **Dual Regional Tax Rates**: Distinct corporate tax and VAT/Sales tax rates for BDT and USD entities.
- **Govt Exchequer Challan Tracking**: Track corporate tax accruals and recorded treasury payment challans (`TC-2026-XXXX`).

### 4. Role-Based Access Control (RBAC)
- **Granular Permissions**:
  - `Super Admin`: Full system access, team management, audit logs, entity rate configurations.
  - `Admin`: Full operational access and financial management.
  - `Finance Admin`: Access to Cashflow, Invoices, Payments, and Tax Ledgers.
  - `Client Service`: Manage clients and draft/submit invoices.
  - `Project Manager`: Project invoice creation and status tracking.

### 5. Full Mobile Responsiveness
- Optimized layouts with responsive grid cards (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) and adaptive mobile card views for all financial ledgers.

---

## 🌐 Server Routing & Access URLs

When hosted on server or domain (e.g., Vercel / custom domain):

- **Main Dashboard / Entry URL**: `https://billing.creatiancy.com` or `https://creatiancy.com/billing` (or domain path `/billing`).
- **Authentication**: Visiting `/` automatically routes to `/login`, where authorized team members sign in to access `/billing`.
- **Public Client Invoice View**: `https://your-domain.com/invoice/[secureToken]` (Allows client to view & download invoice without requiring login).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Vanilla CSS + TailwindCSS 4
- **Database & Auth**: Supabase Cloud Postgres (`@supabase/supabase-js`) with client-side LocalStore fallback engine
- **Icons**: Lucide React
- **PDF & Export**: `html2pdf.js`

---

## 🚀 Deployment Guide (Vercel)

### Step 1: Push Repository to GitHub
Ensure the project is pushed to GitHub repository (`therafsanrohan/creatiancy_web`).

### Step 2: Import into Vercel
1. Log into [Vercel Dashboard](https://vercel.com).
2. Click **Add New Project** and select `therafsanrohan/creatiancy_web`.
3. Set **Root Directory** to `creatiancy-billing-hub-v1`.
4. Framework Preset will auto-detect as **Next.js**.

### Step 3: Configure Environment Variables in Vercel
In Vercel Project Settings -> **Environment Variables**, add:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Email Provider Configuration
RESEND_API_KEY=your_resend_api_key_here
SENDER_EMAIL=billing@creatiancy.com

# Server & App URL
NEXT_PUBLIC_APP_URL=https://billing.creatiancy.com
```

### Step 4: Database Setup (Supabase)
1. Go to your Supabase project SQL Editor.
2. Run migration scripts from `supabase/migrations/20260721000000_initial_schema.sql` and `20260721000001_functions_and_policies.sql`.
3. Seed production defaults using `supabase/seed.sql`.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run TypeScript build check
npx tsc --noEmit
```

---

## 🔒 Confidentiality & Security
- Security headers (CSP, HSTS, X-Frame-Options, X-SS-Protection) enforced via `next.config.ts`.
- No confidential passwords, API keys, or tokens are committed in repository source code.
