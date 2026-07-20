"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function CampaignIntro() {
  return (
    <section
      id="campaign-intro"
      className="relative py-24 md:py-32 bg-[#1E1E1E] overflow-hidden"
      aria-labelledby="intro-heading"
    >
      <div className="container mx-auto px-4 max-w-[800px] text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 p-2 bg-white/5 rounded-full border border-white/10">
            <Heart className="w-5 h-5 text-[#9B1C22]" strokeWidth={2} />
          </div>
          <h2
            id="intro-heading"
            className="text-xs uppercase tracking-[0.2em] font-bold text-[#9B1C22] mb-6"
          >
            The Gratitude Project
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-neutral-200 leading-relaxed text-balance">
            Every day, local businesses form the backdrop of our lives. They craft our morning coffee, curate our spaces, and welcome us with warmth. Yet, in our fast-paced digital world, their impact is often reduced to a rating score.
          </p>
          <div className="w-12 h-px bg-white/10 my-8" />
          <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-xl text-balance">
            This project is an invitation to pause, appreciate, and share stories of genuine hospitality, precision service, and outstanding dedication. It is our way of saying thank you to those who build community.
          </p>
        </motion.div>
      </div>
    </section>
  );
}