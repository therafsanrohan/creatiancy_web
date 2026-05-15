# Software Requirements Specification (SRS)
**Project Name:** Creatiancy Digital Studio
**Version:** 2.0 (Global Standard Refactor)
**Date:** May 15, 2026

---

## 1. Introduction
### 1.1 Purpose
This document provides a comprehensive overview of the Creatiancy Digital Studio web platform. It serves as a technical blueprint for future developers and a management guide for the owner.

### 1.2 Scope
Creatiancy is a high-performance digital portfolio and lead generation engine. It combines elite design aesthetics with a robust technical foundation to showcase the agency's expertise in branding and digital development.

---

## 2. Technical Stack
- **Framework:** Next.js 15 (App Router Architecture)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Vanilla Tailwind CSS + Modular CSS Variables
- **Animations:** Framer Motion (Spring-based physics)
- **CMS Engine:** Sanity Headless CMS
- **Icons:** Lucide React
- **Deployment:** Vercel Edge Runtime

---

## 3. System Architecture
### 3.1 Folder Structure Explanation
The project follows a **Source-First (src/)** architecture, isolating business logic from configuration:
- `src/app/`: The routing layer. Contains page definitions and layouts.
- `src/components/`: Modular UI units (Layout, Sections, UI primitives).
- `src/constants/`: **The "Owner's Control Panel"**. Centralized files for content updates.
- `src/lib/`: Reusable utilities and third-party integrations (Sanity, SEO).
- `src/sanity/`: CMS schema definitions and environment setup.

### 3.2 Human-Centric Coding Patterns
The codebase is refactored to prioritize readability and maintainability. It uses natural naming conventions, detailed internal documentation, and a "feature-based" organization that mirrors human logical grouping rather than generic AI structures.

---

## 4. Key Features
- **Dynamic Marquee:** Auto-loads client logos from `/public/brands`.
- **Fluid Layout:** Responsive design that adapts to all devices with premium typography.
- **Security Perimeter:** Disables common DevTools shortcuts and right-click to protect creative assets.
- **CMS Sync:** Embedded Sanity Studio for complex content management.

---

## 5. Management Guides
### 5.1 Owner Management Guide (Non-Technical)
Content is managed via `src/constants/`. To update text or projects:
1. Navigate to the `src/constants/` folder.
2. Open the relevant file (e.g., `projects.ts` or `services.ts`).
3. Follow the plain-English comments to edit the text or links within the curly braces `{}`.

### 5.2 Developer Onboarding Guide
1. **Prerequisites:** Node.js 18+, Git.
2. **Setup:** Run `npm install` to install dependencies.
3. **Run Dev:** `npm run dev` to start the local server.
4. **Build:** `npm run build` to verify production integrity.

---

## 6. Deployment & Maintenance
- **Hosting:** The site is optimized for the owner's personal hosting (Vercel recommended).
- **Updates:** Push changes to the `main` branch to trigger automatic deployment.
- **Security:** Ensure `productionBrowserSourceMaps` remains `false` in `next.config.ts`.

---

## Credits
**Website designed and developed by Creatiancy**  
📞 +880 1325 078 941 | ✉️ contact@creatiancy.com | 🌐 www.creatiancy.com  

**Rafsan Rohan — Founder & Creative Lead**  
📞 +880 1325 078 942 | ✉️ knock.rafsan@gmail.com | 🌐 www.rafsanrohan.com  

⚠️ *Note: The website will be hosted on the owner's personal hosting. This codebase was used by the development team (Creatiancy) for development and testing purposes only.*
