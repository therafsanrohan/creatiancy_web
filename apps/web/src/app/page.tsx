

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creatiancy | We Build Legacies",
  description: "A world-class creative agency building brands, experiences, and digital products that perform flawlessly and look exceptional.",
  openGraph: {
    title: "Creatiancy | Creative & Digital Agency",
    description: "We don't design for decoration. We design to make things clearer, stronger, and more memorable.",
    url: "https://creatiancy.com",
    siteName: "Creatiancy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatiancy | We Build Legacies",
    description: "Building brands, experiences, and digital products.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Creatiancy",
  "url": "https://creatiancy.com",
  "logo": "https://creatiancy.com/logos/Creatiancy%20logo.svg",
  "description": "A creative engineering studio building brands and digital products.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dhaka",
    "addressCountry": "Bangladesh"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@creatiancy.com",
    "contactType": "customer service"
  }
};
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";

import { Hero } from "@/components/home/hero/Hero";
import { Services } from "@/components/home/services/Services";
import { Projects } from "@/components/home/projects/Projects";
import { FeaturedProject } from "@/components/home/featured-project/FeaturedProject";
import { Clients } from "@/components/home/clients/Clients";
import { Process } from "@/components/home/process/Process";
import { AboutPreview } from "@/components/home/about-preview/AboutPreview";
import { Testimonials } from "@/components/home/testimonials/Testimonials";
import { GlobalPresence } from "@/components/home/global-presence/GlobalPresence";
import { FinalCTA } from "@/components/home/final-cta/FinalCTA";

export default function HomePage() {
  return (
    <div className="creatiancy-scope bg-[#FBFDF9] text-[#1E1E1E] font-sans selection:bg-[#9B1C22] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebsiteHeader />
      
      <main className="w-full relative">
        <Hero />
        <Services />
        <Projects />
        <FeaturedProject />
        <Process />
        <AboutPreview />
        <Testimonials />
        <GlobalPresence />
        <FinalCTA />
      </main>

      <WebsiteFooter />
    </div>
  );
}
