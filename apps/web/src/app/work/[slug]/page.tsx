import { getDbClient } from "@creatiancy/database";
import { caseStudies } from "@/constants/projects";
import { notFound } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";

export const revalidate = 60;

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  let project = null;

  try {
    const supabase = getDbClient();
    
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("publish_state", "published")
      .single();
      
    if (data) {
      project = data;
    }
  } catch (err) {
    console.error("Failed to fetch case study from Supabase:", err);
  }

  if (!project) {
    project = caseStudies.find((p) => p.id === slug || p.id === resolvedParams.slug);
  }

  if (!project || project.id === 'next-project') {
    notFound();
  }

  return <CaseStudyClient project={project} />;
}
