import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Capabilities',
  description: 'Need a digital studio that goes beyond generic templates? Creatiancy solves fundamental business problems through precision-engineered brand, web, and strategy services — built for ambitious companies worldwide.',
  alternates: {
    canonical: 'https://www.creatiancy.com/services',
  },
  keywords: ['brand identity services', 'web development services', 'creative strategy agency', 'technical SEO', 'headless CMS', 'creative campaigns', 'digital marketing'],
  openGraph: {
    url: 'https://www.creatiancy.com/services',
    title: 'Services & Capabilities | Creatiancy',
    description: 'Precision-engineered brand, web, strategy, and campaign services for ambitious companies worldwide.',
  },
  twitter: {
    description: 'Five precision-engineered service pillars: brand identity, digital experience, creative strategy, technical excellence, creative campaigns.',
  },
};

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.creatiancy.com/services#webpage",
  "url": "https://www.creatiancy.com/services",
  "name": "Services & Capabilities | Creatiancy",
  "description": "We solve fundamental business problems through precision-engineered digital services — brand identity, digital experience, creative strategy, technical excellence, and creative campaigns.",
  "isPartOf": { "@id": "https://www.creatiancy.com/#website" },
  "breadcrumb": { "@id": "https://www.creatiancy.com/services#breadcrumb" },
  "inLanguage": "en-US"
};

const servicesBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.creatiancy.com/services#breadcrumb",
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
      "name": "Services & Capabilities",
      "item": "https://www.creatiancy.com/services"
    }
  ]
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.creatiancy.com/services#service",
  "name": "Creatiancy Digital Studio Services",
  "provider": { "@id": "https://www.creatiancy.com/#organization" },
  "areaServed": "Global",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Creatiancy Service Catalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://www.creatiancy.com/services#brand-identity",
          "name": "Brand Identity",
          "description": "Comprehensive visual identity systems including logos, brand guidelines, visual language, tone of voice, and market positioning for ambitious companies.",
          "provider": { "@id": "https://www.creatiancy.com/#organization" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://www.creatiancy.com/services#digital-experience",
          "name": "Digital Experience",
          "description": "Bespoke website design and development, custom web applications, UI/UX design, headless CMS implementation, and high-fidelity design systems.",
          "provider": { "@id": "https://www.creatiancy.com/#organization" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://www.creatiancy.com/services#creative-strategy",
          "name": "Creative Strategy",
          "description": "Market positioning, audience intelligence, digital workshops, growth mapping, and KPI definition for digital-first companies.",
          "provider": { "@id": "https://www.creatiancy.com/#organization" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://www.creatiancy.com/services#technical-excellence",
          "name": "Technical Excellence",
          "description": "Next.js and React development, performance optimization, Core Web Vitals, technical SEO architecture, and custom e-commerce solutions.",
          "provider": { "@id": "https://www.creatiancy.com/#organization" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://www.creatiancy.com/services#creative-campaigns",
          "name": "Creative Campaigns",
          "description": "Creative direction, paid ad management, conversion rate optimization, VFX, motion graphics, and integrated content marketing.",
          "provider": { "@id": "https://www.creatiancy.com/#organization" }
        }
      }
    ]
  }
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesBreadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      {children}
    </>
  );
}
