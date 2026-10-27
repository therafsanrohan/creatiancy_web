"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  tags: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: "strategy",
    number: "01.",
    title: "Strategy Plan",
    summary:
      "We deconstruct ambiguous market landscapes to engineer distinct positioning frameworks, category definitions, and brand architectures that command pricing power.",
    tags: ["Digital Marketing", "Strategy Planner", "Content Planning", "Brand Architecture"],
  },
  {
    id: "seo",
    number: "02.",
    title: "Seo optimize",
    summary:
      "Algorithmic search architecture, technical performance engineering, and conversion telemetry designed to multiply organic inbound pipeline.",
    tags: ["Technical SEO", "Growth Optimization", "Content Architecture", "Funnel Telemetry"],
  },
  {
    id: "content",
    number: "03.",
    title: "Content Lab",
    summary:
      "Cinematic visual storytelling, commercial art direction, and 4K motion design engineered to hold viewer retention across international platforms.",
    tags: ["Commercial Film", "3D Motion Design", "Social Engines", "Visual Direction"],
  },
  {
    id: "branding",
    number: "04.",
    title: "Branding Systems",
    summary:
      "Complete design tokens, bespoke typographic systems, high-conversion UI/UX, and physical production collateral built for category leaders.",
    tags: ["Visual Identity", "Digital UI/UX", "Packaging Systems", "Design Tokens"],
  },
];

export function Services() {
  const [activeId, setActiveId] = useState<string>("strategy");

  const toggleService = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#F5F5F7] py-24 sm:py-32 md:py-40 px-6 md:px-12 text-[#1D1D1F] overflow-hidden border-t border-black/[0.08] select-none"
    >
      {/* Subtle Noise Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
        <svg className="w-full h-full">
          <filter id="services-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#services-noise)" />
        </svg>
      </div>

      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-[#9B1C22]/[0.035] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Label, Heading, and Rotating Award-Winning Studio Stamp */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
            <div>
              <p className="text-[13px] sm:text-[14px] font-mono tracking-[0.18em] uppercase text-[#6E6E73] leading-relaxed mb-4">
                services that <br />
                we provide
              </p>
            </div>

            {/* Circular Award Winning Agency Badge Stamp (Matching Reference Layout) */}
            <div className="pt-16 lg:pt-32 hidden sm:flex items-center">
              <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full border border-black/15 bg-white/70 backdrop-blur-md shadow-sm flex items-center justify-center p-3 group cursor-pointer hover:border-[#9B1C22]/40 transition-colors">
                
                {/* Circular Rotating Text SVG */}
                <div className="absolute inset-0 w-full h-full animate-spin-slow">
                  <svg viewBox="0 0 160 160" className="w-full h-full fill-current text-[#1D1D1F]">
                    <path
                      id="textRing"
                      d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                      fill="none"
                    />
                    <text className="text-[10.5px] font-mono uppercase tracking-[0.24em] font-medium opacity-80">
                      <textPath href="#textRing" startOffset="0%">
                        AWARD WINNING AGENCY &bull; SINCE 2022 &bull;
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Central Spiral / Interlocking Rings Emblem */}
                <div className="relative w-16 h-16 flex items-center justify-center text-[#1D1D1F] group-hover:text-[#9B1C22] transition-colors">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-14 h-14">
                    <ellipse cx="40" cy="50" rx="14" ry="26" className="transform -rotate-12 origin-center" />
                    <ellipse cx="50" cy="50" rx="14" ry="26" className="transform -rotate-6 origin-center" />
                    <ellipse cx="60" cy="50" rx="14" ry="26" className="transform rotate-6 origin-center" />
                    <ellipse cx="70" cy="50" rx="14" ry="26" className="transform rotate-12 origin-center" />
                  </svg>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Interactive Editorial Accordion List */}
          <div className="lg:col-span-8 flex flex-col border-t border-black/10">
            {servicesData.map((item) => {
              const isActive = activeId === item.id;

              return (
                <div
                  key={item.id}
                  className="border-b border-black/10 transition-colors py-8 sm:py-10 cursor-pointer group"
                  onClick={() => toggleService(item.id)}
                >
                  {/* Top Line: Number, Massive Title, and Red Action Dot */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
                      {/* Number in Creatiancy Brand Red */}
                      <span className="text-[16px] sm:text-[20px] font-mono font-medium text-[#9B1C22] tracking-wider select-none">
                        {item.number}
                      </span>

                      {/* Display Title with Smooth Hover & Active State */}
                      <h3
                        className={`text-[36px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-medium tracking-[-0.03em] leading-[1.0] transition-colors ${
                          isActive
                            ? "text-[#1D1D1F]"
                            : "text-[#86868B]/70 group-hover:text-[#1D1D1F]"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Action Circle Indicator */}
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-[#9B1C22] text-white shadow-[0_4px_16px_rgba(155,28,34,0.35)] scale-105"
                          : "bg-black/[0.04] text-[#1D1D1F]/50 group-hover:bg-[#9B1C22] group-hover:text-white"
                      }`}
                    >
                      <span className="text-xs font-bold leading-none select-none">
                        {isActive ? "—" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* Active Expandable Drawer: Tags Pills & Summary */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 sm:pt-8 pl-8 sm:pl-12">
                          {/* Tags Pill Row */}
                          <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-4 py-2 rounded-full border border-black/10 bg-white/80 shadow-sm mb-6">
                            {item.tags.map((tag, tIdx) => (
                              <React.Fragment key={tag}>
                                <span className="text-[12px] sm:text-[13px] font-medium text-[#1D1D1F]/80">
                                  {tag}
                                </span>
                                {tIdx < item.tags.length - 1 && (
                                  <span className="text-[10px] text-black/30 select-none">&bull;</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          {/* Descriptive Paragraph */}
                          <p className="text-[15px] sm:text-[17px] text-[#6E6E73] font-normal leading-relaxed max-w-2xl mb-6">
                            {item.summary}
                          </p>

                          {/* Action Button */}
                          <div>
                            <Link
                              href="/services"
                              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#9B1C22] hover:text-[#82151B] transition-colors uppercase tracking-wider min-h-[44px]"
                            >
                              <span>Explore System Specifications</span>
                              <span>&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Services;
