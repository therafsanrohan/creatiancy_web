import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The operational framework, agreements, and legal guidelines governing your interaction with the Creatiancy digital studio and its services.',
  alternates: {
    canonical: 'https://www.creatiancy.com/terms',
  },
  openGraph: {
    url: 'https://www.creatiancy.com/terms',
    title: 'Terms of Service | Creatiancy',
    description: 'The operational framework, agreements, and legal guidelines governing your interaction with the Creatiancy digital studio and its services.',
  },
};

const termsPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.creatiancy.com/terms#webpage",
  "url": "https://www.creatiancy.com/terms",
  "name": "Terms of Service | Creatiancy",
  "description": "The operational framework, agreements, and legal guidelines governing your interaction with the Creatiancy digital studio and its services.",
  "isPartOf": { "@id": "https://www.creatiancy.com/#website" },
  "breadcrumb": { "@id": "https://www.creatiancy.com/terms#breadcrumb" },
  "inLanguage": "en-US"
};

const termsBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.creatiancy.com/terms#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.creatiancy.com" },
    { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://www.creatiancy.com/terms" }
  ]
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termsPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termsBreadcrumbSchema) }} />
      {children}
    </>
  );
}
