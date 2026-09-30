"use client";

import React from "react";
import { motion } from "framer-motion";
import { LOCATIONS } from "@/lib/data/home";

export const GlobalPresence = () => {
  // Extract just the names for the marquee
  const cityNames = LOCATIONS.map(l => l.name);
  const marqueeContent = [...cityNames, ...cityNames, ...cityNames, ...cityNames];

  return (
    <section className="py-24 md:py-32 w-full bg-[#FAFAFA] overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 max-w-[1200px] mx-auto w-full mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col">
            <h2 className="text-[48px] md:text-[72px] lg:text-[88px] font-medium tracking-tight text-[#1E1E1E] leading-[1]">
              Worldwide.
            </h2>
          </div>
          <p className="text-[18px] md:text-[20px] text-gray-500 font-light max-w-md leading-[1.5]">
            Operating internationally, delivering enterprise solutions and creative campaigns across North America, Europe, and Asia.
          </p>
        </div>
      </div>

      {/* Ultra-premium Scrolling Marquee */}
      <div className="relative w-full flex overflow-hidden py-10 bg-white border-y border-gray-100">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
          className="flex whitespace-nowrap items-center shrink-0"
        >
          {marqueeContent.map((city, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-[64px] md:text-[96px] font-medium tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px #D1D5DB' }}>
                {city.toUpperCase()}
              </span>
              <span className="mx-8 md:mx-16 text-[32px] text-[#9B1C22] opacity-50">&bull;</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
