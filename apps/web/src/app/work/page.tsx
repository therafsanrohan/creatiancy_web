"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface WorkProject {
  id: string;
  client: string;
  title: string;
  headline: string;
  category: "all" | "branding" | "web" | "ads";
  discipline: string;
  metric: string;
  year: string;
  slug: string;
  image: string;
  tags: string[];
  externalLink?: string;
}

const ALL_WORKS: WorkProject[] = [
  {
    id: "kazi-canvas",
    client: "Kazi Canvas Gallery",
    title: "Fine Art eCommerce & Digital Gallery Architecture",
    headline: "Engineered an immersive online fine art platform, curating hand-painted canvas artworks, calligraphy, and bespoke exhibition collections.",
    category: "web",
    discipline: "Fine Art eCommerce & Web Architecture",
    metric: "FINE ART DIGITAL GALLERY",
    year: "2026",
    slug: "kazi-canvas",
    image: "/images/kazi_canvas_showcase.png",
    tags: ["Fine Art Gallery", "eCommerce Architecture", "Next.js", "Visual Commerce"],
    externalLink: "https://kazicanvasgallery.com/",
  },
  {
    id: "rafsan-rohan",
    client: "Rafsan Rohan",
    title: "Visual Strategist & Creative Direction Platform",
    headline: "Engineered a high-performance minimalist portfolio and digital brand experience showcasing visual strategy and creative direction.",
    category: "web",
    discipline: "Digital Brand Experience & Web Architecture",
    metric: "PERSONAL DIGITAL SHOWCASE",
    year: "2026",
    slug: "rafsan-rohan",
    image: "/images/rafsan_rohan_showcase.png",
    tags: ["Next.js", "Creative Strategy", "Visual Identity", "Web Architecture"],
    externalLink: "https://www.rafsanrohan.com",
  },
  {
    id: "odl-ads",
    client: "ODL Developers Ltd.",
    title: "Real Estate OOH & Billboard Architecture",
    headline: "Transforming high-rise development visibility into an undisputed architectural statement across prime metropolitan zones.",
    category: "ads",
    discipline: "OOH Strategy & Spatial Graphics",
    metric: "NATIONWIDE CAMPAIGN REACH",
    year: "2025",
    slug: "odl-ads",
    image: "/images/project real.png",
    tags: ["OOH Strategy", "Billboard Systems", "Spatial Graphics", "Typography"],
    externalLink: "https://www.behance.net/gallery/234613189/Real-Estate-Promotional-Poster-Design?platform=direct",
  },
  {
    id: "omni-connects",
    client: "OMNI CONNECTS",
    title: "Enterprise Brand Architecture & Design System",
    headline: "Complete corporate identity realignment, design token architecture, and high-conversion SaaS interface ecosystem.",
    category: "branding",
    discipline: "Brand Architecture & SaaS UX",
    metric: "COMPLETE BRAND RESTRUCTURE",
    year: "2025",
    slug: "omni-connects",
    image: "/images/omni_branding.png",
    tags: ["Brand Architecture", "Corporate Marks", "Design Tokens", "SaaS Dashboard"],
    externalLink: "https://www.omniconnects.com",
  },
];

const CATEGORY_TABS = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web & Digital" },
  { key: "ads", label: "Creative Ads" },
  { key: "branding", label: "Brand Strategy" },
] as const;

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "branding" | "web" | "ads">("all");

  const filteredProjects = activeCategory === "all" 
    ? ALL_WORKS 
    : ALL_WORKS.filter((p) => p.category === activeCategory);

  return (
    <div className="creatiancy-scope bg-[#0C0708] text-white select-none selection:bg-[#9B1C22] selection:text-white">
      <main className="w-full relative">

        {/* 1. Cinematic Hero Section Matching Home Theme */}
        <section 
          id="hero-section"
          className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-20 sm:pb-28 px-6 md:px-12 bg-[#0C0708] overflow-hidden text-white border-b border-[#9B1C22]/20"
        >
          {/* Cinematic Silhouette Ambient Glow Background */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/hero/cinematic-silhouette.png"
              alt="Creatiancy Studio Archive"
              fill
              priority
              className="object-cover object-center opacity-85 mix-blend-screen scale-[1.02]"
            />
            {/* Ambient Dark-Crimson Spotlight Glow */}
            <div className="absolute inset-0 bg-radial-[at_50%_35%] from-[#9B1C22]/40 via-[#0C0708]/85 to-[#0C0708] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C0708] to-transparent pointer-events-none" />
          </div>

          {/* Editorial Studio Wireframe / Dimension Grid Lines */}
          <div className="absolute inset-0 z-[1] pointer-events-none select-none max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="relative w-full h-full border-x border-[#9B1C22]/20">
              <div className="absolute inset-y-0 left-[20%] w-px bg-[#9B1C22]/15 hidden md:block" />
              <div className="absolute inset-y-0 left-[50%] w-px bg-[#9B1C22]/15 hidden md:block" />
              <div className="absolute inset-y-0 left-[75%] w-px bg-[#9B1C22]/15 hidden md:block" />

              {/* Dimension Rule */}
              <div className="absolute bottom-6 left-0 right-0 border-t border-[#9B1C22]/25 flex items-center justify-between pt-1.5 px-3 text-[10px] font-mono text-[#9B1C22]/70 tracking-widest">
                <span>01</span>
                <span className="hidden md:inline">INDEX ARCHIVE</span>
                <span>VERIFIED</span>
                <span className="hidden md:inline">PRODUCTION</span>
                <span>STUDIO ARCHIVE</span>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1440px] mx-auto">
            {/* Index Tracker Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-white/10 text-[11px] font-mono tracking-[0.16em] uppercase text-white/50 mb-12 sm:mb-16">
              <div>
                <span className="text-[#FF4D5E] mr-2">01</span>
                <span>SELECTED WORK</span>
              </div>
              <div>
                <span className="text-[#FF4D5E] mr-2">02</span>
                <span>CASE ARCHIVE</span>
              </div>
              <div className="hidden md:block">
                <span className="text-[#FF4D5E] mr-2">03</span>
                <span>PRODUCTION SYSTEMS</span>
              </div>
              <div className="text-right">
                <span className="text-[#FF4D5E] mr-2">04</span>
                <span>STUDIO ARCHIVE</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="max-w-5xl mb-8">
              <span className="text-[12px] font-mono tracking-[0.2em] text-[#FF4D5E] uppercase block mb-4 font-semibold">
                CURATED ARCHIVE &bull; SELECTED WORK
              </span>
              <h1 className="text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-medium tracking-[-0.035em] text-white leading-[1.0] text-balance">
                Work built to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D5E] via-[#D32F38] to-[#9B1C22] font-normal">
                  refuse indifference
                </span>
              </h1>
            </div>

            {/* Narrative & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4 pb-8">
              <div className="lg:col-span-8">
                <p className="text-[17px] sm:text-[20px] md:text-[22px] text-white/80 font-normal leading-[1.45] max-w-3xl text-pretty">
                  We don&apos;t build disposable campaigns. Every project in this archive represents a verified commercial engagement engineered for brand equity, conversion velocity, and lasting market presence.
                </p>
              </div>

              <div className="lg:col-span-4 flex items-center lg:justify-end gap-6 text-[13px] font-mono text-white/60">
                <div>
                  <span className="text-[28px] font-bold text-white block leading-none mb-1">150+</span>
                  <span className="text-[11px] uppercase tracking-wider text-white/40">Projects Delivered</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <span className="text-[28px] font-bold text-[#FF4D5E] block leading-none mb-1">98%</span>
                  <span className="text-[11px] uppercase tracking-wider text-white/40">Client Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Light Surface Section: Minimalist Selected Works Grid with Landing Page Hero Curve */}
        <section className="w-full relative select-none bg-[#0C0708]">
          <div 
            id="selected-works-surface"
            className="w-full rounded-t-[24px] sm:rounded-t-[32px] md:rounded-t-[40px] bg-[#F5F5F7] text-[#1D1D1F] py-20 sm:py-28 px-6 md:px-12 relative overflow-hidden"
          >
            {/* Ambient soft glow */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[350px] bg-[#9B1C22]/[0.035] blur-[140px] pointer-events-none rounded-full" />

            <div className="max-w-[1360px] mx-auto relative z-10">
              
              {/* Minimalist Apple-Clean Header & Filter Controls */}
              <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 sm:pb-10 border-b border-black/[0.08] gap-6 mb-10 sm:mb-14">
                <div>
                  <h2 className="text-[32px] sm:text-[44px] md:text-[50px] font-medium tracking-tight text-[#1D1D1F] leading-tight">
                    Selected Works
                  </h2>
                </div>

                {/* Responsive Category Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white/90 border border-black/[0.08] shadow-sm backdrop-blur-md">
                  {CATEGORY_TABS.map((tab) => {
                    const isActive = activeCategory === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveCategory(tab.key)}
                        className={`px-4 sm:px-5 py-2 rounded-full text-[12px] font-medium tracking-tight transition-all duration-300 min-h-[38px] ${
                          isActive
                            ? "bg-[#9B1C22] text-white shadow-sm font-semibold"
                            : "text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-neutral-100"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clean, High-UX Responsive Grid (1-col on mobile, 2-col on desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                {filteredProjects.map((work, idx) => {
                  const isInternalCaseStudy = work.slug === "odl-ads" || work.slug === "omni-connects";
                  const targetHref = work.externalLink ? work.externalLink : isInternalCaseStudy ? `/work/${work.slug}` : "/contact";
                  const isExternal = Boolean(work.externalLink);

                  return (
                    <article
                      key={work.id}
                      className="group flex flex-col justify-between p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#9B1C22]/30 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
                    >
                      <div>
                        {/* Image Container with Smooth Aspect Ratio (Clean, No Distracting Badges) */}
                        <a
                          href={targetHref}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="relative block overflow-hidden rounded-[16px] bg-neutral-100 border border-black/[0.04] mb-6 cursor-pointer"
                          aria-label={`View ${work.client} project`}
                        >
                          <div className="w-full aspect-[16/10] relative overflow-hidden">
                            <Image
                              src={work.image}
                              alt={`${work.client} — ${work.title}`}
                              fill
                              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority={idx === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
                          </div>
                        </a>

                        {/* Discipline Meta Label */}
                        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#9B1C22] block font-mono mb-2">
                          {work.discipline}
                        </span>

                        {/* Client Name */}
                        <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#1D1D1F] tracking-tight leading-snug mb-2.5 group-hover:text-[#9B1C22] transition-colors">
                          <a
                            href={targetHref}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="hover:underline"
                          >
                            {work.client}
                          </a>
                        </h3>

                        {/* Concise Editorial Copy */}
                        <p className="text-[14px] sm:text-[15px] text-[#6E6E73] font-normal leading-relaxed mb-6">
                          {work.headline}
                        </p>
                      </div>

                      {/* Bottom Action & Scope Chips Row */}
                      <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between gap-4">
                        {/* Condensed Tag Chips */}
                        <div className="flex flex-wrap gap-1.5 overflow-hidden">
                          {work.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium tracking-tight px-2.5 py-1 rounded-full bg-neutral-100 text-[#6E6E73] border border-black/[0.04]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Creative, Clean Action Buttons */}
                        <div className="flex items-center gap-2.5 shrink-0">
                          {work.externalLink && (
                            <a
                              href={work.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open external showcase for ${work.client}`}
                              className="w-10 h-10 rounded-full border border-black/10 hover:border-[#9B1C22]/50 text-[#6E6E73] hover:text-[#9B1C22] transition-colors flex items-center justify-center bg-white shadow-xs group/ext min-h-[40px]"
                            >
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5" />
                            </a>
                          )}

                          <a
                            href={targetHref}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-medium tracking-wide bg-gradient-to-b from-[#A8242A] to-[#9B1C22] hover:from-[#9B1C22] hover:to-[#82151B] text-white transition-all duration-200 border border-[#9B1C22]/40 shadow-sm hover:shadow-[0_4px_16px_rgba(155,28,34,0.35)] min-h-[40px] active:scale-95 text-center"
                          >
                            <span>{work.externalLink ? "Live Preview" : isInternalCaseStudy ? "View Case Study" : "Start Project"}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* 3. Bottom Studio CTA Section */}
        <section className="py-20 sm:py-28 px-6 md:px-12 bg-[#F5F5F7] text-[#1D1D1F] border-t border-black/[0.08]">
          <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-12">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9B1C22] block mb-2 font-semibold">
                READY TO BUILD A LEGACY
              </span>
              <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-[#1D1D1F] leading-tight">
                Have a vision that demands world-class execution?
              </h2>
              <p className="text-[15px] sm:text-[17px] text-[#6E6E73] font-normal mt-3">
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
                href="/"
                onClick={() => {
                  sessionStorage.setItem("scroll_to_section", "creative-lab");
                }}
                className="inline-flex items-center justify-center px-6 h-12 sm:h-13 rounded-full text-[13px] font-medium tracking-wide bg-white hover:bg-neutral-100 text-[#1D1D1F] border border-black/10 shadow-sm transition-all duration-200 min-h-[48px] active:scale-[0.99]"
              >
                Explore capabilities
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
