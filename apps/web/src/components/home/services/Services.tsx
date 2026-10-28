"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
      "Brand positioning and competitor research",
      "Brand strategy, naming, and messaging frameworks",
      "Visual identity, logo design, and brand guidelines",
      "Rebranding and corporate brand architecture",
      "Packaging design and commercial brand collateral",
    ],
    idealClients: "New brands, premium businesses, and high-growth companies.",
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
      "Business and enterprise corporate websites",
      "High-conversion e-commerce web platforms",
      "Campaign landing pages and launch microsites",
      "UI/UX product design and digital platform redesigns",
      "Conversion-focused user journeys and design systems",
      "Full website maintenance, performance, and optimization",
    ],
    idealClients: "E-commerce stores, service businesses, startups, and established enterprises.",
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
      "Campaign concepts and creative art direction",
      "Commercial photography and product studio shoots",
      "Social media brand creative design",
      "Motion graphics, 3D design, and video editing",
      "High-retention reels, short-form video, and branded content",
      "Multi-channel advertising creative adaptation",
    ],
    idealClients: "Fashion, beauty, lifestyle, FMCG, food, and modern retail brands.",
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
      "Integrated 360° creative marketing campaigns",
      "Outdoor advertising (OOH) creative direction",
      "Billboard and retail communication design",
      "Product launch campaigns and promotional strategies",
      "Omnichannel campaign asset production",
      "Experiential event branding and live activation creative",
    ],
    idealClients: "Established brands, retail chains, major product launches, and campaign-driven enterprises.",
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
      "Marketing and commercial communication strategy",
      "Paid media planning and full campaign management",
      "High-performance Meta and cross-platform advertising",
      "Creative testing frameworks and performance analytics",
      "Audience segmentation and conversion funnel engineering",
      "Monthly executive growth and creative consulting",
    ],
    idealClients: "Businesses with active marketing seeking sustainable scale and measurable ROI.",
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
      className="relative w-full bg-[#F5F5F7] py-16 sm:py-20 md:py-24 px-6 md:px-12 text-[#1D1D1F] overflow-hidden border-t border-black/[0.08]"
    >
      <div className="max-w-[1360px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Clear, concise sticky overview */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col justify-start">

            <h2 className="text-[26px] sm:text-[32px] font-medium tracking-tight text-[#1D1D1F] leading-tight mb-3">
              The Creative Lab <br className="hidden sm:inline" />
              & Systems.
            </h2>

            <p className="text-[14px] text-[#6E6E73] font-normal leading-relaxed mb-6 max-w-sm">
              We engineer brand positioning, digital products, and cinematic campaigns built for scale and retention.
            </p>



            {/* Compact CTA Note */}
            <div className="mt-6 pt-5 border-t border-black/[0.08] hidden sm:block">
              <p className="text-[12px] text-[#86868B] leading-relaxed mb-2">
                Need a tailored combination across multiple disciplines?
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#9B1C22] hover:text-[#82151B] transition-colors uppercase tracking-wider"
              >
                <span>Request Custom Brief</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean, Compact, Intuitive Accordion */}
          <div className="lg:col-span-8 flex flex-col border-t border-black/10">
            {servicesData.map((item) => {
              const isActive = activeId === item.id;

              return (
                <div
                  key={item.id}
                  className={`border-b border-black/10 transition-all duration-200 py-5 sm:py-6 cursor-pointer ${
                    isActive ? "bg-white/60 -mx-3 px-3 sm:-mx-5 sm:px-5 rounded-xl border-transparent" : "hover:bg-black/[0.01]"
                  }`}
                  onClick={() => toggleService(item.id)}
                >
                  {/* Top Line: Number, Scaled Title, and State Indicator */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                      <span className={`text-[13px] font-mono font-medium tracking-wider select-none ${
                        isActive ? "text-[#9B1C22]" : "text-[#86868B]"
                      }`}>
                        {item.number}
                      </span>

                      <h3
                        className={`text-[20px] sm:text-[24px] md:text-[26px] font-medium tracking-tight transition-colors ${
                          isActive
                            ? "text-[#1D1D1F]"
                            : "text-[#1D1D1F]/80 group-hover:text-[#1D1D1F]"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isActive
                          ? "bg-[#9B1C22] text-white shadow-sm"
                          : "bg-black/[0.04] text-[#1D1D1F]/60 group-hover:bg-black/[0.08]"
                      }`}
                    >
                      <span className="text-xs font-bold leading-none select-none">
                        {isActive ? "—" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* Active Content: Crisp, Scannable & Structured */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 sm:pt-5 pl-7 sm:pl-9">
                          {/* Tagline */}
                          <p className="text-[15px] sm:text-[16px] font-medium text-[#1D1D1F] tracking-tight mb-3">
                            {item.tagline}
                          </p>

                          {/* Quick Deliverable Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-black/[0.08] text-[#1D1D1F]/80 shadow-2xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Deliverables Scope Checklist */}
                          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl">
                            {item.scope.map((point, pIdx) => (
                              <div 
                                key={pIdx} 
                                className="flex items-start gap-2 text-[13px] text-[#555558]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C22] shrink-0 mt-1.5" />
                                <span className="leading-snug">{point}</span>
                              </div>
                            ))}
                          </div>

                          {/* Ideal Fit & Action Row */}
                          <div className="pt-3 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <p className="text-[12px] text-[#6E6E73]">
                              <span className="font-semibold text-[#1D1D1F]">Best for: </span>
                              {item.idealClients}
                            </p>
                            <Link
                              href="/contact"
                              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#9B1C22] hover:text-[#82151B] transition-colors whitespace-nowrap shrink-0 uppercase tracking-wider"
                            >
                              <span>Start Project</span>
                              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
