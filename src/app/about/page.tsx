import React from "react";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
import "@/app/website.css";

export default function AboutPage() {
  return (
    <div className="creatiancy-scope">
      <WebsiteHeader />
      <main className="pt-40 pb-24 md:pt-48 md:pb-36 px-6 md:px-12 max-w-4xl mx-auto flex-1">
        <p className="text-[#9B1C22] text-xs font-semibold tracking-widest uppercase mb-4">Philosophy</p>
        <h1 className="text-4xl sm:text-6xl font-light text-[#1E1E1E] tracking-tight leading-tight mb-8">
          We believe in discipline, clarity, and structural longevity.
        </h1>
        <div className="space-y-6 text-base md:text-lg font-light text-[#1E1E1E]/75 leading-relaxed">
          <p>
            Creatiancy exists to build legacies. In a market flooded with short-term decoration and generic templates, we operate with architectural focus and technical rigor.
          </p>
          <p>
            Every project begins with fundamental positioning and ends in high-impact execution. We combine executive brand strategy with robust digital engineering.
          </p>
        </div>
      </main>
      <WebsiteFooter />
    </div>
  );
}
