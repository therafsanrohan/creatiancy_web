"use client";

import React from "react";
import Link from "next/link";
import "@/app/website.css";

export default function NotFound() {
  return (
    <div className="creatiancy-scope min-h-[85vh] flex items-center justify-center bg-[#070809] px-6 py-32">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
        <span className="text-[12px] font-mono font-semibold text-[#FF2B43] uppercase tracking-[0.2em] px-4 py-1.5 bg-white/[0.04] border border-white/10 rounded-full">
          Error 404 &bull; Page Not Found
        </span>

        <h1 className="text-[48px] sm:text-[68px] md:text-[84px] font-bold tracking-tight text-[#F4F5F7] leading-[1] uppercase">
          Lost in the grid.
        </h1>

        <p className="text-[16px] md:text-[18px] text-neutral-400 font-light leading-relaxed max-w-lg">
          The page or case study you are looking for has been moved, archived, or does not exist in our current directory.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FF2B43] text-[#070809] rounded-full text-[13px] font-bold font-mono tracking-wider uppercase hover:bg-[#E01E37] transition-colors min-h-[48px]"
          >
            Studio Homepage
          </Link>
          <Link 
            href="/work"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/15 text-[#F4F5F7] rounded-full text-[13px] font-medium font-mono tracking-wider uppercase hover:border-[#FF2B43] hover:text-[#FF2B43] transition-colors min-h-[48px]"
          >
            Explore Work
          </Link>
        </div>

        <div className="pt-12 border-t border-white/[0.08] w-full flex justify-center gap-8 text-[12px] font-mono text-neutral-400">
          <Link href="/services" className="hover:text-[#FF2B43]">Capabilities</Link>
          <Link href="/about" className="hover:text-[#FF2B43]">About Studio</Link>
          <Link href="/contact" className="hover:text-[#FF2B43]">Contact</Link>
        </div>
      </div>
    </div>
  );
}
