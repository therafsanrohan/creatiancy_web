import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Explore Creatiancy's selected work — a curated portfolio of brand identity systems, digital experiences, and creative campaigns built for high-growth clients.",
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    url: '/work',
    title: "Selected Work | Creatiancy",
    description: "Explore Creatiancy's selected work — a curated portfolio of brand identity systems, digital experiences, and creative campaigns built for high-growth clients.",
  }
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  const schema = {
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Vespera AI Platform",
        "description": "Intelligent brand identity and futuristic interface engineering.",
        "url": "https://www.creatiancy.com/work/vespera-ai"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
