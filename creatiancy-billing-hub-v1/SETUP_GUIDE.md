# Setup and Development Guide

This guide details how to set up the database and environment variables for local testing, live Supabase cloud database sync, and Vercel production deployment.

---

## 1. Environment Configurations

Copy the `.env.example` file to create `.env.local`:
```bash
cp .env.example .env.local
```

Configure these parameters:
* `NEXT_PUBLIC_SUPABASE_URL`: Found in Supabase Project Settings > API.
* `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Found in Supabase Project Settings > API.
* `SUPABASE_SERVICE_ROLE_KEY`: Service role key for server-only admin actions.
* `RESEND_API_KEY`: API key from Resend for sending invoice emails.

---

## 2. Supabase Database Migration Sequence

To deploy all SQL schemas, procedures, and RLS policies to your Supabase project, execute the migration scripts in the **SQL Editor** in this exact sequential order:

1. `supabase/migrations/20260721000000_initial_schema.sql` (Initial tables for profiles, clients, invoices, items)
2. `supabase/migrations/20260721000001_functions_and_policies.sql` (Invoice sequence generator and initial RLS)
3. `supabase/migrations/20260722000000_vat_and_tax_tables.sql` (VAT registration profiles, Mushak 6.3/6.6, Tax tables)
4. `supabase/migrations/20260723000000_company_reserve_and_savings.sql` (Company reserve, FDR, DPS, withdrawals)
5. `supabase/migrations/20260724000000_cloud_migration_functions_and_rls.sql` (Atomic payment stored procedure & RLS)
6. `supabase/migrations/20260725000000_fix_cloud_persistence_and_auth.sql` (Auth signup trigger and canonical roles)

---

## 3. Legacy LocalStorage Cloud Migration Tool

Super Admins can migrate existing browser data to the cloud at:
`/billing/admin/migrate`

---

## 4. Local Verification & Build

Run calculation unit tests and build check:
```bash
npx tsx tests/calculations.test.ts
npm run build
```
