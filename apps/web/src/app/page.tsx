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
import { Services } from "@/components/home/services/Services";
import { MethodologyAndTrust } from "@/components/home/process/MethodologyAndTrust";

export default function HomePage() {
  return (
    <div className="creatiancy-scope bg-[#070809] text-[#F4F5F7] font-sans selection:bg-[#FF2B43] selection:text-[#070809]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="w-full relative">
        <Hero />
        <TrustMarquee />
        <Projects />
        <Services />
        <MethodologyAndTrust />
      </main>
    </div>
  );
}
