"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BrandsMarquee({ brands }: { brands: string[] }) {
  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-24 border-y border-[var(--muted)]/20 bg-[var(--bg)] overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--ruby-red)_0%,transparent_100%)] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 mb-16 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-[10px] font-bold tracking-widest uppercase border border-[var(--ruby-red)]/20"
        >
          Trusted By Industry Leaders
        </motion.span>
      </div>
      
      <div className="relative flex w-full max-w-screen-2xl mx-auto">
        {/* Deep Gradients for smooth fade in/out at the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[var(--bg)] via-[var(--bg)]/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Animation Block - Optimized for GPU */}
        <div 
          className="flex w-max animate-marquee gap-12 md:gap-24 items-center px-12"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          {[...brands, ...brands, ...brands, ...brands].map((logo, i) => (
            <div 
              key={i} 
              className="group relative w-32 h-16 md:w-40 md:h-20 opacity-40 hover:opacity-100 transition-all duration-300 shrink-0 hover:scale-105 cursor-pointer"
              style={{ willChange: "transform, opacity" }}
            >
              {logo.startsWith("placeholder") ? (
                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-[var(--muted-fg)]/20 rounded-2xl bg-[var(--muted)]/5 group-hover:bg-[var(--muted)]/10 transition-colors">
                  <span className="text-[var(--muted-fg)]/40 font-bold text-xs uppercase tracking-wider">Partner</span>
                </div>
              ) : (
                <Image
                  src={`/brands/${logo}`}
                  alt={`Trusted Brand Partner Logo ${i}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 160px"
                  priority={i < 10} // Preload first set to prevent pop-in lag
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
