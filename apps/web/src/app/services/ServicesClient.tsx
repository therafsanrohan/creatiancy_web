"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Container, Grid } from "@/components/ui/Layout";
import { Heading, Text } from "@/components/ui/Typography";
import { Link as CustomLink } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";

import { Testimonials } from "@/components/home/testimonials/Testimonials";

interface Service {
  title: string;
  problem: string;
  for: string;
  outcome: string;
  features: string[];
}

export default function ServicesClient({ services }: { services: Service[] }) {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--bg)] text-[var(--text)]">
      <Container className="mb-24 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-6"
        >
          <Text variant="small" className="uppercase font-bold tracking-widest text-[var(--ruby-red)]">
            What We Do
          </Text>
          <Heading level={1} className="text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter text-balance">
            Strategic design meets <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text)] to-[var(--ruby-red)]">intelligent growth.</span>
          </Heading>
          <Text variant="lead" className="max-w-2xl text-balance">
            We don&apos;t offer generic templates or buzzwords. We solve fundamental business problems through precision-engineered digital services.
          </Text>
        </motion.div>
      </Container>

      <Container className="space-y-12 md:space-y-24 mb-24 md:mb-32">
        {services.map((svc, i) => (
          <motion.article 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group grid xl:grid-cols-[1fr_2fr] gap-8 md:gap-16 border rounded-3xl p-8 md:p-12 border-[var(--border)] bg-[var(--muted)]/10 hover:bg-[var(--muted)]/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--ruby-red)]/5"
          >
            <div className="space-y-6">
              <Heading level={2} className="text-3xl md:text-4xl">{svc.title}</Heading>
              <ul className="space-y-3 pt-6 border-t border-[var(--border)]">
                {svc.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[var(--muted-fg)] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[var(--ruby-red)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Grid cols={3} className="gap-8 bg-[var(--bg)] p-8 rounded-2xl border border-[var(--border)]">
              <div className="space-y-4">
                <Text variant="small" className="uppercase font-bold tracking-widest text-[var(--ruby-red)] border-b border-[var(--border)] pb-2">The Problem</Text>
                <Text variant="muted">{svc.problem}</Text>
              </div>
              <div className="space-y-4">
                <Text variant="small" className="uppercase font-bold tracking-widest text-[var(--ruby-red)] border-b border-[var(--border)] pb-2">Who It&apos;s For</Text>
                <Text variant="muted">{svc.for}</Text>
              </div>
              <div className="space-y-4 sm:col-span-3 lg:col-span-1">
                <Text variant="small" className="uppercase font-bold tracking-widest text-[var(--ruby-red)] border-b border-[var(--border)] pb-2">The Outcome</Text>
                <Text className="font-semibold">{svc.outcome}</Text>
                <CustomLink href="/contact" className="inline-block text-xs font-bold text-[var(--ruby-red)] hover:underline mt-4">
                  Start a project &rarr;
                </CustomLink>
              </div>
            </Grid>
          </motion.article>
        ))}
      </Container>

      <Testimonials />

      <Container className="mt-24 md:mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[var(--text)] text-[var(--bg)] rounded-[2.5rem] p-12 md:p-24 text-center flex flex-col items-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ruby-red)]/20 to-transparent mix-blend-overlay" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <Heading level={2} className="text-4xl md:text-6xl text-balance">
              Ready to dominate your market?
            </Heading>
            <Text variant="lead" className="max-w-xl mx-auto text-[var(--bg)]/80">
              Stop settling for average digital experiences. Let&apos;s engineer a solution that positions your brand as the undisputed leader.
            </Text>
            <div className="pt-4 flex flex-col items-center">
              <CustomLink href="/contact" className="hover:no-underline">
                <Button size="lg" className="gap-2 px-10 py-6 text-lg">
                  Start a Conversation <ArrowRight className="w-5 h-5" />
                </Button>
              </CustomLink>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
