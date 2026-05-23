import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Creatiancy | Digital Design & Development Studio",
  description: "Learn how Creatiancy was founded as a boutique digital design and development studio. Discover our story, team, core values, and multi-city presence.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
    title: "About Creatiancy | Digital Design & Development Studio",
    description: "Learn how Creatiancy was founded as a boutique digital design and development studio. Discover our story, team, core values, and multi-city presence.",
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
