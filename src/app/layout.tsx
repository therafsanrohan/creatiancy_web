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
                "@type": "ProfessionalService",
                "@id": "https://www.creatiancy.com/#organization",
                "name": "Creatiancy",
                "url": "https://www.creatiancy.com",
                "logo": "https://www.creatiancy.com/og-image.jpg",
                "description": "Creatiancy is an elite digital studio engineering bespoke brand experiences. We are your technical powerhouse.",
                "sameAs": [
                  "https://x.com/creatiancy",
                  "https://www.linkedin.com/company/creatiancy"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Dhaka",
                  "addressCountry": "BD"
                }
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
