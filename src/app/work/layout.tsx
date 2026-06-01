import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Selected Work',
  description: "Looking for proof of work? Creatiancy's selected projects showcase precision brand identity systems and high-performance digital platforms built for real-world results.",
  alternates: {
    canonical: 'https://www.creatiancy.com/work',
  },
  keywords: ['brand identity portfolio', 'digital experience design', 'case studies', 'web design portfolio', 'creative campaigns portfolio'],
  openGraph: {
    url: 'https://www.creatiancy.com/work',
    title: 'Selected Work | Creatiancy',
    description: 'A curated portfolio of precision brand systems and high-performance digital experiences from the Creatiancy studio.',
  },
};

const workPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.creatiancy.com/work#webpage",
  "url": "https://www.creatiancy.com/work",
  "name": "Selected Work | Creatiancy",
  "description": "Explore Creatiancy's selected work — a curated portfolio of brand identity systems, digital experiences, and creative campaigns engineered for high-growth global clients.",
  "isPartOf": { "@id": "https://www.creatiancy.com/#website" },
  "breadcrumb": { "@id": "https://www.creatiancy.com/work#breadcrumb" },
  "inLanguage": "en-US"
};

const workBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.creatiancy.com/work#breadcrumb",
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
      "name": "Selected Work",
      "item": "https://www.creatiancy.com/work"
    }
  ]
};

const caseStudiesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Selected Case Studies | Creatiancy",
  "description": "Selected digital experiences, brand identities, and campaigns engineered by Creatiancy.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "ODL Ads Creative",
      "description": "Social media creative advertising and digital design.",
      "url": "https://www.creatiancy.com/work/odl-ads"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "OMNI CONNECTS Branding",
      "description": "Complete visual identity and system overhaul.",
      "url": "https://www.creatiancy.com/work/omni-connects"
    }
  ]
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workBreadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }} />
      {children}
    </>
  );
}
