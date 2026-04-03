export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface ExperienceItem {
  id: string;
  job_title: string;
  company: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  location: string;
  description: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  start_date: string;
  end_date: string;
  gpa: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

export type ResumeTemplate = 'modern' | 'classic';

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  raw_input: string;
  personal_info: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  template: ResumeTemplate;
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResumeCard {
  id: string;
  title: string;
  updated_at: string;
  ai_generated: boolean;
  personal_info: PersonalInfo;
}
