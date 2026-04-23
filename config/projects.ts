export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  industry: string;
  link: string;
  image?: string;
  problem?: string;
  solution?: string;
  result?: string;
}

export const recentProjects: Project[] = [
  { id: '1', title: 'Project Title 1', shortDescription: 'Strategic branding and interface.', industry: 'Industry / Service', link: '#' },
  { id: '2', title: 'Project Title 2', shortDescription: 'Strategic branding and interface.', industry: 'Industry / Service', link: '#' },
  { id: '3', title: 'Project Title 3', shortDescription: 'Strategic branding and interface.', industry: 'Industry / Service', link: '#' },
  { 
    id: '4', 
    title: 'ODL Ads Creative', 
    shortDescription: 'Social media creative advertising.',
    industry: 'Real Estate', 
    image: '/images/project real.png', 
    link: 'https://www.behance.net/gallery/234613189/Real-Estate-Promotional-Poster-Design' 
  }
];

export const caseStudies: Project[] = [
  { id: 'cs-1', title: 'Detailed Case Study 1', shortDescription: 'Problem • Approach • Result', industry: 'E-commerce', link: '#' },
  { id: 'cs-2', title: 'Detailed Case Study 2', shortDescription: 'Problem • Approach • Result', industry: 'Finance', link: '#' },
  { id: 'cs-3', title: 'Detailed Case Study 3', shortDescription: 'Problem • Approach • Result', industry: 'Healthcare', link: '#' },
  { id: 'cs-4', title: 'Detailed Case Study 4', shortDescription: 'Problem • Approach • Result', industry: 'Technology', link: '#' },
  { id: 'cs-5', title: 'Detailed Case Study 5', shortDescription: 'Problem • Approach • Result', industry: 'Logistics', link: '#' },
  { id: 'cs-6', title: 'Detailed Case Study 6', shortDescription: 'Problem • Approach • Result', industry: 'Education', link: '#' },
];
