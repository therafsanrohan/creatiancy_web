# Deployment, DNS, Cloud Migration, and Backup Guidelines

This guide details the deployment flow to Vercel, legacy localStorage data migration, connecting `billing.creatiancy.com`, and database backups.

---

## 1. Hosting Deployment (Vercel)

To deploy the billing application to Vercel:

1. In Vercel, set **Root Directory** to: `creatiancy-billing-hub-v1`
2. Configure **Environment Variables** for Preview & Production:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Click **Deploy**.

---

## 2. Legacy LocalStorage Cloud Migration Flow

To migrate existing browser `localStorage` records to Supabase PostgreSQL:

1. Sign in as a **Super Admin**.
2. Navigate to: `/billing/admin/migrate`
3. Click **Export JSON Backup** to save a local backup copy of existing browser storage.
4. Click **Start Cloud Migration** to upload clients, invoices, payments, and reserve records to Supabase.
5. Review the financial reconciliation summary and click **Clear Legacy Local Storage** once confirmed.

---

## 3. DNS Connection for billing.creatiancy.com

1. In the Vercel project dashboard, navigate to **Settings > Domains**.
2. Type `billing.creatiancy.com` and click **Add**.
3. Add the provided CNAME record to your domain DNS settings:
   - **Record Type**: `CNAME`
   - **Name/Host**: `billing`
   - **Value/Target**: `cname.vercel-dns.com`

---

## 4. Supabase Backup and Recovery Guide

- **Automatic Daily Backups**: Managed in Supabase Dashboard > Database > Backups.
- **Manual Migration Backup**: Download JSON backup directly from `/billing/admin/migrate`.
