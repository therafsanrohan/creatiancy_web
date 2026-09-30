import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'What is Creatiancy? A boutique digital design and development studio founded on the belief that every brand deserves precision-engineered digital experiences. Six global offices, one standard: excellence.',
  alternates: {
    canonical: 'https://www.creatiancy.com/about',
  },
  keywords: ['about Creatiancy', 'digital studio story', 'boutique creative agency', 'Dhaka digital studio', 'global design team'],
  openGraph: {
    url: 'https://www.creatiancy.com/about',
    title: 'About Creatiancy | Digital Design & Development Studio',
    description: 'The story, team, values, and global presence behind Creatiancy — a boutique digital studio operating across 6 cities on 4 continents.',
  },
  twitter: {
    description: 'Our story, our team, our values. Boutique digital studio, 6 cities, 4 continents.',
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.creatiancy.com/about#webpage",
  "url": "https://www.creatiancy.com/about",
  "name": "About Creatiancy | Digital Design & Development Studio",
  "description": "Learn how Creatiancy was founded as a boutique digital design and development studio. Discover our story, team, core values, and multi-city global presence across 6 cities.",
  "isPartOf": { "@id": "https://www.creatiancy.com/#website" },
  "about": { "@id": "https://www.creatiancy.com/#organization" },
  "breadcrumb": { "@id": "https://www.creatiancy.com/about#breadcrumb" },
  "inLanguage": "en-US"
};

const aboutBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.creatiancy.com/about#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.creatiancy.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://www.creatiancy.com/about"
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Creatiancy Global Offices",
  "itemListElement": [
    {
      "@type": "ListItem", "position": 1,
      "item": {
        "@type": "LocalBusiness",
        "name": "Creatiancy — Dhaka",
        "url": "https://www.creatiancy.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressCountry": "BD" },
        "description": "Primary hub. Core team for design, development, and strategy.",
        "openingHours": "Mo-Fr 09:00-18:00"
      }
    },
    {
      "@type": "ListItem", "position": 2,
      "item": {
        "@type": "LocalBusiness",
        "name": "Creatiancy — Wyoming",
        "url": "https://www.creatiancy.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Wyoming", "addressRegion": "WY", "addressCountry": "US" },
        "description": "North American operations and client management."
      }
    },
    {
      "@type": "ListItem", "position": 3,
      "item": {
        "@type": "LocalBusiness",
        "name": "Creatiancy — Cape Town",
        "url": "https://www.creatiancy.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Cape Town", "addressCountry": "ZA" },
        "description": "Sub-Saharan Africa design and brand operations."
      }
    },
    {
      "@type": "ListItem", "position": 4,
      "item": {
        "@type": "LocalBusiness",
        "name": "Creatiancy — Johannesburg",
        "url": "https://www.creatiancy.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Johannesburg", "addressCountry": "ZA" },
        "description": "Southern Africa business development and enterprise accounts."
      }
    },
    {
      "@type": "ListItem", "position": 5,
      "item": {
        "@type": "LocalBusiness",
        "name": "Creatiancy — Nicosia",
        "url": "https://www.creatiancy.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Nicosia", "addressCountry": "CY" },
        "description": "European and Middle East operations bridge."
      }
    },
    {
      "@type": "ListItem", "position": 6,
      "item": {
        "@type": "LocalBusiness",
        "name": "Creatiancy — Nairobi",
        "url": "https://www.creatiancy.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Nairobi", "addressCountry": "KE" },
        "description": "East Africa market entry, campaigns, and creative strategy."
      }
    }
  ]
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      {children}
    </>
  );
}
