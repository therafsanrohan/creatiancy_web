"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BrandsMarquee({ brands }: { brands: string[] }) {
  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-24 border-y border-[var(--muted)]/50 bg-[var(--bg)] overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-widest uppercase text-[var(--muted-fg)] drop-shadow-sm"
        >
          Trusted By Industry Leaders
        </motion.span>
      </div>
      <div className="relative flex w-full">
        {/* Gradients for smooth fade in/out at the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        
        {/* Marquee Animation Block */}
        <div className="flex w-max animate-marquee gap-16 md:gap-32 items-center px-16">
          {[...brands, ...brands, ...brands, ...brands].map((logo, i) => (
            <div key={i} className="relative w-32 h-16 opacity-50 hover:opacity-100 transition-all filter grayscale hover:grayscale-0 duration-300 shrink-0 hover:scale-110">
              {logo.startsWith("placeholder") ? (
                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-[var(--muted-fg)]/30 rounded-xl">
                  <span className="text-[var(--muted-fg)]/50 font-bold text-xs">CLIENT LOGO</span>
                </div>
              ) : (
                <Image 
                  src={`/brands/${logo}`} 
                  alt={`Trusted Brand Partner Logo ${i}`} 
                  fill 
                  className="object-contain" 
                  sizes="128px"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
