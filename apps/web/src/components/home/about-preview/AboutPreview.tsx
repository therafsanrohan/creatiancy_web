"use client";

import React from "react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

export const AboutPreview = () => {
  return (
    <section className="py-32 md:py-48 px-4 md:px-8 lg:px-12 w-full relative bg-[#050505] overflow-hidden my-0">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#9B1C22]/15 rounded-full blur-[100px] md:blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="flex flex-col items-start md:items-center text-left md:text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 mb-8 md:mb-12 backdrop-blur-md"
          >
             <span className="w-2 h-2 rounded-full bg-[#9B1C22] animate-pulse" />
             <span className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-white/80 font-medium">Creative Engineering Studio</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[36px] md:text-[64px] lg:text-[88px] font-medium tracking-tight text-[#FAFAFA] leading-[1.05] mb-12 md:mb-20 max-w-5xl text-left md:text-center"
          >
            We exist to build brands and digital products that <br className="hidden md:block"/>
            <span className="relative inline-block mt-2">
               <span className="relative z-10 italic font-serif text-[#9B1C22]">perform flawlessly</span>
               <span className="absolute bottom-2 md:bottom-4 left-0 w-full h-[30%] bg-[#9B1C22]/20 -z-10 -rotate-2 skew-x-12" />
            </span> 
            {" "}and look exceptional.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <ButtonLink href="/about" variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px]">
              Explore Creatiancy
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px] bg-white/10 text-white hover:bg-white/20 border border-white/10">
              Work With Us
            </ButtonLink>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
