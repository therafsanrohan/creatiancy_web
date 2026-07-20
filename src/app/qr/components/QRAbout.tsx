"use client";

import { motion } from "framer-motion";
import { Globe, Shield, Zap } from "lucide-react";

export default function QRAbout() {
  const principles = [
    {
      icon: Globe,
      title: "Physical Presence",
      desc: "QR codes designed to integrate seamlessly with high-end print, architecture, packaging, and interior spaces without compromising aesthetic style.",
    },
    {
      icon: Shield,
      title: "Digital Precision",
      desc: "Pixel-perfect visual design paired with robust system engineering. Portals that support secure browsing, user integrity, and structured layouts.",
    },
    {
      icon: Zap,
      title: "Performance First",
      desc: "Ultra-lightweight web pages that build and load in milliseconds, optimizing the mobile user journey at the exact moment of physical discovery.",
    },
  ];

  return (
    <section className="py-24 bg-[#1E1E1E] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1000px]">
        {/* Section Title */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400 mb-4 block">
            Our Principles
          </span>
          <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight text-balance">
            Designed for impact. Engineered for response.
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((principle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group flex flex-col p-6 bg-neutral-950 border border-white/5 rounded-2xl hover:border-white/10 hover:bg-neutral-900/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />

              <div className="mb-6 p-3 bg-[#9B1C22]/10 border border-[#9B1C22]/20 rounded-xl text-[#9B1C22] w-fit">
                <principle.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>

              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#9B1C22] transition-colors duration-300">
                {principle.title}
              </h3>

              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {principle.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
