import type { Metadata, Viewport } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import "@/app/globals.css";
import "@/app/website.css";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
import { LenisProvider } from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  title: "Creatiancy | We Build Legacies",
  description: "Performance over decoration. Authoritative creative technology and brand architecture agency.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark bg-[#070809] text-[#F4F5F7]">
      <body className="antialiased overscroll-none bg-[#070809] text-[#F4F5F7] selection:bg-[#FF2B43] selection:text-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQCNVD6Q"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <MetaPixel />
        <LenisProvider>
          <WebsiteHeader />
          <main className="min-h-[100svh]">
            {children}
          </main>
          <WebsiteFooter />
        </LenisProvider>
        <GoogleTagManager gtmId="GTM-NQCNVD6Q" />
        <GoogleAnalytics gaId="G-1JLHT26WTS" />
      </body>
    </html>
  );
}
