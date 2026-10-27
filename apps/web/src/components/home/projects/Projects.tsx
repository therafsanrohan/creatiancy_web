"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

const SELECTED_WORKS = [
  {
    id: "atobd",
    client: "AtoBD Logistics",
    title: "Enterprise Logistics Product System",
    metric: "99.8% UPTIME ARCHITECTURE",
    category: "Product Interface & Systems",
    tags: ["React Architecture", "Fleet Telematics", "Design System"],
    image: "/images/omni_branding.png",
    slug: "atobd-logistics",
    gridSpan: "col-span-12 lg:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
  {
    id: "elcardo",
    client: "Elcardo Industrial",
    title: "Global Industrial Commerce Platform",
    metric: "+140% CONVERSION EFFICIENCY",
    category: "Digital Platform & Architecture",
    tags: ["Industrial UI/UX", "Next.js 16", "Global Catalog"],
    image: "/images/project real.png",
    slug: "elcardo-industrial",
    gridSpan: "col-span-12 lg:col-span-5",
    aspectRatio: "aspect-[16/11]",
  },
  {
    id: "omni",
    client: "OMNI CONNECTS",
    title: "SaaS Identity & Interface Overhaul",
    metric: "COMPLETE BRAND ARCHITECTURE",
    category: "Brand Strategy & System",
    tags: ["Geometric Mark", "Design Tokens", "SaaS Dashboard"],
    image: "/images/omni_branding.png",
    slug: "omni-connects",
    gridSpan: "col-span-12 lg:col-span-5",
    aspectRatio: "aspect-[16/11]",
  },
  {
    id: "odl",
    client: "ODL Global",
    title: "Real Estate OOH & Spatial Campaign",
    metric: "NATIONWIDE CAMPAIGN REACH",
    category: "Creative Production & OOH",
    tags: ["Billboard Systems", "Architectural Fencing", "Campaign Art"],
    image: "/images/project real.png",
    slug: "odl-ads",
    gridSpan: "col-span-12 lg:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
];

export const Projects = () => {
  return (
    <section id="selected-work" className="py-24 sm:py-32 px-6 md:px-12 bg-[#070809] border-b border-white/[0.08]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 sm:pb-16 border-b border-white/[0.08] gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-3">
              SELECTED ENGAGEMENTS &bull; 2024 &ndash; 2026
            </span>
            <h2 className="text-[34px] sm:text-[48px] md:text-[60px] font-bold tracking-tight text-[#F4F5F7] leading-none uppercase">
              Selected Works
            </h2>
          </div>
          <p className="text-[15px] sm:text-[17px] text-neutral-400 font-light max-w-md">
            Asymmetrical cinematic case studies built for maximum brand equity and conversion impact.
          </p>
        </div>

        {/* Asymmetrical Cinematic Grid (7-col & 5-col blocks) */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8 pt-12 sm:pt-16">
          {SELECTED_WORKS.map((work, idx) => (
            <div 
              key={work.id} 
              className={`${work.gridSpan} group flex flex-col justify-between p-6 sm:p-8 rounded-[24px] bg-[#0E1114] border border-white/[0.08] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#FF2B43]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]`}
            >
              <div>
                {/* Image Container */}
                <Link 
                  href={work.slug === "odl-ads" || work.slug === "omni-connects" ? `/work/${work.slug}` : "/work"}
                  className="relative block overflow-hidden rounded-[16px] bg-neutral-900 border border-white/[0.06] mb-6 cursor-pointer"
                  aria-label={`View ${work.client} case study`}
                >
                  <div className={`w-full ${work.aspectRatio} relative overflow-hidden`}>
                    <Image
                      src={work.image}
                      alt={`${work.client} — ${work.title}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Performance Metric Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-[#FF2B43] uppercase">
                        {work.metric}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Meta details */}
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#FF2B43] block mb-2">
                  {work.category}
                </span>
                
                <h3 className="text-[24px] sm:text-[30px] font-bold text-[#F4F5F7] tracking-tight leading-snug mb-3 group-hover:text-[#FF2B43] transition-colors">
                  {work.client}
                </h3>
                
                <p className="text-[14px] sm:text-[15px] text-neutral-400 font-light mb-6 leading-relaxed">
                  {work.title}
                </p>
              </div>

              {/* Tag Chips Row & Action Link */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {work.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.03] text-neutral-400 border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={work.slug === "odl-ads" || work.slug === "omni-connects" ? `/work/${work.slug}` : "/work"}
                  className="text-[12px] font-mono tracking-wider uppercase text-neutral-300 group-hover:text-[#FF2B43] transition-colors flex items-center gap-1.5 min-h-[48px]"
                >
                  <span>Explore</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Work CTA */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <span className="text-[13px] font-mono text-neutral-400">
            Over 20+ verified client systems deployed globally.
          </span>
          <ButtonLink href="/work" variant="primary" size="md" arrow>
            View Complete Archive
          </ButtonLink>
        </div>

      </div>
    </section>
  );
};
