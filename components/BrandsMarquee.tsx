"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BrandsMarquee({ brands }: { brands: string[] }) {
  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-20 md:py-28 border-y border-[var(--muted)]/10 bg-[var(--bg)] overflow-hidden relative">
      <div className="container mx-auto px-4 mb-16 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/5 text-[var(--ruby-red)] text-[10px] font-bold tracking-widest uppercase border border-[var(--ruby-red)]/10"
        >
          Trusted By Industry Leaders
        </motion.span>
      </div>
      
      <div className="relative w-full max-w-screen-2xl mx-auto py-4">
        {/* Deep Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[var(--bg)] via-[var(--bg)]/90 to-transparent z-10 pointer-events-none" />

        {/* 2-Row Logo Wall */}
        <div className="flex flex-col gap-12 md:gap-16 relative w-full overflow-hidden">
          
          {/* Row 1 - Left */}
          <div 
            className="flex w-max animate-marquee gap-16 md:gap-32 items-center px-12"
            style={{ willChange: "transform", animationDuration: "40s" }}
          >
            {[...brands, ...brands, ...brands].map((logo, i) => (
              <div key={`r1-${i}`} className="group relative w-24 h-10 md:w-36 md:h-16 opacity-40 hover:opacity-100 transition-opacity duration-300 shrink-0">
                {logo.startsWith("placeholder") ? (
                  <div className="w-full h-full flex items-center justify-center"><span className="text-[var(--muted-fg)]/40 font-bold text-[10px] uppercase">Partner</span></div>
                ) : (
                  <Image src={`/brands/${logo}`} alt="Brand Logo" fill className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" sizes="144px" priority={i < 5} />
                )}
              </div>
            ))}
          </div>

          {/* Row 2 - Right */}
          <div 
            className="flex w-max animate-marquee gap-16 md:gap-32 items-center px-12"
            style={{ willChange: "transform", animationDirection: "reverse", animationDuration: "50s" }}
          >
            {[...brands.slice(2), ...brands.slice(0, 2), ...brands, ...brands].map((logo, i) => (
              <div key={`r2-${i}`} className="group relative w-24 h-10 md:w-36 md:h-16 opacity-40 hover:opacity-100 transition-opacity duration-300 shrink-0">
                {logo.startsWith("placeholder") ? (
                  <div className="w-full h-full flex items-center justify-center"><span className="text-[var(--muted-fg)]/40 font-bold text-[10px] uppercase">Partner</span></div>
                ) : (
                  <Image src={`/brands/${logo}`} alt="Brand Logo" fill className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" sizes="144px" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
