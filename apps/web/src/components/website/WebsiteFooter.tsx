"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { WorldMapVector } from "./WorldMapVector";

// Key global regions where Creatiancy delivers client engagements
const REGION_PINS = [
  { 
    region: "Americas", 
    city: "New York & Miami",
    x: 235, 
    y: 195 
  },
  { 
    region: "Europe", 
    city: "London & Berlin",
    x: 488, 
    y: 185 
  },
  { 
    region: "Middle East", 
    city: "Dubai & Riyadh",
    x: 598, 
    y: 280 
  },
  { 
    region: "Asia", 
    city: "Dhaka & Singapore",
    x: 700, 
    y: 275 
  },
  { 
    region: "Oceania", 
    city: "Sydney & Melbourne",
    x: 825, 
    y: 475 
  },
];

export default function WebsiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0C0708] text-white pt-20 sm:pt-28 pb-12 px-4 sm:px-6 md:px-12 w-full mt-auto font-sans overflow-hidden border-t border-white/[0.08]">
      
      {/* Soft Ambient Crimson Spotlight under the footer card */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#9B1C22]/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-[1360px] mx-auto flex flex-col items-center relative z-10">
        
        {/* 1. Upper CTA Section with Organic Curve World Map & Precision Beacon Pins */}
        <div className="w-full flex flex-col items-center text-center mb-16 sm:mb-20">
          
          {/* Organic World Map Canvas (No Box Feel, Fades Organically) */}
          <div className="relative w-full max-w-[1040px] h-[280px] sm:h-[360px] md:h-[460px] flex items-center justify-center mb-6">
            
            {/* Soft Ambient Glow centered on global delivery footprint */}
            <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#9B1C22]/10 via-transparent to-transparent pointer-events-none" />

            {/* Seamless Natural Dotted Continents */}
            <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
              <WorldMapVector />
            </div>

            {/* Premium Glowing Region Beacon Pins on Actual Continents */}
            {REGION_PINS.map((pin) => (
              <div
                key={pin.region}
                style={{
                  left: `${(pin.x / 950) * 100}%`,
                  top: `${(pin.y / 620) * 100}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
              >
                {/* Outer Ping Wave */}
                <span className="absolute inset-0 -m-1.5 rounded-full bg-[#FF4D5E] animate-ping opacity-60" />
                
                {/* Secondary Soft Pulse */}
                <span className="absolute inset-0 -m-3 rounded-full bg-[#9B1C22]/40 animate-pulse pointer-events-none" />

                {/* Sleek Modern Beacon Core */}
                <div className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#9B1C22] to-[#FF4D5E] border border-white/80 shadow-[0_0_14px_rgba(255,77,94,0.9)] flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Modern Floating Region Tag on Hover */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20 flex flex-col items-center">
                  <div className="bg-[#140E0F]/95 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.6)] flex flex-col items-center">
                    <span className="text-[11px] font-semibold text-[#FF4D5E] tracking-wide">
                      {pin.region}
                    </span>
                    <span className="text-[10px] text-white/70 font-mono">
                      {pin.city}
                    </span>
                  </div>
                  {/* Small triangular tooltip arrow */}
                  <div className="w-2 h-2 bg-[#140E0F] rotate-45 border-r border-b border-white/15 -mt-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Consultation Subtitle */}
          <p className="text-[14px] sm:text-[16px] md:text-[17px] text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
            We&apos;re eager to learn about your goals. Contact us today for a free consultation and discover how we can drive real results.
          </p>

          {/* Creative, High-Impact & Understandable Footer CTA */}
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-4 px-8 sm:px-10 h-14 sm:h-15 rounded-full bg-gradient-to-b from-[#1C1718] to-[#120D0E] hover:from-[#261E20] hover:to-[#171213] text-white border border-[#9B1C22]/30 hover:border-[#FF5C6C]/60 transition-all duration-300 shadow-[0_4px_30px_rgba(155,28,34,0.35)] hover:shadow-[0_8px_40px_rgba(155,28,34,0.6)] active:scale-[0.98] min-h-[52px]"
          >
            {/* Subtle inner pulse glow */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9B1C22]/20 via-transparent to-[#9B1C22]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Live Availability Status Dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
            </span>

            {/* Clear, Understandable Copy */}
            <div className="flex flex-col text-left">
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-wide text-white group-hover:text-white transition-colors">
                Start a Project
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#86868B] group-hover:text-[#FF5C6C] transition-colors">
                Available for H1 Engagements
              </span>
            </div>

            {/* Creative Vector Icon Orb */}
            <span className="w-8 h-8 rounded-full bg-gradient-to-b from-[#A8242A] to-[#9B1C22] group-hover:from-[#DC2626] group-hover:to-[#9B1C22] text-white flex items-center justify-center shadow-md transition-all duration-300 ml-1 group-hover:translate-x-0.5">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </Link>

        </div>

        {/* 2. Floating Bento Footer Enclosure Card with Crimson Shadow Glow */}
        <div className="relative w-full">
          {/* Reddish ambient shadow glow directly behind the footer card */}
          <div className="absolute -inset-1.5 rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#9B1C22]/30 via-[#A8242A]/40 to-[#9B1C22]/30 blur-2xl opacity-75 -z-10" />

          <div className="w-full bg-[#151518]/95 backdrop-blur-2xl border border-white/[0.08] rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 md:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.7)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
              
              {/* Col 1: Creatiancy Logo + Experience copy */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  {/* Creatiancy Official Logo */}
                  <Link href="/" className="relative block w-[150px] sm:w-[175px] h-[32px] sm:h-[38px] mb-6">
                    <Image
                      src="/logos/Creatiancy%20logo%20white.svg"
                      alt="Creatiancy"
                      fill
                      className="object-contain object-left"
                      priority
                    />
                  </Link>

                  <p className="text-[13px] text-[#A1A1A6] font-normal leading-relaxed max-w-[240px]">
                    Experience the future of production.
                  </p>
                </div>
              </div>

              {/* Col 2: Links */}
              <div className="lg:col-span-2 flex flex-col gap-2.5">
                <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-2">
                  Links
                </span>
                <Link href="/about" className="text-[13px] text-white/80 hover:text-white transition-colors">About</Link>
                <Link href="/#services" className="text-[13px] text-white/80 hover:text-white transition-colors">Services</Link>
                <Link href="/work" className="text-[13px] text-white/80 hover:text-white transition-colors">Project</Link>
                <Link href="/insights" className="text-[13px] text-white/80 hover:text-white transition-colors">News</Link>
                <Link href="/#contact" className="text-[13px] text-white/80 hover:text-white transition-colors">Contact</Link>
              </div>

              {/* Col 3: Location & Contact */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-2 block">
                    location
                  </span>
                  <p className="text-[13px] text-white/80 leading-relaxed font-normal">
                    Dhaka &bull; Global Studio
                    <br />
                    Worldwide Client Deliveries
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-2 block">
                    contact
                  </span>
                  <a href="mailto:hello@creatiancy.com" className="text-[13px] text-white/80 hover:text-[#9B1C22] transition-colors block">
                    hello@creatiancy.com
                  </a>
                  <a href="tel:+8801325078941" className="text-[13px] text-white/80 hover:text-[#9B1C22] transition-colors block mt-0.5">
                    +880 1325-078941
                  </a>
                </div>
              </div>

              {/* Col 4: Social Icons (Behance, LinkedIn, Instagram, Facebook, X) */}
              <div className="lg:col-span-3 flex flex-col gap-4 items-start lg:items-end justify-center">
                <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-1">
                  Connect
                </span>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Behance */}
                  <a
                    href="https://www.behance.net/creatiancy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Behance"
                    className="w-10 h-10 rounded-full bg-[#2A292E] hover:bg-[#9B1C22] text-white flex items-center justify-center transition-all duration-200 border border-white/5 shadow-sm active:scale-95"
                  >
                    <span className="font-bold text-[13px]">Bē</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/company/creatiancy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full bg-[#2A292E] hover:bg-[#9B1C22] text-white flex items-center justify-center transition-all duration-200 border border-white/5 shadow-sm active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/creatiancy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-[#2A292E] hover:bg-[#9B1C22] text-white flex items-center justify-center transition-all duration-200 border border-white/5 shadow-sm active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com/creatiancy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-full bg-[#2A292E] hover:bg-[#9B1C22] text-white flex items-center justify-center transition-all duration-200 border border-white/5 shadow-sm active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>

                  {/* X (formerly Twitter) with Brand Red Accent */}
                  <a
                    href="https://x.com/creatiancy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (formerly Twitter)"
                    className="w-10 h-10 rounded-full bg-[#9B1C22] hover:bg-[#82151B] text-white flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>

              </div>

            </div>

            {/* Bottom Hairline Divider & Copyright Row */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] font-medium text-[#86868B]">
              <div>
                &copy; {new Date().getFullYear()} Creatiancy. All Rights Reserved
              </div>

              <div className="flex items-center gap-6 sm:gap-8">
                <Link href="/terms" className="text-[#9B1C22] hover:underline font-semibold">
                  Term of Use
                </Link>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Policy
                </Link>
                <Link href="/about" className="hover:text-white transition-colors">
                  FAQs
                </Link>

                {/* Scroll to top chevron button */}
                <button
                  onClick={scrollToTop}
                  aria-label="Scroll back to top"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ml-2"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
