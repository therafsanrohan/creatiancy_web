import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'World Live',
  description: "Real-time timezone synchronization across 193 countries. Track Creatiancy's 6 active global operational hubs live — Dhaka, Wyoming, Cape Town, Johannesburg, Nicosia, and Nairobi.",
  alternates: {
    canonical: 'https://www.creatiancy.com/world-live',
  },
  keywords: ['world live timezones', 'Creatiancy global offices', 'digital studio global presence'],
  openGraph: {
    url: 'https://www.creatiancy.com/world-live',
    title: 'World Live | Creatiancy',
    description: "Real-time timezone synchronization across 193 countries. Track Creatiancy's 6 active global operational hubs live.",
  },
};

const worldLivePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.creatiancy.com/world-live#webpage",
  "url": "https://www.creatiancy.com/world-live",
  "name": "World Live | Creatiancy",
  "description": "Real-time timezone synchronization across 193 countries. Track Creatiancy's 6 active global operational hubs live — Dhaka, Wyoming, Cape Town, Johannesburg, Nicosia, and Nairobi.",
  "isPartOf": { "@id": "https://www.creatiancy.com/#website" },
  "breadcrumb": { "@id": "https://www.creatiancy.com/world-live#breadcrumb" },
  "inLanguage": "en-US"
};

const worldLiveBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.creatiancy.com/world-live#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.creatiancy.com" },
    { "@type": "ListItem", "position": 2, "name": "World Live", "item": "https://www.creatiancy.com/world-live" }
  ]
};

export default function WorldLiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(worldLivePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(worldLiveBreadcrumbSchema) }} />
      {children}
    </>
  );
}
