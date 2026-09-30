# Creatiancy Monorepo

Welcome to the new, modernized Creatiancy Global Website and CMS.

This project is built using a robust, scalable Next.js monorepo architecture leveraging Supabase for backend services (Auth & Postgres) and Cloudinary for media asset management.

## Project Architecture

The codebase is organized into applications and shared packages:

### Apps
- `apps/web`: The public-facing agency website (`creatiancy.com`). Built with Next.js App Router, Tailwind v4, and Framer Motion. Contains the marketing pages, portfolio (case studies), services, and insights.
- `apps/admin`: The secure CMS dashboard (`admin.creatiancy.com`). Built with Next.js App Router and secured via Supabase SSR Auth middleware. Used to manage Inquiries, Projects, and Insights.

### Packages
- `packages/database`: Shared Supabase client configuration and schema definitions.
- `packages/ui`: Shared design system, Tailwind v4 tokens, and global styling constants.
- `packages/auth`: (Reserved) Shared authentication logic.

## Prerequisites

- Node.js >= 18
- Supabase Cloud Project (or Local Docker for local Supabase)
- Cloudinary Account (for media uploads)

## Environment Variables

You must create a `.env.local` file in both `apps/web` and `apps/admin` with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Cloudinary Configuration (Only required in apps/admin for uploading)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-unsigned-upload-preset"
```

## Running Locally

To start the development servers for both the web app and the admin dashboard concurrently:

```bash
npm install
npm run dev
```

- `apps/web` will typically run on `http://localhost:3000` (or 3001)
- `apps/admin` will typically run on `http://localhost:3001` (or 3000)

## Database Schema

The database relies on the schema defined in `supabase/migrations`. 
To apply the schema to your Supabase cloud project:

1. Link your project: `npx supabase link --project-ref your-project-ref`
2. Push the migrations: `npx supabase db push`

*Note: Ensure you create a super-admin user in your Supabase dashboard to login to the `apps/admin` application.*

## Deployment (Vercel)

1. Import the repository into Vercel.
2. Create **two separate Vercel projects** pointing to the same repository.
3. For the **Web App**:
   - Framework Preset: `Next.js`
   - Root Directory: `apps/web`
   - Build Command: `npm run build`
4. For the **Admin App**:
   - Framework Preset: `Next.js`
   - Root Directory: `apps/admin`
   - Build Command: `npm run build`
5. Add the necessary Environment Variables to both Vercel projects.
