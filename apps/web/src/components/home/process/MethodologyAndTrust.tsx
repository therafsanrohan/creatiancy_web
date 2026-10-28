"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Cpu, Eye, Layers, Sparkles } from "lucide-react";

interface StepSpec {
  num: string;
  phase: string;
  title: string;
  leadTime: string;
  tagline: string;
  desc: string;
  telemetry: string;
  artifacts: string[];
  deliverables: string[];
}

const PROTOCOL_STEPS: StepSpec[] = [
  {
    num: "01",
    phase: "Phase I • Calibration",
    title: "Discovery & Strategy Sprint",
    leadTime: "Days 1–3",
    tagline: "Uncover category white space through forensic competitor auditing.",
    desc: "A rigorous deep dive into business fundamentals, market positioning, target audience mechanics, and commercial revenue objectives.",
    telemetry: "100% Verified Directional Alignment",
    artifacts: ["Competitor Matrix", "Brand Positioning Audit", "Category White Space"],
    deliverables: ["Commercial Strategy Brief", "Target Audience Archetypes", "Creative Direction Canvas"],
  },
  {
    num: "02",
    phase: "Phase II • Architecture",
    title: "Concepts & Identity System",
    leadTime: "Days 4–8",
    tagline: "Explore 2–3 distinct visual systems with mathematical brand logic.",
    desc: "Multi-concept visual explorations stress-tested across real-world physical and digital touchpoints before committing to production.",
    telemetry: "3 Distinct Creative Routes Evaluated",
    artifacts: ["Typography Hierarchy", "Palette Contrast Tests", "Spatial Layout Ratios"],
    deliverables: ["2–3 Directional Concepts", "Design Token Foundation", "Packaging & Web Mockups"],
  },
  {
    num: "03",
    phase: "Phase III • Engineering",
    title: "Refinement & Token Calibration",
    leadTime: "Days 9–12",
    tagline: "Micro-iteration and design systems calibration until friction hits zero.",
    desc: "Collaborative feedback loops where typographic scales, micro-interactions, responsive states, and edge cases are systematically perfected.",
    telemetry: "Zero Compromise Asset Tolerance",
    artifacts: ["Responsive Component Library", "Design Tokens Schema", "Motion Specs"],
    deliverables: ["Refined Master Files", "Complete Component Library", "Interactive Clickable Prototype"],
  },
  {
    num: "04",
    phase: "Phase IV • Production",
    title: "Final Delivery & System Handoff",
    leadTime: "Day 14",
    tagline: "Production-ready files, digital guidelines, and team enablement.",
    desc: "End-to-end handoff of production-grade source vectors, component architecture, code tokens, and living digital brand guidelines.",
    telemetry: "Full Commercial Ownership & IP Transfer",
    artifacts: ["SVG / WebP Asset Pipeline", "Figma Design Library", "Codebase Design Tokens"],
    deliverables: ["Master Production Assets", "Living Digital Brand Guidelines", "Executive Team Enablement Call"],
  },
];

export const MethodologyAndTrust = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="relative py-20 sm:py-28 md:py-32 px-6 md:px-12 bg-[#F5F5F7] border-b border-black/[0.08] overflow-hidden select-none">
      {/* Subtle Ambient Apple Flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[#9B1C22]/[0.03] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-[1360px] mx-auto relative z-10">
        
        {/* Section Header: Pure, clean Apple typography (No badges) */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <h2 className="text-[32px] sm:text-[42px] md:text-[48px] font-medium tracking-tight text-[#1D1D1F] leading-[1.1] mb-3">
            The Blueprint Protocol.
          </h2>

          <p className="text-[15px] sm:text-[17px] text-[#6E6E73] font-normal leading-relaxed max-w-xl">
            A calibrated 4-step sequence engineered to eliminate ambiguity, accelerate velocity, and deliver tangible commercial impact.
          </p>
        </div>

        {/* Apple Style Interactive Timeline Rail (Desktop & Tablet) */}
        <div className="hidden md:grid grid-cols-4 gap-4 mb-8">
          {PROTOCOL_STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-4 rounded-xl transition-all duration-200 relative border ${
                  isCurrent
                    ? "bg-white border-black/10 shadow-sm -translate-y-0.5"
                    : "bg-black/[0.02] border-transparent hover:bg-white/60 hover:border-black/5"
                }`}
              >
                {/* Active Top Accent Line */}
                <div 
                  className={`absolute top-0 inset-x-4 h-[2px] rounded-full transition-all duration-300 ${
                    isCurrent ? "bg-[#9B1C22]" : "bg-transparent"
                  }`} 
                />

                <div className="flex items-center justify-between mb-2 pt-1">
                  <span className={`text-[12px] font-mono font-medium tracking-wider ${
                    isCurrent ? "text-[#9B1C22]" : "text-[#86868B]"
                  }`}>
                    {step.num}
                  </span>
                  <span className="text-[11px] font-mono text-[#86868B]">
                    {step.leadTime}
                  </span>
                </div>

                <div className={`text-[14px] font-medium tracking-tight line-clamp-1 ${
                  isCurrent ? "text-[#1D1D1F]" : "text-[#1D1D1F]/70"
                }`}>
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage Inspector */}
        <div className="bg-white rounded-[24px] sm:rounded-[28px] border border-black/[0.08] shadow-[0_12px_40px_-16px_rgba(0,0,0,0.05)] p-6 sm:p-9 md:p-11 mb-8 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left Side: Step Narrative & Strategy Context (No badges, clean editorial) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#86868B] mb-3">
                    <span className="text-[#9B1C22] font-semibold">{PROTOCOL_STEPS[activeStep].phase}</span>
                    <span>&bull;</span>
                    <span>{PROTOCOL_STEPS[activeStep].leadTime}</span>
                  </div>

                  <h3 className="text-[24px] sm:text-[30px] md:text-[34px] font-medium tracking-tight text-[#1D1D1F] leading-tight mb-3">
                    {PROTOCOL_STEPS[activeStep].title}
                  </h3>

                  <p className="text-[15px] sm:text-[17px] text-[#1D1D1F]/85 font-normal leading-relaxed mb-3">
                    {PROTOCOL_STEPS[activeStep].tagline}
                  </p>

                  <p className="text-[14px] text-[#6E6E73] font-normal leading-relaxed mb-8 max-w-xl">
                    {PROTOCOL_STEPS[activeStep].desc}
                  </p>
                </div>

                {/* Quality Standard Info */}
                <div className="pt-5 border-t border-black/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#9B1C22]/10 text-[#9B1C22] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#86868B] block">
                      Standard Benchmark
                    </span>
                    <span className="text-[13px] font-medium text-[#1D1D1F]">
                      {PROTOCOL_STEPS[activeStep].telemetry}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Concrete Output Card */}
              <div className="lg:col-span-5 bg-[#F5F5F7] rounded-[20px] p-5 sm:p-6 border border-black/[0.06] flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-black/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1D1D1F]">
                      <Layers className="w-3.5 h-3.5 text-[#9B1C22]" />
                      <span>Production Deliverables</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#86868B]">{PROTOCOL_STEPS[activeStep].leadTime}</span>
                  </div>

                  {/* Tangible Output Checklist */}
                  <div className="space-y-2.5 mb-5">
                    {PROTOCOL_STEPS[activeStep].deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-black/[0.04]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C22] shrink-0 mt-1.5" />
                        <span className="text-[13px] font-medium text-[#1D1D1F] leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* System Artifacts */}
                  <div className="pt-3 border-t border-black/[0.06]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868B] block mb-2">
                      Included System Artifacts
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PROTOCOL_STEPS[activeStep].artifacts.map((art, aIdx) => (
                        <span
                          key={aIdx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded bg-black/[0.04] text-[#48484A]"
                        >
                          {art}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Step Switcher */}
                <div className="mt-5 pt-3 border-t border-black/[0.06] flex md:hidden items-center justify-between">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] disabled:opacity-30"
                  >
                    &larr; Prev
                  </button>
                  <span className="text-xs font-mono text-[#86868B]">
                    {activeStep + 1} / {PROTOCOL_STEPS.length}
                  </span>
                  <button
                    disabled={activeStep === PROTOCOL_STEPS.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(PROTOCOL_STEPS.length - 1, prev + 1))}
                    className="text-xs font-semibold uppercase tracking-wider text-[#9B1C22] disabled:opacity-30"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Trust Guarantee Strip: Apple-like Micro Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-black/[0.03] text-[#1D1D1F] flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-[#9B1C22]" />
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1D1D1F] leading-snug">
                14-Day Velocity Standard
              </h4>
              <p className="text-[12px] text-[#6E6E73] leading-relaxed">
                Zero bloated agency timelines. High-density execution from sprint kickoff to handoff.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-black/[0.03] text-[#1D1D1F] flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5 text-[#9B1C22]" />
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1D1D1F] leading-snug">
                Transparent Telemetry
              </h4>
              <p className="text-[12px] text-[#6E6E73] leading-relaxed">
                Real-time shared Figma canvas, asynchronous Loom briefs, and zero hidden milestones.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-black/[0.03] text-[#1D1D1F] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#9B1C22]" />
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1D1D1F] leading-snug">
                Production-Ready Handoff
              </h4>
              <p className="text-[12px] text-[#6E6E73] leading-relaxed">
                Tokens, vectors, and living brand code ready for engineering deployment.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MethodologyAndTrust;


