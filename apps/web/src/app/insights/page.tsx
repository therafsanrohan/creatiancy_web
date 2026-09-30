import { getDbClient } from "@creatiancy/database";
import InsightsClient from "./InsightsClient";

export const revalidate = 60;

export default async function InsightsPage() {
  let posts = [];

  try {
    const supabase = getDbClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("publish_state", "published")
      .order("publication_date", { ascending: false });

    if (error) {
      console.error("Error fetching insights:", error.message);
    } else if (data && data.length > 0) {
      posts = data;
    }
  } catch (err) {
    console.error("Failed to fetch insights:", err);
  }

  if (posts.length === 0) {
    posts = [
      {
        id: "1",
        title: "The Future of Digital Legacies",
        slug: "future-of-digital-legacies",
        excerpt: "How brands are shifting from disposable marketing to enduring digital architectures.",
        category: "Strategy",
        reading_time: 5,
        publication_date: "2026-09-30T00:00:00.000Z"
      },
      {
        id: "2",
        title: "Engineering Premium Experiences",
        slug: "engineering-premium-experiences",
        excerpt: "The technical foundations behind high-performance, immersive web interfaces.",
        category: "Engineering",
        reading_time: 8,
        publication_date: "2026-09-25T00:00:00.000Z"
      }
    ];
  }

  return <InsightsClient posts={posts} />;
}
