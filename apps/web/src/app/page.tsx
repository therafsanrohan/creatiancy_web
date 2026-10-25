

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creatiancy — Strategy-Led Creative Agency",
  description: "Creatiancy connects brand strategy, creative direction, and digital experiences to help ambitious businesses build clearer, more coherent, and more distinctive brands.",
  openGraph: {
    title: "Creatiancy — Strategy-Led Creative Agency",
    description: "We connect strategy, creative direction, and digital experiences to help ambitious businesses communicate with clarity and build brands with purpose.",
    url: "https://creatiancy.com",
    siteName: "Creatiancy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatiancy — Strategy-Led Creative Agency",
    description: "Brand strategy, creative direction, and digital experiences for ambitious businesses.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Creatiancy",
  "url": "https://creatiancy.com",
  "logo": "https://creatiancy.com/logos/Creatiancy%20logo.svg",
  "description": "Creatiancy connects brand strategy, creative direction, and digital experiences to help ambitious businesses build clearer, more coherent, and more distinctive brands.",
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
import { Services } from "@/components/home/services/Services";
import { Projects } from "@/components/home/projects/Projects";
import { FeaturedProject } from "@/components/home/featured-project/FeaturedProject";

import { Process } from "@/components/home/process/Process";
import { AboutPreview } from "@/components/home/about-preview/AboutPreview";
import { Testimonials } from "@/components/home/testimonials/Testimonials";

import { FinalCTA } from "@/components/home/final-cta/FinalCTA";

export default function HomePage() {
  return (
    <div className="creatiancy-scope bg-[#FBFDF9] text-[#1E1E1E] font-sans selection:bg-[#9B1C22] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="w-full relative">
        <Hero />
        <Projects />
        <Services />
        <FeaturedProject />
        <Process />
        <AboutPreview />
        <Testimonials />
        <FinalCTA />
      </main>

    </div>
  );
}
