"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, HelpCircle, Plus } from "lucide-react";
import Link from "next/link";
import { faqs, FAQItem } from "@/constants/faq";
import { cn } from "@/lib/utils";

type Category = "All" | "Process" | "Pricing" | "Design" | "Delivery" | "General";

export default function FAQSection() {
  const [activeId, setActiveId] = useState<string | null>("faq-1");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Process", "Pricing", "Design", "Delivery", "General"];

  const filteredFaqs = selectedCategory === "All"
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-24 relative overflow-hidden border-t border-[var(--muted)]/20 bg-gradient-to-b from-transparent to-[var(--muted)]/5">
      {/* Schema.org FAQPage Structured Data for SEO Standard */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-[var(--ruby-red)]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] rounded-full bg-[var(--ruby-red)]/3 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Heading and Category Controls */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28 lg:h-fit">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-sm font-bold tracking-widest uppercase mb-6 w-fit border border-[var(--ruby-red)]/20">
              <HelpCircle className="w-4 h-4" />
              Glow-up FAQ
            </div>
            
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-[var(--text)] mb-6 text-balance leading-tight">
              Curious about how we work our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text)] to-[var(--ruby-red)]">
                magic?
              </span>
            </h2>
            
            <p className="text-lg text-[var(--muted-fg)] font-light leading-relaxed mb-8 max-w-lg">
              From process to pricing, design to delivery, we believe every brand has questions before the glow-up. We have answered the most common ones right here.
            </p>

            {/* Premium Category Pills - Desktop Sidebar & Mobile Scrollable List */}
            <div className="flex flex-wrap lg:flex-col gap-2.5 mb-8">
              <p className="w-full text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-2 hidden lg:block">
                Filter by Topic
              </p>
              <div className="flex flex-wrap lg:flex-col gap-2.5 w-full">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        // Reset active FAQ when switching categories so there's no dangling expanded state
                        setActiveId(null);
                      }}
                      className={cn(
                        "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border text-left cursor-pointer",
                        isActive
                          ? "bg-[var(--ruby-red)] text-white border-[var(--ruby-red)] shadow-lg shadow-[var(--ruby-red)]/25 font-semibold"
                          : "bg-[var(--muted)]/5 hover:bg-[var(--muted)]/15 text-[var(--muted-fg)] hover:text-[var(--text)] border-[var(--muted)]/30"
                      )}
                    >
                      {category}
                      {isActive && (
                        <motion.span
                          layoutId="categoryIndicator"
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white hidden lg:block"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Contact CTA */}
            <div className="pt-6 border-t border-[var(--muted)]/20 mt-4">
              <p className="text-sm text-[var(--muted-fg)] mb-3">Still have an unanswered question?</p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 group font-semibold text-[var(--text)] hover:text-[var(--ruby-red)] transition-colors duration-300"
              >
                <span>Let's talk magic</span>
                <span className="w-8 h-8 rounded-full bg-[var(--muted)]/10 group-hover:bg-[var(--ruby-red)]/10 flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Accordions */}
          <div className="lg:col-span-7">
            <motion.div layout className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = activeId === faq.id;
                  
                  return (
                    <motion.div
                      layout
                      key={faq.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ 
                        opacity: { duration: 0.2 },
                        layout: { type: "spring", stiffness: 500, damping: 38 }
                      }}
                      className={cn(
                        "rounded-3xl border transition-all duration-500 overflow-hidden",
                        isOpen
                          ? "bg-[var(--muted)]/10 border-[var(--ruby-red)]/40 shadow-xl shadow-[var(--ruby-red)]/3"
                          : "bg-[var(--muted)]/5 border-[var(--muted)]/30 hover:border-[var(--muted)]/60"
                      )}
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex items-start justify-between gap-4 p-6 md:p-8 text-left cursor-pointer group"
                      >
                        <div className="flex flex-col gap-2">
                          {/* Small category indicator inside card */}
                          <span className={cn(
                            "text-xs font-bold tracking-widest uppercase w-fit px-2 py-0.5 rounded",
                            isOpen 
                              ? "bg-[var(--ruby-red)]/20 text-[var(--ruby-red)]" 
                              : "bg-[var(--muted)]/20 text-[var(--muted-fg)]"
                          )}>
                            {faq.category}
                          </span>
                          
                          <h3 className={cn(
                            "text-lg md:text-xl font-bold font-heading transition-colors duration-300 leading-snug",
                            isOpen ? "text-[var(--ruby-red)]" : "text-[var(--text)] group-hover:text-[var(--ruby-red)]/80"
                          )}>
                            {faq.question}
                          </h3>
                        </div>
                        
                        {/* Interactive Plus to X icon */}
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-500",
                          isOpen 
                            ? "bg-[var(--ruby-red)] border-[var(--ruby-red)] text-white rotate-45" 
                            : "bg-[var(--muted)]/10 border-[var(--muted)]/40 text-[var(--muted-fg)] group-hover:text-[var(--text)] group-hover:border-[var(--muted)]/70"
                        )}>
                          <Plus className="w-5 h-5 transition-transform duration-500" />
                        </div>
                      </button>

                      {/* Expandable Panel */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ 
                              height: { type: "spring", stiffness: 400, damping: 30 },
                              opacity: { duration: 0.25 }
                            }}
                          >
                            <div className="px-6 md:px-8 pb-8 pt-0 border-t border-[var(--muted)]/10">
                              <p className="text-base md:text-lg text-[var(--muted-fg)] leading-relaxed font-light mt-6">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
