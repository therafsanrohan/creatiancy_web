"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Brand Identity",
    problem: "Brands struggling with clarity, inconsistent messaging, or failing to stand out in a mature market.",
    for: "Founders & Marketing Directors looking for positioning and comprehensive visual systems.",
    outcome: "A distinct, scalable brand architecture ready for growth.",
    features: ["Market Research", "Visual Identity Systems", "Brand Guidelines", "Tone of Voice"]
  },
  {
    title: "Online-first strategy",
    problem: "Companies lacking a specialized digital approach and losing market share to competitors.",
    for: "Established businesses pivoting to prioritize digital growth.",
    outcome: "We combine strategy, design and technology to help you connect with the modern-day audiences.",
    features: ["Digital Workshops", "Market Positioning", "Growth Mapping", "KPI Definition"]
  },
  {
    title: "Content marketing",
    problem: "Failing to engage the right audience and convert traffic into meaningful loyal action.",
    for: "Brands that need to elevate their storytelling and customer engagement.",
    outcome: "A creative team of designers and copywriters execute your vision of your brand flawlessly!",
    features: ["Content Strategy", "Copywriting", "SEO Authority", "Campaign Narratives"]
  },
  {
    title: "Technical powerhouse",
    problem: "Legacy websites that are slow, hard to manage, or crumble under high traffic demands.",
    for: "Ambitious product teams needing elite software and unshakeable web infrastructures.",
    outcome: "We utilize all the latest tech stack for your marketing - from websites, apps, AI, to social media.",
    features: ["Next.js & React", "Headless CMS", "Technical SEO", "Custom E-commerce"]
  },
  {
    title: "Tailor-made campaigns",
    problem: "Wasting advertising budget on generic, untargeted campaigns with weak ROI.",
    for: "High-growth brands preparing for significant product launches or market penetration.",
    outcome: "We go beyond social media by integrating your content to create meaningful campaigns.",
    features: ["Creative Direction", "Ad Management", "Conversion Optimization", "VFX & Motion"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-sm font-bold tracking-widest uppercase mb-6">
            What We Do
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-8 leading-tight">
            Strategic design meets <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text)] to-[var(--ruby-red)]">intelligent growth.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-fg)] text-balance font-light max-w-2xl">
            We don't offer generic templates or buzzwords. We solve fundamental business problems through precision-engineered digital services.
          </p>
        </motion.div>
      </div>

      {/* Services List */}
      <div className="container mx-auto px-4 space-y-12 md:space-y-24">
        {services.map((svc, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group grid xl:grid-cols-[1fr_2fr] gap-8 md:gap-16 border rounded-3xl p-8 md:p-12 border-[var(--muted)]/50 bg-[var(--muted)]/10 hover:bg-[var(--muted)]/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent)]/5"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">{svc.title}</h2>
              <ul className="space-y-3 pt-6 border-t border-[var(--muted)]/50">
                {svc.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[var(--muted-fg)] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 bg-[var(--bg)] p-8 rounded-2xl border border-[var(--muted)]/30">
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)] border-b border-[var(--muted)]/50 pb-2">The Problem</h3>
                <p className="text-[var(--muted-fg)] leading-relaxed">{svc.problem}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)] border-b border-[var(--muted)]/50 pb-2">Who It's For</h3>
                <p className="text-[var(--muted-fg)] leading-relaxed">{svc.for}</p>
              </div>
              <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)] border-b border-[var(--muted)]/50 pb-2">The Outcome</h3>
                <p className="text-[var(--text)] font-semibold leading-relaxed">{svc.outcome}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marketing Action Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 mt-32"
      >
        <div className="relative rounded-3xl overflow-hidden bg-[var(--text)] text-[var(--bg)] px-6 py-20 md:py-32 flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ruby-red)]/20 to-transparent mix-blend-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter">Ready to dominant your market?</h2>
            <p className="text-xl opacity-80 font-light max-w-xl mx-auto">
              Stop settling for average digital experiences. Let's engineer a solution that positions your brand as the undisputed leader.
            </p>
            <div className="pt-8">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-[var(--ruby-red)] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[var(--ruby-red)]/30"
              >
                Start a Conversation
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
