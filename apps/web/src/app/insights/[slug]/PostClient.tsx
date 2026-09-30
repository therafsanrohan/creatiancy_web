"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

export default function PostClient({ post }: { post: any }) {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[var(--bg)]">
      <div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-[var(--ruby-red)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Link 
          href="/insights" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-fg)] hover:text-[var(--ruby-red)] transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Insights</span>
        </Link>

        <article className="max-w-3xl mx-auto">
          <motion.header 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex flex-wrap gap-4 items-center mb-8 text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)]">
              <span className="text-[var(--ruby-red)] border border-[var(--ruby-red)]/30 px-3 py-1 rounded-full bg-[var(--ruby-red)]/5">
                {post.category}
              </span>
              {post.reading_time && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.reading_time} min read</span>
                </div>
              )}
              {post.publication_date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(post.publication_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tighter mb-8 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl md:text-2xl text-[var(--muted-fg)] font-light leading-relaxed">
              {post.excerpt}
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none text-[var(--muted-fg)] prose-headings:text-[var(--text)] prose-headings:font-heading prose-a:text-[var(--ruby-red)] hover:prose-a:text-white prose-a:transition-colors"
          >
            
            {post.rich_content && post.rich_content.map((block: any, idx: number) => {
              if (block.type === 'paragraph') {
                return <p key={idx}>{block.content}</p>;
              }
              return null;
            })}
          </motion.div>
        </article>
      </div>
    </div>
  );
}
