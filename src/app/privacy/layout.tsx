import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy of Creatiancy — understand how we securely collect, use, and protect your personal information.",
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    url: '/privacy',
    title: "Privacy Policy | Creatiancy",
    description: "Read the Privacy Policy of Creatiancy — understand how we securely collect, use, and protect your personal information.",
  }
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
