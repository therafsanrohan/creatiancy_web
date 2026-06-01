import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Start a project with Creatiancy. Reach out to our team to discuss your brand identity, digital experience, or campaign needs. Global studio, direct communication.',
  alternates: {
    canonical: 'https://www.creatiancy.com/contact',
  },
  keywords: ['contact Creatiancy', 'start a project', 'hire digital studio', 'brand identity quote', 'web development enquiry'],
  openGraph: {
    url: 'https://www.creatiancy.com/contact',
    title: 'Start a Project | Creatiancy',
    description: 'Ready to build something remarkable? Get in touch with the Creatiancy team today.',
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.creatiancy.com/contact#webpage",
  "url": "https://www.creatiancy.com/contact",
  "name": "Start a Project | Creatiancy",
  "description": "Start a project with Creatiancy. Reach out to our team to discuss your brand identity, digital experience, or campaign needs.",
  "isPartOf": { "@id": "https://www.creatiancy.com/#website" },
  "breadcrumb": { "@id": "https://www.creatiancy.com/contact#breadcrumb" },
  "inLanguage": "en-US"
};

const contactBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.creatiancy.com/contact#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.creatiancy.com" },
    { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://www.creatiancy.com/contact" }
  ]
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumbSchema) }} />
      {children}
    </>
  );
}
