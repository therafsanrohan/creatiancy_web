import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creatiancy — Strategic Creative & Production Studio",
  description: "Engineering brands that refuse to be ignored. Brand strategy, cinematic content, high-conversion UI/UX, and creative technology.",
  openGraph: {
    title: "Creatiancy — Strategic Creative & Production Studio",
    description: "Engineering brands that refuse to be ignored. Brand strategy, cinematic content, high-conversion UI/UX, and creative technology.",
    url: "https://creatiancy.com",
    siteName: "Creatiancy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatiancy — Strategic Creative & Production Studio",
    description: "Engineering brands that refuse to be ignored.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Creatiancy",
  "url": "https://creatiancy.com",
  "logo": "https://creatiancy.com/logos/Creatiancy%20logo.svg",
  "description": "Creatiancy is a strategic creative & production studio engineering brands that refuse to be ignored.",
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

import { Hero } from "@/components/home/hero/Hero";
import { TrustMarquee } from "@/components/home/marquee/TrustMarquee";
import { Projects } from "@/components/home/projects/Projects";
import { LegacyMetrics } from "@/components/home/metrics/LegacyMetrics";
import { Services } from "@/components/home/services/Services";
import { MethodologyAndTrust } from "@/components/home/process/MethodologyAndTrust";
import { Testimonials } from "@/components/home/testimonials/Testimonials";
import { ContactSection } from "@/components/home/contact/ContactSection";

export default function HomePage() {
  return (
    <div className="creatiancy-scope bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-[#9B1C22] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="w-full relative">
        <Hero />
        <TrustMarquee />
        <Projects />
        <LegacyMetrics />
        <Services />
        <MethodologyAndTrust />
        <Testimonials />
        <ContactSection />
      </main>
    </div>
  );
}
