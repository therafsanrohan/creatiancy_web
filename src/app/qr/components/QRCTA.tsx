"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function QRCTA() {
  return (
    <section className="py-24 bg-[#1E1E1E] border-t border-white/5 overflow-hidden" id="qr-cta">
      <div className="container mx-auto px-4 max-w-[800px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-neutral-950 border border-white/5 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(155,28,34,0.06),transparent_60%)] pointer-events-none" />

          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#9B1C22] mb-4 block">
            Initiate a Project
          </span>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-6 tracking-tight leading-tight text-balance">
            Ready to design your digital gateway?
          </h2>

          <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-lg mx-auto mb-10 text-balance">
            Let's discuss how we can bridge your physical spaces, catalogs, or packaging with a signature digital encounter built specifically for your brand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:business@creatiancy.com"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-[#9B1C22] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#85181D] active:scale-98 shadow-[0_4px_20px_rgba(155,28,34,0.15)]"
            >
              <span>Partner with Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a
              href="https://www.creatiancy.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-neutral-900 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-neutral-800 hover:border-white/20 active:scale-98"
            >
              <Mail className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              <span>Contact Studio</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
