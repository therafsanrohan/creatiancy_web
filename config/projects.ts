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
  problem?: string;       // Optional: Detailed case study problem
  solution?: string;      // Optional: Detailed case study solution
  result?: string;        // Optional: Detailed case study result
}

export const recentProjects: Project[] = [
  { 
    id: '1', 
    title: 'ODL Ads Creative', 
    shortDescription: 'Social media creative advertising.',
    industry: 'Real Estate', 
    image: '/images/project real.png', 
    link: 'https://www.behance.net/gallery/234613189/Real-Estate-Promotional-Poster-Design' 
  },
  { 
    id: '2', 
    title: 'Your Next Project', 
    shortDescription: 'Strategic branding and intelligent interface design.',
    industry: 'Technology', 
    image: '', // ADD IMAGE PATH HERE
    link: '#' 
  },
  { 
    id: '3', 
    title: 'OMNI CONNECTS Branding', 
    shortDescription: 'Complete visual identity and system overhaul.',
    industry: 'SaaS Industry', 
    image: '/images/omni_branding.png', 
    link: '#' 
  },
];

export const caseStudies: Project[] = [
  // You can use this array if you decide to build dedicated, long-form Case Study pages later.
  { id: 'cs-1', title: 'Coming Soon', shortDescription: 'Problem • Approach • Result', industry: 'E-commerce', link: '#' },
];

