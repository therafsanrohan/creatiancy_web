"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const LegacyMetrics = () => {
  return (
    <section className="relative w-full bg-[#0C0708] text-white py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#9B1C22]/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[350px] bg-[#9B1C22]/12 blur-[160px] pointer-events-none rounded-full" />

      {/* Subtle world map or tech vector silhouette in background */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `radial-gradient(circle at 75% 45%, rgba(155, 28, 34, 0.4) 0%, transparent 60%)`
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Massive Headline Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-[32px] sm:text-[52px] md:text-[68px] lg:text-[80px] font-bold tracking-tight uppercase leading-[1.05] sm:leading-[1.02] text-white">
            WE DON&apos;T BUILD BRANDS.
            <br />
            <span className="text-[#9B1C22]">WE BUILD LEGACIES.</span>
          </h2>
        </div>

        {/* 2x2 Bento Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Card 1: 150+ Successful Projects */}
          <div className="group relative bg-[#151518]/90 hover:bg-[#1a1a1e] border border-white/[0.08] rounded-[24px] sm:rounded-[28px] p-8 sm:p-10 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div>
              <span className="text-[44px] sm:text-[56px] md:text-[64px] font-bold tracking-tight text-white leading-none">
                150<span className="text-[#9B1C22]">+</span>
              </span>
            </div>
            <div>
              <p className="text-[14px] sm:text-[16px] text-[#A1A1A6] font-medium tracking-wide">
                Successful Projects
              </p>
            </div>
          </div>

          {/* Card 2: 98% Client Satisfaction with Brand Red Right Bar */}
          <div className="group relative bg-[#151518]/90 hover:bg-[#1a1a1e] border border-white/[0.08] rounded-[24px] sm:rounded-[28px] p-8 sm:p-10 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Vertical Brand Red Accent Bar on Right Edge */}
            <div className="absolute top-4 bottom-4 right-0 w-2 sm:w-2.5 bg-[#9B1C22] rounded-l-full shadow-[0_0_15px_rgba(155,28,34,0.6)]" />

            <div>
              <span className="text-[44px] sm:text-[56px] md:text-[64px] font-bold tracking-tight text-white leading-none">
                98<span className="text-[34px] sm:text-[42px] font-semibold text-white/90">%</span>
              </span>
            </div>
            <div>
              <p className="text-[14px] sm:text-[16px] text-[#A1A1A6] font-medium tracking-wide pr-4">
                Client Satisfaction
              </p>
            </div>
          </div>

          {/* Card 3: 30+ Worldwide Clients */}
          <div className="group relative bg-[#151518]/90 hover:bg-[#1a1a1e] border border-white/[0.08] rounded-[24px] sm:rounded-[28px] p-8 sm:p-10 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div>
              <span className="text-[44px] sm:text-[56px] md:text-[64px] font-bold tracking-tight text-white leading-none">
                30<span className="text-[#9B1C22]">+</span>
              </span>
            </div>
            <div>
              <p className="text-[14px] sm:text-[16px] text-[#A1A1A6] font-medium tracking-wide">
                Worldwide Clients
              </p>
            </div>
          </div>

          {/* Card 4: 24/7 Creative Support (Crimson Ambient Card with Studio Visual) */}
          <div className="group relative rounded-[24px] sm:rounded-[28px] p-8 sm:p-10 flex flex-col justify-end min-h-[260px] sm:min-h-[300px] overflow-hidden border border-[#9B1C22]/30 shadow-[0_25px_60px_rgba(155,28,34,0.3)] transition-all duration-300">
            {/* Background Red Studio Lighting / Silhouette Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#6E0F14] via-[#9B1C22] to-[#A8242A] opacity-95 transition-transform duration-700 group-hover:scale-105" />

            {/* Silhouette or Studio Ambient Graphic */}
            <div className="absolute inset-0 mix-blend-multiply opacity-50">
              <Image
                src="/hero/cinematic-silhouette.png"
                alt="Creatiancy Studio 24/7 Support"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40" />

            {/* Card Content */}
            <div className="relative z-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight mb-2">
                24/7 — Creative Support
              </h3>
              <p className="text-[13px] sm:text-[14px] text-white/80 leading-relaxed font-normal">
                Always Available To Support, And Keep Your Project Moving Forward.
              </p>
            </div>
          </div>
        </div>

        {/* Transition Lead-in to Services: "SERVICES THAT DRIVE BRAND GROWTH" */}
        <div className="mt-24 sm:mt-32 pt-12 sm:pt-16 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] sm:text-[12px] font-medium tracking-widest uppercase text-[#9B1C22] block mb-2">
              Capabilities &amp; Infrastructure
            </span>
            <h3 className="text-[28px] sm:text-[38px] md:text-[46px] font-bold tracking-tight uppercase leading-[1.05] text-white">
              SERVICES THAT DRIVE <span className="text-[#9B1C22]">BRAND GROWTH</span>
            </h3>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full min-h-[48px] px-8 text-[13px] font-medium tracking-wide uppercase bg-white text-[#1D1D1F] hover:bg-[#9B1C22] hover:text-white transition-all duration-300 shadow-lg active:scale-95 shrink-0"
          >
            Start Your Brand
          </Link>
        </div>
      </div>
    </section>
  );
};
