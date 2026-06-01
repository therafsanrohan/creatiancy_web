import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "Creatiancy's privacy policy — how we collect, use, store, and protect your personal data when you interact with our digital studio.",
  alternates: {
    canonical: 'https://www.creatiancy.com/privacy',
  },
  openGraph: {
    url: 'https://www.creatiancy.com/privacy',
    title: 'Privacy Policy | Creatiancy',
    description: "Creatiancy's privacy policy — how we collect, use, store, and protect your personal data when you interact with our digital studio.",
  },
};

const privacyPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.creatiancy.com/privacy#webpage",
  "url": "https://www.creatiancy.com/privacy",
  "name": "Privacy Policy | Creatiancy",
  "description": "Creatiancy's privacy policy — how we collect, use, store, and protect your personal data when you interact with our digital studio.",
  "isPartOf": { "@id": "https://www.creatiancy.com/#website" },
  "breadcrumb": { "@id": "https://www.creatiancy.com/privacy#breadcrumb" },
  "inLanguage": "en-US"
};

const privacyBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.creatiancy.com/privacy#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.creatiancy.com" },
    { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://www.creatiancy.com/privacy" }
  ]
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyBreadcrumbSchema) }} />
      {children}
    </>
  );
}
