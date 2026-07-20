"use client";

import { motion } from "framer-motion";
import { Heart, BookOpen, Sparkles } from "lucide-react";

export default function AboutProject() {
  const pillars = [
    {
      icon: Heart,
      title: "Human Focus",
      desc: "Putting the spotlight on the actual individuals and workers who deliver incredible care.",
    },
    {
      icon: BookOpen,
      title: "Real Narratives",
      desc: "Moving beyond stars and checkmarks to capture genuine, heart-warming experiences.",
    },
    {
      icon: Sparkles,
      title: "Design for Good",
      desc: "Using the power of creative design to build gratitude tools and bring people together.",
    },
  ];

  return (
    <section className="py-24 bg-[#1E1E1E] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1000px]">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Block */}
          <div className="lg:col-span-5">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#9B1C22] mb-4">
              Our Vision
            </h2>
            <h3 className="text-3xl font-heading font-extrabold text-white mb-6 tracking-tight leading-tight text-balance">
              Building a world of active appreciation.
            </h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed text-balance">
              The Gratitude Project is a non-commercial, design-driven initiative by Creatiancy. We believe that acknowledging service, detail, and craftsmanship builds a healthier community.
            </p>
          </div>

          {/* Right Block (Pillars) */}
          <div className="lg:col-span-7 space-y-4">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="flex items-start gap-4 p-5 bg-neutral-950 border border-white/5 rounded-2xl"
              >
                <div className="p-3 bg-[#9B1C22]/10 border border-[#9B1C22]/20 rounded-xl text-[#9B1C22] shrink-0">
                  <p.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{p.title}</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}