export interface Social {
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface Personal {
  name: string;
  title: string;
  intro: string;
  location: string;
  social: Social;
}

export interface TimelineItem {
  date: string;
  description: string;
}

export interface Project {
  title: string;
  organization: string;
  timespan: string;
  icon: string;
  description?: string;
  link?: string;
  technologies?: string;
  timeline?: TimelineItem[];
}

export interface Education {
  degree: string;
  institution: string;
  timespan: string;
  icon: string;
  description?: string;
  projects?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface Skill {
  title: string;
  content?: string;
  items?: LanguageItem[];
}

export interface ResearchInterest {
  title?: string;
  link?: string;
}

export interface About {
  intro: string;
  personal: string;
  research_interests: (string | ResearchInterest)[];
}

export interface SiteContent {
  personal: Personal;
  projects: Project[];
  education: Education[];
  skills: Record<string, Skill>;
  about: About;
} 