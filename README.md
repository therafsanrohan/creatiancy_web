# Creatiancy

## 1. Project Overview
Creatiancy is a bespoke digital brand experience and premium studio portfolio. 
The purpose of the website is to communicate precision, creative intelligence, and controlled boldness, functioning less as a flashy agency and more as a confident, intentional digital studio. Recently updated with a fully responsive architecture, refined soft-blur animations, and highly optimized, SEO-driven marketing layouts.

## 2. BRS (Business Requirements)
- **Brand positioning:** High-end, premium, intentional creative agency.
- **Target audience:** Clients seeking professional, high-quality digital marketing experiences and pristine brand narratives.
- **Goals:** Lead generation, portfolio showcase, building trust, and communicating a high standard of work through modern, dynamic UI and precise marketing structure.

## 3. FRS (Functional Requirements)
- **Dynamic pages:** Home, Work/Portfolio, Services, About, Contact, Privacy Policy, Terms of Service.
- **Responsive Navigation:** Clean, optimized mobile and desktop navigation.
- **Dynamic Animations:** Floating 3D-like liquid background elements and scroll-linked framer-motion reveals.
- **Content Synchronization:** Centralized array-based "Trusted Brands" logic via `lib/data.ts`.
- **Theme Mechanics:** Dark mode configured natively. Light theme fully activated and togglabe.
- **Enterprise Security:** Embedded advanced headers (`X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`) alongside strict `productionBrowserSourceMaps: false` logic to prevent reverse engineering and mitigate XSS/Clickjacking.

## 4. SRS (System Requirements)
- **Framework:** Next.js (App Router) + TypeScript
- **Dependencies:** Tailwind CSS, Framer Motion, Lucide React, Next Themes
- **Typography:** Helvetica Neue (applied globally for premium aesthetic)
- **Hosting / Deployment Environment:** Vercel / Node Edge ecosystem.

## 5. Folder Explanation
- `/app`: Next.js App Router root layout and pages.
- `/components`: Reusable UI components (Navbar, Footer, Hero, ThemeToggle, BrandsMarquee, etc.).
- `/lib`: Utility functions, centralized arrays (`data.ts`), and SEO configuration.
- `/public`: Static assets (images, logos, icons, SVGs).

## 6. How to Run (Setup Instructions)
1. Clone the repository to your local machine:
```bash
git clone <repo>
cd creatiancy_web
```
2. Install dependencies:
```bash
npm install
```
3. Run the development server smoothly:
```bash
npm run dev
```

## 7. Deployment Steps
This project is deeply optimized for deployment on **Vercel**. 
1. Push your latest code changes to your Git provider (GitHub, GitLab, Bitbucket).
2. Create an account or log in to Vercel.
3. Import the exact cloned project via the "Add New..." -> "Project" dashboard.
4. Framework details (Next.js) will be auto-detected. Click **Deploy** for zero-configuration, instant Edge CDN deployment.
