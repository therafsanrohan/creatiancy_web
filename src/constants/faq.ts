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
    answer: "We believe in tailored partnership models rather than rigid, cookie-cutter pricing. Because every visionary brand has distinct market positions and unique digital needs, we provide bespoke, value-driven pricing proposals aligned directly with your scope, complexity, and growth goals. We discuss budget guidelines transparently during our initial discovery session to design a highly effective roadmap that delivers maximum return on investment.",
    category: "Pricing"
  },
  {
    id: "faq-3",
    question: "What does the typical workflow from process to delivery look like?",
    answer: "We drive excellence through a structured four-phase approach: 1) Strategy & Discovery (mapping your brand DNA, target market, and strategic goals), 2) Visual Design & Prototyping (crafting elite, high-fidelity user experiences and interactive flows), 3) Technical Engineering (translating designs into custom, ultra-fast, and robust digital platforms), and 4) Delivery & Optimization (device testing, speed tuning, and secure deployment).",
    category: "Process"
  },
  {
    id: "faq-4",
    question: "How long does a typical project take from start to finish?",
    answer: "Project timelines correspond directly to the complexity of the scope. A custom visual identity or a bespoke digital platform usually spans 4 to 6 weeks. More comprehensive brand overhauls and complete digital transformations requiring advanced custom strategy and detailed animations typically range from 8 to 12 weeks. We prioritize high-caliber execution to guarantee that the final delivery is absolutely flawless.",
    category: "Delivery"
  },
  {
    id: "faq-5",
    question: "Do you build websites that we can edit ourselves afterwards?",
    answer: "Absolutely. We seamlessly combine high-end frontend engineering with intuitive, modern content management systems. This ensures your brand receives a custom, lightning-fast digital platform where you can easily update copy, upload portfolio pieces, and manage imagery independently without needing day-to-day developer intervention.",
    category: "Delivery"
  },
  {
    id: "faq-6",
    question: "Can you collaborate with our existing in-house team?",
    answer: "Yes. We frequently partner with in-house designers, product owners, and developers. Whether you need us to execute completed high-fidelity designs, augment your development pipeline with elite frontend visual layouts, or spearhead the strategy from the ground up, we integrate into your existing workflow with ease.",
    category: "Design"
  }
];
