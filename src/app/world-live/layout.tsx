import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "World Live Clock Matrix",
  description: "Monitor real-time timezones and synchronized clocks across 193 sovereign states where Creatiancy operates and connects.",
  alternates: {
    canonical: '/world-live',
  },
  openGraph: {
    url: '/world-live',
    title: "World Live Clock Matrix | Creatiancy",
    description: "Monitor real-time timezones and synchronized clocks across 193 sovereign states where Creatiancy operates and connects.",
  }
};

export default function WorldLiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
