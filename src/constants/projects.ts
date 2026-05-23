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
  externalLink?: string;  // NEW: Link to external live website or Behance showcase
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
    clientName: "ODL Developers Ltd.",
    date: "Dec 2025",
    externalLink: "https://www.behance.net/gallery/234613189/Real-Estate-Promotional-Poster-Design"
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
    clientName: "OMNI CONNECTS Corporation",
    date: "Oct 2025"
  }
];

export const caseStudies: Project[] = recentProjects.filter(p => p.id !== 'next-project');

