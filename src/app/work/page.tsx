import React from "react";
import Link from "next/link";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
import "@/app/website.css";

const workItems = [
  { client: "Elcardo Industrial", discipline: "Brand Architecture & Platform", year: "2026", summary: "Industrial manufacturing digital presence." },
  { client: "AtoBD Logistics", discipline: "Digital Systems", year: "2025", summary: "Real-time nationwide logistics interface." },
  { client: "ODL Global", discipline: "Creative Technology", year: "2025", summary: "Hardware and security enterprise web experience." },
  { client: "Oven Brand", discipline: "Identity & Visual Direction", year: "2024", summary: "Modern culinary and packaging identity." },
];

export default function WorkPage() {
  return (
    <div className="creatiancy-scope">
      <WebsiteHeader />
      <main className="pt-40 pb-24 md:pt-48 md:pb-36 px-6 md:px-12 max-w-7xl mx-auto flex-1">
        <p className="text-[#9B1C22] text-xs font-semibold tracking-widest uppercase mb-4">Index of Work</p>
        <h1 className="text-4xl sm:text-6xl font-light text-[#1E1E1E] tracking-tight mb-16">Selected Projects</h1>
        <div className="divide-y divide-[#1E1E1E]/10 border-y border-[#1E1E1E]/10">
          {workItems.map((item) => (
            <div key={item.client} className="py-8 md:py-12 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="md:w-1/3">
                <span className="text-xs font-mono text-[#9B1C22]">{item.year}</span>
                <h2 className="text-2xl md:text-3xl font-normal text-[#1E1E1E]">{item.client}</h2>
              </div>
              <div className="md:w-1/2">
                <p className="text-xs uppercase tracking-widest text-[#1E1E1E]/50 mb-1">{item.discipline}</p>
                <p className="text-sm font-light text-[#1E1E1E]/80">{item.summary}</p>
              </div>
              <div>
                <Link href="/contact" className="text-xs uppercase tracking-widest font-semibold hover:text-[#9B1C22]">
                  Discuss &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <WebsiteFooter />
    </div>
  );
}
