"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
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
      <WebsiteHeader />
      
      <main className="flex-1 w-full relative overflow-hidden">
        {/* Apple-style Work Hero */}
        <section className="relative min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center items-center text-center pt-40 pb-12 px-6 md:px-12 w-full z-10 bg-[#FBFDF9]">
          <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-[16px] md:text-[20px] font-semibold tracking-wide text-[#9B1C22] mb-2"
            >
              Portfolio
            </motion.div>

            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[48px] sm:text-[64px] md:text-[80px] font-semibold tracking-[-0.015em] text-[#1E1E1E] leading-[1.05]"
            >
              Selected Projects
            </motion.h1>
          </div>
        </section>

        <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col border-t border-[#1E1E1E]/10">
            {workItems.map((item, idx) => (
              <motion.div 
                key={item.client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
              >
                <Link 
                  href={`/work/${item.slug}`}
                  className="group py-12 md:py-16 flex flex-col md:flex-row justify-between md:items-center gap-6 border-b border-[#1E1E1E]/10 hover:bg-[#F5F5F7]/50 transition-colors cursor-pointer px-6 -mx-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9B1C22]"
                >
                  <div className="md:w-1/3">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A3A3A3] block mb-3">{item.year}</span>
                    <h2 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.02em] text-[#1E1E1E] group-hover:text-[#9B1C22] transition-colors">{item.client}</h2>
                  </div>
                  <div className="md:w-1/2">
                    <p className="text-[13px] uppercase tracking-widest text-[#1E1E1E]/50 mb-2 font-medium">{item.discipline}</p>
                    <p className="text-[18px] font-light text-[#555555] leading-[1.5]">{item.summary}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:w-auto flex md:justify-end shrink-0">
                    <div className="w-12 h-12 rounded-full border border-[#EAEAEA] flex items-center justify-center group-hover:bg-[#1E1E1E] group-hover:border-[#1E1E1E] transition-colors duration-300">
                      <span className="text-lg transform -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all duration-300">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <WebsiteFooter />
    </div>
  );
}
