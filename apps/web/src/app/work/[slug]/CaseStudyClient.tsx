"use client";

import { ArrowLeft } from "lucide-react";
import { Link as CustomLink } from "@/components/ui/Link";
import { Container } from "@/components/ui/Layout";
import { 
  CaseStudyHero, 
  CaseStudyText, 
  CaseStudyMetrics, 
  CaseStudyGallery,
  CaseStudyTestimonial
} from "@/features/case-study/blocks";

export default function CaseStudyClient({ project }: { project: Record<string, any> }) {
  // We mock a structured layout based on the raw project data provided for this modular template.
  
  return (
    <article className="min-h-screen bg-[var(--bg)]">

      <div className="absolute top-24 left-0 w-full z-50">
        <Container>
          <CustomLink href="/work" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Work
          </CustomLink>
        </Container>
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

      <CaseStudyMetrics 
        metrics={[
          { label: "Increase in Conversion", value: "+120%" },
          { label: "Performance Score", value: "99" },
        ]}
      />

      {(project.result) && (
        <CaseStudyText 
          title="The Outcome" 
          content={project.result} 
        />
      )}

      {project.image && (
        <CaseStudyGallery 
          images={[project.image, project.image]} 
        />
      )}

      <CaseStudyTestimonial 
        quote="Creatiancy completely changed how we operate digitally. Their technical precision and design aesthetic are unmatched."
        author={project.clientName || project.client || "Partner"}
        role="CEO"
      />

    </article>
  );
}
