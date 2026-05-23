/**
 * CREATIANCY DIGITAL STUDIO - PROJECT CONFIGURATION
 * 
 * Use this file as your dynamic local CMS (Content Management System).
 * To upload and display new "Selected Work" case studies:
 * 
 * 1. Add your project images to the `public/images/` folder (e.g. `public/images/my-project.jpg`)
 * 2. Add a new object to the `recentProjects` array below.
 * 3. The website will automatically update to display your new work.
 */

export interface Project {
  id: string;
  title: string;          // Name of the project / case study
  shortDescription: string; // A brief 1-sentence summary
  industry: string;       // E.g., Real Estate, Technology, Branding
  link: string;           // URL to the live project, Behance, or a detailed case study page
  image?: string;         // PATH to the image (e.g., "/images/project1.png"). Best size: 4:3 ratio
  problem?: string;       // Dynamic: Detailed case study problem
  solution?: string;      // Dynamic: Detailed case study solution
  result?: string;        // Dynamic: Detailed case study result
  technologies?: string[]; // Dynamic: Technologies used
  clientName?: string;    // Dynamic: Client Name
  date?: string;          // Dynamic: Project Date
}

export const recentProjects: Project[] = [
  { 
    id: 'odl-ads', 
    title: 'ODL Ads Creative', 
    shortDescription: 'Precision creative poster systems engineered for real estate campaigns.',
    industry: 'Real Estate', 
    image: '/images/project real.png', 
    link: '/work/odl-ads',
    problem: "ODL required a visual system that could communicate high-end property values instantly, standing out in overcrowded social media feeds.",
    solution: "We engineered a clean, grids-based typographic structure with bold color contrasts and high-impact visual anchors designed to arrest reader attention in under 1.5 seconds.",
    result: "Campaign visual metrics improved by 40% CTR, establishing immediate design authority for their regional promotional campaigns.",
    technologies: ["Visual Strategy", "Grid Design", "Typography Systems", "Creative Direction"],
    clientName: "ODL Holdings",
    date: "Dec 2025"
  },
  { 
    id: 'omni-connects', 
    title: 'OMNI CONNECTS Branding', 
    shortDescription: 'Complete visual identity architecture and comprehensive digital system overhaul.',
    industry: 'SaaS Industry', 
    image: '/images/omni_branding.png', 
    link: '/work/omni-connects',
    problem: "OMNI CONNECTS had a complex technical SaaS product but a dated visual identity that confused potential enterprise partners.",
    solution: "We re-architected their entire brand system, building a sleek, geometric logo system, unified corporate colors, and responsive interface mockups.",
    result: "Successfully elevated their enterprise trust metrics, resulting in a smooth multi-million dollar series funding round.",
    technologies: ["Brand Strategy", "Corporate Identity", "Logo Design", "SaaS Interface System"],
    clientName: "OMNI CONNECTS Ltd",
    date: "Oct 2025"
  },
  { 
    id: 'vespera-ai', 
    title: 'Vespera AI Platform', 
    shortDescription: 'Bleeding-edge brand positioning and futuristic interface design for a deep tech startup.',
    industry: 'Artificial Intelligence', 
    image: '/images/project real.png', 
    link: '/work/vespera-ai',
    problem: "Vespera, a cutting-edge deep learning model platform, needed a brand position that reflected complex machine logic while remaining accessible to developers.",
    solution: "We designed a dark, neo-brutalist digital presence with fluid kinetic typography, generative code aesthetics, and modular UI patterns.",
    result: "A highly acclaimed product launch that captured 50,000+ developer signups within the first 10 days of release.",
    technologies: ["Neo-Brutalist Layouts", "Kinetic Typography", "Generative Branding", "Developer Experience"],
    clientName: "Vespera Research",
    date: "Feb 2026"
  },
  {
    id: 'next-project',
    title: 'Your Next Project',
    shortDescription: 'Start a project to engineer your next high-performance visual legacy with us.',
    industry: 'Studio Partnership',
    image: '',
    link: '/contact',
    problem: "Looking for an elite digital studio that values precision engineering and controlled creative boldness over noise?",
    solution: "Embed our highly specialized design and development team directly within your company's product cycle.",
    result: "Accelerate your path to market authority with custom, unshakeable creative assets.",
    technologies: ["Design Strategy", "Web Engineering", "Controlled Boldness"],
    clientName: "Ambitious Brands",
    date: "Ongoing"
  }
];

export const caseStudies: Project[] = recentProjects.filter(p => p.id !== 'next-project');

