"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ProtocolStep {
  step: string;
  name: string;
  action: string;
  output: string;
}

const BLUEPRINT_STEPS: ProtocolStep[] = [
  {
    step: "01",
    name: "Strategy",
    action: "Deep dive into your business, market landscape, and audience positioning.",
    output: "Approved Strategic Brief",
  },
  {
    step: "02",
    name: "Concepts",
    action: "Explore 2–3 distinct visual directions stress-tested on real platforms.",
    output: "Directional Prototypes",
  },
  {
    step: "03",
    name: "Refine",
    action: "Calibrate tokens, layout details, and assets through focused feedback.",
    output: "Polished System",
  },
  {
    step: "04",
    name: "Deliver",
    action: "Hand over production-ready source files, design tokens, and digital guidelines.",
    output: "Master Production Files",
  },
];

export const MethodologyAndTrust = () => {
  return (
    <section id="process" className="relative py-20 sm:py-24 md:py-28 px-6 md:px-12 bg-[#F5F5F7] border-b border-black/[0.08]">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Minimalist Apple Header: Crisp & Straightforward */}
        <div className="pb-10 sm:pb-12 border-b border-black/[0.08] mb-10 sm:mb-12">
          <h2 className="text-[28px] sm:text-[36px] md:text-[40px] font-medium tracking-tight text-[#1D1D1F] leading-tight mb-2">
            The Blueprint Protocol
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#6E6E73] font-normal max-w-xl">
            A structured, collaborative sequence engineered to take your brand from initial brief to production.
          </p>
        </div>

        {/* 4 Clean, Glanceable Cards: Ultra-minimal, Zero Cognitive Load */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {BLUEPRINT_STEPS.map((item, idx) => {
            const isLast = idx === BLUEPRINT_STEPS.length - 1;

            return (
              <div
                key={item.step}
                className={`p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-200 border ${
                  isLast
                    ? "bg-white border-[#9B1C22]/30 shadow-[0_8px_30px_rgba(155,28,34,0.08)]"
                    : "bg-white border-black/[0.06] hover:border-black/15 shadow-sm"
                }`}
              >
                <div>
                  {/* Top Step Number */}
                  <div className="mb-6">
                    <span className={`text-[15px] font-mono font-bold tracking-wider ${
                      isLast ? "text-[#9B1C22]" : "text-[#1D1D1F]/50"
                    }`}>
                      {item.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[22px] sm:text-[24px] font-medium text-[#1D1D1F] tracking-tight mb-3">
                    {item.name}
                  </h3>

                  {/* Brief, Plain Action Description */}
                  <p className="text-[13px] sm:text-[14px] text-[#6E6E73] font-normal leading-relaxed mb-6">
                    {item.action}
                  </p>
                </div>

                {/* Tangible Outcome (What you get) */}
                <div className="pt-4 border-t border-black/[0.06]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868B] block mb-1">
                    You Get
                  </span>
                  <span className={`text-[14px] font-semibold tracking-tight ${
                    isLast ? "text-[#9B1C22]" : "text-[#1D1D1F]"
                  }`}>
                    {item.output}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MethodologyAndTrust;


