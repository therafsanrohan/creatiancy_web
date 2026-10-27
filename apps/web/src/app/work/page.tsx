"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import "@/app/website.css";

const featuredCaseStudies = [
  { 
    client: "ODL Developers Ltd.", 
    title: "Real Estate OOH & Billboard Architecture",
    discipline: "OOH Visual Strategy & Billboards", 
    year: "2025", 
    slug: "odl-ads",
    image: "/images/project real.png",
    tags: ["OOH Strategy", "Billboards", "Spatial Graphics", "Typography"],
    externalLink: "https://www.behance.net/gallery/234613189/Real-Estate-Promotional-Poster-Design?platform=direct"
  },
  { 
    client: "OMNI CONNECTS", 
    title: "Enterprise Brand Architecture & Design System",
    discipline: "Complete Corporate Identity & SaaS Interface", 
    year: "2025", 
    slug: "omni-connects",
    image: "/images/omni_branding.png",
    tags: ["Brand Architecture", "Corporate Marks", "Design Tokens", "SaaS UX"],
    externalLink: "https://www.omniconnects.com"
  },
];

const clientRoster = [
  { name: "Elcardo Industrial", scope: "Corporate Platform & Brand Architecture", year: "2026" },
  { name: "AtoBD Logistics", scope: "Logistics Product Interface & Digital Architecture", year: "2025" },
  { name: "ODL Developers Ltd.", scope: "Real Estate Billboard Systems & Creative Direction", year: "2025" },
  { name: "Oven Culinary", scope: "Visual Identity & Packaging Direction", year: "2024" },
  { name: "OMNI CONNECTS", scope: "Brand Architecture & Platform Overhaul", year: "2025" },
  { name: "Sadiq Digital", scope: "Strategic Creative & Campaign Systems", year: "2025" },
];

export default function WorkPage() {
  return (
    <div className="creatiancy-scope bg-[#070809]">
      <main className="w-full relative">

        {/* Work Hero */}
        <section className="pt-40 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-white/[0.08] text-[11px] font-mono tracking-[0.16em] uppercase text-neutral-400 mb-16">
            <div>
              <span className="text-[#FF2B43] mr-2">01</span>
              <span>INDEX &bull; ARCHIVE</span>
            </div>
            <div>
              <span className="text-[#FF2B43] mr-2">02</span>
              <span>CASE STUDIES</span>
            </div>
            <div className="hidden md:block">
              <span className="text-[#FF2B43] mr-2">03</span>
              <span>PRODUCTION SYSTEMS</span>
            </div>
            <div className="text-right">
              <span className="text-[#FF2B43] mr-2">04</span>
              <span>2024 &ndash; 2026</span>
            </div>
          </div>

          <div className="max-w-4xl">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-4">
              PORTFOLIO ARCHIVE
            </span>
            <h1 className="text-[40px] sm:text-[56px] md:text-[76px] font-bold tracking-[-0.035em] text-[#F4F5F7] leading-[1.0] mb-8 uppercase">
              Work built to endure.
            </h1>
            <p className="text-[17px] md:text-[20px] text-neutral-400 font-light leading-relaxed max-w-2xl">
              Curated verified case studies, identity systems, and production platforms.
            </p>
          </div>
        </section>

        {/* Image-Led Case Study Rows */}
        <section className="pb-28 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col divide-y divide-white/[0.08]">
            {featuredCaseStudies.map((study, idx) => (
              <article 
                key={study.slug} 
                className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Large Image Section with Glass Year Badge */}
                <div className={`lg:col-span-8 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Link 
                    href={`/work/${study.slug}`} 
                    className="group relative block overflow-hidden rounded-[20px] bg-[#0E1114] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image 
                        src={study.image} 
                        alt={study.title} 
                        fill 
                        className="object-cover group-hover:scale-103 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500" />
                      
                      {/* Glass Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-[16px] saturate-[140%] border border-white/20 text-white text-[11px] font-mono tracking-widest uppercase flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B43]" />
                          <span>{study.year}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Minimal Meta & Tag Chips Column */}
                <div className={`lg:col-span-4 flex flex-col justify-between ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF2B43] block mb-2">
                      VERIFIED ENGAGEMENT
                    </span>

                    <h2 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.025em] text-[#F4F5F7] leading-tight mb-2">
                      {study.client}
                    </h2>

                    <p className="text-[14px] font-mono text-neutral-400 mb-6">
                      {study.discipline}
                    </p>

                    {/* Tag Chips Row */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {study.tags.map((t) => (
                        <span key={t} className="px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full text-[11px] font-mono text-neutral-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/[0.08]">
                    <ButtonLink 
                      href={`/work/${study.slug}`}
                      variant="primary"
                      size="sm"
                      arrow
                    >
                      Case Study
                    </ButtonLink>
                    {study.externalLink && (
                      <a 
                        href={study.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono tracking-wider uppercase text-neutral-400 hover:text-[#FF2B43] transition-colors"
                      >
                        External ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Client Roster */}
        <section className="py-24 bg-[#0E1114] text-[#F4F5F7] px-6 md:px-12 border-t border-white/[0.08]">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-3">
                CLIENT INDEX &bull; VERIFIED ROSTER
              </span>
              <h2 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] uppercase">Verified Partnerships</h2>
              <p className="text-[15px] text-neutral-400 font-light mt-2">
                Commercial partners across strategic direction, visual identity, and web engineering.
              </p>
            </div>

            <div className="border-t border-white/[0.08] divide-y divide-white/[0.08]">
              {clientRoster.map((client) => (
                <div key={client.name} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-white/[0.02] transition-colors">
                  <div className="md:col-span-5 text-[17px] font-medium text-[#F4F5F7]">
                    {client.name}
                  </div>
                  <div className="md:col-span-5 text-[13px] text-neutral-400 font-light">
                    {client.scope}
                  </div>
                  <div className="md:col-span-2 text-left md:text-right text-[11px] font-mono text-[#FF2B43]">
                    {client.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
