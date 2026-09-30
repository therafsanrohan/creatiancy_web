import React from "react";
import Image from "next/image";
import Link from "next/link";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
import "@/app/website.css";

const verifiedPartners = [
  { name: "AtoBD", logo: "/brands/AtoBD_logo.png" },
  { name: "Elcardo", logo: "/brands/elcardo_logo.png" },
  { name: "ODL", logo: "/brands/odl_logo.png" },
  { name: "Oven", logo: "/brands/oven_logo.png" },
  { name: "S Brand", logo: "/brands/s_logo.png" },
];

const capabilities = [
  {
    num: "01",
    title: "Brand Architecture & Visual Systems",
    desc: "Comprehensive brand positioning, editorial identity, and strategic guidelines designed for longevity and commercial authority.",
  },
  {
    num: "02",
    title: "Digital Platforms & Engineering",
    desc: "Ultra-fast, enterprise-standard web architectures engineered with high-precision frontend stacks and modern usability.",
  },
  {
    num: "03",
    title: "Creative Technology & Motion",
    desc: "Bridging avant-garde technology and interactive motion without unnecessary decorative baggage.",
  },
];

const selectedWorks = [
  {
    client: "Elcardo Industrial",
    discipline: "Brand Architecture & Platform",
    year: "2026",
    summary: "Re-engineering market presence with clean editorial direction and corporate digital systems.",
  },
  {
    client: "AtoBD Logistics",
    discipline: "Product Design & Web Engineering",
    year: "2025",
    summary: "A high-performance digital framework handling national scale logistics identity.",
  },
  {
    client: "ODL Systems",
    discipline: "Creative Technology",
    year: "2025",
    summary: "Refined digital presence and modern visual identity for specialized hardware and security technology.",
  },
];

export default function HomePage() {
  return (
    <div className="creatiancy-scope">
      <WebsiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-44 pb-20 md:pt-56 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
          <p className="text-[#9B1C22] text-xs font-semibold tracking-widest uppercase mb-6">
            Creative Technology &amp; Brand Authority
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#1E1E1E] leading-[1.05] max-w-5xl">
            We Build Legacies.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[#1E1E1E]/70 max-w-2xl font-light leading-relaxed">
            Creatiancy is an authoritative creative technology agency. We transform ambition into enduring market leadership through disciplined design and performance engineering.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/work"
              className="px-8 py-4 bg-[#1E1E1E] text-[#FBFDF9] text-xs uppercase tracking-widest font-semibold hover:bg-[#9B1C22] transition-colors"
            >
              Explore Portfolio
            </Link>
            <span className="text-xs uppercase tracking-widest text-[#1E1E1E]/50">
              Creative Principle: Performance over decoration
            </span>
          </div>
        </section>

        {/* Partners Banner */}
        <section className="border-y border-[#1E1E1E]/10 py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="text-[11px] uppercase tracking-widest text-[#1E1E1E]/40 mb-8 font-semibold">
              Selected Clients &amp; Collaborators
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
              {verifiedPartners.map((item) => (
                <div key={item.name} className="relative h-12 w-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                  <Image src={item.logo} alt={item.name} fill className="object-contain grayscale hover:grayscale-0 transition-all duration-300" sizes="160px" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1E1E1E]/10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#9B1C22] font-semibold mb-2">Capabilities</p>
              <h2 className="text-3xl md:text-5xl font-light text-[#1E1E1E]">Designed for market impact.</h2>
            </div>
            <Link href="/services" className="mt-4 md:mt-0 text-xs uppercase tracking-widest font-semibold hover:text-[#9B1C22] transition-colors">
              All Services &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((s) => (
              <div key={s.num} className="bg-white border border-[#1E1E1E]/10 p-8 md:p-10 flex flex-col justify-between hover:border-[#9B1C22] transition-colors duration-300">
                <div>
                  <span className="text-[#9B1C22] font-mono text-sm block mb-6 font-bold">{s.num}</span>
                  <h3 className="text-2xl font-normal text-[#1E1E1E] mb-4">{s.title}</h3>
                  <p className="text-sm text-[#1E1E1E]/70 font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Work Section */}
        <section className="py-20 md:py-28 bg-white border-t border-[#1E1E1E]/10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1E1E1E]/10">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#9B1C22] font-semibold mb-2">Portfolio</p>
                <h2 className="text-3xl md:text-5xl font-light text-[#1E1E1E]">Selected Work</h2>
              </div>
              <Link href="/work" className="mt-4 md:mt-0 text-xs uppercase tracking-widest font-semibold hover:text-[#9B1C22] transition-colors">
                Full Archive &rarr;
              </Link>
            </div>
            <div className="divide-y divide-[#1E1E1E]/10">
              {selectedWorks.map((work) => (
                <div key={work.client} className="py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between group hover:bg-[#FBFDF9] transition-colors px-4 -mx-4">
                  <div className="md:w-1/3">
                    <span className="text-xs font-mono text-[#9B1C22] block mb-1">{work.year}</span>
                    <h3 className="text-2xl md:text-3xl font-normal text-[#1E1E1E] group-hover:text-[#9B1C22] transition-colors">{work.client}</h3>
                  </div>
                  <div className="mt-2 md:mt-0 md:w-1/3">
                    <p className="text-xs uppercase tracking-widest text-[#1E1E1E]/60 mb-1">{work.discipline}</p>
                    <p className="text-sm font-light text-[#1E1E1E]/75">{work.summary}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:w-1/6 md:text-right">
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#1E1E1E] group-hover:text-[#9B1C22]">Case Study &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <WebsiteFooter />
    </div>
  );
}
