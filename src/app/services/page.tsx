import React from "react";
import Link from "next/link";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
import "@/app/website.css";

const services = [
  {
    title: "Brand Architecture & Visual Systems",
    desc: "Brand positioning, corporate typography systems, editorial guidelines, and sensory brand identity.",
  },
  {
    title: "Digital Products & Systems",
    desc: "High-performance web applications, scalable design systems, custom headless architecture, and enterprise UI/UX.",
  },
  {
    title: "Creative Technology & Experience",
    desc: "Sensory interaction design, dynamic 3D web presentation, bespoke marketing technology, and immersive storytelling.",
  },
];

export default function ServicesPage() {
  return (
    <div className="creatiancy-scope">
      <WebsiteHeader />
      <main className="pt-40 pb-24 md:pt-48 md:pb-36 px-6 md:px-12 max-w-7xl mx-auto flex-1">
        <p className="text-[#9B1C22] text-xs font-semibold tracking-widest uppercase mb-4">Capabilities</p>
        <h1 className="text-4xl sm:text-6xl font-light text-[#1E1E1E] tracking-tight mb-16">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={s.title} className="border border-[#1E1E1E]/10 p-8 md:p-10 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#9B1C22] block mb-4">0{idx + 1}</span>
                <h2 className="text-2xl font-normal text-[#1E1E1E] mb-4">{s.title}</h2>
                <p className="text-sm font-light text-[#1E1E1E]/70 leading-relaxed mb-6">{s.desc}</p>
              </div>
              <Link href="/contact" className="text-xs uppercase tracking-widest font-semibold text-[#1E1E1E] hover:text-[#9B1C22]">
                Inquire &rarr;
              </Link>
            </div>
          ))}
        </div>
      </main>
      <WebsiteFooter />
    </div>
  );
}
