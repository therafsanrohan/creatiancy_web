import { getDbClient } from "@creatiancy/database";
import { notFound } from "next/navigation";
import PostClient from "./PostClient";

export const revalidate = 60;

export default async function InsightPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  let post = null;

  try {
    const supabase = getDbClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("publish_state", "published")
      .single();
      
    if (data) {
      post = data;
    }
  } catch (err) {
    console.error("Failed to fetch post from Supabase:", err);
  }

  if (!post) {
    // Fallback static data for demonstration
    const fallbacks = [
      {
        id: "1",
        title: "The Future of Digital Legacies",
        slug: "future-of-digital-legacies",
        excerpt: "How brands are shifting from disposable marketing to enduring digital architectures.",
        rich_content: [{ type: "paragraph", content: "This is a placeholder for the full article content." }],
        category: "Strategy",
        reading_time: 5,
        publication_date: new Date().toISOString()
      },
      {
        id: "2",
        title: "Engineering Premium Experiences",
        slug: "engineering-premium-experiences",
        excerpt: "The technical foundations behind high-performance, immersive web interfaces.",
        rich_content: [{ type: "paragraph", content: "This is a placeholder for the full article content." }],
        category: "Engineering",
        reading_time: 8,
        publication_date: new Date(Date.now() - 86400000 * 5).toISOString()
      }
    ];
    post = fallbacks.find(p => p.slug === slug);
  }

  if (!post) {
    notFound();
  }

  return <PostClient post={post} />;
}
