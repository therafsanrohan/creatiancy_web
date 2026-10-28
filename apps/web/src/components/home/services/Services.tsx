"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  tags: string[];
  scope: string[];
  idealClients: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "brand-strategy",
    number: "01.",
    title: "Brand Strategy & Identity",
    tagline: "Think clearly. Stand distinctly.",
    tags: [
      "Brand Positioning",
      "Competitor Research",
      "Visual Identity",
      "Brand Architecture",
      "Packaging",
    ],
    scope: [
      "Brand positioning ও competitor research",
      "Brand strategy, naming ও messaging",
      "Visual identity, logo ও brand guidelines",
      "Rebranding ও brand architecture",
      "Packaging এবং brand collateral",
    ],
    idealClients: "নতুন brand, premium business, growing companies।",
  },
  {
    id: "digital-web",
    number: "02.",
    title: "Digital Experience & Web",
    tagline: "Build digital experiences with purpose.",
    tags: [
      "Corporate Website",
      "E-commerce",
      "UI/UX Design",
      "Landing Page",
      "Optimization",
    ],
    scope: [
      "Business ও corporate website",
      "E-commerce website",
      "Landing page ও campaign microsite",
      "UI/UX design ও website redesign",
      "Conversion-focused user journeys",
      "Website maintenance ও optimization",
    ],
    idealClients: "E-commerce, service businesses, startups ও established brands।",
  },
  {
    id: "creative-production",
    number: "03.",
    title: "Creative Production & Content",
    tagline: "Make the brand impossible to ignore.",
    tags: [
      "Campaign Concept",
      "Commercial Shoots",
      "Motion Graphics",
      "Short-Form Video",
      "Ad Creative",
    ],
    scope: [
      "Campaign concept ও creative direction",
      "Product photography ও commercial shoots",
      "Social media creative design",
      "Motion graphics ও video editing",
      "Reels, short-form video ও branded content",
      "Advertising creative adaptation",
    ],
    idealClients: "Fashion, beauty, lifestyle, FMCG, food ও retail brands।",
  },
  {
    id: "campaigns-activation",
    number: "04.",
    title: "Campaigns & Brand Activation",
    tagline: "Turn ideas into real-world impact.",
    tags: [
      "Integrated Campaigns",
      "Outdoor (OOH)",
      "Billboard Design",
      "Event Branding",
      "Brand Activation",
    ],
    scope: [
      "Integrated creative campaign",
      "Outdoor advertising (OOH) creative",
      "Billboard ও retail communication design",
      "Launch campaign ও promotional concepts",
      "Campaign asset development",
      "Event branding ও brand activation creative",
    ],
    idealClients: "Established brands, retail chains, product launches ও campaign-driven businesses।",
  },
  {
    id: "growth-strategy",
    number: "05.",
    title: "Growth & Creative Strategy",
    tagline: "Connect creative thinking with business goals.",
    tags: [
      "Marketing Strategy",
      "Paid Media",
      "Meta Advertising",
      "Creative Testing",
      "Growth Consulting",
    ],
    scope: [
      "Marketing ও communication strategy",
      "Paid media planning ও campaign management",
      "Meta advertising campaign execution",
      "Creative testing ও performance analysis",
      "Audience research ও funnel strategy",
      "Monthly growth consulting",
    ],
    idealClients: "যাদের marketing চলছে, কিন্তু sustainable growth বা measurable results দরকার।",
  },
];

export function Services() {
  const [activeId, setActiveId] = useState<string>("brand-strategy");

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
          
          {/* Left Column: Services label and section intro */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <p className="text-[13px] sm:text-[14px] font-mono tracking-[0.18em] uppercase text-[#6E6E73] leading-relaxed">
              services that <br />
              we provide
            </p>
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
                          {/* Tagline / Core Statement */}
                          <p className="text-[18px] sm:text-[22px] font-medium text-[#1D1D1F] tracking-tight mb-4">
                            {item.tagline}
                          </p>

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

                          {/* Detailed Scope List */}
                          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-2.5 max-w-3xl">
                            {item.scope.map((point, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-2 text-[14px] sm:text-[15px] text-[#6E6E73]">
                                <span className="text-[#9B1C22] font-bold leading-none mt-1 select-none">•</span>
                                <span className="leading-snug">{point}</span>
                              </div>
                            ))}
                          </div>

                          {/* Ideal Clients */}
                          <div className="pt-4 border-t border-black/[0.08] mb-6 max-w-3xl">
                            <p className="text-[13px] text-[#6E6E73]">
                              <span className="font-semibold text-[#1D1D1F]">Ideal clients: </span>
                              {item.idealClients}
                            </p>
                          </div>

                          {/* Action Button */}
                          <div>
                            <Link
                              href="/services"
                              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#9B1C22] hover:text-[#82151B] transition-colors uppercase tracking-wider min-h-[44px]"
                            >
                              <span>Explore Full Scope & Capabilities</span>
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
