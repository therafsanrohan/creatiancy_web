# Software Requirements Specification (SRS)
**Project Name:** Creatiancy Digital Studio
**Version:** 1.0

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to define the architectural, functional, and non-functional requirements for the Creatiancy Digital Studio platform.

### 1.2 Scope
This system acts as a premium digital portfolio, brand narrative interface, and lead generation engine for Creatiancy.

## 2. Functional Requirements
### 2.1 Core Features
- **Landing Page:** High-fidelity hero section with 3D elements and dynamic typography.
- **Portfolio (Case Studies):** Data-driven display of selected past projects.
- **Testimonials:** Interactive carousel/list of client reviews.
- **Contact Routing:** Centralized `mailto:` and `tel:` deep-links with global map integration.

### 2.2 Content Management System (CMS)
- **Sanity Integration:** The system must utilize Sanity headless CMS to manage dynamic content without requiring codebase edits.
- **Embedded Studio:** Editors must be able to log into an admin dashboard via `/studio` on the live domain to manage content securely.
- **Schemas:** The CMS must support defining structured content models for Case Studies, Testimonials, and Page Copy.

### 2.3 Analytics and Tracking
- **Google Analytics (GA4):** The system must implement Google Analytics via Google Tag Manager (`gtag.js`).
- **Execution:** Scripts must load asynchronously via Next.js `<Script>` components (`strategy="afterInteractive"`) to prevent main-thread blocking, preserving high Core Web Vitals scores.

## 3. Non-Functional Requirements
### 3.1 Performance
- The application must achieve 95+ scores on Google Lighthouse (Performance, Accessibility, Best Practices, SEO).
- The CMS embedded studio must be lazy-loaded to protect the performance of marketing pages.

### 3.2 Security
- Strict Content Security Policy (CSP) implementation via Next.js `next.config.ts`.
- Middleware-level bot rejection (403 status codes for automated headless scrapers like `curl` and `python-requests`).
- CMS Authentication handled securely via Sanity OAuth.

## 4. Technical Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **CMS Engine:** Sanity (`next-sanity`)
- **Hosting Target:** Vercel (Edge Ecosystem)
