import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the Terms of Service governing the use of Creatiancy's digital studio services, website, and deliverables.",
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    url: '/terms',
    title: "Terms of Service | Creatiancy",
    description: "Review the Terms of Service governing the use of Creatiancy's digital studio services, website, and deliverables.",
  }
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
