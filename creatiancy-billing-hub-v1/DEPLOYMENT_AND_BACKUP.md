# Deployment, DNS, and Database Backup Guidelines

This guide details the deployment flow to Vercel, connecting the custom subdomain `billing.creatiancy.com`, and managing database backups.

---

## 1. Hosting Deployment (Vercel)

To deploy the application to Vercel:

1. Push this standalone folder as a new repository on your **GitHub** account.
2. Go to the [Vercel Dashboard](https://vercel.com) and click **Add New > Project**.
3. Import your new repository.
4. Expand the **Environment Variables** section and add the keys from your `.env` file.
5. Click **Deploy**. Vercel will build the project and assign a temporary preview domain (e.g. `creatiancy-billing.vercel.app`).

---

## 2. DNS Connection for billing.creatiancy.com

Once the deployment completes:

1. In the Vercel project dashboard, navigate to **Settings > Domains**.
2. Type `billing.creatiancy.com` and click **Add**.
3. Vercel will check the domain status and display DNS instructions containing:
   * **Record Type**: `CNAME`
   * **Name/Host**: `billing`
   * **Value/Target**: `cname.vercel-dns.com`
4. Log into your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) where `creatiancy.com` is hosted.
5. Open the **DNS Zone Editor** and add the CNAME record with the values provided.
6. Wait for propagation (usually 5 to 15 minutes). The app will now be secure on HTTPS at `billing.creatiancy.com`.

> [!WARNING]
> Do NOT touch the root domain `@` or `www` DNS records. Doing so will disrupt your main marketing website. Only add the sub-domain `billing` CNAME record.

---

## 3. Supabase Backup and Recovery Guide

### Automatic Daily Backups
Supabase projects automatically schedule database backups daily. 
* Free-tier projects store backups for up to 3 days.
* Pro-tier projects store daily database backups for up to 7 days, plus point-in-time recovery options.

### Manual SQL Backups (Recommended before major launches)
To copy a snapshot of your database manually:

1. Navigate to your **Supabase Dashboard > Database > Backups**.
2. Click **Download Backup** (or go to SQL Editor and export data tables).
3. Alternatively, use pg_dump in terminal if you are using terminal tools:
   ```bash
   pg_dump -h db.your-project-id.supabase.co -U postgres -d postgres -F c -b -v -f backup.sql
   ```

### Recovery Guidance
If you need to restore your database from a backup file:
1. In your Supabase project, go to **Settings > Database** and select **Restore Backup** choosing the desired timestamp.
2. If restoring manually via SQL file: Open **SQL Editor**, click **Upload File**, select `backup.sql`, and click **Run**.
