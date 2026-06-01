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
  description: 'Creatiancy is an elite boutique digital studio crafting precision brand experiences. We engineer bespoke identity systems and high-performance web applications for ambitious brands worldwide.',
  keywords: [
    'brand identity design',
    'digital experience studio',
    'web development agency',
    'boutique digital studio',
    'creative strategy',
    'Dhaka Bangladesh',
    'South Africa',
    'Kenya',
    'Cyprus',
    'Digital Studio',
    'Creative Design',
    'Brand Identity',
    'Custom Software',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Creatiancy',
    title: 'Creatiancy | Digital Design & Development Studio',
    description: 'Elite boutique digital studio crafting precision brand experiences — identity systems and high-performance web applications.',
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
    description: 'Elite boutique digital studio. Precision brand experiences, identity systems, high-performance web.',
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
