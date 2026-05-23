import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Services",
  description: "We are a boutique digital studio crafted for brands that refuse to be ignored. From bespoke design to high-performance development, we build digital experiences that move people.",
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    url: '/services',
    title: "Services | Creatiancy",
    description: "We are a boutique digital studio crafted for brands that refuse to be ignored. From bespoke design to high-performance development, we build digital experiences that move people.",
  }
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Design & Development Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Creatiancy",
      "url": "https://www.creatiancy.com",
      "logo": "https://www.creatiancy.com/og-image.jpg"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Creatiancy Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brand Identity Systems",
            "description": "Bespoke logos, visual guidelines, positioning systems, and full brand books."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Performance Web Development",
            "description": "Modular Next.js development, responsive frontends, and headless CMS integrations."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing Campaigns",
            "description": "High-impact conversion creative, visual ads, and targeted campaign strategies."
          }
        }
      ]
    }
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
