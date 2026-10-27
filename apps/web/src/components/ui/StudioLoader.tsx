"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const StudioLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling while loader is active
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="studio-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#070506] select-none pointer-events-auto overflow-hidden"
        >
          {/* Subtle ambient spotlight in background */}
          <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#9B1C22]/25 via-transparent to-transparent pointer-events-none" />

          {/* Delicate film grain noise overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen">
            <svg className="w-full h-full">
              <filter id="loader-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#loader-grain)" />
            </svg>
          </div>

          {/* Center Typographic Choreography: ONLY "Think" and "Together" */}
          <div className="text-center flex flex-col items-center justify-center relative z-10 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="text-[44px] sm:text-[68px] md:text-[92px] lg:text-[112px] font-medium tracking-[-0.04em] leading-none text-white/40"
            >
              Think
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="text-[52px] sm:text-[80px] md:text-[108px] lg:text-[132px] font-medium tracking-[-0.045em] leading-[0.95] text-white mt-1 sm:mt-2"
            >
              Together<span className="text-[#9B1C22]">.</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StudioLoader;
