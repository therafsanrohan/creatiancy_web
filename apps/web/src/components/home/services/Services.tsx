'use client';

import React, { useState } from 'react';
import {
  Layers,
  Film,
  Cpu,
  Code2,
  TrendingUp,
  Camera,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  colSpan: string;
  badge: string;
  metric: string;
  capabilities: string[];
  systemSpecs: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: 'strategy',
    number: '01',
    title: 'Brand Strategy & Architecture',
    tagline: 'Defensible Market Moats & Narrative',
    summary:
      'We deconstruct ambiguous market landscapes to engineer distinct positioning frameworks, category definitions, and brand architectures that command pricing power.',
    icon: Layers,
    colSpan: 'lg:col-span-8',
    badge: 'Foundational Core',
    metric: '100% Distinctive Moat',
    capabilities: [
      'Strategic Positioning',
      'Brand Architecture',
      'Naming Protocols',
      'Narrative & Voice Matrix',
      'Competitive Moat Analysis',
    ],
    systemSpecs: ['Deliverable: Strategic Brand Bible', 'Execution Cycle: 2–3 Weeks', 'Cross-Platform Scalability: Global'],
  },
  {
    id: 'content',
    number: '02',
    title: 'Content Lab & Commercial Film',
    tagline: 'High-Fidelity Cinema & Motion',
    summary:
      'Cinematic visual storytelling, commercial art direction, and 4K motion design engineered to hold viewer retention across international platforms.',
    icon: Film,
    colSpan: 'lg:col-span-4',
    badge: 'Production Engine',
    metric: '4K Commercial Craft',
    capabilities: [
      'Commercial Direction',
      '3D Motion & CGI',
      'Social Video Engines',
      'Art Direction & Copy',
    ],
    systemSpecs: ['Native Formats: 9:16 & 16:9', 'Render Pipeline: Octane / Cinema4D', 'Audio: Mastered Spatial Sound'],
  },
  {
    id: 'creative-tech',
    number: '03',
    title: 'Creative Technology & WebGL',
    tagline: 'Spatial Interactions & Custom Shaders',
    summary:
      'Pushing browser constraints through WebGL, Three.js, dynamic raymarching, and interactive canvases that turn digital visits into memorable branded events.',
    icon: Cpu,
    colSpan: 'lg:col-span-4',
    badge: 'Experimental R&D',
    metric: '60fps GPU Performance',
    capabilities: [
      'Three.js & WebGL',
      'Custom Fragment Shaders',
      'Interactive Canvas 2D',
      'Physics Simulations',
    ],
    systemSpecs: ['Zero Frame Drops (60+ FPS)', 'Mobile GPU Fallbacks', 'Lightweight Asset Compression'],
  },
  {
    id: 'ui-ux',
    number: '04',
    title: 'Digital UI/UX Engineering',
    tagline: 'Sub-Second Conversion Architecture',
    summary:
      'Bespoke digital platforms engineered with Next.js, strict design systems, and frictionless micro-interactions balancing brutalist craft with high-intent conversion.',
    icon: Code2,
    colSpan: 'lg:col-span-8',
    badge: 'High-Conversion Architecture',
    metric: 'Sub-900ms Speed Index',
    capabilities: [
      'Design Systems (Figma)',
      'Next.js Full-Stack UI',
      'WCAG 2.1 AA Compliance',
      'Micro-Interactions',
      'Performance Optimization',
    ],
    systemSpecs: ['Lighthouse Score: 98+', 'Full Responsive Fluid Breakpoints', 'Zero Layout Shift (CLS < 0.05)'],
  },
  {
    id: 'growth',
    number: '05',
    title: 'Performance & Growth Engineering',
    tagline: 'Data-Driven Funnel Dominance',
    summary:
      'Algorithmic conversion rate optimization, technical search architecture, and analytical telemetry designed to multiply client customer lifetime value.',
    icon: TrendingUp,
    colSpan: 'lg:col-span-6',
    badge: 'Analytical Engine',
    metric: '+140% Conversion Lift',
    capabilities: [
      'Conversion Rate Optimization (CRO)',
      'Technical SEO Infrastructure',
      'Funnel Telemetry & Tracking',
      'Growth Automation',
    ],
    systemSpecs: ['Attribution: Multi-Touch Modeling', 'A/B Testing Frameworks', 'Real-Time ROI Dashboards'],
  },
  {
    id: 'production',
    number: '06',
    title: 'Spatial Production & Staging',
    tagline: 'Tangible Editorial & Physical Identity',
    summary:
      'High-end tangible collateral, specialized large-format exhibition graphics, packaging engineering, and physical environment art direction.',
    icon: Camera,
    colSpan: 'lg:col-span-6',
    badge: 'Physical Artifacts',
    metric: 'Bespoke Tactile Finish',
    capabilities: [
      'Premium Packaging Design',
      'Stationery & Tactile Print',
      'Exhibition & Spatial Graphics',
      'Large Format Signage',
    ],
    systemSpecs: ['Color Profiles: Pantone / CMYK Proofing', 'Foil & Emboss Tooling', 'Sustainable Material Sourcing'],
  },
];

export function Services() {
  const [activeExpandedId, setActiveExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setActiveExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#F5F5F7] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 text-[#1D1D1F] overflow-hidden border-t border-black/[0.06]"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-[#9B1C22]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-black/[0.02] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-black/[0.08] gap-6">
          <div>
            <h2 className="text-[34px] sm:text-[48px] md:text-[60px] font-bold tracking-tight text-[#1D1D1F] leading-none uppercase">
              The Creative Lab &amp; Systems.
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="text-[15px] sm:text-[17px] text-[#6E6E73] font-normal max-w-md mb-3">
              Where brand strategy collides with spatial technology and high-conversion UX.
            </p>
            <div className="flex items-center gap-2.5 text-xs font-medium text-[#86868B]">
              <span className="w-2 h-2 rounded-full bg-[#9B1C22] animate-pulse" />
              <span>Tap any discipline to reveal system specs</span>
            </div>
          </div>
        </div>

        {/* 12-Column Apple Bento Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {servicesData.map((item) => {
            const IconComponent = item.icon;
            const isExpanded = activeExpandedId === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => toggleExpand(item.id)}
                className={`group relative rounded-[28px] bg-white border transition-all duration-500 cursor-pointer p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-sm ${
                  item.colSpan
                } ${
                  isExpanded || isHovered
                    ? 'border-[#9B1C22]/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] -translate-y-1'
                    : 'border-black/[0.06] hover:border-black/20 hover:shadow-md'
                }`}
              >
                {/* Subtle Brand Red Radial Tint on Card Top-Right */}
                <div
                  className={`absolute top-0 right-0 w-52 h-52 bg-gradient-to-bl from-[#9B1C22]/8 via-[#9B1C22]/2 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-500 ${
                    isHovered || isExpanded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Card Top: Number, Badge, and Icon */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 font-medium text-xs text-[#86868B] tracking-wide">
                      <span className="text-[#9B1C22] font-semibold">[{item.number}]</span>
                      <span>•</span>
                      <span className="uppercase text-[#6E6E73]">{item.badge}</span>
                    </div>

                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                        isHovered || isExpanded
                          ? 'bg-[#9B1C22] text-white border-[#9B1C22] shadow-[0_4px_16px_rgba(155,28,34,0.35)]'
                          : 'bg-neutral-100 border-black/[0.04] text-[#1D1D1F]'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#9B1C22] mb-4">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-[#6E6E73] leading-relaxed mb-8">
                    {item.summary}
                  </p>
                </div>

                {/* Capability Chips */}
                <div>
                  <div className="pt-6 border-t border-black/[0.06] mb-6">
                    <div className="text-[11px] font-medium uppercase text-[#86868B] mb-3 tracking-wide">
                      Core Disciplines
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.capabilities.map((cap, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3.5 py-1.5 rounded-full bg-neutral-100 border border-black/[0.04] text-[#1D1D1F] font-medium transition-colors hover:bg-neutral-200/70"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable System Specs Drawer */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isExpanded ? 'max-h-60 opacity-100 pt-4 border-t border-black/[0.06] mb-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="text-[11px] font-medium uppercase text-[#9B1C22] mb-3 tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> System Architecture Specs
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-normal text-[#6E6E73]">
                      {item.systemSpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9B1C22] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="pt-4 flex items-center justify-between text-xs font-medium text-[#86868B] border-t border-black/[0.04]">
                    <span className="text-[#9B1C22] font-semibold tracking-wide">
                      {item.metric}
                    </span>
                    <div className="flex items-center gap-1.5 text-[#1D1D1F] group-hover:text-[#9B1C22] transition-colors">
                      <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                      {isExpanded ? (
                        <ArrowUpRight className="w-4 h-4 text-[#9B1C22] rotate-45 transition-transform" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#86868B] group-hover:text-[#9B1C22] group-hover:translate-x-0.5 transition-all" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Floating Conversion Strip */}
        <div className="mt-16 p-8 sm:p-10 rounded-[28px] bg-white border border-black/[0.08] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] mb-1">
              Need a bespoke cross-disciplinary scope?
            </h4>
            <p className="text-sm text-[#6E6E73] font-normal">
              We structure custom hybrid engagements combining brand identity, 3D film, and enterprise web architecture.
            </p>
          </div>
          <a
            href="/contact"
            className="group inline-flex items-center justify-center px-7 h-13 rounded-full bg-gradient-to-b from-[#A8242A] to-[#9B1C22] hover:from-[#9B1C22] hover:to-[#82151B] text-white font-medium text-xs uppercase tracking-wider transition-all duration-200 border border-[#9B1C22]/30 shadow-[0_2px_12px_rgba(155,28,34,0.25)] hover:shadow-[0_4px_20px_rgba(155,28,34,0.35)] shrink-0 min-h-[48px] active:scale-[0.98] text-center"
          >
            <span>Custom Architecture Brief</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;
