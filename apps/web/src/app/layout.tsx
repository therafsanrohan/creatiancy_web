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
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased overscroll-none bg-[#FBFDF9]">
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
