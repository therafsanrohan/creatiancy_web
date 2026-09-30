"use client";

import React from "react";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { CLIENTS } from "@/lib/data/home";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-white">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#9B1C22]/10 blur-3xl opacity-80" />
        
        <div className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#9B1C22]/10 blur-3xl opacity-80" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center text-center mt-10 lg:mt-16">

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 w-full"
        >
          <h1 className="text-[12vw] sm:text-[60px] md:text-[80px] lg:text-[96px] font-bold tracking-tighter text-[#0F172A] leading-[1.05] max-w-4xl mx-auto">
            Building bold brands with thoughtful design
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 w-full"
        >
          <p className="text-[16px] md:text-[18px] text-[#475569] font-normal max-w-2xl mx-auto leading-[1.6]">
            At Creatiancy, we design brands, digital experiences, and campaigns that dominate the market, guiding you from strategy to success.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-8"
        >
          
          <ButtonLink href="/work" variant="secondary" size="lg" className="flex items-center gap-2 px-8 py-4">
            <span className="text-white !text-white font-medium">Explore Work</span>
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center ml-2">
              <svg className="text-black" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </ButtonLink>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#E2E8F0] overflow-hidden flex items-center justify-center relative shadow-sm">
                  
                  {i === 1 ? (
                    <img src="/clients/hector_img.jpg" alt="Client" className="w-full h-full object-cover relative z-10" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${i === 2 ? 'from-[#9B1C22]/30 to-[#9B1C22]/50' : i === 3 ? 'from-orange-200 to-amber-200' : 'from-purple-200 to-pink-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="flex gap-0.5 text-amber-400 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>
              <span className="text-[13px] text-[#64748B] font-medium">Trusted by global clients</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-24 md:mt-32 flex flex-col items-center overflow-hidden"
        >
          <div className="w-full flex items-center justify-center gap-4 mb-12 opacity-70 px-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#E2E8F0]" />
            <span className="text-[13px] text-[#64748B] font-medium tracking-wide">
              Loved by big and small brands around the world
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#E2E8F0]" />
          </div>

          <div className="relative w-full flex overflow-hidden mask-edges">
            <motion.div 
              className="flex items-center gap-16 md:gap-32 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-16 md:gap-32">
                  {[
                    { name: "Elcardo", src: "/brands/elcardo_logo.png", width: 140, height: 45 },
                    { name: "AtoBD", src: "/brands/AtoBD_logo.png", width: 110, height: 45 },
                    { name: "ODL", src: "/brands/odl_logo.png", width: 100, height: 45 },
                    { name: "Oven", src: "/brands/oven_logo.png", width: 105, height: 45 },
                    { name: "Omni", src: "/brands/omni_logo.png", width: 125, height: 45 },
                    { name: "S", src: "/brands/s_logo.png", width: 65, height: 45 }
                  ].map((logo) => (
                    <div 
                      key={`${i}-${logo.name}`}
                      className="relative group cursor-pointer flex items-center justify-center h-16"
                    >
                      
                      <div className="relative w-full h-full flex items-center justify-center grayscale brightness-0 opacity-50 group-hover:opacity-100 transition-all duration-500 hover:scale-105">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={logo.src} 
                          alt={`${logo.name} Logo`} 
                          style={{ 
                            maxWidth: `${logo.width}px`, 
                            maxHeight: `${logo.height}px`,
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain'
                          }} 
                          className="block"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .mask-edges {
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
          `}} />
        </motion.div>
        
      </div>
    </section>
  );
};
