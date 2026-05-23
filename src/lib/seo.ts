import type { Metadata } from 'next';

export const defaultSEO: Metadata = {
  metadataBase: new URL('https://www.creatiancy.com'),
  title: {
    default: 'Creatiancy | Digital Design & Development Studio',
    template: '%s | Creatiancy',
  },
  alternates: {
    canonical: '/',
  },
  description: "Creatiancy is an elite digital studio crafting precision brand experiences. We engineer bespoke identity systems and high-performance web applications.",
  keywords: ['Digital Studio', 'Creative Design', 'Web Development', 'Brand Identity', 'Custom Software'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Creatiancy',
    title: 'Creatiancy | Digital Design & Development Studio',
    description: 'Creatiancy is an elite digital studio crafting precision brand experiences. We engineer bespoke identity systems and high-performance web applications.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Creatiancy Digital Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creatiancy | Digital Design & Development Studio',
    description: 'Creatiancy is an elite digital studio crafting precision brand experiences. We engineer bespoke identity systems and high-performance web applications.',
    creator: '@creatiancy',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/icon.svg'],
    apple: [
      { url: '/icon.svg' }
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

