"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/constants/testimonials";

const MILESTONES = [
  { value: "05", suffix: "+", label: "Years Experience" },
  { value: "120", suffix: "+", label: "Projects Completed" },
  { value: "50", suffix: "+", label: "Brands Transformed" },
  { value: "92", suffix: "%", label: "Returning Clients" },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="w-full bg-[#FAFAFA]">

      <section className="py-24 md:py-32 px-4 md:px-8 lg:px-12 w-full relative bg-white">
        <div className="max-w-[1000px] mx-auto w-full">
          
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#9B1C22] uppercase mb-4 block">Testimonials</span>
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-tight text-[#1E1E1E] leading-none">Client Stories</h2>
          </div>

          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-[#F9F9F9] rounded-[32px] md:rounded-[48px] p-8 md:p-12 lg:p-16 flex flex-col border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
              >
                <div className="mb-8 opacity-40">
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M10 11L8 15H11V19H5V15L7.5 10H10ZM19 11L17 15H20V19H14V15L16.5 10H19Z" fill="#9B1C22" />
                   </svg>
                </div>

                <p className="text-[20px] md:text-[26px] lg:text-[32px] font-normal tracking-tight text-[#1E1E1E] leading-[1.6] mb-12 md:mb-16" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                  {current.review}
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full mt-auto pt-8 border-t border-gray-200 gap-8 md:gap-0">
                  <div className="flex items-center gap-5">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-200 shadow-inner">
                      {current.image ? (
                        <Image 
                          src={current.image}
                          alt={current.imageAlt || current.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl text-gray-500 font-serif">
                          {current.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[17px] md:text-[19px] font-semibold text-[#1E1E1E] mb-1">{current.name}</span>
                      <span className="text-[12px] md:text-[13px] text-[#9B1C22] font-semibold tracking-wider uppercase">{current.designation}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={prevTestimonial}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#1E1E1E] hover:border-[#1E1E1E] hover:text-white transition-all bg-white focus:outline-none"
                      aria-label="Previous Testimonial"
                    >
                      &larr;
                    </button>
                    <button 
                      onClick={nextTestimonial}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#1E1E1E] hover:border-[#1E1E1E] hover:text-white transition-all bg-white focus:outline-none"
                      aria-label="Next Testimonial"
                    >
                      &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 w-full relative bg-white">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-12 w-full">
            {MILESTONES.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center lg:items-start lg:text-left gap-2 border-t border-[#1E1E1E]/10 pt-6 md:pt-8">
                <div className="text-[48px] sm:text-[56px] md:text-[72px] lg:text-[80px] font-medium text-[#1E1E1E] leading-none tracking-tighter">
                  {stat.value}<span className="text-[#9B1C22]">{stat.suffix}</span>
                </div>
                <p className="text-[12px] md:text-[14px] text-gray-500 font-medium uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
