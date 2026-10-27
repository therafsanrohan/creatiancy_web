"use client";

import React from "react";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const FinalCTA = () => {
  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 w-full bg-[#161616] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <div className="lg:col-span-8">
          <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#9B1C22] block mb-4">
            Next Steps &bull; Studio Engagement
          </span>
          <h2 className="text-[36px] sm:text-[52px] md:text-[68px] font-semibold tracking-[-0.03em] leading-[1.02] text-white">
            Have something <br />
            <span className="text-white/60">worth making?</span>
          </h2>
          <p className="mt-6 text-[17px] md:text-[20px] text-white/70 font-light max-w-xl leading-relaxed">
            Let&apos;s think it through together. We partner with ambitious leaders to bring clarity, distinct creative, and dependable delivery.
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
          <ButtonLink 
            href="/contact" 
            variant="primary" 
            size="lg" 
            className="w-full justify-between group"
          >
            <span>Start a Project</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </ButtonLink>

          <ButtonLink 
            href="/work" 
            variant="outline" 
            size="lg" 
            className="w-full justify-between text-white border-white/20 hover:border-white hover:text-white"
          >
            <span>Explore Archive</span>
            <span>↗</span>
          </ButtonLink>
        </div>

      </div>
    </section>
  );
};
