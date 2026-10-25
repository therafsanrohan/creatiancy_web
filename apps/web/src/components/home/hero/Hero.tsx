"use client";

import React from "react";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "framer-motion";

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
            Build a brand that knows where it&apos;s going.
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 w-full"
        >
          <p className="text-[16px] md:text-[18px] text-[#475569] font-normal max-w-2xl mx-auto leading-[1.6]">
            We connect strategy, creative direction, and digital experiences to help ambitious businesses communicate with clarity and build brands with purpose.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <ButtonLink href="/contact" variant="primary" size="lg" className="px-8 py-4">
            Start a Project
          </ButtonLink>
          <ButtonLink href="/work" variant="ghost" size="lg" className="px-8 py-4 text-[#475569] hover:text-[#1E1E1E]">
            Explore Our Work →
          </ButtonLink>
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
              Brands we&apos;ve worked with
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#E2E8F0]" />
          </div>

          <div className="relative w-full flex overflow-hidden mask-edges">
            <div 
              className="flex items-center w-max animate-smooth-marquee hover:[animation-play-state:paused]"
            >
              
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-16 md:gap-32 pr-16 md:pr-32">
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
                      className="relative group cursor-pointer flex items-center justify-center h-16 shrink-0"
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
            </div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .mask-edges {
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
            @keyframes smooth-marquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .animate-smooth-marquee {
              animation: smooth-marquee 30s linear infinite;
              will-change: transform;
            }
          `}} />
        </motion.div>
        
      </div>
    </section>
  );
};
