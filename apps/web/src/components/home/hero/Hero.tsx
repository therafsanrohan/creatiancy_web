"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <section id="hero-section" className="relative w-full pt-36 sm:pt-40 md:pt-44 pb-24 sm:pb-32 px-6 md:px-12 bg-[#0C0708] overflow-hidden text-white">
      {/* 1. Atmospheric Studio Background with Subtle Noise, Blur & Ambient Red Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Background Image - Low Opacity, Blurred, Atmospheric Depth */}
        <div className="absolute inset-0 scale-[1.05] filter blur-[2.5px] contrast-[1.1] grayscale opacity-20 mix-blend-luminosity">
          <Image
            src="/hero/creative-studio-meeting.jpg"
            alt="Creatiancy Strategic Creative Collaboration"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Subtle Film Grain Noise Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient Dark-Crimson Spotlight Glow behind text */}
        <div className="absolute inset-0 bg-radial-[at_50%_35%] from-[#9B1C22]/30 via-[#0C0708]/90 to-[#0C0708] pointer-events-none" />

        {/* Multi-directional soft edge fades */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0C0708] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C0708] to-transparent pointer-events-none" />
      </div>

      {/* 2. Editorial Studio Wireframe / Dimension Grid Lines (from reference) */}
      <div className="absolute inset-0 z-[1] pointer-events-none select-none max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="relative w-full h-full border-x border-[#9B1C22]/20">
          {/* Vertical Grid Columns */}
          <div className="absolute inset-y-0 left-[20%] w-px bg-[#9B1C22]/15 hidden md:block" />
          <div className="absolute inset-y-0 left-[50%] w-px bg-[#9B1C22]/15 hidden md:block" />
          <div className="absolute inset-y-0 left-[75%] w-px bg-[#9B1C22]/15 hidden md:block" />

          {/* Horizontal Dimension Rule */}
          <div className="absolute bottom-6 left-0 right-0 border-t border-[#9B1C22]/25 flex items-center justify-between pt-1.5 px-3 text-[10px] font-mono text-[#9B1C22]/70 tracking-widest">
            <span>40</span>
            <span className="hidden md:inline">640</span>
            <span>458</span>
            <span className="hidden md:inline">248</span>
            <span className="hidden md:inline">494</span>
            <span>40</span>
          </div>
        </div>
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto">
        
        {/* Main Display Headline in Helvetica Neue */}
        <div className="max-w-5xl mb-10 sm:mb-12">
          <h1 className="text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-medium tracking-[-0.035em] text-white leading-[1.0] text-balance">
            Good creative <br />
            starts with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D5E] via-[#D32F38] to-[#9B1C22] font-normal">
              better thinking
            </span>
          </h1>
        </div>

        {/* Human Narrative & Clear Next Step */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end pt-4 pb-14 border-b border-white/10">
          <div className="lg:col-span-7">
            <p className="text-[18px] sm:text-[22px] md:text-[24px] text-white/80 font-normal leading-[1.45] max-w-2xl text-pretty">
              We partner with founders and brands to craft clear positioning, distinct visual identities, and high-performance digital products that refuse to look like everyone else.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end items-stretch sm:items-center gap-3 sm:gap-4 w-full">
            <Link
              href="/#contact"
              onClick={(e) => {
                const el = document.getElementById("contact");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  window.history.replaceState(null, "", "/#contact");
                }
              }}
              className="group inline-flex items-center justify-center px-7 h-13 rounded-full text-[13px] font-medium tracking-wide bg-gradient-to-b from-[#A8242A] to-[#9B1C22] hover:from-[#9B1C22] hover:to-[#82151B] text-white transition-all duration-200 border border-[#9B1C22]/40 shadow-[0_4px_24px_rgba(155,28,34,0.45)] hover:shadow-[0_6px_30px_rgba(155,28,34,0.6)] min-h-[48px] active:scale-[0.99] w-full sm:w-auto text-center"
            >
              <span>Start a project</span>
            </Link>

            <Link
              href="/work"
              className="group inline-flex items-center justify-center px-6 h-13 rounded-full text-[13px] font-medium tracking-wide bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 hover:border-white/40 shadow-sm transition-all duration-200 min-h-[48px] active:scale-[0.99] w-full sm:w-auto text-center"
            >
              <span>Selected work</span>
            </Link>
          </div>
        </div>

        {/* Clean, authentic capabilities strip with subtle glass accents */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-white/10">
          <div>
            <span className="text-xs font-mono text-[#FF4D5E] block mb-1">01</span>
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">Strategy & Branding</h3>
            <p className="text-xs text-white/60 font-sans leading-relaxed mb-2">
              Brand audit, positioning, messaging, identity, rebranding, and comprehensive brand guidelines.
            </p>
            <div className="text-[11px] font-mono text-white/40">
              <span className="text-[#FF4D5E]/80">Main sale:</span> Brand Sprint, Brand System.
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-[#FF4D5E] block mb-1">02</span>
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">Digital Experience</h3>
            <p className="text-xs text-white/60 font-sans leading-relaxed mb-2">
              Corporate websites, e-commerce, landing pages, UX/UI, conversion-focused redesigns, and website optimization.
            </p>
            <div className="text-[11px] font-mono text-white/40">
              <span className="text-[#FF4D5E]/80">Main sale:</span> Digital Launch, Website Experience.
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-[#FF4D5E] block mb-1">03</span>
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">Creative & Campaign Studio</h3>
            <p className="text-xs text-white/60 font-sans leading-relaxed mb-2">
              Creative direction, campaign concepts, graphic design, motion, video editing, product visuals, and OOH design.
            </p>
            <div className="text-[11px] font-mono text-white/40">
              <span className="text-[#FF4D5E]/80">Main sale:</span> Campaign Project, Monthly Creative Partner.
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-[#FF4D5E] block mb-1">04</span>
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">Growth & Performance</h3>
            <p className="text-xs text-white/60 font-sans leading-relaxed mb-2">
              Paid media management, creative testing, campaign tracking, landing page improvement, and performance reporting.
            </p>
            <div className="text-[11px] font-mono text-white/40">
              <span className="text-[#FF4D5E]/80">Main sale:</span> Monthly Growth Partner.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};




