import type { Metadata, Viewport } from "next";
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
        <LenisProvider>
          <WebsiteHeader />
          <main className="min-h-[100svh]">
            {children}
          </main>
          <WebsiteFooter />
        </LenisProvider>
      </body>
    </html>
  );
}
