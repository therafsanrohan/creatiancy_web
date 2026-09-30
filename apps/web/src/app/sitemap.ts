import { MetadataRoute } from 'next';
import { getDbClient } from '@creatiancy/database';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://creatiancy.com';
  const supabase = getDbClient();
  
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  // Fetch dynamic projects
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, updated_at')
    .eq('publish_state', 'published');

  const projectRoutes = (projects || []).map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(project.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Fetch dynamic insights
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('state', 'published');

  const postRoutes = (posts || []).map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
