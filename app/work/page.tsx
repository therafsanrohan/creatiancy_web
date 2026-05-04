"use client";

import { motion } from "framer-motion";
import { caseStudies } from '@/config/projects';
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function WorkPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--bg)] selection:bg-[var(--ruby-red)] selection:text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[var(--ruby-red)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-[var(--muted)]/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-20 md:mb-32"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--muted)]/20 text-[var(--ruby-red)] text-xs font-bold tracking-widest uppercase mb-6 border border-[var(--muted)]/50">
            <Sparkles className="w-3 h-3" />
            <span>Digital Legacy</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-6 text-balance">
            Selected Work.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-fg)] text-balance font-light leading-relaxed max-w-2xl">
            A curated collection of digital intelligence and high-impact brand systems engineered to perform and scale.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
        >
          {caseStudies.map((project, index) => (
            <motion.div 
              key={project.id} 
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className={`group cursor-pointer flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`} // Offset alternating columns
            >
              <Link href={`/work/${project.id}`} className="block relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[var(--muted)]/10 border border-[var(--muted)]/30">
                {/* Image Placeholder / Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--muted)]/40 to-[var(--bg)] group-hover:scale-105 transition-transform duration-700 ease-out" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out shadow-2xl">
                    <ArrowUpRight className="w-8 h-8 text-black" />
                  </div>
                </div>

                {/* Optional Category Tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wider uppercase opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  Case Study
                </div>
              </Link>

              <div className="flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl font-bold font-heading group-hover:text-[var(--ruby-red)] transition-colors duration-300 flex justify-between items-center">
                  {project.title}
                </h2>
                <p className="text-[var(--muted-fg)] text-lg font-light leading-relaxed">
                  {project.shortDescription}
                </p>
                <div className="h-0.5 w-0 bg-[var(--ruby-red)] group-hover:w-12 transition-all duration-500 ease-out mt-2" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
