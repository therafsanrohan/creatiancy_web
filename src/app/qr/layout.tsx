import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physical to Digital | Creatiancy",
  description:
    "Bridging the physical and digital worlds. A campaign by Creatiancy demonstrating signature QR-integrated digital experiences built for premium brands.",
  keywords: [
    "QR campaign",
    "Creatiancy QR",
    "physical to digital",
    "brand experience",
    "boutique studio",
    "digital design",
    "creative engineering",
  ],
  alternates: {
    canonical: "https://www.creatiancy.com/qr",
  },
  openGraph: {
    type: "website",
    url: "https://www.creatiancy.com/qr",
    title: "Physical to Digital | Creatiancy",
    description:
      "Bridging the physical and digital worlds. Premium design-driven QR portals for signature brand experiences.",
    siteName: "Creatiancy Physical to Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Physical to Digital | Creatiancy",
    description:
      "Bridging the physical and digital worlds. Premium design-driven QR portals.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Campaign Layout — QR Landing Page
 * ---------------------------------
 * This is a NESTED layout under the root app/layout.tsx.
 * It MUST NOT include <html>, <head>, or <body> tags — those belong to the root.
 *
 * The .campaign-page wrapper div triggers the CSS in globals.css to
 * hide the main site's Navbar and Footer on this route.
 * Also forces dark mode theme explicitly for this route.
 */
export default function QRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="campaign-page min-h-screen bg-[#1E1E1E] text-white antialiased selection:bg-[#9B1C22]/30 selection:text-white">
      {children}
    </div>
  );
}
