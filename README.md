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
We have eradicated deep-nested UI hardcoding. Absolute data control is maintained from structural configurations:

- **`config/footerConfig.ts`**: The singular interface controller for the entire application's connect capabilities. Holds email records, physical studio addresses, WhatsApp APIs, and all Social vectors.
- **`config/projects.ts`**: The decoupled data spine for rendering dynamic Case Studies and Recent Project Grids natively across the marketing pages. Scales instantly into JSON backends (e.g., Sanity/Strapi).
- **`data/testimonials.ts`**: Manages the Client Feedback section globally.

### How to Add or Edit Testimonials
To update client testimonials (displayed on the Home, About, and Service pages), edit the `/data/testimonials.ts` file.

**Structure of a Testimonial Object:**
```typescript
{
  id: "unique-id",          // Ensure this is unique
  name: "Client Name",      // e.g., "Sarah Jenkins"
  designation: "Role",      // e.g., "CMO, TechFlow"
  image: "image_url",       // Absolute URL or path from /public
  review: "Review text..."  // Short to medium length text
}
```

**Security & Editing Notes:**
- The review content is rendered safely using standard React text nodes. Do not attempt to inject HTML tags (like `<b>`, `<a>`) directly into the `review` string, as it will be escaped and displayed as plain text. This inherently protects against Cross-Site Scripting (XSS).
- Use optimized images for the `image` field. If linking external images, ensure they use secure `https://` URLs.
- Keeping this data decoupled means a non-technical editor can safely change text here without risking the UI layout.

---

## 4. Built-in Security

The application includes pre-configured security features using Next.js middleware and config:

*   **Middleware Protection**: Restricts access to sensitive files and blocks common automated scrapers.
*   **Security Headers**: Implements headers like `X-Frame-Options`, `Content-Security-Policy`, and `HSTS` to protect against XSS and clickjacking.
*   **Privacy First**: Strips unnecessary permissions (camera, microphone) and uses strict referrer policies.
*   **Production Hardening**: Disables source maps and the `X-Powered-By` header to reduce information leakage.

---

## 5. Folder Directory
- **`/app`**: The Next.js routing architecture and metadata layouts.
- **`/components`**: Reusable isolated client-rendering components (Footer, Marquees, Responsive Interactors).
- **`/config`**: The centralized dynamic data mappings (Footer Data, Project Matrices).
- **`/lib`**: Utility integrations, deep `seo.ts` logic mapping, and isolated `animations/` packages.
- **`/public`**: Critical static brand SVGs and core imagery.
- **`/sanity`**: CMS Configuration, Schema Definitions, and Environment connections.
- **`middleware.ts`**: Active security perimeter hook for Next Edge layers.

---

## 6. How to Run Locally
1. Clone the repository to your environment.
2. Install the necessary dependencies:
```bash
npm install
```
3. Boot the environment locally:
```bash
npm run dev
```

---

## 7. Zero-Config Deployment
This architecture maps fluidly into Vercel's zero-build Edge networks. Simply connect your Git provider branch and trigger a deploy stream. The `robots.ts`, `sitemap.ts`, and core SEO `metadataBase` will automatically index securely into Google.

---

## 8. Content Management System (Sanity)
The project includes a fully integrated headless CMS using **Sanity**.
1. The embedded admin dashboard is available at `http://localhost:3000/studio`.
2. Schema configurations are located in `sanity/schemaTypes/`.
3. To sync the studio with your data, ensure you have added your Sanity `projectId` to the `sanity/env.ts` file.

---

## 9. Analytics & Tracking
**Google Analytics 4** is configured natively via `<Script>` injection in `app/layout.tsx`. Ensure your Measurement ID (`G-XXXXXXXXXX`) is securely set in the layout to ensure accurate traffic mapping.


