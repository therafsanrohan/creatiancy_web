import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN' // Prevents clickjacking attacks
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff' // Resolves MIME type sniffing
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];

const nextConfig: NextConfig = {
  /* Hide source code from browser to avoid reverse engineering */
  productionBrowserSourceMaps: false, 
  /* Removes explicit Next.js platform signature */
  poweredByHeader: false, 
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
