"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Link as CustomLink } from "@/components/ui/Link";
import { Container, Grid } from "@/components/ui/Layout";
import { Heading, Text } from "@/components/ui/Typography";

export default function WorkClient({ projects }: { projects: Record<string, any>[] }) {
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
            Digital Legacy
          </Text>
          <Heading level={1} className="text-6xl md:text-8xl lg:text-9xl leading-none text-balance">
            Selected Work.
          </Heading>
          <Text variant="lead" className="max-w-2xl text-balance">
            A curated collection of digital intelligence and high-impact brand systems engineered to perform and scale.
          </Text>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <Grid cols={2} className="gap-x-12 gap-y-24">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id || project.slug} 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className={`group flex flex-col ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
              >
                <CustomLink 
                  href={`/work/${project.slug || project.id}`} 
                  className="block relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[var(--muted)]/20 mb-6"
                >
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--bg)]/10 group-hover:scale-105 transition-transform duration-1000" />
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out shadow-2xl">
                      <ArrowUpRight className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </CustomLink>

                <div className="space-y-3">
                  <CustomLink href={`/work/${project.slug || project.id}`} className="hover:no-underline">
                    <Heading level={3} className="group-hover:text-[var(--ruby-red)] transition-colors duration-300">
                      {project.title}
                    </Heading>
                  </CustomLink>
                  <Text variant="muted" className="text-balance">
                    {project.shortDescription || project.short_description || project.industry}
                  </Text>
                  <div className="h-[2px] w-0 bg-[var(--ruby-red)] group-hover:w-12 transition-all duration-500 ease-out mt-4" />
                </div>
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </div>
  );
}
