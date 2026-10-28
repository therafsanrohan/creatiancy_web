"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus, Minus, CheckCircle2 } from "lucide-react";

interface FactItem {
  label: string;
  value: string;
  detail: string;
}

interface CapabilityItem {
  id: string;
  category: string;
  headline: string;
  summary: string;
  deliverables: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

const STUDIO_FACTS: FactItem[] = [
  {
    label: "Identity & Origin",
    value: "Independent Studio",
    detail: "Self-governed creative & engineering practice established to build uncompromising brand legacies.",
  },
  {
    label: "Delivery Footprint",
    value: "Dhaka &bull; Global Remote",
    detail: "Operating on GMT+6 with seamless overlap across European, North American, and Asia-Pacific timezones.",
  },
  {
    label: "Engagement Capacity",
    value: "Strictly 2–3 Per Quarter",
    detail: "We intentionally cap active client intake to ensure unmatched depth, focus, and senior craftsmanship.",
  },
  {
    label: "Primary Focus",
    value: "High-Growth & Enterprise",
    detail: "Partnering with founders, product leaders, and enterprise rebrands requiring production-grade rigor.",
  },
];

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "01",
    category: "STRATEGY & IDENTITY",
    headline: "Commercial Brand Architecture",
    summary:
      "We dissect market noise, formulate defensible positioning, and architect visual identity systems that build enduring equity.",
    deliverables: [
      "Competitive Positioning & Narrative",
      "Bespoke Typographic Systems & Marks",
      "Scalable Multi-Platform Design Systems",
      "Brand Guidelines & Asset Repositories",
    ],
  },
  {
    id: "02",
    category: "DIGITAL PRODUCTION",
    headline: "High-Performance Web Platforms",
    summary:
      "Crafted in Next.js and modern Web APIs. Blazingly fast, accessible, 60fps micro-interactions, and conversion-optimized.",
    deliverables: [
      "Interactive Digital Experiences & Portals",
      "Production-Grade Next.js / React Architecture",
      "Sub-second Core Web Vitals & SEO Tuning",
      "Motion Design & Spatial Micro-Interactions",
    ],
  },
  {
    id: "03",
    category: "MOTION & CREATIVE CONTENT",
    headline: "Cinematic Campaigns & 3D Assets",
    summary:
      "Editorial visuals, 3D product narratives, and cinematic motion graphics engineered to capture attention instantly.",
    deliverables: [
      "3D Product Visualizations & Renders",
      "Hero Motion Graphics & Kinetic Typography",
      "Key Visuals & Multi-Format Campaign Assets",
      "Interactive Product Showcases",
    ],
  },
];

const WORKING_PRINCIPLES = [
  {
    num: "01",
    title: "Truth Over Flattery",
    description:
      "We don't nod along to safe ideas. We challenge vague assumptions with market evidence and clear design logic before pixels are placed.",
  },
  {
    num: "02",
    title: "Zero Intermediary Lag",
    description:
      "No account managers or telephone games. You collaborate directly with the senior creative minds and engineers executing your project.",
  },
  {
    num: "03",
    title: "Commercial Utility",
    description:
      "Aesthetics without conversion are decorative vanity. Every layout, color token, and interaction is engineered to drive commercial growth.",
  },
  {
    num: "04",
    title: "Punctual Delivery Guarantee",
    description:
      "Fixed scope sprints, transparent weekly progress demos, and zero launch-day surprises. What we commit to is what goes live.",
  },
];

const STUDIO_FAQS: FaqItem[] = [
  {
    question: "What does Creatiancy actually do?",
    answer:
      "Creatiancy is an independent strategic creative & production studio. We specialize in two interconnected disciplines: building high-end brand identities and engineering bespoke, high-performance web platforms that convert.",
  },
  {
    question: "How is Creatiancy different from traditional marketing agencies?",
    answer:
      "Traditional agencies outsource or delegate your work down to junior rosters and account managers. At Creatiancy, our founders and senior specialists lead every project directly. You get direct access, uncompromised craftsmanship, and much faster execution cycles.",
  },
  {
    question: "Where are you based and how do you work with international clients?",
    answer:
      "Our core studio operates in Dhaka with global client deliveries worldwide. We have established asynchronous workflows, weekly recorded video walkthroughs, and synchronized live sprint reviews that work smoothly across US, European, and Asian timezones.",
  },
  {
    question: "What is your typical project timeline and pricing structure?",
    answer:
      "Engagements are structured as fixed-scope sprints typically spanning 3 to 8 weeks depending on whether the scope is an identity system, a flagship web experience, or an integrated full-stack launch. We provide upfront, transparent project quotes with no hidden retainers.",
  },
  {
    question: "How do we get started on an engagement?",
    answer:
      "Reach out through our project inquiry form with an overview of your current goals, timeline, and scope. We will review your brief within 24 hours and schedule an introductory 30-minute discovery session.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const faqEl = faqRef.current;
    if (!faqEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setOpenFaq(null);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(faqEl);
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="creatiancy-scope bg-[#0C0708] text-white select-none selection:bg-[#9B1C22] selection:text-white">
      <main className="w-full relative">

        {/* 1. Cinematic Dark Hero (Signature Studio Theme) */}
        <section 
          id="hero-section"
          className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-20 sm:pb-28 px-6 md:px-12 bg-[#0C0708] overflow-hidden text-white border-b border-[#9B1C22]/20"
        >
          {/* Cinematic Silhouette Ambient Glow Background */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/hero/cinematic-silhouette.png"
              alt="Creatiancy Studio Ethos"
              fill
              priority
              className="object-cover object-center opacity-85 mix-blend-screen scale-[1.02]"
            />
            {/* Ambient Dark-Crimson Spotlight Glow */}
            <div className="absolute inset-0 bg-radial-[at_50%_35%] from-[#9B1C22]/40 via-[#0C0708]/85 to-[#0C0708] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C0708] to-transparent pointer-events-none" />
          </div>

          {/* Technical Studio Wireframe Grid Lines */}
          <div className="absolute inset-0 z-[1] pointer-events-none select-none max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="relative w-full h-full border-x border-[#9B1C22]/20">
              <div className="absolute inset-y-0 left-[25%] w-px bg-[#9B1C22]/15 hidden md:block" />
              <div className="absolute inset-y-0 left-[50%] w-px bg-[#9B1C22]/15 hidden md:block" />
              <div className="absolute inset-y-0 left-[75%] w-px bg-[#9B1C22]/15 hidden md:block" />

              {/* Dimension Rule */}
              <div className="absolute bottom-6 left-0 right-0 border-t border-[#9B1C22]/25 flex items-center justify-between pt-1.5 px-3 text-[10px] font-mono text-[#9B1C22]/70 tracking-widest">
                <span>01</span>
                <span className="hidden md:inline">STUDIO OVERVIEW</span>
                <span>ORIGIN & ETHOS</span>
                <span className="hidden md:inline">STANDARDS</span>
                <span>FAQ INDEX</span>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1440px] mx-auto">
            {/* Index Tracker Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-white/10 text-[11px] font-mono tracking-[0.16em] uppercase text-white/50 mb-12 sm:mb-16">
              <div>
                <span className="text-[#FF4D5E] mr-2">01</span>
                <span>WHO WE ARE</span>
              </div>
              <div>
                <span className="text-[#FF4D5E] mr-2">02</span>
                <span>WHAT WE BUILD</span>
              </div>
              <div className="hidden md:block">
                <span className="text-[#FF4D5E] mr-2">03</span>
                <span>HOW WE WORK</span>
              </div>
              <div className="text-right">
                <span className="text-[#FF4D5E] mr-2">04</span>
                <span>COMMON FAQS</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="max-w-5xl mb-8">
              <h1 className="text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-medium tracking-[-0.035em] text-white leading-[1.0] text-balance">
                Crafted to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D5E] via-[#D32F38] to-[#9B1C22] font-normal">
                  outlast trends
                </span>
              </h1>
            </div>

            {/* Narrative & Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4 pb-8">
              <div className="lg:col-span-8">
                <p className="text-[17px] sm:text-[20px] md:text-[22px] text-white/80 font-normal leading-[1.45] max-w-3xl text-pretty">
                  Creatiancy is an independent strategic creative & engineering studio. We combine analytical market positioning, distinctive visual identity, and modern web production for ambitious companies worldwide.
                </p>
              </div>

              <div className="lg:col-span-4 flex items-center lg:justify-end gap-6 text-[13px] font-mono text-white/60">
                <div>
                  <span className="text-[28px] font-bold text-white block leading-none mb-1">100%</span>
                  <span className="text-[11px] uppercase tracking-wider text-white/40">In-House Craft</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <span className="text-[28px] font-bold text-[#FF4D5E] block leading-none mb-1">0%</span>
                  <span className="text-[11px] uppercase tracking-wider text-white/40">Account Managers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Clear Studio Facts & About Info (Light Surface with Curved Transition) */}
        <section className="w-full relative select-none bg-[#0C0708]">
          <div 
            id="studio-info-surface"
            className="w-full rounded-t-[24px] sm:rounded-t-[32px] md:rounded-t-[40px] bg-[#F5F5F7] text-[#1D1D1F] py-20 sm:py-28 px-6 md:px-12 relative overflow-hidden"
          >
            {/* Ambient soft glow */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[350px] bg-[#9B1C22]/[0.035] blur-[140px] pointer-events-none rounded-full" />

            <div className="max-w-[1360px] mx-auto relative z-10">
              
              {/* Header */}
              <div className="pb-8 sm:pb-10 border-b border-black/[0.08] mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#9B1C22] block mb-2 font-semibold">
                    AT A GLANCE
                  </span>
                  <h2 className="text-[32px] sm:text-[44px] md:text-[50px] font-medium tracking-tight text-[#1D1D1F] leading-tight">
                    Studio Information & Operating Model
                  </h2>
                </div>
                <p className="text-[15px] sm:text-[16px] text-[#6E6E73] font-normal leading-relaxed max-w-md">
                  Everything you need to know about our practice, capacity, and standard operating standards in plain terms.
                </p>
              </div>

              {/* 4 Clean Fact Bento Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-20">
                {STUDIO_FACTS.map((fact, idx) => (
                  <div
                    key={fact.label}
                    className="p-7 rounded-[22px] bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#9B1C22]/30 hover:shadow-md"
                  >
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#86868B] block mb-3">
                        0{idx + 1} &bull; {fact.label}
                      </span>
                      <h3 className="text-[20px] sm:text-[22px] font-bold text-[#1D1D1F] tracking-tight leading-snug mb-3">
                        {fact.value}
                      </h3>
                      <p className="text-[13px] text-[#6E6E73] leading-relaxed font-normal">
                        {fact.detail}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/[0.06] mt-6 flex items-center justify-between text-[11px] font-mono text-[#9B1C22]">
                      <span>VERIFIED STANDARD</span>
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Offerings & What We Build */}
              <div className="pt-8 border-t border-black/[0.08]">
                <div className="mb-10 max-w-xl">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#9B1C22] block mb-2 font-semibold">
                    DISCIPLINES
                  </span>
                  <h3 className="text-[28px] sm:text-[36px] font-medium tracking-tight text-[#1D1D1F] leading-tight">
                    What We Build For Our Partners.
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {CAPABILITIES.map((cap) => (
                    <div
                      key={cap.id}
                      className="p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between transition-all duration-300 hover:border-[#9B1C22]/30 hover:shadow-lg"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <span className="text-[12px] font-mono font-bold text-[#9B1C22]">
                            {cap.id}
                          </span>
                          <span className="text-[10px] font-mono tracking-widest uppercase text-[#86868B] px-2.5 py-1 rounded-full bg-neutral-100">
                            {cap.category}
                          </span>
                        </div>

                        <h4 className="text-[22px] sm:text-[24px] font-bold text-[#1D1D1F] tracking-tight mb-3">
                          {cap.headline}
                        </h4>

                        <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-6">
                          {cap.summary}
                        </p>
                      </div>

                      <div className="pt-5 border-t border-black/[0.06]">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868B] block mb-2.5">
                          Core Deliverables
                        </span>
                        <ul className="space-y-1.5">
                          {cap.deliverables.map((item) => (
                            <li key={item} className="text-[12px] sm:text-[13px] text-[#1D1D1F] flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C22]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. How We Work: 4 Clear Working Principles */}
        <section className="py-24 sm:py-32 bg-[#0C0708] text-white px-6 md:px-12 border-b border-white/[0.08] relative overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[380px] bg-[#9B1C22]/12 blur-[160px] pointer-events-none rounded-full" />

          <div className="max-w-[1360px] mx-auto relative z-10">
            {/* Header */}
            <div className="pb-8 sm:pb-10 border-b border-white/10 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF4D5E] uppercase block mb-3 font-semibold">
                  OPERATING PHILOSOPHY
                </span>
                <h2 className="text-[34px] sm:text-[46px] md:text-[54px] font-bold tracking-tight text-white leading-[1.05] uppercase">
                  How we operate with every partner.
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-white/70 font-normal leading-relaxed max-w-md">
                No bureaucracy, no guesswork. A transparent framework designed to maximize clarity, velocity, and output quality.
              </p>
            </div>

            {/* 4 Operating Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {WORKING_PRINCIPLES.map((principle) => (
                <div
                  key={principle.num}
                  className="p-7 rounded-[20px] bg-white/[0.03] border border-white/[0.08] hover:border-[#FF4D5E]/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[13px] font-mono font-bold text-[#FF4D5E] block mb-4">
                      {principle.num}
                    </span>
                    <h3 className="text-[19px] sm:text-[21px] font-bold text-white tracking-tight mb-2.5">
                      {principle.title}
                    </h3>
                    <p className="text-[13px] text-white/60 leading-relaxed font-light">
                      {principle.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] mt-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    PRINCIPLE {principle.num}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Frequently Asked Questions (FAQ Section - Accessible & Expandable) */}
        <section ref={faqRef} id="faqs" className="py-20 sm:py-28 px-6 md:px-12 bg-[#F5F5F7] text-[#1D1D1F] border-b border-black/[0.08]">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#9B1C22] block mb-2 font-semibold">
                FAQS & TRANSPARENCY
              </span>
              <h2 className="text-[32px] sm:text-[44px] font-medium tracking-tight text-[#1D1D1F] leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#6E6E73] font-normal mt-2 max-w-lg mx-auto">
                Direct answers to common questions about our engagements, timelines, and collaboration model.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5">
              {STUDIO_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.question}
                    className="rounded-[18px] bg-white border border-black/[0.06] shadow-2xs overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-[16px] sm:text-[18px] font-semibold text-[#1D1D1F] tracking-tight">
                        {faq.question}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-[#1D1D1F] transition-colors">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 sm:px-7 pb-6 pt-1 text-[14px] sm:text-[15px] text-[#6E6E73] leading-relaxed border-t border-black/[0.04]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Bottom Studio CTA Section */}
        <section className="py-20 sm:py-28 px-6 md:px-12 bg-[#0C0708] text-white border-t border-white/[0.08]">
          <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-12">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF4D5E] block mb-2 font-semibold">
                BUILD YOUR LEGACY
              </span>
              <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-white leading-tight">
                Ready to work with a studio that cares about your craft?
              </h2>
              <p className="text-[15px] sm:text-[17px] text-white/70 font-normal mt-3">
                Let&apos;s build an enduring identity, high-conversion web platform, or cinematic campaign tailored to your business goals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 h-12 sm:h-13 rounded-full text-[13px] font-medium tracking-wide bg-gradient-to-b from-[#A8242A] to-[#9B1C22] hover:from-[#9B1C22] hover:to-[#82151B] text-white transition-all duration-200 border border-[#9B1C22]/40 shadow-[0_4px_24px_rgba(155,28,34,0.35)] hover:shadow-[0_6px_30px_rgba(155,28,34,0.5)] min-h-[48px] active:scale-[0.99]"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2]" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-6 h-12 sm:h-13 rounded-full text-[13px] font-medium tracking-wide bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all duration-200 min-h-[48px] active:scale-[0.99]"
              >
                Explore work
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
