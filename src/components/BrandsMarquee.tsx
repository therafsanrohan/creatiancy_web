"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Explicit details map for brand logos to resolve oversized requests (w=3840) and set accurate alt texts.
const BRAND_DETAILS: Record<string, { alt: string; width: number; height: number }> = {
  "AtoBD_logo.png": { alt: "AtoBD logo", width: 160, height: 60 },
  "elcardo_logo.png": { alt: "Elcardo logo", width: 160, height: 60 },
  "odl_logo.png": { alt: "ODL Ads Creative logo", width: 160, height: 60 },
  "omni_logo.png": { alt: "OMNI CONNECTS logo", width: 160, height: 60 },
  "oven_logo.png": { alt: "Oven logo", width: 160, height: 60 },
  "s_logo.png": { alt: "S brand logo", width: 160, height: 60 },
};

export default function BrandsMarquee({ brands }: { brands: string[] }) {
  if (!brands || brands.length === 0) return null;

  // Helper to resolve brand properties safely
  const getBrandDetails = (logo: string) => {
    return BRAND_DETAILS[logo] || { alt: `${logo.replace(/_logo\..*$/i, "")} logo`, width: 160, height: 60 };
  };

  return (
    <section className="py-12 md:py-16 border-y border-[var(--muted)]/10 bg-[var(--bg)] overflow-hidden relative">
      <div className="container mx-auto px-4 mb-10 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/5 text-[var(--ruby-red)] text-[10px] font-bold tracking-widest uppercase border border-[var(--ruby-red)]/10"
        >
          Trusted By Industry Leaders
        </motion.span>
      </div>
      
      <div className="relative w-full max-w-screen-2xl mx-auto py-2">
        {/* Deep Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-56 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-56 bg-gradient-to-l from-[var(--bg)] via-[var(--bg)]/90 to-transparent z-10 pointer-events-none" />

        {/* 1-Row Logo Wall */}
        <div className="flex relative w-full overflow-hidden">
          <div 
            className="flex w-max animate-marquee gap-14 md:gap-28 items-center px-12"
            style={{ willChange: "transform", animationDuration: "25s" }}
          >
            {/* Set 1: Original (accessible to assistive tech) */}
            {brands.map((logo, i) => {
              const detail = getBrandDetails(logo);
              return (
                <div key={`brand-orig-${i}`} className="group relative w-20 h-8 md:w-28 md:h-12 opacity-35 hover:opacity-100 transition-opacity duration-300 shrink-0 flex items-center justify-center">
                  {logo.startsWith("placeholder") ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[var(--muted-fg)]/40 font-bold text-[10px] uppercase">Partner</span>
                    </div>
                  ) : (
                    <Image 
                      src={`/brands/${logo}`} 
                      alt={detail.alt} 
                      width={detail.width} 
                      height={detail.height} 
                      unoptimized
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 max-w-full max-h-full" 
                      priority={i < 4}
                    />
                  )}
                </div>
              );
            })}

            {/* Set 2: Cloned (duplicated loop set, completely hidden from screen readers) */}
            {brands.map((logo, i) => {
              const detail = getBrandDetails(logo);
              return (
                <div key={`brand-clone-${i}`} aria-hidden="true" className="group relative w-20 h-8 md:w-28 md:h-12 opacity-35 hover:opacity-100 transition-opacity duration-300 shrink-0 flex items-center justify-center">
                  {logo.startsWith("placeholder") ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[var(--muted-fg)]/40 font-bold text-[10px] uppercase">Partner</span>
                    </div>
                  ) : (
                    <Image 
                      src={`/brands/${logo}`} 
                      alt={detail.alt} 
                      width={detail.width} 
                      height={detail.height} 
                      sizes="160px" 
                      quality={85}
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 max-w-full max-h-full" 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
