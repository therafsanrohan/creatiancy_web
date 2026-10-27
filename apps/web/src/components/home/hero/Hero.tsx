"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-28 px-6 md:px-12 bg-[#070809] border-b border-white/[0.08] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        {/* Main Display Headline in Helvetica Neue, Sentence Case */}
        <div className="max-w-5xl mb-10 sm:mb-12">
          <h1 className="text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-medium tracking-[-0.035em] text-[#F4F5F7] leading-[1.0] text-balance">
            Good creative <br />
            starts with{" "}
            <span className="text-[#FF2B43] font-normal">
              better thinking
            </span>
            <span className="text-[#FF2B43]">.</span>
          </h1>
        </div>

        {/* Human Narrative & Clear Next Step */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end pt-4 pb-14 border-b border-white/[0.08]">
          <div className="lg:col-span-7">
            <p className="text-[18px] sm:text-[22px] md:text-[24px] text-neutral-400 font-normal leading-[1.45] max-w-2xl text-pretty">
              We partner with founders and brands to craft clear positioning, distinct visual identities, and high-performance digital products that refuse to look like everyone else.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end items-start sm:items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 h-14 rounded-full text-[13px] font-mono font-medium tracking-wide bg-[#FF2B43] hover:bg-[#E01E37] text-white transition-all shadow-[0_4px_24px_rgba(255,43,67,0.3)] min-h-[48px] hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-7 h-14 rounded-full text-[13px] font-mono font-medium tracking-wide bg-white/[0.03] hover:bg-white/[0.07] text-[#F4F5F7] hover:text-[#FF2B43] border border-white/10 transition-all min-h-[48px]"
            >
              <span>Selected work</span>
              <span className="text-neutral-500">↓</span>
            </Link>
          </div>
        </div>

        {/* Clean, authentic capabilities strip without AI clutter */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <span className="text-xs font-mono text-[#FF2B43] block mb-1">01</span>
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">Brand Strategy</h3>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Positioning frameworks and distinct narrative architectures.
            </p>
          </div>

          <div>
            <span className="text-xs font-mono text-[#FF2B43] block mb-1">02</span>
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">Visual Identity</h3>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Design tokens, bespoke typographic systems, and art direction.
            </p>
          </div>

          <div>
            <span className="text-xs font-mono text-[#FF2B43] block mb-1">03</span>
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">Digital Products</h3>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Next.js full-stack web platforms engineered for sub-second speed.
            </p>
          </div>

          <div>
            <span className="text-xs font-mono text-[#FF2B43] block mb-1">04</span>
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">Commercial Media</h3>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Cinematic film direction and 3D motion design.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};




