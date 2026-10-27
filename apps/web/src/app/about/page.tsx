"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BentoCard } from "@/components/ui/BentoCard";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import "@/app/website.css";

const BENTO_PRINCIPLES = [
  {
    num: "01",
    label: "FOUNDATION",
    title: "Strategic Clarity",
    copy: "Question the brief before drawing form. Strategy dictates aesthetics.",
    icon: "Compass",
    size: "tall" as const,
    theme: "dark" as const,
    tags: ["Root Cause", "Commercial Goals"]
  },
  {
    num: "02",
    label: "AESTHETIC RULE",
    title: "Distinctive Creative",
    copy: "Reject formulaic tropes. Craft singular visual systems that command authority.",
    icon: "Layers",
    size: "tall" as const,
    theme: "red" as const,
    tags: ["Custom Typography", "Brand Distinction"]
  },
  {
    num: "03",
    label: "DELIVERY STANDARD",
    title: "Dependable Build",
    copy: "Punctual delivery, accessible engineering, and direct partner accountability.",
    icon: "Sliders",
    size: "tall" as const,
    theme: "dark" as const,
    tags: ["Production Rigor", "Live Launch"]
  }
];

const selectedWorkBriefs = [
  {
    client: "ODL Developers Ltd.",
    discipline: "OOH Visual Strategy & Billboards",
    year: "2025",
    slug: "odl-ads",
    image: "/images/project real.png",
    tags: ["OOH Strategy", "Billboards", "Spatial Graphics"]
  },
  {
    client: "OMNI CONNECTS",
    discipline: "Complete Corporate Identity & SaaS Architecture",
    year: "2025",
    slug: "omni-connects",
    image: "/images/omni_branding.png",
    tags: ["Brand Architecture", "Design System", "SaaS"]
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="creatiancy-scope bg-[#070809]" ref={containerRef}>
      <main className="flex-1 w-full relative">

        {/* Studio Manifesto Hero */}
        <section className="pt-40 pb-24 px-6 md:px-12 w-full bg-[#070809] text-[#F4F5F7] border-b border-white/[0.08]">
          <div className="max-w-[1440px] mx-auto">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-white/[0.08] text-[11px] font-mono tracking-[0.16em] uppercase text-neutral-400 mb-16">
              <div>
                <span className="text-[#FF2B43] mr-2">01</span>
                <span>STUDIO MANIFESTO</span>
              </div>
              <div>
                <span className="text-[#FF2B43] mr-2">02</span>
                <span>THINK TOGETHER</span>
              </div>
              <div className="hidden md:block">
                <span className="text-[#FF2B43] mr-2">03</span>
                <span>CREATIVE DIRECTION</span>
              </div>
              <div className="text-right">
                <span className="text-[#FF2B43] mr-2">04</span>
                <span>STUDIO ACTIVE</span>
              </div>
            </div>

            <div className="max-w-4xl">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-4">
                CREATIANCY STUDIO
              </span>
              <h1 className="text-[40px] sm:text-[56px] md:text-[76px] font-bold tracking-[-0.035em] text-[#F4F5F7] leading-[1.0] mb-8 uppercase">
                Strategic thinking &amp; production unified.
              </h1>
              <p className="text-[17px] sm:text-[20px] text-neutral-400 font-light leading-relaxed max-w-2xl">
                A contemporary creative studio built for ambitious leaders who value clarity, craft, and distinct brand systems.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy: Think Together with Visual Convergence Diagram */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-3">
                CORE PHILOSOPHY
              </span>
              <h2 className="text-[34px] sm:text-[44px] md:text-[52px] font-bold tracking-[-0.03em] text-[#F4F5F7] leading-[1.05] mb-6 uppercase">
                Think Together.
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-400 font-light leading-relaxed mb-6">
                We reject superficial decoration. Client insight and senior creative rigor converge into singular brand systems.
              </p>

              {/* Numbered Flow Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                <div>
                  <span className="text-[11px] font-mono text-[#FF2B43] block font-bold">01</span>
                  <span className="text-[13px] font-medium text-[#F4F5F7]">Clear thinking</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#FF2B43] block font-bold">02</span>
                  <span className="text-[13px] font-medium text-[#F4F5F7]">Distinct creative</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#FF2B43] block font-bold">03</span>
                  <span className="text-[13px] font-medium text-[#F4F5F7]">Dependable build</span>
                </div>
              </div>
            </div>

            {/* Visual Convergence Diagram on Dark Surface */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-[20px] bg-[#0E1114] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF2B43] mb-6">
                CONCEPTUAL CONVERGENCE DIAGRAM
              </span>
              <svg className="w-full h-32" viewBox="0 0 500 120" fill="none">
                {/* Left Stream: Strategic Brief */}
                <path d="M 20 20 C 180 20, 220 60, 250 60" stroke="#F4F5F7" strokeWidth="2" strokeDasharray="4 4" />
                {/* Right Stream: Creative Execution */}
                <path d="M 480 100 C 320 100, 280 60, 250 60" stroke="#FF2B43" strokeWidth="2" />
                {/* Unified Output Line */}
                <line x1="250" y1="60" x2="250" y2="110" stroke="#FF2B43" strokeWidth="3" />
                <circle cx="250" cy="60" r="6" fill="#FF2B43" />
                <circle cx="20" cy="20" r="4" fill="#F4F5F7" />
                <circle cx="480" cy="100" r="4" fill="#FF2B43" />
                <text x="30" y="25" fill="#F4F5F7" fontSize="11" fontFamily="monospace">STRATEGIC BRIEF</text>
                <text x="310" y="105" fill="#FF2B43" fontSize="11" fontFamily="monospace">STUDIO EXECUTION</text>
                <text x="265" y="90" fill="#FF2B43" fontSize="11" fontWeight="bold" fontFamily="monospace">CONVERGENCE</text>
              </svg>
            </div>

          </div>
        </section>

        {/* Operating Standards: 3 Bento Cards on Dark Surface */}
        <section className="py-24 md:py-32 bg-[#0E1114] text-[#F4F5F7] px-6 md:px-12 border-b border-white/[0.08]">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-14">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-3">
                OPERATING STANDARDS
              </span>
              <h2 className="text-[32px] sm:text-[44px] font-bold tracking-[-0.03em] uppercase">How we work</h2>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {BENTO_PRINCIPLES.map((step) => (
                <BentoCard
                  key={step.num}
                  numeral={step.num}
                  label={step.label}
                  title={step.title}
                  copy={step.copy}
                  icon={step.icon}
                  theme="dark"
                  size={step.size}
                  tags={step.tags}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Founder & Leadership Section with Glass Caption Chip */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Founder Image with Glass Caption Chip */}
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-[20px] overflow-hidden bg-neutral-900 border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)] group">
              <Image 
                src="/images/founder_v2.png" 
                alt="Creatiancy Studio Leadership" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              
              {/* Restrained Glass Caption Chip */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="p-3.5 rounded-[12px] bg-black/60 backdrop-blur-[16px] saturate-[140%] border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[13px] font-semibold block leading-tight">Studio Leadership</span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Direct Partner Collaboration</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#FF2B43]" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase">
                DIRECT SENIOR DIRECTION
              </span>
              <h2 className="text-[32px] sm:text-[44px] font-bold tracking-[-0.03em] text-[#F4F5F7] leading-[1.08] uppercase">
                Led by hands-on creative practitioners.
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-400 font-light leading-relaxed">
                Zero junior hand-offs. The same leadership shaping your brief steers identity, code, and launch delivery.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.03] text-neutral-300 border border-white/[0.08]">Brand Identity</span>
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.03] text-neutral-300 border border-white/[0.08]">Next.js Architecture</span>
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.03] text-neutral-300 border border-white/[0.08]">Creative Tech</span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <ButtonLink href="/contact" variant="primary" size="md">
                  Start Conversation
                </ButtonLink>
                <ButtonLink href="/work" variant="outline" size="md">
                  Explore Work
                </ButtonLink>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
