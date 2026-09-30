"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
import "@/app/website.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2 } }
};

const approachSteps = [
  {
    num: "01",
    title: "Understand",
    desc: "Start with the problem, audience, context, and objective."
  },
  {
    num: "02",
    title: "Shape",
    desc: "Turn information into a visual direction and strategic system."
  },
  {
    num: "03",
    title: "Build",
    desc: "Translate the direction into clear, consistent visual experiences."
  },
  {
    num: "04",
    title: "Refine",
    desc: "Remove noise and strengthen what truly matters."
  }
];

const selectedWorks = [
  {
    client: "Elcardo Industrial",
    discipline: "Brand Architecture & Platform",
    year: "2026",
    slug: "elcardo"
  },
  {
    client: "AtoBD Logistics",
    discipline: "Product Design & Web Engineering",
    year: "2025",
    slug: "atobd"
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <div className="creatiancy-scope bg-[#FBFDF9]" ref={containerRef}>
      <WebsiteHeader />
      
      <main className="flex-1 w-full relative overflow-hidden">
        
        {/* Apple-style About Hero */}
        <section className="relative min-h-[60vh] md:min-h-[75vh] flex flex-col justify-center pt-32 pb-20 px-6 md:px-12 w-full z-10 bg-[#FBFDF9]">
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-[16px] md:text-[20px] font-semibold tracking-wide text-[#9B1C22] mb-2"
            >
              About Creatiancy
            </motion.div>

            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[48px] sm:text-[64px] md:text-[80px] font-semibold tracking-[-0.015em] text-[#1E1E1E] leading-[1.05]"
            >
              We turn visual problems into <br className="hidden lg:block" /> clearer, stronger ideas.
            </motion.h1>
              
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[18px] md:text-[22px] text-[#444444] max-w-2xl font-normal leading-[1.5]"
            >
              We don't just decorate surfaces. We analyze objectives, map out structural challenges, and engineer visual systems designed for longevity and commercial authority.
            </motion.p>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#1E1E1E]/10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-[40px] md:text-[72px] font-semibold tracking-[-0.03em] text-[#1E1E1E] leading-[1.1] max-w-4xl">
              Visuals are not decoration. <br className="hidden md:block" />
              <span className="text-[#9B1C22]">They are decisions.</span>
            </h2>
            <p className="mt-8 text-[18px] md:text-[20px] text-[#666666] font-light max-w-2xl leading-[1.6]">
              Every color choice, grid alignment, and typographic scale must serve a purpose. Good design is invisible logic made visible.
            </p>
          </motion.div>
        </section>

        {/* Creative Approach */}
        <section className="py-24 md:py-32 bg-[#1E1E1E] text-white px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h2 className="text-[32px] md:text-[56px] font-semibold tracking-tight">The Approach</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 border-t border-l border-[#333333]">
              {approachSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="border-r border-b border-[#333333] p-10 flex flex-col h-full hover:bg-[#252525] transition-colors duration-500"
                >
                  <span className="text-[12px] font-semibold text-[#A3A3A3] tracking-[0.2em] mb-12 block">{step.num}</span>
                  <h3 className="text-[24px] font-medium tracking-tight mb-4">{step.title}</h3>
                  <p className="text-[15px] text-[#A3A3A3] font-light leading-[1.6]">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Bridge */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-[#1E1E1E]/10 pb-12">
            <div>
              <h2 className="text-[32px] md:text-[56px] font-semibold tracking-tight text-[#1E1E1E]">Core Capabilities</h2>
            </div>
            <Link href="/services" className="mt-6 md:mt-0 text-[13px] font-bold uppercase tracking-widest text-[#9B1C22] hover:text-[#1E1E1E] transition-colors focus:outline-none">
              View All Services →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6">
            {['Brand Architecture', 'Digital Platforms', 'Enterprise UI/UX', 'Creative Technology', 'Motion Design', 'Editorial Systems'].map((cap, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href="/services" className="group flex items-center gap-4 cursor-pointer focus:outline-none">
                  <span className="w-8 h-[1px] bg-[#EAEAEA] group-hover:bg-[#9B1C22] transition-colors" />
                  <span className="text-[16px] md:text-[20px] font-medium text-[#1E1E1E] group-hover:text-[#9B1C22] transition-colors">{cap}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Selected Work Bridge */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-[#F5F5F7] rounded-3xl mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-[#1E1E1E]/10 pb-12">
            <div>
              <h2 className="text-[32px] md:text-[56px] font-semibold tracking-tight text-[#1E1E1E]">Selected Work</h2>
              <p className="mt-4 text-[#666666] font-light max-w-md">Real applications of strategy and visual systems.</p>
            </div>
            <Link href="/work" className="mt-6 md:mt-0 text-[13px] font-bold uppercase tracking-widest text-[#9B1C22] hover:text-[#1E1E1E] transition-colors focus:outline-none">
              View Full Archive →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {selectedWorks.map((work, idx) => (
              <Link 
                key={idx}
                href={`/work/${work.slug}`}
                className="group block p-8 bg-white border border-[#EAEAEA] hover:border-[#1E1E1E]/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C22]"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[11px] font-bold text-[#A3A3A3] uppercase tracking-[0.2em]">{work.year}</span>
                  <div className="w-10 h-10 rounded-full border border-[#EAEAEA] flex items-center justify-center group-hover:bg-[#1E1E1E] transition-colors duration-300">
                    <span className="text-sm transform -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all duration-300">→</span>
                  </div>
                </div>
                <h3 className="text-[28px] font-semibold tracking-tight text-[#1E1E1E] mb-2">{work.client}</h3>
                <p className="text-[14px] text-[#666666]">{work.discipline}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 md:px-12 flex flex-col items-center text-center">
          <h2 className="text-[36px] md:text-[56px] font-bold tracking-tight text-[#1E1E1E] mb-12">
            Have a visual problem <br className="hidden md:block" /> worth solving?
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link
              href="/contact"
              className="flex items-center justify-center px-6 py-3 bg-[#9B1C22] text-white rounded-full text-[15px] font-semibold transition-all duration-300 hover:bg-[#7A151A] shadow-md focus:outline-none"
            >
              Start Project
            </Link>
            <Link
              href="/work"
              className="flex items-center justify-center px-6 py-3 bg-transparent text-[#2997FF] rounded-full text-[15px] font-semibold transition-all duration-300 hover:underline focus:outline-none"
            >
              View selected work <span className="ml-1 text-[12px]">›</span>
            </Link>
          </div>
        </section>

      </main>
      <WebsiteFooter />
    </div>
  );
}
