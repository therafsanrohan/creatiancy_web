"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

interface StepNode {
  num: string;
  icon: string;
  label: string;
  sub: string;
}

const NODES: StepNode[] = [
  { num: "01", icon: "Compass", label: "Strategic Discovery", sub: "Analyze tension" },
  { num: "02", icon: "Layers", label: "Core Thesis", sub: "Define narrative" },
  { num: "03", icon: "LayoutGrid", label: "Visual System", sub: "Architect identity" },
  { num: "04", icon: "Sliders", label: "Editorial Polish", sub: "Remove excess" },
  { num: "05", icon: "Rocket", label: "Live Launch", sub: "Deploy platform" },
];

export const FlowDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <div ref={containerRef} className="w-full relative py-12">
      
      {/* Desktop Horizontal Flow */}
      <div className="hidden lg:block relative w-full">
        
        {/* Animated Connecting SVG Path */}
        <div className="absolute top-[36px] left-[5%] right-[5%] h-1 pointer-events-none z-0">
          <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
            {/* Background Track */}
            <line
              x1="0"
              y1="4"
              x2="100%"
              y2="4"
              stroke="#1E1E1E"
              strokeOpacity="0.12"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Active Drawing Line */}
            <motion.line
              x1="0"
              y1="4"
              x2="100%"
              y2="4"
              stroke="#9B1C22"
              strokeWidth="2.5"
              style={shouldReduceMotion ? { pathLength: 1 } : { pathLength }}
            />
          </svg>
        </div>

        {/* Nodes Grid */}
        <div className="relative z-10 grid grid-cols-5 gap-6">
          {NODES.map((node, i) => (
            <div key={node.num} className="flex flex-col items-center text-center group">
              {/* Node Circle */}
              <div className="w-[72px] h-[72px] rounded-[18px] bg-[#FFFFFF] border-2 border-[#1E1E1E]/15 group-hover:border-[#9B1C22] shadow-sm flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 mb-5 relative">
                <Icon name={node.icon} size={22} className="text-[#1E1E1E] group-hover:text-[#9B1C22] transition-colors" />
                <span className="text-[10px] font-mono font-bold text-[#888] mt-0.5">
                  {node.num}
                </span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#9B1C22] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Labels (Strictly concise, max 3 words) */}
              <h4 className="text-[16px] font-semibold tracking-tight text-[#1E1E1E] mb-1">
                {node.label}
              </h4>
              <p className="text-[12px] font-mono uppercase tracking-wider text-[#888]">
                {node.sub}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Mobile/Tablet Vertical Timeline */}
      <div className="lg:hidden relative pl-6 border-l-2 border-[#9B1C22]/30 space-y-10">
        {NODES.map((node) => (
          <div key={node.num} className="relative flex items-start gap-4">
            <div className="absolute -left-[35px] w-8 h-8 rounded-[8px] bg-white border border-[#9B1C22] flex items-center justify-center text-[#9B1C22] shrink-0">
              <Icon name={node.icon} size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#9B1C22]">{node.num}</span>
                <h4 className="text-[18px] font-semibold text-[#1E1E1E]">{node.label}</h4>
              </div>
              <p className="text-[13px] font-mono uppercase tracking-wider text-[#777] mt-1">
                {node.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
