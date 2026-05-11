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
  description: 'We are a boutique digital studio crafted for brands that refuse to be ignored. From bespoke design to high-performance development, we build digital experiences that move people.',
  keywords: ['Digital Studio', 'Creative Design', 'Web Development', 'Brand Identity', 'Custom Software'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Creatiancy',
    title: 'Creatiancy | Digital Design & Development Studio',
    description: 'Boutique digital studio crafting high-performance experiences for ambitious brands.',
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
    description: 'Boutique digital studio crafting high-performance experiences for ambitious brands.',
    creator: '@creatiancy',
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

