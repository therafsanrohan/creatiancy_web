"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Container, Grid } from "@/components/ui/Layout";
import { Heading, Text } from "@/components/ui/Typography";
import { Link as CustomLink } from "@/components/ui/Link";

export default function InsightsClient({ posts }: { posts: any[] }) {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--bg)] text-[var(--text)]">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24 md:mb-32 space-y-6"
        >
          <Text variant="small" className="uppercase font-bold tracking-widest text-[var(--ruby-red)]">
            Perspectives
          </Text>
          <Heading level={1} className="text-6xl md:text-8xl lg:text-9xl leading-none text-balance">
            Insights & Intelligence.
          </Heading>
          <Text variant="lead" className="max-w-2xl text-balance">
            Our latest thinking on design, technology, and building digital legacies.
          </Text>
        </motion.div>

        <Grid cols={2} className="gap-12">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col border border-[var(--border)] rounded-3xl p-8 hover:border-[var(--ruby-red)] transition-all duration-500 hover:shadow-xl bg-[var(--muted)]/5"
            >
              <CustomLink href={`/insights/${post.slug}`} className="block flex-grow hover:no-underline">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--ruby-red)]">
                    {post.category}
                  </span>
                  <span className="text-xs font-medium text-[var(--muted-fg)]">
                    {post.reading_time ? `${post.reading_time} min read` : ''}
                  </span>
                </div>
                <Heading level={3} className="mb-4 group-hover:text-[var(--ruby-red)] transition-colors">
                  {post.title}
                </Heading>
                <Text variant="muted" className="leading-relaxed">
                  {post.excerpt}
                </Text>
              </CustomLink>
              <div className="mt-8 pt-6 border-t border-[var(--border)] flex justify-between items-center">
                <Text variant="small" className="font-medium text-[var(--muted-fg)]">
                  {new Date(post.publication_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </Text>
                <CustomLink 
                  href={`/insights/${post.slug}`}
                  className="w-10 h-10 rounded-full bg-[var(--ruby-red)] text-white flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </CustomLink>
              </div>
            </motion.article>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
