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

export default function CaseStudyClient({ project }: { project: any }) {
  // We mock a structured layout based on the raw project data provided for this modular template.
  
  return (
    <article className="min-h-screen bg-[var(--bg)]">
      
      {/* Top Back Link Navigation */}
      <div className="absolute top-24 left-0 w-full z-50">
        <Container>
          <CustomLink href="/work" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Work
          </CustomLink>
        </Container>
      </div>

      {/* 1. Hero Block */}
      <CaseStudyHero 
        title={project.title}
        client={project.clientName || project.client || "Confidential"}
        industry={project.industry || "Digital"}
        year={project.date || project.project_year || new Date().getFullYear().toString()}
        image={project.image}
      />

      {/* 2. Challenge Text Block */}
      {(project.problem || project.challenge) && (
        <CaseStudyText 
          title="The Challenge" 
          content={project.problem || project.challenge} 
        />
      )}

      {/* 3. Strategy/Approach Text Block */}
      {(project.solution || project.strategy) && (
        <CaseStudyText 
          title="Our Approach" 
          content={project.solution || project.strategy} 
        />
      )}

      {/* 4. Mock Metrics (If available, otherwise hide) */}
      <CaseStudyMetrics 
        metrics={[
          { label: "Increase in Conversion", value: "+120%" },
          { label: "Performance Score", value: "99" },
        ]}
      />

      {/* 5. Outcome Block */}
      {(project.result) && (
        <CaseStudyText 
          title="The Outcome" 
          content={project.result} 
        />
      )}

      {/* 6. Mock Gallery Block */}
      {project.image && (
        <CaseStudyGallery 
          images={[project.image, project.image]} 
        />
      )}

      {/* 7. Mock Testimonial Block */}
      <CaseStudyTestimonial 
        quote="Creatiancy completely changed how we operate digitally. Their technical precision and design aesthetic are unmatched."
        author={project.clientName || project.client || "Partner"}
        role="CEO"
      />

    </article>
  );
}
