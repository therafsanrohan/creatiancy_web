import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Services | Creatiancy",
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
  return children;
}
