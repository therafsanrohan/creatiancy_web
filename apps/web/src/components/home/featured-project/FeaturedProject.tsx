"use client";

import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const FeaturedProject = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl overflow-hidden bg-[#1E1E1E] text-white min-h-[500px] md:h-[700px] lg:h-[800px] flex items-end p-6 sm:p-10 md:p-16 group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        {/* Abstract background for featured */}
        <div className="absolute inset-0 bg-[#252525] group-hover:scale-105 transition-transform duration-1000"></div>

        <div className="relative z-20 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-4">Featured Case Study</span>
            <h2 className="text-[36px] md:text-[56px] font-medium tracking-tight leading-[1.1] mb-4">
              Building the future of <br className="hidden md:block" /> global logistics.
            </h2>
            <p className="text-[16px] md:text-[18px] text-white/70 max-w-md font-light leading-[1.5]">
              A complete digital transformation and brand architecture system for AtoBD.
            </p>
          </div>
          <ButtonLink href="/work/atobd" variant="primary" size="lg" className="md:shrink-0">
            View Case Study
          </ButtonLink>
        </div>
      </motion.div>
    </section>
  );
};
