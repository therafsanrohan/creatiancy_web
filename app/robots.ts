import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/_next/', '/logos/', '/api/'],
    },
    sitemap: 'https://creatiancy.com/sitemap.xml',
  };
}
