"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

export default function WebsiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070809] text-[#F4F5F7] pt-24 sm:pt-32 pb-12 px-6 md:px-12 w-full mt-auto font-sans border-t border-white/[0.08]">
      <div className="max-w-[1440px] mx-auto flex flex-col h-full">
        
        {/* Top Hero Conversion Banner */}
        <div className="pb-20 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            
            <div className="lg:col-span-8">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-4">
                INITIATE A CONVERSATION &bull; SELECTIVE Q4 ENGAGEMENTS
              </span>
              <h2 className="text-[38px] sm:text-[56px] md:text-[76px] font-extrabold tracking-[-0.035em] text-[#F4F5F7] leading-[0.98] uppercase">
                Let&apos;s make it <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2B43] to-rose-400">
                  impossible to ignore
                </span>
                .
              </h2>
            </div>

            {/* Quick Inquiry CTAs */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <a
                href="mailto:hello@creatiancy.com?subject=Studio%20Inquiry%20via%20Creatiancy"
                aria-label="Direct Email Dispatch"
                className="inline-flex items-center justify-between px-6 py-4 rounded-full bg-[#FF2B43] hover:bg-[#E01E37] text-white font-bold text-[12px] font-mono tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(255,43,67,0.35)] min-h-[48px]"
              >
                <span>Dispatch Email Brief</span>
                <span>→</span>
              </a>

              <a
                href="https://wa.me/8801325078941"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message on WhatsApp"
                className="inline-flex items-center justify-between px-6 py-4 rounded-full bg-[#0E1114] hover:bg-white/[0.06] text-[#F4F5F7] border border-white/10 text-[12px] font-mono tracking-wider uppercase transition-all min-h-[48px]"
              >
                <span>WhatsApp Direct</span>
                <span className="text-[#FF2B43]">↗</span>
              </a>
            </div>

          </div>
        </div>

        {/* Multi-Column Directory Row */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/[0.08]">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="relative w-[160px] h-[36px] mb-6">
                <Image
                  src="/logos/Creatiancy%20logo%20white.svg"
                  alt="Creatiancy"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-[14px] text-neutral-400 font-light leading-relaxed max-w-sm">
                Strategic creative and production studio. Engineering commercial distinction through brand architecture and high-performance digital platforms.
              </p>
            </div>
            <div className="pt-6 text-[11px] font-mono text-neutral-500">
              DHAKA &bull; GLOBAL CLIENTS
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FF2B43] mb-2">
              Studio
            </span>
            <Link href="/work" className="text-[14px] text-neutral-300 hover:text-[#FF2B43] transition-colors py-1">Selected Work</Link>
            <Link href="/services" className="text-[14px] text-neutral-300 hover:text-[#FF2B43] transition-colors py-1">Capabilities Bento</Link>
            <Link href="/about" className="text-[14px] text-neutral-300 hover:text-[#FF2B43] transition-colors py-1">About Studio</Link>
            <Link href="/insights" className="text-[14px] text-neutral-300 hover:text-[#FF2B43] transition-colors py-1">Insights</Link>
          </div>

          {/* Col 3: Operations & Legal */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FF2B43] mb-2">
              Operations
            </span>
            <Link href="/contact" className="text-[14px] text-neutral-300 hover:text-[#FF2B43] transition-colors py-1">Initiate Project Brief</Link>
            <Link href="/privacy" className="text-[14px] text-neutral-300 hover:text-[#FF2B43] transition-colors py-1">Privacy Notice</Link>
            <Link href="/terms" className="text-[14px] text-neutral-300 hover:text-[#FF2B43] transition-colors py-1">Terms of Engagement</Link>
          </div>

          {/* Col 4: Operations Meta */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 mb-2 block">
                Availability
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-[#FF2B43]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B43] animate-pulse" />
                <span>Open for Q4 Briefs</span>
              </div>
            </div>
            
            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono text-neutral-400 hover:text-white transition-colors min-h-[48px]"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[12px] font-mono text-neutral-500">
          <span>&copy; {new Date().getFullYear()} Creatiancy Studio. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
