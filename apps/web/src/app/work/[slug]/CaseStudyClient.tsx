"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { 
  CaseStudyHero, 
  CaseStudyText, 
  CaseStudyGallery,
} from "@/features/case-study/blocks";

export default function CaseStudyClient({ project }: { project: Record<string, any> }) {
  return (
    <article className="min-h-screen bg-[#FBFDF9]">

      {/* Top Breadcrumb Nav */}
      <div className="pt-32 pb-4 px-6 md:px-12 border-b border-[#1E1E1E]/10 bg-[#FBFDF9]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link 
            href="/work" 
            className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.16em] uppercase text-[#1E1E1E] hover:text-[#9B1C22] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Work Archive
          </Link>
          <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#888]">
            {project.date || project.project_year || "2025"} &bull; Case Study
          </span>
        </div>
      </div>

      <CaseStudyHero 
        title={project.title}
        client={project.clientName || project.client || "Confidential"}
        industry={project.industry || "Digital"}
        year={project.date || project.project_year || new Date().getFullYear().toString()}
        image={project.image}
      />

      {(project.problem || project.challenge) && (
        <CaseStudyText 
          title="The Challenge" 
          content={project.problem || project.challenge} 
        />
      )}

      {(project.solution || project.strategy) && (
        <CaseStudyText 
          title="Our Approach" 
          content={project.solution || project.strategy} 
        />
      )}

      {project.result && (
        <CaseStudyText 
          title="The Outcome" 
          content={project.result} 
        />
      )}

      {project.image && (
        <CaseStudyGallery 
          images={[project.image]} 
        />
      )}

      {/* Action Footer Bar */}
      <section className="py-20 px-6 md:px-12 bg-[#FFFFFF] border-t border-[#1E1E1E]/10">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9B1C22] block mb-2">
              STUDIO COLLABORATION
            </span>
            <p className="text-[24px] sm:text-[30px] font-semibold tracking-[-0.02em] text-[#1E1E1E]">
              Have a similar challenge?
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-6 border border-[#1E1E1E]/20 text-[#1E1E1E] text-[12px] font-mono tracking-[0.14em] uppercase rounded-[6px] hover:border-[#1E1E1E] hover:bg-[#F2F4F0] transition-colors"
              >
                External Showcase ↗
              </a>
            )}
            <ButtonLink href="/contact" variant="primary" size="md" arrow>
              Start a Project
            </ButtonLink>
          </div>
        </div>
      </section>

    </article>
  );
}
