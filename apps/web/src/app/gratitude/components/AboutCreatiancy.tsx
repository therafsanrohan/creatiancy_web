"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function AboutCreatiancy() {
  return (
    <section className="py-24 bg-[#1E1E1E] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[800px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Masked White Logo */}
          <div className="relative w-48 h-12 mb-8 transition-transform hover:scale-105 duration-300">
            <div
              className="w-full h-full bg-white"
              style={{
                WebkitMaskImage: 'url("/logos/Creatiancy logo.svg")',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskImage: 'url("/logos/Creatiancy logo.svg")',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain'
              }}
            />
          </div>

          <h3 className="text-xl md:text-2xl font-heading font-extrabold text-white mb-4 tracking-tight">
            Designed & Developed by Creatiancy
          </h3>
          
          <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-xl mb-8 text-balance">
            Creatiancy is a boutique digital design and development studio. We build precision brand identity systems and high-performance web applications that connect, perform, and scale.
          </p>

          <a
            href="https://www.creatiancy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-neutral-900 border border-white/10 text-white px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all duration-300 active:scale-95 hover:border-white/20"
          >
            <span>Visit the Studio</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}