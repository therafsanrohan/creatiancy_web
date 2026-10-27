"use client";

import React from "react";
import { BentoCard } from "@/components/ui/BentoCard";
import { ButtonLink } from "@/components/ui/Button";

const PRINCIPLES = [
  {
    num: "01",
    label: "STRATEGIC RULE",
    title: "Clear Thinking",
    copy: "Question the brief before drawing a pixel. Strategy dictates form.",
    icon: "Compass",
    size: "tall" as const,
    theme: "dark" as const,
    tags: ["Root Cause", "Commercial Focus"]
  },
  {
    num: "02",
    label: "AESTHETIC RULE",
    title: "Distinct Creative",
    copy: "Singular brand systems engineered to stand apart without generic templates.",
    icon: "Layers",
    size: "tall" as const,
    theme: "red" as const,
    tags: ["Custom Typography", "Brand Distinction"]
  },
  {
    num: "03",
    label: "DELIVERY RULE",
    title: "Dependable Build",
    copy: "Punctual delivery, accessible Next.js code, and direct partner accountability.",
    icon: "Sliders",
    size: "tall" as const,
    theme: "dark" as const,
    tags: ["Engineered Platforms", "Direct Partner"]
  }
];

export const AboutPreview = () => {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 w-full bg-[#111111] text-white border-b border-white/10">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 mb-16 items-end">
          <div className="lg:col-span-8">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#9B1C22] block mb-3">
              STUDIO PHILOSOPHY &bull; CORE THESIS
            </span>
            <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-semibold tracking-[-0.035em] text-white leading-[1.02]">
              Think Together.<br />
              <span className="text-white/40">Build what stands apart.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-[15px] md:text-[17px] text-white/70 font-light leading-relaxed">
              Senior creative leadership partnering directly on your brief from strategy to launch.
            </p>
          </div>
        </div>

        {/* 3 Principles Asymmetrical Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {PRINCIPLES.map((p) => (
            <BentoCard
              key={p.num}
              numeral={p.num}
              label={p.label}
              title={p.title}
              copy={p.copy}
              icon={p.icon}
              theme={p.theme}
              size={p.size}
              tags={p.tags}
            />
          ))}
        </div>

        {/* Action Row */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <span className="text-[13px] font-mono text-white/50">
            Founded in Dhaka &bull; Working with global brands and ambitious leaders.
          </span>
          <div className="flex items-center gap-4">
            <ButtonLink href="/about" variant="primary" size="md">
              Studio Manifesto
            </ButtonLink>
            <ButtonLink href="/contact" variant="on-dark" size="md">
              Start Conversation
            </ButtonLink>
          </div>
        </div>

      </div>
    </section>
  );
};
