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
      "Creatiancy brought clarity and order to our entire identity. They don't just design — they understand SaaS architecture, commercial strategy, and how to build systems that scale effortlessly.",
    avatar: "/images/founder_v2.png",
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
  {
    id: "elcardo",
    name: "Tariq Rahman",
    role: "Managing Director, Elcardo Industrial",
    quote:
      "A complete paradigm shift for our industrial brand. The UI/UX architecture and brand positioning elevated our global presence and generated an immediate surge in enterprise inquiries.",
    avatar: "/clients/hector_img.jpg",
    location: "Global Enterprise",
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

          {/* Right Column: Actual Geographic World Map ONLY behind Client Avatars */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px] md:min-h-[560px]">
            
            {/* Real World Map Image strictly on the right side behind the avatars */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-[0.22] text-white">
              <Image
                src="/images/actual_world_map.svg"
                alt="Global Clients Map"
                fill
                className="object-contain filter invert opacity-90 scale-110"
              />
            </div>

            {/* Floating Client Avatar Spheres Constellation */}
            <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] z-10">
              
              {/* Central Featured Avatar (Active Client with Red Spotlight Glow) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative group cursor-pointer">
                  {/* Atmospheric Red Halo Glow */}
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#FF4D5E]/30 via-[#9B1C22]/40 to-transparent blur-lg pointer-events-none animate-pulse" />
                  
                  {/* Main Avatar Sphere */}
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#9B1C22] shadow-[0_0_30px_rgba(155,28,34,0.5)] bg-gradient-to-br from-[#6E0F14] via-[#9B1C22] to-[#0C0708]">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      className="object-cover object-center filter saturate-125"
                    />
                    {/* Crimson vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#9B1C22]/50 via-transparent to-transparent mix-blend-color-burn" />
                  </div>
                </div>
              </div>

              {/* Orbiting Avatar 1: Top Right */}
              <div 
                onClick={() => setCurrentIndex(1)}
                className="absolute top-4 sm:top-8 right-8 sm:right-16 md:right-20 z-10 cursor-pointer group"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/15 bg-gradient-to-br from-[#A8242A]/40 to-black/80 shadow-lg group-hover:scale-105 group-hover:border-[#9B1C22] transition-all duration-300">
                  <Image
                    src={clientTestimonials[1].avatar}
                    alt={clientTestimonials[1].name}
                    fill
                    className="object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>

              {/* Orbiting Avatar 2: Mid Top Left */}
              <div 
                onClick={() => setCurrentIndex(2)}
                className="absolute top-8 sm:top-12 left-8 sm:left-14 md:left-18 z-10 cursor-pointer group"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/15 bg-gradient-to-br from-[#A8242A]/40 to-black/80 shadow-lg group-hover:scale-105 group-hover:border-[#9B1C22] transition-all duration-300">
                  <Image
                    src={clientTestimonials[2].avatar}
                    alt={clientTestimonials[2].name}
                    fill
                    className="object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>

              {/* Orbiting Avatar 3: Bottom Left */}
              <div 
                onClick={() => setCurrentIndex(0)}
                className="absolute bottom-8 sm:bottom-12 left-10 sm:left-18 md:left-24 z-10 cursor-pointer group"
              >
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 rounded-full overflow-hidden border border-white/15 bg-gradient-to-br from-[#A8242A]/40 to-black/80 shadow-lg group-hover:scale-105 group-hover:border-[#9B1C22] transition-all duration-300">
                  <Image
                    src={clientTestimonials[0].avatar}
                    alt={clientTestimonials[0].name}
                    fill
                    className="object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>

              {/* Orbiting Avatar 4: Bottom Right */}
              <div 
                onClick={() => setCurrentIndex(1)}
                className="absolute bottom-6 sm:bottom-10 right-10 sm:right-18 md:right-28 z-10 cursor-pointer group"
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/15 bg-gradient-to-br from-[#A8242A]/40 to-black/80 shadow-lg group-hover:scale-105 group-hover:border-[#9B1C22] transition-all duration-300">
                  <Image
                    src={clientTestimonials[1].avatar}
                    alt={clientTestimonials[1].name}
                    fill
                    className="object-cover opacity-65 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
