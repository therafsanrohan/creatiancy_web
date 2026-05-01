"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.offsetWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-sm font-bold tracking-widest uppercase mb-6">
            Client Feedback
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6 text-balance">
            Trusted by visionary <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text)] to-[var(--ruby-red)]">leaders.</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted-fg)] font-light">
            Don't just take our word for it. Hear what our partners have to say about the impact we've created together.
          </p>
        </motion.div>



        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-12 -mx-4 px-4 snap-x snap-mandatory gap-6 md:gap-8 scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-[85vw] max-w-[340px] sm:w-[450px] shrink-0 snap-center flex flex-col bg-[var(--muted)]/5 border border-[var(--muted)]/30 rounded-3xl p-8 hover:bg-[var(--muted)]/10 active:bg-[var(--muted)]/15 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent)]/5 hover:-translate-y-1 group"
            >
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--ruby-red)]/20 mb-6 group-hover:text-[var(--ruby-red)]/40 transition-colors duration-300" />
              
              <div className="flex-grow">
                <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed font-light mb-8">
                  {testimonial.review}
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[var(--muted)]/20">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--bg)] shadow-md shrink-0">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    fill
                    sizes="(max-width: 768px) 48px, 48px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text)]">{testimonial.name}</h4>
                  <p className="text-sm text-[var(--muted-fg)]">{testimonial.designation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls (Bottom Centered) */}
        <div className="flex justify-center items-center gap-6 mt-8 md:mt-12">
          <button 
            onClick={() => scroll('left')}
            className="w-14 h-14 rounded-full border border-[var(--muted)]/30 bg-[var(--bg)] flex items-center justify-center text-[var(--muted-fg)] hover:text-white hover:bg-[var(--ruby-red)] hover:border-[var(--ruby-red)] hover:shadow-lg hover:shadow-[var(--ruby-red)]/20 active:scale-95 transition-all duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-14 h-14 rounded-full border border-[var(--muted)]/30 bg-[var(--bg)] flex items-center justify-center text-[var(--muted-fg)] hover:text-white hover:bg-[var(--ruby-red)] hover:border-[var(--ruby-red)] hover:shadow-lg hover:shadow-[var(--ruby-red)]/20 active:scale-95 transition-all duration-300 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Optional: custom scrollbar hide style for the slider */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
