"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/data/home";

const MILESTONES = [
  { value: "05", suffix: "+", label: "Years Experience" },
  { value: "120", suffix: "+", label: "Projects Completed" },
  { value: "50", suffix: "+", label: "Brands Transformed" },
  { value: "92", suffix: "%", label: "Returning Clients" },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <div className="w-full bg-[#FAFAFA]">
      {/* --- CLIENT REVIEW SECTION --- */}
      <section className="py-24 md:py-32 px-4 md:px-8 lg:px-12 w-full relative">
        <div className="max-w-[1200px] mx-auto w-full">
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            
            {/* Left Column (Section Label & Image Card) */}
            <div className="w-full lg:w-[35%] flex flex-col relative pt-4 md:pt-0">
              <div className="flex flex-col max-w-[280px]">
                {/* Image Controls Row */}
                <div className="flex justify-between items-center w-full mb-4">
                  <button 
                    onClick={prevTestimonial}
                    className="px-4 h-7 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none"
                    aria-label="Previous Testimonial"
                  >
                    <span className="text-[14px] text-[#1E1E1E] leading-none mt-[-2px]">&larr;</span>
                  </button>
                  <span className="text-gray-400 text-[16px] leading-none">+</span>
                </div>

                {/* Image Box */}
                <div className="w-full aspect-[4/5] bg-gray-200 relative overflow-hidden mb-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      {/* Using a solid elegant color as a fallback if images don't exist */}
                      <div className="w-full h-full bg-[#E5EDF4] flex items-center justify-center">
                        <span className="text-[64px] text-[#1E1E1E]/10 font-serif">
                          {current.author.charAt(0)}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Labels */}
                <div className="flex justify-between items-center w-full text-[10px] font-medium uppercase tracking-wider text-[#1E1E1E]">
                  <span>HAPPY CUSTOMER</span>
                  <span>2026&copy;</span>
                </div>
              </div>
            </div>

            {/* Right Column (Quote Content) */}
            <div className="w-full lg:w-[65%] flex flex-col relative pt-8 lg:pt-[110px]">
              <span className="text-[#9B1C22] text-[80px] md:text-[120px] font-serif leading-[0.3] mb-8 block select-none">
                &ldquo;
              </span>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <p className="text-[28px] md:text-[44px] lg:text-[52px] font-medium tracking-tight text-[#1E1E1E] leading-[1.05] mb-12">
                    {current.quote}
                  </p>
                  
                  <div className="flex items-center gap-4 text-[20px] md:text-[24px] text-gray-500 mb-16 lg:mb-24">
                    <span className="block w-8 h-[2px] bg-gray-400"></span>
                    <span className="font-light">&mdash; {current.author}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Bottom Right Details & Navigation */}
              <div className="flex justify-between items-end w-full mt-auto">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center">
                    {/* Avatars */}
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-[#FAFAFA]"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#FAFAFA]"></div>
                      <div className="w-8 h-8 rounded-full bg-[#1E1E1E] border-2 border-[#FAFAFA]"></div>
                    </div>
                    <span className="ml-3 text-[14px] font-medium text-[#1E1E1E]">+1K</span>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-tight max-w-[200px]">
                    They joined not just for design, We&apos;re ready when you are.
                  </p>
                </div>
                
                {/* Next Button */}
                <button 
                  onClick={nextTestimonial}
                  className="px-4 h-7 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none"
                  aria-label="Next Testimonial"
                >
                  <span className="text-[14px] text-[#1E1E1E] leading-none mt-[-2px]">&rarr;</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- DIVIDER --- */}
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto border-t border-gray-200" />
      </div>

      {/* --- AGENCY MILESTONES SECTION --- */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 w-full relative">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            
            {/* Left Side Title */}
            <div className="w-full lg:w-[35%]">
              <span className="text-[12px] font-medium tracking-[0.1em] text-gray-500 uppercase block">
                [05] AGENCY MILESTONES
              </span>
            </div>

            {/* Right Side Stats */}
            <div className="w-full lg:w-[65%] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {MILESTONES.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="text-[56px] md:text-[64px] lg:text-[72px] font-medium text-[#1E1E1E] leading-none tracking-tighter">
                    {stat.value}<span className="text-[#9B1C22]">{stat.suffix}</span>
                  </div>
                  <p className="text-[13px] text-gray-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
