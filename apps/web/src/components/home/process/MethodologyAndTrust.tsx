"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface ProtocolCard {
  num: string;
  title: string;
  desc: string;
  youGet: string;
  isHighlight?: boolean;
}

const BLUEPRINT_CARDS: ProtocolCard[] = [
  {
    num: "01",
    title: "Strategy",
    desc: "A strategy conversation about brand, audience and what commercial success looks like.",
    youGet: "Clear brief",
  },
  {
    num: "02",
    title: "Concepts",
    desc: "Two to three directions, presented with clear commercial and positioning rationale.",
    youGet: "2–3 directions",
  },
  {
    num: "03",
    title: "Refine",
    desc: "Feedback-driven iteration and design systems calibration until the work is right.",
    youGet: "Polished work",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "Production-ready files, digital guidelines, and a clear usage system for your team.",
    youGet: "Files + guide",
    isHighlight: true,
  },
];

export const MethodologyAndTrust = () => {
  const [activeCard, setActiveCard] = useState<number>(3); // 04 Deliver highlighted by default

  return (
    <section id="process" className="py-24 sm:py-32 px-6 md:px-12 bg-[#070809] border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Soft Red Flare */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-[#FF2B43]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 sm:pb-16 border-b border-white/[0.08] gap-6">
          <div>
            <h2 className="text-[34px] sm:text-[48px] md:text-[60px] font-bold tracking-tight text-[#F4F5F7] leading-none uppercase font-heading">
              The Blueprint Protocol.
            </h2>
          </div>
          <p className="text-[15px] sm:text-[17px] text-neutral-400 font-light max-w-md font-sans">
            A calibrated, frictionless 4-step sequence engineered for clarity, speed, and tangible deliverables.
          </p>
        </div>

        {/* 4-Card Sequential Protocol matching attached visual reference */}
        <div className="py-12 sm:py-16 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
            {BLUEPRINT_CARDS.map((card, idx) => {
              const isSelected = activeCard === idx;
              const isHighlight = card.isHighlight;

              return (
                <div key={card.num} className="relative flex flex-col">
                  {/* Step Card */}
                  <div
                    onClick={() => setActiveCard(idx)}
                    className={`h-full p-7 sm:p-8 rounded-[24px] transition-all duration-300 flex flex-col justify-between cursor-pointer select-none min-h-[350px] relative overflow-hidden ${
                      isSelected || isHighlight
                        ? "bg-[#FF2B43] text-white shadow-[0_20px_50px_-15px_rgba(255,43,67,0.4)] border border-[#FF2B43]"
                        : "bg-[#0E1114] text-[#F4F5F7] border border-white/[0.08] hover:border-white/20 hover:-translate-y-1"
                    }`}
                  >
                    {/* Top Content: Large Number, Title & Description */}
                    <div>
                      <span className={`text-[46px] sm:text-[52px] font-bold tracking-tight block leading-none mb-6 font-heading ${
                        isSelected || isHighlight ? "text-white" : "text-[#FF2B43]"
                      }`}>
                        {card.num}
                      </span>

                      <h3 className="text-[26px] sm:text-[28px] font-bold tracking-tight mb-4 font-heading">
                        {card.title}
                      </h3>

                      <p className={`text-[14px] sm:text-[15px] leading-relaxed font-sans ${
                        isSelected || isHighlight ? "text-white/90" : "text-neutral-400 font-light"
                      }`}>
                        {card.desc}
                      </p>
                    </div>

                    {/* Bottom Deliverable Row with Divider */}
                    <div className="pt-6 mt-8 border-t border-current/15">
                      <span className={`text-[10px] font-mono tracking-widest uppercase block mb-1 ${
                        isSelected || isHighlight ? "text-white/80" : "text-[#FF2B43]"
                      }`}>
                        YOU GET
                      </span>
                      <span className="text-[17px] sm:text-[19px] font-bold tracking-tight block font-heading">
                        {card.youGet}
                      </span>
                    </div>
                  </div>

                  {/* Connector Arrow Node: Horizontal on Desktop only */}
                  {idx < BLUEPRINT_CARDS.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#FF2B43] text-white shadow-[0_0_12px_rgba(255,43,67,0.5)] items-center justify-center pointer-events-none border-2 border-[#070809]">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Dock: Verified Testimonial Card showcasing Hector Oviedo */}
        <div className="pt-16">
          <div className="rounded-[24px] bg-[#0E1114] border border-white/[0.08] p-8 sm:p-12 md:p-16 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF2B43]/[0.04] blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-6">
                  VERIFIED CLIENT IMPACT &bull; OMNI CONNECTS
                </span>
                
                <blockquote className="text-[20px] sm:text-[26px] md:text-[32px] font-medium tracking-tight text-[#F4F5F7] leading-snug mb-8">
                  &ldquo;Creatiancy brought clarity and order to our entire identity. They don&apos;t just design &mdash; they understand SaaS architecture, commercial strategy, and how to build systems that scale.&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-neutral-800 border border-white/20 shrink-0">
                    <Image
                      src="/images/founder_v2.png"
                      alt="Hector Oviedo — Founder & CEO, OMNI CONNECTS"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#F4F5F7]">Hector Oviedo</h4>
                    <p className="text-[13px] font-mono text-neutral-400">Founder &amp; CEO, OMNI CONNECTS</p>
                  </div>
                </div>
              </div>

              {/* Verified Badge Column */}
              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10 flex flex-col gap-3 w-full max-w-xs">
                  <div className="flex items-center gap-2 text-[#FF2B43]">
                    <ShieldCheck className="w-4 h-4 text-[#FF2B43]" />
                    <span className="text-[11px] font-mono tracking-wider font-bold uppercase">100% Verified Engagement</span>
                  </div>
                  <span className="text-[12px] text-neutral-400 font-light">
                    Complete brand architecture, SaaS design tokens, and digital guidelines delivered.
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-white/5">
                    DHAKA &bull; GLOBAL CLIENT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


