"use client";

import React from "react";
import Image from "next/image";

const clientLogos = [
  { name: "Elcardo Industrial", src: "/brands/elcardo_logo.png", width: 130, height: 38 },
  { name: "AtoBD Logistics", src: "/brands/AtoBD_logo.png", width: 120, height: 36 },
  { name: "ODL Global", src: "/brands/odl_logo.png", width: 100, height: 34 },
  { name: "OMNI Connects", src: "/brands/omni_logo.png", width: 130, height: 36 },
  { name: "Oven Brand", src: "/brands/oven_logo.png", width: 105, height: 34 },
  { name: "Sadiq Digital", src: "/brands/s_logo.png", width: 95, height: 32 },
];

export const TrustMarquee = () => {
  return (
    <div className="w-full py-8 sm:py-10 border-y border-white/[0.08] bg-[#070809]/90 backdrop-blur-md overflow-hidden relative select-none">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-5">
        <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          Trusted by ambitious founders &amp; leaders
        </span>
      </div>

      <div className="relative w-full overflow-hidden mask-fade">
        <div className="animate-marquee-infinite flex items-center gap-14 sm:gap-20">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="flex items-center gap-14 sm:gap-20 group cursor-pointer shrink-0"
            >
              <div className="relative flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain max-h-[38px] w-auto brightness-200 contrast-125 hover:brightness-100 hover:contrast-100 transition-all duration-300"
                />
              </div>
              <span className="text-[#FF2B43] text-xs font-mono select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustMarquee;
