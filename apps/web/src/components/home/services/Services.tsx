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
      className="relative w-full bg-[#070809] py-32 px-4 sm:px-6 lg:px-8 text-neutral-100 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Ambient Red Flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-[#FF2B43]/8 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-[#D90429]/6 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.08] gap-6">
          <div>
            <h2 className="text-[34px] sm:text-[48px] md:text-[60px] font-bold tracking-tight text-[#F4F5F7] leading-none uppercase font-heading">
              The Creative Lab &amp; Systems.
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="text-[15px] sm:text-[17px] text-neutral-400 font-light max-w-md font-sans mb-3">
              Where brand strategy collides with spatial technology and high-conversion UX.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-[#FF2B43] animate-pulse" />
              <span>CLICK ANY CARD TO REVEAL FULL SYSTEM SPECS</span>
            </div>
          </div>
        </div>

        {/* 12-Column Bento Matrix */}
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
                className={`group relative rounded-3xl bg-[#0E1114]/90 border backdrop-blur-xl transition-all duration-500 cursor-pointer p-8 sm:p-10 flex flex-col justify-between overflow-hidden ${
                  item.colSpan
                } ${
                  isExpanded || isHovered
                    ? 'border-[#FF2B43]/50 shadow-[0_20px_50px_-20px_rgba(255,43,67,0.25)] -translate-y-1'
                    : 'border-white/[0.07] hover:border-white/20'
                }`}
              >
                {/* Dynamic Crimson Radial Glow on Card Top-Right */}
                <div
                  className={`absolute top-0 right-0 w-52 h-52 bg-gradient-to-bl from-[#FF2B43]/20 via-[#FF2B43]/5 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-500 ${
                    isHovered || isExpanded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Card Top: Number, Badge, and Icon */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 tracking-wider">
                      <span className="text-[#FF2B43] font-semibold">[{item.number}]</span>
                      <span>•</span>
                      <span className="uppercase text-neutral-400">{item.badge}</span>
                    </div>

                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                        isHovered || isExpanded
                          ? 'bg-[#FF2B43] text-white border-[#FF2B43] shadow-[0_0_20px_rgba(255,43,67,0.4)]'
                          : 'bg-white/[0.03] border-white/[0.08] text-neutral-300 group-hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#FF2B43] mb-4">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                    {item.summary}
                  </p>
                </div>

                {/* Capability Chips */}
                <div>
                  <div className="pt-6 border-t border-white/[0.06] mb-6">
                    <div className="text-[11px] font-mono uppercase text-neutral-500 mb-3 tracking-wider">
                      Core Disciplines
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.capabilities.map((cap, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 font-sans group-hover:border-white/15 transition-colors"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable System Specs Drawer */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isExpanded ? 'max-h-60 opacity-100 pt-4 border-t border-white/[0.06] mb-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="text-[11px] font-mono uppercase text-[#FF2B43] mb-3 tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> System Architecture Specs
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-400">
                      {item.systemSpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2B43] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="pt-4 flex items-center justify-between text-xs font-mono text-neutral-500 border-t border-white/[0.04]">
                    <span className="text-[#FF2B43] font-medium tracking-wide">
                      {item.metric}
                    </span>
                    <div className="flex items-center gap-1.5 text-neutral-400 group-hover:text-white transition-colors">
                      <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                      {isExpanded ? (
                        <ArrowUpRight className="w-4 h-4 text-[#FF2B43] rotate-45 transition-transform" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-[#FF2B43] group-hover:translate-x-0.5 transition-all" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Floating Conversion Strip */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#0E1114] via-[#0E1114] to-[#FF2B43]/10 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-normal text-white mb-1">
              Need a bespoke cross-disciplinary scope?
            </h4>
            <p className="text-xs font-mono text-neutral-400">
              We structure custom hybrid engagements combining brand identity, 3D film, and enterprise web architecture.
            </p>
          </div>
          <a
            href="/contact"
            className="px-6 py-3.5 rounded-full bg-[#FF2B43] text-white font-medium text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-[#E01E37] transition-all shadow-[0_0_25px_rgba(255,43,67,0.4)] shrink-0 min-h-[48px]"
          >
            <span>Custom Architecture Brief</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;
