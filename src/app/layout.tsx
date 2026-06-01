import "./globals.css";
import { defaultSEO } from "@/lib/seo";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SecurityProvider } from "@/components/SecurityProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = defaultSEO;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark light",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <script
            id="organization-json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://www.creatiancy.com/#organization",
                "name": "Creatiancy",
                "legalName": "Creatiancy Digital Studio",
                "url": "https://www.creatiancy.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.creatiancy.com/og-image.jpg",
                  "width": 1200,
                  "height": 630
                },
                "image": "https://www.creatiancy.com/og-image.jpg",
                "description": "Creatiancy is a boutique digital design and development studio specializing in precision brand identity systems, high-performance web applications, and creative strategy.",
                "foundingLocation": {
                  "@type": "Place",
                  "name": "Dhaka, Bangladesh"
                },
                "numberOfEmployees": {
                  "@type": "QuantitativeValue",
                  "minValue": 5,
                  "maxValue": 20
                },
                "areaServed": [
                  { "@type": "Country", "name": "Bangladesh" },
                  { "@type": "Country", "name": "United States" },
                  { "@type": "Country", "name": "South Africa" },
                  { "@type": "Country", "name": "Kenya" },
                  { "@type": "Country", "name": "Cyprus" },
                  { "@type": "AdministrativeArea", "name": "Global" }
                ],
                "sameAs": [
                  "https://twitter.com/creatiancy",
                  "https://x.com/creatiancy",
                  "https://www.linkedin.com/company/creatiancy"
                ],
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "email": "contact@creatiancy.com",
                    "contactType": "customer service",
                    "availableLanguage": ["English"],
                    "contactOption": "TollFree"
                  },
                  {
                    "@type": "ContactPoint",
                    "email": "business@creatiancy.com",
                    "contactType": "sales",
                    "availableLanguage": ["English"]
                  }
                ],
                "knowsAbout": [
                  "Brand Identity Design",
                  "Visual Identity Systems",
                  "Web Application Development",
                  "Next.js Development",
                  "Digital Experience Design",
                  "Creative Strategy",
                  "Technical SEO",
                  "Headless CMS",
                  "Creative Campaigns",
                  "Conversion Optimization"
                ],
                "review": [
                  {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "Hector Oviedo",
                      "jobTitle": "Founder",
                      "worksFor": { "@type": "Organization", "name": "OMNI CONNECTS" }
                    },
                    "reviewBody": "Amazing company to work with. They treat you like family with respect and kindness and customer service is A+. A company driven to meet your standards.",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    }
                  },
                  {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "Awais Sadiq",
                      "jobTitle": "Founder",
                      "worksFor": { "@type": "Organization", "name": "Sadiq Digital" }
                    },
                    "reviewBody": "The communication was awesome, and they are really good at what they do. They made sure to deliver the best and worked really hard with me to achieve the desired results. I totally recommend them to others.",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    }
                  }
                ]
              })
            }}
          />
          <script dangerouslySetInnerHTML={{ __html: "document.addEventListener('touchstart', function() {}, {passive: true});" }} />
        </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <GoogleAnalytics gaId="G-1JLHT26WTS" />
        <SecurityProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </SecurityProvider>
      </body>
    </html>
  );
}
