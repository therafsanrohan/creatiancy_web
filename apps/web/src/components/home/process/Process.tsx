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

        {/* Process Rows */}
        <div className="w-full flex flex-col border-t border-gray-200">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col md:flex-row md:items-center py-10 md:py-16 border-b border-gray-200 hover:bg-[#FAFAFA] transition-colors px-4 md:px-8 -mx-4 md:-mx-8 rounded-2xl cursor-default"
            >
              {/* Massive Number */}
              <div className="w-full md:w-[20%] mb-4 md:mb-0">
                <span className="text-[64px] md:text-[80px] font-serif leading-none text-gray-200 group-hover:text-[#9B1C22] transition-colors duration-500">
                  0{idx + 1}
                </span>
              </div>
              
              {/* Content */}
              <div className="w-full md:w-[40%] mb-4 md:mb-0">
                <h3 className="text-[28px] md:text-[40px] font-medium text-[#1E1E1E] tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                  {step.step}
                </h3>
              </div>
              
              <div className="w-full md:w-[40%]">
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
