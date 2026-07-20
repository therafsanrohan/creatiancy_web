# Creatiancy Billing Hub V1

This is the standalone, secure billing and invoice management application for Creatiancy. It is completely isolated from the main Creatiancy website and configured to manage clients, invoices, payment receipts, and financial reports.

---

## 🚀 Quick Start Guide (Non-Technical Founder)

To open the project locally and start testing:

### 1. Prerequisite
Make sure you have [Node.js](https://nodejs.org) (Version 18 or later) installed on your computer.

### 2. Launch Local Server
Open your computer's terminal, navigate to this project folder, and run:
```bash
npm run dev
```

### 3. Open in Browser
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## 📘 Documentation Index

We have prepared comprehensive guides for setting up, deploying, and managing the Billing Hub:

1. **[SETUP_GUIDE.md](file:///Users/macbook/creatiancy_web/creatiancy_web/creatiancy-billing-hub-v1/SETUP_GUIDE.md)**
   * Local development configurations.
   * Supabase database setups & migrations.
   * Fictional seed data loading.
2. **[DEPLOYMENT_AND_BACKUP.md](file:///Users/macbook/creatiancy_web/creatiancy_web/creatiancy-billing-hub-v1/DEPLOYMENT_AND_BACKUP.md)**
   * Vercel deployment guides.
   * DNS connection guidelines for `billing.creatiancy.com`.
   * Secure automated database backup and recovery protocols.
3. **[CHECKLISTS_AND_ROLES.md](file:///Users/macbook/creatiancy_web/creatiancy_web/creatiancy-billing-hub-v1/CHECKLISTS_AND_ROLES.md)**
   * Admin configuration checklists.
   * Production Launch checklists.
   * Detailed breakdown of user roles & access permissions.
   * Known V1 limitations.

---

## 🛡️ Sandbox Sandbox & Live Modes

This application features an automatic **Sandbox / Demo Mode**:
* **Sandbox Mode (Active by default)**: If the Supabase URL or keys in `.env` are missing or set to defaults, the app runs entirely in your local browser using `localStorage`. You can create clients, log invoices, record payments, and print PDFs immediately without configuring a database first.
* **Live Database Mode**: Once you add real Supabase keys to your `.env` file, the app automatically transitions to secure, multi-role PostgreSQL database operations.
