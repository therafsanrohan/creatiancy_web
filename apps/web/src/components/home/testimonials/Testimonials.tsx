"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  location: string;
}

const clientTestimonials: ClientTestimonial[] = [
  {
    id: "hector",
    name: "Hector Oviedo",
    role: "Founder & CEO, OMNI CONNECTS",
    quote:
      "Amazing company to work with. They treat you like family with respect and kindness and customer service is A+. A company driven to meet your standards.",
    avatar: "/clients/hector_img.jpg",
    location: "Miami, USA",
  },
  {
    id: "awais",
    name: "Awais Sadiq",
    role: "Founder, Sadiq Digital",
    quote:
      "The communication was exceptional, and they are masters at their craft. They made sure to deliver the absolute best and worked relentlessly with us to achieve world-class results.",
    avatar: "/clients/Awais_img.webp",
    location: "London, UK",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % clientTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + clientTestimonials.length) % clientTestimonials.length);
  };

  const current = clientTestimonials[currentIndex];

  return (
    <section 
      id="testimonials"
      className="relative w-full bg-[#0C0708] text-white py-24 sm:py-32 md:py-40 px-6 md:px-12 overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Ambient Crimson Background Spotlights */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[550px] h-[400px] bg-[#9B1C22]/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[450px] bg-[#9B1C22]/12 blur-[200px] pointer-events-none rounded-full" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Testimonial Quote, Nav Buttons, Massive Quotation Mark */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            
            {/* Header: What clients Feedback */}
            <div className="mb-10 sm:mb-14">
              <h2 className="text-[40px] sm:text-[54px] md:text-[64px] lg:text-[72px] font-bold tracking-tight text-white leading-[1.05]">
                What clients
                <br />
                <span className="text-[#9B1C22]">Feedback</span>
              </h2>
            </div>

            {/* Testimonial Quote */}
            <div className="min-h-[160px] sm:min-h-[180px] mb-8">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-[18px] sm:text-[22px] md:text-[24px] text-white/90 font-normal leading-relaxed text-pretty"
                >
                  &ldquo;{current.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author Details & Directional Controls */}
            <div className="flex items-center gap-6 sm:gap-8 mb-12 sm:mb-16">
              {/* Prev Button */}
              <button
                onClick={prevTestimonial}
                aria-label="Previous client testimonial"
                className="w-10 h-10 rounded-full bg-white text-[#0C0708] hover:bg-[#9B1C22] hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-md active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Author & Role */}
              <div className="flex flex-col">
                <span className="text-[17px] sm:text-[19px] font-bold text-white tracking-tight leading-tight">
                  {current.name}
                </span>
                <span className="text-[13px] sm:text-[14px] text-neutral-400 font-normal">
                  {current.role}
                </span>
              </div>

              {/* Next Button */}
              <button
                onClick={nextTestimonial}
                aria-label="Next client testimonial"
                className="w-10 h-10 rounded-full bg-white text-[#0C0708] hover:bg-[#9B1C22] hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-md active:scale-95"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Massive Double Quotation Mark Glyph */}
            <div className="opacity-25 select-none">
              <svg 
                className="w-16 h-16 sm:w-20 sm:h-20 fill-white" 
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

          </div>

          {/* Right Column: Invisible Axis Constellation (Active Client on Left, Others on Subtle Dark Side) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
            
            {/* Real World Map Image strictly in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-[0.16] text-white">
              <Image
                src="/images/actual_world_map.svg"
                alt="Global Clients Map"
                fill
                className="object-contain filter invert opacity-90 scale-105"
              />
            </div>

            {/* Invisible Orbital Axis Track: Active Client Always on the Left Side, Others arranged on the right */}
            <div className="relative w-full max-w-xl flex items-center justify-start gap-5 sm:gap-8 px-4 z-10">
              {(() => {
                const activeItem = clientTestimonials[currentIndex];
                const otherItems = clientTestimonials
                  .map((item, originalIndex) => ({ item, originalIndex }))
                  .filter(({ originalIndex }) => originalIndex !== currentIndex);
                
                const orderedItems = [
                  { item: activeItem, originalIndex: currentIndex, isActive: true },
                  ...otherItems.map(o => ({ ...o, isActive: false }))
                ];

                return orderedItems.map(({ item, originalIndex, isActive }) => {
                  return (
                    <motion.div
                      layout
                      key={item.id}
                      onClick={() => setCurrentIndex(originalIndex)}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="flex flex-col items-center cursor-pointer group select-none"
                    >
                      {/* Compact Avatar Frame with Dynamic Left/Right State */}
                      <div className="relative">
                        {/* Active Red Accent Halo */}
                        {isActive && (
                          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#FF4D5E]/30 to-[#9B1C22]/40 blur-md pointer-events-none animate-pulse" />
                        )}

                        {/* Avatar Image Frame */}
                        <div
                          className={`relative rounded-full overflow-hidden transition-all duration-500 ease-out ${
                            isActive
                              ? "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-2 border-[#9B1C22] shadow-[0_0_28px_rgba(155,28,34,0.55)] scale-100"
                              : "w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 border border-white/10 opacity-35 group-hover:opacity-75 group-hover:border-white/30"
                          } bg-[#151518]`}
                        >
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            className={`object-cover object-center transition-all duration-500 ${
                              isActive
                                ? "grayscale-0 contrast-105"
                                : "grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90"
                            }`}
                          />
                          {/* Soft Dark Overlay for Inactive Clients */}
                          {!isActive && (
                            <div className="absolute inset-0 bg-black/45 group-hover:bg-transparent transition-colors" />
                          )}
                        </div>
                      </div>

                      {/* Name & Location Indicator */}
                      <div className="mt-3 text-center">
                        <span
                          className={`text-[12px] sm:text-[13px] font-medium tracking-tight block transition-colors ${
                            isActive ? "text-white font-semibold" : "text-white/40 group-hover:text-white/70"
                          }`}
                        >
                          {item.name.split(" ")[0]}
                        </span>
                        <span className="text-[10px] font-mono text-[#86868B] block">
                          {item.location.split(",")[0]}
                        </span>
                      </div>
                    </motion.div>
                  );
                });
              })()}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
