"use client";

import React from "react";
import { FlowDiagram } from "@/components/ui/FlowDiagram";

export const Process = () => {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 w-full bg-[#FBFDF9] border-b border-[#1E1E1E]/10">
      <div className="max-w-[1440px] mx-auto">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 md:pb-16 border-b border-[#1E1E1E]/10 items-end">
          <div className="lg:col-span-8">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#9B1C22] uppercase block mb-3">
              METHODOLOGY &bull; WORKING DISCIPLINE
            </span>
            <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-semibold tracking-[-0.035em] text-[#1E1E1E] leading-[1.02]">
              How we think &amp; build.
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-[15px] md:text-[17px] text-[#555] font-light leading-relaxed">
              A five-stage disciplined sequence moving from strategic discovery to live launch.
            </p>
          </div>
        </div>

        {/* Horizontal Scroll-Animated Flow Diagram */}
        <FlowDiagram />

      </div>
    </section>
  );
};
