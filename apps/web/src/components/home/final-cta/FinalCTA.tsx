"use client";

import React from "react";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const FinalCTA = () => {
  return (
    <section className="relative py-40 md:py-64 px-4 md:px-8 lg:px-12 w-full bg-[#1E1E1E] overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#9B1C22] rounded-full blur-[120px] md:blur-[180px]"
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[48px] md:text-[80px] lg:text-[110px] font-medium tracking-tighter text-white leading-[0.9] mb-12"
        >
          Let&apos;s Bring Your <br />
          <span className="italic text-[#9B1C22] font-serif">Vision To Life</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <ButtonLink href="mailto:creatiancy@gmail.com" variant="primary" size="lg" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 text-[16px] md:text-[18px] rounded-full shadow-[0_0_40px_rgba(155,28,34,0.4)] hover:shadow-[0_0_60px_rgba(155,28,34,0.6)] transition-shadow">
            Mail Us
          </ButtonLink>
          <ButtonLink href="https://wa.me/8801325078941" target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 text-[16px] md:text-[18px] rounded-full bg-white text-black !text-black hover:bg-[#25D366] hover:!text-white transition-colors">
            WhatsApp
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
};
