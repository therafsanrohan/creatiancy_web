"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--bg)] mt-[-80px]">
      {/* Dynamic Error Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1], 
            rotate: [0, 90, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[var(--accent)] rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1, 0.8, 1], 
            rotate: [0, -90, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[var(--text)] rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
      </div>
      
      <div className="relative z-10 text-center space-y-8 px-4 flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[10rem] md:text-[15rem] leading-none font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[var(--text)] to-[var(--muted)] tracking-tighter drop-shadow-sm"
        >
          404
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="space-y-6 max-w-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Vision Not Found</h2>
          <p className="text-[var(--muted-fg)] text-lg text-balance">
            The creative intelligence you are looking for has been moved, renamed, or doesn't exist. Sometimes the boldest paths take us to dead ends.
          </p>
          
          <div className="pt-6">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[var(--text)] text-[var(--bg)] rounded-full font-bold hover:bg-[var(--accent)] hover:text-white transition-all hover:scale-105 duration-300 shadow-xl shadow-black/5"
            >
              Return to Concept
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
