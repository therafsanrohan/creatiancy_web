import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us | Creatiancy",
  description: "Start a project with Creatiancy. Reach out to our team to discuss your brand, digital experience, or campaign needs.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    url: '/contact',
    title: "Contact Us | Creatiancy",
    description: "Start a project with Creatiancy. Reach out to our team to discuss your brand, digital experience, or campaign needs.",
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
