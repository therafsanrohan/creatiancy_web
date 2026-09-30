-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles Table
CREATE TABLE public.roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User Roles Mapping
CREATE TABLE public.user_roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, role_id)
);

-- Projects Table
CREATE TABLE public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client TEXT,
    industry TEXT,
    category TEXT,
    project_year TEXT,
    location TEXT,
    short_description TEXT,
    project_overview TEXT,
    challenge TEXT,
    strategic_insight TEXT,
    strategy TEXT,
    creative_direction TEXT,
    execution TEXT,
    solution TEXT,
    process TEXT,
    content_sections JSONB DEFAULT '[]'::jsonb,
    measurable_results JSONB DEFAULT '[]'::jsonb,
    publish_state TEXT DEFAULT 'draft' CHECK (publish_state IN ('draft', 'in_review', 'published', 'archived')),
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Services Table
CREATE TABLE public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    publish_state TEXT DEFAULT 'draft' CHECK (publish_state IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Posts (Insights) Table
CREATE TABLE public.posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    rich_content JSONB DEFAULT '[]'::jsonb,
    category TEXT,
    tags TEXT[],
    reading_time INTEGER,
    publish_state TEXT DEFAULT 'draft' CHECK (publish_state IN ('draft', 'scheduled', 'published', 'archived')),
    publication_date TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inquiries Table
CREATE TABLE public.inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    project_type TEXT,
    estimated_budget TEXT,
    timeline TEXT,
    project_description TEXT,
    referral_source TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost', 'Spam')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published entities
CREATE POLICY "Allow public read access to published projects" ON public.projects FOR SELECT USING (publish_state = 'published');
CREATE POLICY "Allow public read access to published services" ON public.services FOR SELECT USING (publish_state = 'published');
CREATE POLICY "Allow public read access to published posts" ON public.posts FOR SELECT USING (publish_state = 'published');

-- Allow inserting inquiries publicly (Lead generation)
CREATE POLICY "Allow public insert to inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
