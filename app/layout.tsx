import "./globals.css";
import { defaultSEO } from "@/lib/seo";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = defaultSEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="organization-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Creatiancy",
              "url": "https://creatiancy.com",
              "logo": "https://creatiancy.com/og-image.jpg",
              "description": "Creatiancy is an elite digital studio engineering bespoke brand experiences. We are your technical powerhouse.",
              "sameAs": [
                "https://x.com/creatiancy",
                "https://linkedin.com/company/creatiancy"
              ]
            })
          }}
          strategy="worker"
        />
      </head>
      <body
        className="font-sans antialiased min-h-screen flex flex-col"
      >
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
      </body>
    </html>
  );
}
