import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | Radical Philosophy",
  description: "Creatiancy isn't just another flashy agency. We are a precise, confident, high-end digital studio building bold strategies and immersive platforms.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
