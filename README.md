# Creatiancy Digital Studio

## 1. Project Overview
Creatiancy is a professional digital studio portfolio and brand platform. Built with Next.js, it serves as a high-quality showcase for creative work and client services.

The codebase is designed for performance, security, and SEO optimization from the ground up.


---

## 2. Technical Stack
- **Core Engine:** Next.js 15 (App Router natively forced Server-Side execution logic)
- **Styling:** Vanilla Tailwind CSS + Modular `theme.css` tokens
- **CMS:** Sanity Studio (embedded at `/studio`)
- **Analytics:** Google Analytics (gtag.js)
- **Animations:** Framer Motion (Spring Physics arrays)
- **Security:** Root `middleware.ts` bot deflection & heavy native CSP Next hooks
- **Environment:** Node Edge Ecosystem (Vercel)

---

## 3. Configuration Subsystems (Single Source of Truth)
We have eradicated deep-nested UI hardcoding. Absolute data control is maintained from structural configurations located in `src/constants/`:

- **`src/constants/footerConfig.ts`**: The singular interface controller for the entire application's connect capabilities. Holds email records, physical studio addresses, WhatsApp APIs, and all Social vectors.
- **`src/constants/projects.ts`**: The decoupled data spine for rendering dynamic Case Studies and Recent Project Grids natively across the marketing pages.
- **`src/constants/testimonials.ts`**: Manages the Client Feedback section globally.
- **`src/constants/services.ts`**: Centralized list of core agency services and their descriptions.

### How to Add or Edit Testimonials
To update client testimonials, edit the `src/constants/testimonials.ts` file.

**Structure of a Testimonial Object:**
```typescript
{
  id: "unique-id",          
  name: "Client Name",      
  designation: "Role",      
  image: "image_url",       
  review: "Review text..."  
}
```

---

## 4. Built-in Security & Obfuscation

The application includes multi-layered protection:

*   **SecurityProvider**: Client-side component that disables right-click, F12, and common inspection shortcuts (CMD+U, CMD+SHIFT+I) to discourage source viewing.
*   **Production Hardening**: Source maps are disabled in production, and the `X-Powered-By` header is removed to prevent signature fingerprinting.
*   **Security Headers**: Implements strict CSP, HSTS, and Frame-Options via `next.config.ts`.

---

## 5. Folder Directory (Source-First Architecture)
- **`/src/app`**: Next.js routing architecture and metadata layouts.
- **`/src/components`**: Reusable components categorized by concern.
- **`/src/constants`**: Centralized configuration files for content management.
- **`/src/lib`**: Utility integrations and core logic.
- **`/src/sanity`**: CMS Configuration and Schema Definitions.
- **`/public`**: Static assets (logos, images).
- **`middleware.ts`**: Active security perimeter hook for Next Edge layers.

---

## 6. Maintenance & Content Updates
For non-technical owners, most updates can be done by editing files in `src/constants/`. These files use plain-English comments and simple TypeScript objects that are easy to modify even without deep coding knowledge.

---

## Credits
**Website designed and developed by Creatiancy**  
📞 +880 1325 078 941 | ✉️ contact@creatiancy.com | 🌐 www.creatiancy.com  
**Rafsan Rohan — Founder & Creative Lead**  
📞 +880 1325 078 942 | ✉️ knock.rafsan@gmail.com | 🌐 www.rafsanrohan.com  

⚠️ *Note: This codebase was used by the development team (Creatiancy) for development and testing purposes only.*


