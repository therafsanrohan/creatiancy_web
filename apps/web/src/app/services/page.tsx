"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BentoCard } from "@/components/ui/BentoCard";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import "@/app/website.css";

const CAPABILITIES = [
  {
    id: "01",
    title: "Brand Strategy & Architecture",
    category: "CORE FOUNDATION",
    summary: "Rigorous market positioning, naming systems, and identity architecture crafted to command commercial authority.",
    icon: "Compass",
    theme: "dark" as const,
    size: "wide" as const,
    tags: ["Naming", "Positioning", "Design Tokens", "Asset Guidelines"]
  },
  {
    id: "02",
    title: "Content Lab & Film",
    category: "CINEMATIC VISUALS",
    summary: "Commercial film direction, 3D motion graphics, and editorial content systems built to captivate audiences.",
    icon: "Sparkles",
    theme: "dark" as const,
    size: "standard" as const,
    tags: ["Film Direction", "3D Motion", "Post-Production", "Color Grading"]
  },
  {
    id: "03",
    title: "Creative Technology",
    category: "INTERACTIVE WEB",
    summary: "Immersive WebGL environments, custom GLSL shaders, and Three.js spatial micro-interactions.",
    icon: "Code",
    theme: "dark" as const,
    size: "standard" as const,
    tags: ["WebGL", "Three.js", "Shaders", "Spatial Physics"]
  },
  {
    id: "04",
    title: "Digital UI/UX Engineering",
    category: "CONVERSION ARCHITECTURE",
    summary: "High-performance web applications and conversion UX engineered with modern React and Next.js.",
    icon: "Layers",
    theme: "dark" as const,
    size: "wide" as const,
    tags: ["Next.js App Router", "Design Systems", "Conversion UX", "Responsive UI"]
  }
];

export default function ServicesPage() {
  const [selectedId, setSelectedId] = useState("01");

  return (
    <div className="creatiancy-scope bg-[#070809]">
      <main className="w-full relative">

        {/* Services Hero */}
        <section className="pt-40 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-white/[0.08] text-[11px] font-mono tracking-[0.16em] uppercase text-neutral-400 mb-16">
            <div>
              <span className="text-[#FF2B43] mr-2">01</span>
              <span>INDEX &bull; SCOPE</span>
            </div>
            <div>
              <span className="text-[#FF2B43] mr-2">02</span>
              <span>SIX CAPABILITIES</span>
            </div>
            <div className="hidden md:block">
              <span className="text-[#FF2B43] mr-2">03</span>
              <span>VERIFIED DELIVERABLES</span>
            </div>
            <div className="text-right">
              <span className="text-[#FF2B43] mr-2">04</span>
              <span>SENIOR DIRECTION</span>
            </div>
          </div>

          <div className="max-w-4xl">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-4">
              STUDIO CAPABILITIES
            </span>
            <h1 className="text-[40px] sm:text-[56px] md:text-[76px] font-bold tracking-[-0.035em] text-[#F4F5F7] leading-[1.0] mb-8 uppercase">
              Strategic creative &amp; dependable build.
            </h1>
            <p className="text-[17px] md:text-[20px] text-neutral-400 font-light leading-relaxed max-w-2xl">
              Strictly verified capabilities where senior creative direction delivers commercial impact.
            </p>
          </div>
        </section>

        {/* Connected Interactive Capability Map */}
        <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-8">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block">
              CAPABILITY ARCHITECTURE MAP
            </span>
            <span className="text-[11px] font-mono text-neutral-400 uppercase">
              Click a discipline node to inspect deliverables
            </span>
          </div>

          <div className="p-8 rounded-[20px] bg-[#0E1114] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)] overflow-x-auto">
            <div className="min-w-[680px] flex items-center justify-between relative py-6">
              
              {/* Connected Hairline Path */}
              <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/10 -translate-y-1/2 z-0" />
              <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF2B43] to-transparent -translate-y-1/2 z-0" />

              {CAPABILITIES.map((cap) => {
                const isSelected = selectedId === cap.id;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setSelectedId(cap.id)}
                    className={`relative z-10 flex flex-col items-center gap-3 p-4 rounded-[16px] border transition-all duration-300 min-h-[48px] ${
                      isSelected
                        ? "bg-[#070809] text-[#FF2B43] border-[#FF2B43] shadow-[0_4px_20px_rgba(255,43,67,0.2)] scale-105"
                        : "bg-[#0E1114] text-[#F4F5F7] border-white/10 hover:border-[#FF2B43]/40"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-[8px] border border-current/20 flex items-center justify-center">
                      <Icon name={cap.icon} size={20} className={isSelected ? "text-[#FF2B43]" : "text-neutral-400"} />
                    </div>
                    <span className="text-[13px] font-medium tracking-tight whitespace-nowrap">
                      {cap.title}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-white" : "text-[#FF2B43]"}`}>
                      DISCIPLINE {cap.id}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bento Grid of Deliverables */}
        <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-white/[0.08]">
          <div className="mb-12">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-3">
              DISCIPLINE DELIVERABLES
            </span>
            <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-[#F4F5F7] uppercase">
              Core system deliverables
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {CAPABILITIES.map((cap) => (
              <BentoCard
                key={cap.id}
                numeral={cap.id}
                label={cap.category}
                title={cap.title}
                copy={cap.summary}
                icon={cap.icon}
                theme="dark"
                size={cap.size}
                tags={cap.tags}
                className={selectedId === cap.id ? "ring-2 ring-[#FF2B43]/50" : ""}
              />
            ))}
          </div>
        </section>

        {/* Engagement Model */}
        <section className="py-24 bg-[#0E1114] text-[#F4F5F7] px-6 md:px-12 border-b border-white/[0.08]">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-2xl mb-14">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-3">
                ENGAGEMENT MODEL
              </span>
              <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight uppercase">
                Direct senior collaboration
              </h2>
              <p className="text-[16px] text-neutral-400 font-light mt-3">
                Zero layers of account managers. Every milestone is led by senior practitioners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", icon: "Compass", name: "Strategic Discovery", desc: "Interrogate goals and commercial tension." },
                { step: "02", icon: "Layers", name: "Core System", desc: "Design tokens and interface architecture." },
                { step: "03", icon: "Sliders", name: "Iterative Build", desc: "Production code and asset delivery." },
                { step: "04", icon: "Rocket", name: "Launch Handover", desc: "Live deployment and guideline handoff." },
              ].map((s) => (
                <div key={s.step} className="p-6 bg-white/[0.03] border border-white/10 rounded-[18px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-mono text-[#FF2B43] font-bold">{s.step}</span>
                    <Icon name={s.icon} size={18} className="text-neutral-400" />
                  </div>
                  <h3 className="text-[17px] font-medium mb-1.5">{s.name}</h3>
                  <p className="text-[13px] text-neutral-400 font-light leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
