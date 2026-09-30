"use client";

import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";

export default function QRStory() {
  return (
    <section
      id="qr-story"
      className="relative py-24 md:py-32 bg-[#1E1E1E] overflow-hidden border-t border-white/5"
      aria-labelledby="story-heading"
    >
      <div className="container mx-auto px-4 max-w-[1000px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Visual Canvas (Left on desktop) */}
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className="relative aspect-square bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-end p-8 group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(155,28,34,0.05),transparent_60%)] group-hover:scale-105 transition-transform duration-700 ease-out" />
              
              {/* Abstract Representation of a Scan/Portal */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-40 h-40 border border-white/5 rounded-2xl flex items-center justify-center">
                  <div className="absolute inset-2 border border-white/10 rounded-xl" />
                  <div className="absolute inset-4 border border-[#9B1C22]/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-10 h-10 text-[#9B1C22] opacity-80" strokeWidth={1.2} />
                  </div>
                  {/* Outer Scan Lines */}
                  <motion.div
                    animate={{
                      y: ["-40%", "40%", "-40%"]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute left-4 right-4 h-0.5 bg-[#9B1C22]/50 shadow-[0_0_8px_#9B1C22] pointer-events-none"
                  />
                </div>
              </div>

              <div className="relative z-10 text-xs text-neutral-500 font-semibold uppercase tracking-widest">
                The Interactive Canvas
              </div>
            </div>
          </div>

          {/* Text/Content (Right on desktop) */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#9B1C22] mb-4 block">
              The Interface of Tomorrow
            </span>
            
            <h2
              id="story-heading"
              className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6 tracking-tight leading-tight text-balance"
            >
              Bridging the gap.
            </h2>
            <p className="text-xl md:text-2xl font-heading font-light text-neutral-300 leading-relaxed mb-6 text-balance">
              Design doesn't end at the edge of the screen. We shape experiences that live in physical spaces, initiated with a simple scan, and resolved on the web.
            </p>
            
            <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 text-balance">
              By designing signature QR systems, we eliminate the friction between a hand-held catalog, a building directory, or a retail product and its premium digital space. We craft custom portals that launch instantly, load lightning fast, and adapt flawlessly to the user's viewport.
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#9B1C22]">
                Craftsmanship & Unity
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9B1C22]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
