"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data/home";

export const Process = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-12 w-full relative bg-white">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="flex flex-col">
            <h2 className="text-[48px] md:text-[72px] lg:text-[88px] font-medium tracking-tight text-[#1E1E1E] leading-[1]">
              Our Process.
            </h2>
          </div>
          <p className="text-[18px] md:text-[20px] text-gray-500 font-light max-w-sm leading-[1.5]">
            A systematic, collaborative approach to solving visual and technical challenges for ambitious brands.
          </p>
        </div>

        {/* Creative Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col p-8 md:p-12 rounded-[32px] overflow-hidden group border border-[#1E1E1E]/5 bg-[#FAFAFA] hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
            >
              {/* Massive Number Background */}
              <span className="text-[140px] font-bold tracking-tighter text-[#1E1E1E]/5 group-hover:text-[#9B1C22]/10 transition-colors duration-500 absolute -bottom-6 -right-4 leading-none select-none">
                0{idx + 1}
              </span>
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-16 md:gap-24">
                <h3 className="text-[28px] md:text-[36px] font-medium text-[#1E1E1E] tracking-tight">
                  {step.step}
                </h3>
                <p className="text-[16px] md:text-[18px] text-gray-500 font-light leading-[1.6]">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
