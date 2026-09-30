"use client";

import { motion } from "framer-motion";

interface CounterProps {
  value: string;
  label: string;
}

function CounterCard({ value, label }: CounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-8 bg-neutral-900/50 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-neutral-900/80 transition-all duration-300 relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <span className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-2 group-hover:text-[#9B1C22] transition-colors duration-300">
        {value}
      </span>
      <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function ImpactCounters() {
  const stats = [
    { value: "150+", label: "Businesses Appreciated" },
    { value: "25+", label: "Cities Reached" },
    { value: "1,200+", label: "Stories Told" },
    { value: "500+", label: "Nominations Submitted" },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1E1E1E] overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1000px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <CounterCard key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}