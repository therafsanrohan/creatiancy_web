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
    <section id="process" className="py-24 sm:py-32 px-6 md:px-12 bg-[#F5F5F7] border-b border-black/[0.06] relative overflow-hidden">
      {/* Background Soft Flare */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-[#9B1C22]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 sm:pb-16 border-b border-black/[0.08] gap-6">
          <div>
            <h2 className="text-[34px] sm:text-[48px] md:text-[60px] font-bold tracking-tight text-[#1D1D1F] leading-none uppercase">
              The Blueprint Protocol.
            </h2>
          </div>
          <p className="text-[15px] sm:text-[17px] text-[#6E6E73] font-normal max-w-md">
            A calibrated, frictionless 4-step sequence engineered for clarity, speed, and tangible deliverables.
          </p>
        </div>

        {/* 4-Card Sequential Protocol */}
        <div className="py-12 sm:py-16 border-b border-black/[0.08]">
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
                        ? "bg-gradient-to-b from-[#A8242A] to-[#9B1C22] text-white shadow-[0_20px_50px_-15px_rgba(155,28,34,0.35)] border border-[#9B1C22]"
                        : "bg-white text-[#1D1D1F] border border-black/[0.06] shadow-sm hover:border-black/20 hover:-translate-y-1 hover:shadow-md"
                    }`}
                  >
                    {/* Top Content: Large Number, Title & Description */}
                    <div>
                      <span className={`text-[46px] sm:text-[52px] font-bold tracking-tight block leading-none mb-6 ${
                        isSelected || isHighlight ? "text-white" : "text-[#9B1C22]"
                      }`}>
                        {card.num}
                      </span>

                      <h3 className="text-[26px] sm:text-[28px] font-bold tracking-tight mb-4">
                        {card.title}
                      </h3>

                      <p className={`text-[14px] sm:text-[15px] leading-relaxed ${
                        isSelected || isHighlight ? "text-white/90" : "text-[#6E6E73] font-normal"
                      }`}>
                        {card.desc}
                      </p>
                    </div>

                    {/* Bottom Deliverable Row with Divider */}
                    <div className="pt-6 mt-8 border-t border-current/15">
                      <span className={`text-[10px] font-medium tracking-wide uppercase block mb-1 ${
                        isSelected || isHighlight ? "text-white/80" : "text-[#9B1C22]"
                      }`}>
                        YOU GET
                      </span>
                      <span className="text-[17px] sm:text-[19px] font-bold tracking-tight block">
                        {card.youGet}
                      </span>
                    </div>
                  </div>

                  {/* Connector Arrow Node: Horizontal on Desktop only */}
                  {idx < BLUEPRINT_CARDS.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#9B1C22] text-white shadow-[0_0_12px_rgba(155,28,34,0.4)] items-center justify-center pointer-events-none border-2 border-white">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};


