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
    answer: "We are a global-standard digital design and development studio. Our premium expertise spans comprehensive Brand Identity systems (logos, visual languages, robust guidelines), bespoke Digital Experiences (immersive digital products, custom platforms, high-fidelity design layouts), Creative Strategy (deep audience insights, strategic positioning), Technical Excellence (uncompromising performance, clean modular architectures, high scalability), and high-impact digital campaigns.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "How do you structure your project pricing?",
    answer: "We price projects based on scope, complexity, and timeline. After an initial discovery call, we provide a detailed proposal with fixed-project or retainer-based options. We believe in full transparency — no hidden fees, no surprises.",
    category: "Pricing"
  },
  {
    id: "faq-3",
    question: "What does the typical workflow from process to delivery look like?",
    answer: "Every project begins with a discovery and strategy phase, followed by concept design, iterative refinement, and final delivery. We keep you involved at every milestone through shared review sessions and clear communication channels.",
    category: "Process"
  },
  {
    id: "faq-4",
    question: "How long does a typical project take from start to finish?",
    answer: "Most brand identity projects take 3–6 weeks. Full digital experience builds range from 6–14 weeks depending on complexity. We always agree on a delivery schedule before work begins.",
    category: "Delivery"
  },
  {
    id: "faq-5",
    question: "Do you build websites that we can edit ourselves afterwards?",
    answer: "Yes. We build on modern CMS platforms (such as Sanity, Contentful, or a custom headless CMS) so your team can manage and update content independently after handoff. We also provide training documentation.",
    category: "Delivery"
  },
  {
    id: "faq-6",
    question: "Can you collaborate with our existing in-house team?",
    answer: "Absolutely. We regularly embed within existing teams, working alongside your designers, developers, and marketers. We adapt to your tools and workflow — Figma, Notion, Slack, or whatever you use.",
    category: "Design"
  }
];
