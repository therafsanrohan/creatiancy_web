"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
      
      <main className="flex-1 w-full relative overflow-hidden">

        <section className="relative min-h-[75vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 md:px-12 w-full z-10 bg-[#050505] overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[20%] -left-[10%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-gradient-to-br from-[#9B1C22]/40 to-transparent rounded-full blur-3xl md:blur-3xl"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#9B1C22]/20 rounded-full blur-3xl"
            />
          </div>
          
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center gap-6 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[110px] font-semibold tracking-tighter text-white leading-[1.05]"
            >
              We don't just design<br />
              We <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#9B1C22]">solve problems</span>
            </motion.h1>
              
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[18px] md:text-[24px] text-white/60 max-w-3xl font-light leading-[1.6]"
            >
              We are a strategic creative agency that engineers visual systems designed for longevity, clarity, and commercial authority.
            </motion.p>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#1E1E1E]/10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            
whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

        <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-12">
            <div>
              <span className="text-[14px] font-bold tracking-[0.2em] text-[#9B1C22] uppercase mb-4 block">Our Expertise</span>
              <h2 className="text-[40px] md:text-[64px] font-semibold tracking-tight text-[#1E1E1E] leading-none">Core Capabilities</h2>
            </div>
            <Link href="/services" className="mt-8 md:mt-0 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#9B1C22] hover:bg-[#7A151A] !text-white transition-all duration-300 text-[14px] font-medium shadow-md hover:shadow-lg focus:outline-none group">
              Explore All Services 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          
          <div className="flex flex-col w-full border-t border-[#1E1E1E]/10">
            {['Brand Architecture', 'Digital Platforms', 'Enterprise UI/UX', 'Creative Technology', 'Motion Design', 'Editorial Systems'].map((cap, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                
whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group border-b border-[#1E1E1E]/10 relative overflow-hidden"
              >
                <Link href="/services" className="flex items-center justify-between py-8 md:py-12 px-4 relative z-10 w-full focus:outline-none">
                   <div className="flex items-baseline gap-6 md:gap-12">
                     <span className="text-[14px] md:text-[18px] font-mono text-[#A3A3A3] group-hover:text-white/70 transition-colors duration-500">0{i+1}</span>
                     <h3 className="text-[28px] md:text-[48px] lg:text-[64px] font-medium text-[#1E1E1E] group-hover:text-white tracking-tighter transition-colors duration-500">{cap}</h3>
                   </div>
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#1E1E1E]/10 flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all duration-500 shrink-0">
                     <span className="text-[#1E1E1E] -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-lg md:text-xl">→</span>
                   </div>
                </Link>

                <div className="absolute inset-0 bg-[#9B1C22] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
              </motion.div>
            ))}
          </div>
        </section>

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

        <section className="relative py-40 md:py-64 px-4 md:px-8 lg:px-12 w-full bg-[#050505] overflow-hidden mt-12 mb-0">
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-r from-[#9B1C22]/20 to-transparent rounded-full blur-3xl md:blur-3xl"
            />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              
whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[56px] sm:text-[80px] md:text-[120px] font-medium tracking-tighter text-white leading-[0.9] mb-12"
            >
              Have a visual problem <br className="hidden md:block" />
              <span className="italic text-[#9B1C22] font-serif">worth solving?</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              
whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link 
                href="/contact" 
                className="w-full sm:w-auto h-14 md:h-16 flex items-center justify-center px-8 md:px-12 bg-[#9B1C22] !text-white text-[16px] md:text-[18px] font-medium rounded-full shadow-[0_0_40px_rgba(155,28,34,0.4)] hover:shadow-[0_0_60px_rgba(155,28,34,0.6)] hover:-translate-y-1 transition-all"
              >
                Start Project
              </Link>
              <Link 
                href="/work" 
                className="w-full sm:w-auto h-14 md:h-16 flex items-center justify-center px-8 md:px-12 bg-white !text-black text-[16px] md:text-[18px] font-medium rounded-full hover:bg-gray-200 hover:-translate-y-1 transition-all"
              >
                View Selected Work
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
