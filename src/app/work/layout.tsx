import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Selected Work | Creatiancy",
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
  return children;
}
