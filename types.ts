export interface ContactInfo {
  email: string;
  location: string;
  linkedin: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  points: string[];
}

export interface Project {
  title: string;
  description: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  score?: string;
  image?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  details: string[];
}

export interface ResumeData {
  profileImage?: string;
  name: string;
  title: string;
  contact: ContactInfo;
  summary: string;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education;
  languages: string[];
}