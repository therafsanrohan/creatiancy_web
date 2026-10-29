"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

interface ProjectItem {
  id: string;
  client: string;
  title: string;
  metric: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
  gridSpan: string;
  aspectRatio: string;
  externalLink?: string;
}

const SELECTED_WORKS: ProjectItem[] = [
  {
    id: "rafsan-rohan",
    client: "Rafsan Rohan",
    title: "Visual Strategist & Creative Direction Platform",
    metric: "PERSONAL DIGITAL SHOWCASE",
    category: "Digital & Web Experience",
    tags: ["Creative Portfolio", "Next.js", "Visual Identity"],
    image: "/images/rafsan_rohan_showcase.png",
    slug: "rafsan-rohan",
    externalLink: "https://www.rafsanrohan.com",
    gridSpan: "col-span-12 lg:col-span-7",
    aspectRatio: "aspect-[16/10]",
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
    gridSpan: "col-span-12",
    aspectRatio: "aspect-[21/9]",
  },
];

export const Projects = () => {
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const target = sessionStorage.getItem("scroll_to_section");
      if (target === "selected-work") {
        sessionStorage.removeItem("scroll_to_section");
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    }
  }, []);

  return (
    <section ref={sectionRef} id="selected-work" className="py-24 sm:py-32 px-6 md:px-12 bg-[#F5F5F7] border-b border-black/[0.06]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 sm:pb-16 border-b border-black/[0.08] gap-6">
          <div>
            <h2 className="text-[34px] sm:text-[48px] md:text-[60px] font-bold tracking-tight text-[#1D1D1F] leading-none uppercase">
              Selected Works
            </h2>
          </div>
          <p className="text-[15px] sm:text-[17px] text-[#6E6E73] font-normal max-w-md">
            Asymmetrical cinematic case studies built for maximum brand equity and conversion impact.
          </p>
        </div>

        {/* Asymmetrical Cinematic Grid (7-col & 5-col blocks) */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8 pt-12 sm:pt-16">
          {SELECTED_WORKS.map((work, idx) => {
            const isInternalCaseStudy = work.slug === "odl-ads" || work.slug === "omni-connects";
            const targetHref = work.externalLink ? work.externalLink : isInternalCaseStudy ? `/work/${work.slug}` : "/work";
            const isExternal = Boolean(work.externalLink);

            return (
              <div 
                key={work.id} 
                className={`${work.gridSpan} group flex flex-col justify-between p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#9B1C22]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]`}
              >
                <div>
                  {/* Image Container */}
                  <a 
                    href={targetHref}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="relative block overflow-hidden rounded-[16px] bg-neutral-100 border border-black/[0.04] mb-6 cursor-pointer"
                    aria-label={`View ${work.client} project`}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      
                      {/* Performance Metric Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-medium tracking-wide text-white">
                          {work.metric}
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Meta details */}
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#9B1C22] block mb-2">
                    {work.category}
                  </span>
                  
                  <h3 className="text-[24px] sm:text-[30px] font-bold text-[#1D1D1F] tracking-tight leading-snug mb-3 group-hover:text-[#9B1C22] transition-colors">
                    <a
                      href={targetHref}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="hover:underline"
                    >
                      {work.client}
                    </a>
                  </h3>
                  
                  <p className="text-[14px] sm:text-[15px] text-[#6E6E73] font-normal mb-6 leading-relaxed">
                    {work.title}
                  </p>
                </div>

                {/* Tag Chips Row & Action Link */}
                <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {work.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-neutral-100 text-[#6E6E73] border border-black/[0.04]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={targetHref}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-[12px] font-medium tracking-wide uppercase text-[#1D1D1F] group-hover:text-[#9B1C22] transition-colors flex items-center min-h-[48px]"
                  >
                    <span>{work.externalLink ? "Live Site ↗" : "Explore"}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
