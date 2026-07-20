# Setup and Local Development Guide

This guide details how to set up the database and environment variables for local testing and live database sync.

---

## 1. Environment Configurations

Copy the `.env.example` file to create a `.env` file:
```bash
cp .env.example .env
```

Open the `.env` file and configure these parameters when ready for live operations:
* `NEXT_PUBLIC_SUPABASE_URL`: Found in Supabase Project Settings > API.
* `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Found in Supabase Project Settings > API.
* `SUPABASE_SERVICE_ROLE_KEY`: Service role bypass key for admin triggers.
* `RESEND_API_KEY`: API key from [Resend Email service](https://resend.com) for dispatching client emails.

---

## 2. Supabase Database Migration & Setup

To deploy the SQL schemas and procedures directly to your Supabase project:

1. Go to your **Supabase Dashboard**.
2. Navigate to the **SQL Editor** tab in the sidebar.
3. Click **New Query**.
4. Copy the entire contents of [20260721000000_initial_schema.sql](file:///Users/macbook/creatiancy_web/creatiancy_web/creatiancy-billing-hub-v1/supabase/migrations/20260721000000_initial_schema.sql) and paste it into the editor. Click **Run**.
5. Create another query, copy the contents of [20260721000001_functions_and_policies.sql](file:///Users/macbook/creatiancy_web/creatiancy_web/creatiancy-billing-hub-v1/supabase/migrations/20260721000001_functions_and_policies.sql) and click **Run**.
6. (Optional) Run the [seed.sql](file:///Users/macbook/creatiancy_web/creatiancy_web/creatiancy-billing-hub-v1/supabase/seed.sql) script in the SQL editor to load fictional clients, bank parameters, and draft invoices for sandbox trials.

---

## 3. Local Verification

To run automated checks on the decimal financial calculations and formatting helper rules, run:
```bash
npx tsx tests/calculations.test.ts
```
Expected output: `All calculations tests passed successfully!`
