// src/constants/faq.ts

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: "Process" | "Pricing" | "Design" | "Delivery" | "General";
};

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What core services does Creatiancy offer?",
    answer: "Creatiancy offers five core service pillars: Brand Identity (logos, visual language systems, brand guidelines), Digital Experience (custom web platforms, UI/UX design, headless CMS), Creative Strategy (market positioning, audience research, growth mapping), Technical Excellence (Next.js development, performance engineering, technical SEO), and Creative Campaigns (ad management, creative direction, VFX, conversion optimization). Each service is delivered end-to-end by specialist teams.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "How does Creatiancy structure project pricing?",
    answer: "Creatiancy prices projects based on scope, complexity, and timeline. Every engagement begins with a discovery call, after which the studio provides a detailed fixed-price proposal or retainer-based structure — no hidden fees, no surprises. Pricing is agreed in writing before any work begins.",
    category: "Pricing"
  },
  {
    id: "faq-3",
    question: "What does the Creatiancy project workflow look like?",
    answer: "The Creatiancy workflow follows three phases: Precision Strategy (discovery, positioning, and project roadmap), Fluid Structure (visual identity, design system, and prototyping), and Focused Execution (implementation, QA, and launch). Clients are involved at every milestone through shared review sessions and direct communication.",
    category: "Process"
  },
  {
    id: "faq-4",
    question: "How long does a Creatiancy project take?",
    answer: "Brand identity projects typically take 3–6 weeks. Full digital experience builds range from 6–14 weeks depending on complexity. All project timelines are agreed upon before work begins and confirmed in the proposal.",
    category: "Delivery"
  },
  {
    id: "faq-5",
    question: "Can clients edit their website themselves after Creatiancy builds it?",
    answer: "Yes. Creatiancy builds websites on modern headless CMS platforms — typically Sanity or Contentful — so clients can edit, update, and manage content independently after handoff. Training documentation is always included in the delivery package.",
    category: "Delivery"
  },
  {
    id: "faq-6",
    question: "Can Creatiancy collaborate with an existing in-house team?",
    answer: "Yes. Creatiancy regularly embeds within client teams, working alongside in-house designers, developers, and marketers. The studio adapts to existing tools and workflows — Figma, Notion, Slack, Linear, or any other stack the client uses.",
    category: "Design"
  }
];
