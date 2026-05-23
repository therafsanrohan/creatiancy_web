"use client";

import { use } from "react";
import { recentProjects } from "@/constants/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, User, Tag, Sparkles, CheckCircle } from "lucide-react";

export default function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const project = recentProjects.find((p) => p.id === resolvedParams.id);

  if (!project || project.id === 'next-project') {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[var(--bg)] selection:bg-[var(--ruby-red)] selection:text-white">
      {/* Premium Ambience Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-[var(--ruby-red)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[35vw] h-[35vw] bg-[var(--text)]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Back Link */}
        <Link 
          href="/work" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-fg)] hover:text-[var(--ruby-red)] transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Selected Work</span>
        </Link>

        {/* Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--muted)]/20 text-[var(--ruby-red)] text-xs font-bold tracking-widest uppercase border border-[var(--muted)]/50">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Case Study Details</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tighter text-balance">
              {project.title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-[var(--muted-fg)] font-light leading-relaxed text-balance">
              {project.shortDescription}
            </p>

            {project.externalLink && (
              <a 
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-[var(--ruby-red)] text-white rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-xl shadow-[var(--ruby-red)]/20 active:scale-95"
              >
                <span>{project.externalLink.includes('behance') ? 'View on Behance' : 'Visit Live Site'}</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Project Metadata Panel */}
          <div className="lg:col-span-4 bg-[var(--muted)]/10 border border-[var(--muted)]/30 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text)] border-b border-[var(--muted)]/40 pb-3">Project Metadata</h3>
            
            <div className="space-y-4">
              {/* Client */}
              {project.clientName && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-[var(--ruby-red)] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)]">Client</span>
                    <span className="text-sm font-semibold truncate">{project.clientName}</span>
                  </div>
                </div>
              )}

              {/* Date */}
              {project.date && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[var(--ruby-red)] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)]">Timeline</span>
                    <span className="text-sm font-semibold truncate">{project.date}</span>
                  </div>
                </div>
              )}

              {/* Sector */}
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-[var(--ruby-red)] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)]">Industry</span>
                  <span className="text-sm font-semibold truncate">{project.industry}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          
          {/* Card 1: Problem */}
          <div className="p-8 rounded-[2.5rem] bg-[var(--muted)]/5 border border-[var(--muted)]/20 shadow-lg flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--ruby-red)] border-b border-[var(--muted)]/20 pb-3">The Problem</h3>
            <p className="text-base text-[var(--muted-fg)] leading-relaxed font-light mt-2">
              {project.problem || "No problem parameters declared."}
            </p>
          </div>

          {/* Card 2: Solution */}
          <div className="p-8 rounded-[2.5rem] bg-[var(--muted)]/5 border border-[var(--muted)]/20 shadow-lg flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--ruby-red)] border-b border-[var(--muted)]/20 pb-3">Our Approach</h3>
            <p className="text-base text-[var(--muted-fg)] leading-relaxed font-light mt-2">
              {project.solution || "No approach parameters declared."}
            </p>
          </div>

          {/* Card 3: Result */}
          <div className="p-8 rounded-[2.5rem] bg-[var(--muted)]/5 border border-[var(--muted)]/20 shadow-lg flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--ruby-red)] border-b border-[var(--muted)]/20 pb-3">The Outcome</h3>
            <p className="text-base text-[var(--text)] leading-relaxed font-semibold mt-2">
              {project.result || "No outcome metrics declared."}
            </p>
          </div>
        </div>

        {/* Technologies Grid */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-20 pt-10 border-t border-[var(--muted)]/30">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-6">Technologies & Services Used</h3>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech, idx) => (
                <div 
                  key={idx} 
                  className="px-4 py-2 rounded-xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 text-xs font-semibold text-[var(--text)] hover:border-[var(--ruby-red)]/50 transition-colors cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marketing CTA Grid Block */}
        <div className="relative rounded-3xl overflow-hidden bg-[var(--text)] text-[var(--bg)] px-6 sm:px-10 py-16 sm:py-20 md:py-24 flex items-center justify-center text-center shadow-2xl mt-12">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ruby-red)]/20 to-transparent mix-blend-overlay" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tighter text-balance">
              Need a similar outcome?
            </h2>
            <p className="text-base sm:text-lg opacity-85 font-light max-w-md mx-auto text-balance">
              Let's engineer a solution designed specifically to accelerate your brand's market power.
            </p>
            <div className="pt-4 flex flex-col items-center">
              <Link 
                href="/contact" 
                className="inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-[var(--ruby-red)] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[var(--ruby-red)]/20 active:scale-95"
              >
                Initiate Project Discussion
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
