import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Gratitude Project | By Creatiancy",
  description:
    "Celebrating the people behind memorable experiences. A campaign by Creatiancy honoring businesses that go beyond service to create moments worth remembering.",
  keywords: [
    "gratitude project",
    "Creatiancy campaign",
    "celebrating businesses",
    "appreciation campaign",
    "memorable experiences",
    "community nominations",
    "storytelling campaign",
  ],
  alternates: {
    canonical: "https://www.creatiancy.com/gratitude",
  },
  openGraph: {
    type: "website",
    url: "https://www.creatiancy.com/gratitude",
    title: "The Gratitude Project | By Creatiancy",
    description:
      "Celebrating the people behind memorable experiences. Nominate a business that made a difference.",
    siteName: "The Gratitude Project by Creatiancy",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gratitude Project | By Creatiancy",
    description:
      "Celebrating the people behind memorable experiences. A storytelling campaign by Creatiancy.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Campaign Layout — The Gratitude Project
 * ----------------------------------------
 * This is a NESTED layout under the root app/layout.tsx.
 * It MUST NOT include <html>, <head>, or <body> tags — those belong to the root.
 *
 * The .campaign-page wrapper div triggers the CSS in globals.css to
 * hide the main site's Navbar and Footer on this route.
 */
export default function GratitudeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="campaign-page">{children}</div>;
}
