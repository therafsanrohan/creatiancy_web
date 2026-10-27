"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const FeaturedProject = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-[#FBFDF9]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-[#1E1E1E] text-white min-h-[440px] md:h-[600px] lg:h-[700px] flex items-end group"
        >
          {/* Background image — real OMNI project */}
          <Image
            src="/images/omni_branding.png"
            alt="OMNI CONNECTS — Brand identity and digital system by Creatiancy"
            fill
            className="object-cover transition-transform duration-[1400ms] ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 1400px"
            priority={false}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Restrained Frosted Glass Content Panel over Real Project Imagery */}
          <div className="relative z-20 w-full p-6 sm:p-8 md:p-12">
            <div className="p-6 sm:p-8 md:p-10 rounded-[20px] md:rounded-[24px] bg-black/40 backdrop-blur-[20px] saturate-[140%] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#9B1C22] uppercase px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                    FEATURED RECORD
                  </span>
                  <span className="text-[11px] font-mono text-white/60">2025</span>
                </div>
                <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight text-white leading-[1.05] mb-3">
                  OMNI CONNECTS
                </h2>
                
                {/* Visual Discipline Tag Chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
                    Brand Architecture
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
                    Geometric Mark
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
                    SaaS Design System
                  </span>
                </div>
              </div>

              <ButtonLink
                href="/work/omni-connects"
                variant="primary"
                size="md"
                className="md:shrink-0"
              >
                Case Study
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
