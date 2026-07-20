"use client";

import { motion } from "framer-motion";
import { Utensils, MapPin, Heart } from "lucide-react";

export default function FeaturedStory() {
  return (
    <section className="py-24 bg-[#1E1E1E] overflow-hidden border-t border-white/5 relative">
      <div className="container mx-auto px-4 max-w-[1000px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Text/Content Area (Left side on desktop, 7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#9B1C22]/10 rounded-xl border border-[#9B1C22]/20 text-[#9B1C22]">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#9B1C22] font-bold">
                Featured Story of Gratitude
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6 tracking-tight leading-tight text-balance">
              How a simple act of care redefined our journey.
            </h2>

            <blockquote className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6 italic text-balance">
              "We arrived in Dhaka exhausted, carrying heavy luggage and anxious about our event. The restaurant was technically closed, but the owner noticed us outside, unlocked the doors, and set up a custom dinner just for us. It wasn't about the transaction — it was pure, unadulterated human empathy."
            </blockquote>

            <div className="flex items-center gap-6 text-xs text-neutral-400">
              <div>
                <span className="text-neutral-500">Nominated by</span>{" "}
                <span className="font-bold text-white">Anisul H.</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-neutral-600" />
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase (Right side on desktop, 5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-square bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-end p-8 group">
              {/* Decorative Subtle Glowing Background Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(155,28,34,0.08),transparent_60%)] group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="w-4 h-4 text-[#9B1C22] fill-[#9B1C22]" />
                  <span className="text-xs uppercase tracking-widest font-bold">The Amber Pot</span>
                </div>
                <span className="text-xs text-neutral-400 font-light">Recipient of 12 community nominations in 2025</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}