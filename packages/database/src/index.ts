import { createClient } from '@supabase/supabase-js';

// Define DB Types here or generate them with Supabase CLI
export type Project = {
  id: string;
  title: string;
  slug: string;
  client?: string;
  industry?: string;
  category?: string;
  project_year?: string;
  location?: string;
  short_description?: string;
  project_overview?: string;
  challenge?: string;
  strategic_insight?: string;
  strategy?: string;
  creative_direction?: string;
  execution?: string;
  solution?: string;
  process?: string;
  content_sections?: any;
  measurable_results?: any;
  publish_state: 'draft' | 'in_review' | 'published' | 'archived';
  featured: boolean;
  sort_order: number;
  created_at: string;
};

export type Client = {
  id: string;
  name: string;
  logo_url?: string;
  industry?: string;
  website?: string;
  is_featured: boolean;
};

export type Testimonial = {
  id: string;
  client_id?: string;
  project_id?: string;
  author_name: string;
  author_role?: string;
  quote: string;
  is_featured: boolean;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: any;
};

// A singleton client for server-side fetching of public data
export function getDbClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key';

  return createClient(supabaseUrl, supabaseKey);
}
