"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import "@/app/website.css";

const workItems = [
  { client: "Elcardo Industrial", discipline: "Brand Architecture & Platform", year: "2026", summary: "Industrial manufacturing digital presence.", slug: "elcardo" },
  { client: "AtoBD Logistics", discipline: "Digital Systems", year: "2025", summary: "Real-time nationwide logistics interface.", slug: "atobd" },
  { client: "ODL Global", discipline: "Creative Technology", year: "2025", summary: "Hardware and security enterprise web experience.", slug: "odl" },
  { client: "Oven Brand", discipline: "Identity & Visual Direction", year: "2024", summary: "Modern culinary and packaging identity.", slug: "oven" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2 } }
};

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityOffset = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="creatiancy-scope bg-[#FBFDF9]" ref={containerRef}>
      
      <main className="flex-1 w-full relative overflow-hidden">
        
        <section className="relative min-h-[45vh] md:min-h-[55vh] flex flex-col justify-end pt-32 pb-24 px-6 md:px-12 w-full z-10 bg-[#FBFDF9] overflow-hidden">
          
          <div className="w-full max-w-[1400px] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 md:gap-8">
              
              <div className="flex-1 relative">
                
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute -top-10 -left-10 w-40 h-40 bg-[#9B1C22]/10 rounded-full blur-[40px] pointer-events-none"
                />

                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[64px] sm:text-[80px] md:text-[110px] lg:text-[130px] font-semibold tracking-tighter text-[#1E1E1E] leading-[1.1]"
                >
                  Selected <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E1E1E] to-[#888888] pb-2 pr-2 inline-block">Case Studies</span><span className="text-[#9B1C22]">.</span>
                </motion.h1>
              </div>

              <div className="md:w-[450px] shrink-0 md:pb-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="pl-6 md:pl-10 border-l-[2px] border-[#1E1E1E]/10"
                >
                  <p className="text-[18px] md:text-[22px] text-gray-500 font-light leading-[1.6]">
                    We build rigorous brand systems and immersive digital experiences. Here is a curated selection of our most impactful work.
                  </p>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        <section className="pb-32 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col gap-24 md:gap-32 w-full mt-12">
            {workItems.map((item, idx) => (
              <motion.div 
                key={item.client}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col md:flex-row items-center gap-12 lg:gap-20 w-full"
              >
                
                <div className={`w-full md:w-1/2 aspect-[4/3] rounded-[32px] overflow-hidden bg-gray-100 relative ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
                   
                   <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1] flex items-center justify-center">
                     <span className="text-[120px] md:text-[180px] font-serif text-black/5 opacity-50 select-none">
                       0{idx + 1}
                     </span>
                   </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-start">
                  <span className="text-[12px] font-bold tracking-[0.2em] text-[#9B1C22] uppercase mb-4">{item.discipline} &bull; {item.year}</span>
                  <h2 className="text-[40px] md:text-[56px] font-semibold tracking-tight text-[#1E1E1E] leading-none mb-6">
                    {item.client}
                  </h2>
                  <p className="text-[18px] md:text-[22px] font-light text-gray-500 leading-[1.6] max-w-[500px] mb-10">
                    {item.summary}
                  </p>
                  
                  <Link 
                    href={`/work/${item.slug}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E1E1E] !text-white rounded-full text-[15px] font-medium transition-all hover:bg-[#9B1C22] hover:-translate-y-1 focus:outline-none shadow-md"
                  >
                    View Case Study <span className="text-lg leading-none">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
