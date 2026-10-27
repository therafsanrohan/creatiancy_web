"use client";

import React from "react";
import Image from "next/image";

interface PartnerBrand {
  name: string;
  src: string;
  width: number;
  height: number;
  col: number; // 1, 2, or 3
  row: number; // 1, 2, or 3
}

// 6 Partner brands arranged in the pyramid / stepped cluster
// Row 1 (top): col 1 (1 circle)
// Row 2 (mid): col 1, col 2 (2 circles)
// Row 3 (bottom): col 1, col 2, col 3 (3 circles)
const partnerBrands: PartnerBrand[] = [
  // Top tier
  { name: "Elcardo Industrial", src: "/brands/elcardo_logo_mono.png", width: 90, height: 28, col: 1, row: 1 },
  // Mid tier
  { name: "AtoBD Logistics", src: "/brands/AtoBD_logo_mono.png", width: 85, height: 26, col: 1, row: 2 },
  { name: "ODL Global", src: "/brands/odl_logo_mono.png", width: 80, height: 24, col: 2, row: 2 },
  // Bottom tier
  { name: "OMNI Connects", src: "/brands/omni_logo_mono.png", width: 90, height: 26, col: 1, row: 3 },
  { name: "Oven Brand", src: "/brands/oven_logo_mono.png", width: 80, height: 24, col: 2, row: 3 },
  { name: "Sadiq Digital", src: "/brands/s_logo_mono.png", width: 75, height: 24, col: 3, row: 3 },
];

export const TrustMarquee = () => {
  return (
    <section className="w-full relative select-none bg-[#0C0708]">
      {/* Light Surface transition with subtle, smooth top-left and top-right curve */}
      <div 
        id="trust-marquee-light" 
        className="w-full rounded-t-[24px] sm:rounded-t-[32px] md:rounded-t-[40px] bg-[#F5F5F7] py-16 sm:py-20 md:py-24 px-6 md:px-12 relative overflow-hidden"
      >
        {/* Subtle noise grain texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
          <svg className="w-full h-full">
            <filter id="trust-card-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#trust-card-noise)" />
          </svg>
        </div>

        {/* Ambient soft glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[350px] bg-[#9B1C22]/[0.035] blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Bold Typography statement matching reference */}
            <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#9B1C22] block mb-3 font-semibold">
                Strategic Alliances
              </span>

              <h2 className="text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-bold tracking-tight text-[#1D1D1F] leading-[0.98] mb-4">
                Over <span className="text-[#9B1C22]">5+</span>
                <br />
                years
              </h2>

              <p className="text-[16px] sm:text-[18px] md:text-[20px] text-[#6E6E73] font-normal tracking-tight">
                become the partners
              </p>
            </div>

            {/* Vertical hairline divider for desktop */}
            <div className="hidden lg:block lg:col-span-1 h-48 w-px bg-black/[0.08] mx-auto" />

            {/* Right Column: Circular stepped cluster layout in light theme */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-start">
              
              {/* Stepped Grid Container */}
              <div className="inline-grid grid-cols-3 gap-3 sm:gap-4 p-2 sm:p-4">
                
                {/* Row 1 */}
                <div className="flex items-center justify-center">
                  <CircleCard brand={partnerBrands[0]} />
                </div>
                <div className="pointer-events-none" />
                <div className="pointer-events-none" />

                {/* Row 2 */}
                <div className="flex items-center justify-center">
                  <CircleCard brand={partnerBrands[1]} />
                </div>
                <div className="flex items-center justify-center">
                  <CircleCard brand={partnerBrands[2]} />
                </div>
                <div className="pointer-events-none" />

                {/* Row 3 */}
                <div className="flex items-center justify-center">
                  <CircleCard brand={partnerBrands[3]} />
                </div>
                <div className="flex items-center justify-center">
                  <CircleCard brand={partnerBrands[4]} />
                </div>
                <div className="flex items-center justify-center">
                  <CircleCard brand={partnerBrands[5]} />
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// Reusable Circular Card in Light Theme (Apple-grade gradient, warm shadow, monochrome logo)
const CircleCard = ({ brand }: { brand: PartnerBrand }) => {
  return (
    <div 
      className="group relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white via-[#FAF9FA] to-[#EDECEE] border border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(155,28,34,0.12)] hover:border-[#9B1C22]/30 flex items-center justify-center p-4 transition-all duration-300 hover:scale-[1.04] cursor-pointer"
      title={brand.name}
    >
      {/* Subtle radial inner glow on hover */}
      <div className="absolute inset-0 rounded-full bg-radial from-[#9B1C22]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Clean monochrome black logo */}
      <div className="relative w-full h-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <Image
          src={brand.src}
          alt={brand.name}
          width={brand.width}
          height={brand.height}
          className="object-contain max-h-[22px] sm:max-h-[26px] md:max-h-[28px] w-auto transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default TrustMarquee;
