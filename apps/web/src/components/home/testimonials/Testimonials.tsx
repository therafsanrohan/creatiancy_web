"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/constants/testimonials";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Icon } from "@/components/ui/Icon";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 w-full bg-[#111111] text-white border-b border-white/10 overflow-hidden">
      
      {/* Background Ambience from Real Project Visual with Dark Scrim */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/omni_branding.png"
          alt="Studio Background"
          fill
          className="object-cover filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-[#111111]/85" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-14">
          <div>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#9B1C22] block mb-2">
              VERIFIED CLIENT TESTIMONY
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold text-white tracking-tight">
              Commercial Partners
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-[8px] hover:border-white transition-colors"
              aria-label="Previous testimony"
            >
              <Icon name="ArrowLeft" size={16} />
            </button>
            <span className="text-[11px] font-mono text-white/50 px-2">
              0{currentIndex + 1} / 0{testimonials.length}
            </span>
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-[8px] hover:border-white transition-colors"
              aria-label="Next testimony"
            >
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>

        {/* Frosted Glass Card Container (Restrained over imagery) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-8">
            <GlassPanel intensity="medium" className="p-8 sm:p-12 md:p-16 h-full flex flex-col justify-between">
              <div>
                <span className="text-[36px] font-serif text-[#9B1C22] block leading-none mb-6">
                  &ldquo;
                </span>
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="text-[22px] sm:text-[28px] md:text-[36px] font-medium tracking-[-0.02em] text-white leading-[1.25] mb-8"
                  >
                    {current.review}
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 border border-white/20 shrink-0">
                  {current.image ? (
                    <Image 
                      src={current.image}
                      alt={current.imageAlt || current.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-mono text-white/60">
                      {current.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-white tracking-tight">{current.name}</h3>
                  <p className="text-[12px] font-mono tracking-wider uppercase text-[#9B1C22]">{current.designation}</p>
                </div>
              </div>
            </GlassPanel>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-8 rounded-[20px] bg-white/[0.04] border border-white/10 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase block mb-3">
                  COLLABORATION STANDARD
                </span>
                <h4 className="text-[20px] font-medium text-white mb-2">
                  Direct Founder Leadership
                </h4>
                <p className="text-[14px] text-white/60 font-light leading-relaxed">
                  Every engagement is led by senior partners. Zero junior hand-offs, no inflated account tiers.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>VERIFIED TESTIMONIALS</span>
                <span className="text-emerald-400">&bull; 100% GENUINE</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
