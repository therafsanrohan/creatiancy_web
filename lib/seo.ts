import type { Metadata } from 'next';

export const defaultSEO: Metadata = {
  metadataBase: new URL('https://creatiancy.com'),
  title: {
    default: 'Creatiancy | Premier Creative Digital Studio & Tech Powerhouse',
    template: '%s | Creatiancy',
  },
  description: 'Creatiancy is an elite digital studio engineering bespoke brand experiences, online-first strategies, and high-ROI technical marketing campaigns. We build scale.',
  keywords: ['Digital Studio', 'Creative Agency', 'Web Development', 'Content Marketing', 'Brand Identity', 'Tailor-made Campaigns'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Creatiancy',
    title: 'Creatiancy | Premier Creative Digital Studio',
    description: 'Transform your brand through precision design, immersive digital platforms, and tailor-made ROI strategies. We are your technical powerhouse.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Creatiancy Digital Studio Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creatiancy | Premier Creative Digital Studio',
    description: 'Transform your brand through precision design, immersive digital platforms, and tailor-made ROI strategies.',
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
