"use client";

import React from "react";
import { motion } from "framer-motion";
import { LOCATIONS } from "@/lib/data/home";

export const GlobalPresence = () => {
  return (
    <section className="relative py-32 md:py-48 w-full bg-[#050505] overflow-hidden text-white">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#9B1C22] rounded-full blur-3xl md:blur-3xl opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 w-full flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          viewport={{ once: true, margin: "-50px" }}
whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <h2 className="text-[56px] md:text-[120px] lg:text-[150px] font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">
            WORLDWIDE
          </h2>
          <p className="text-[16px] md:text-[22px] text-gray-400 font-light mt-8 max-w-2xl mx-auto leading-[1.6]">
            Operating internationally. Delivering enterprise solutions, digital products, and creative campaigns across the globe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
          {LOCATIONS.map((loc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true, margin: "-50px" }}
whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 backdrop-blur-md overflow-hidden"
            >
              
              <div className="absolute top-8 right-8 flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#9B1C22] animate-ping opacity-40" />
                <span className="relative w-3 h-3 rounded-full bg-[#9B1C22] shadow-[0_0_15px_#9B1C22]" />
              </div>
              
              <div className="h-20" /> 
              
              <h3 className="text-[28px] md:text-[32px] font-medium text-white tracking-tight group-hover:text-[#9B1C22] transition-colors duration-500">
                {loc.name}
              </h3>

              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#9B1C22] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

