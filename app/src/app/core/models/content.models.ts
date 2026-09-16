// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  sectionId: string;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroData {
  name: string;
  tagline: string;
  roles: string[];
  cta: CtaLink[];
  availableForWork: boolean;
}

export interface CtaLink {
  label: string;
  href: string;
  variant: 'primary' | 'ghost' | 'outline';
  icon?: string;
}

// ─── About ────────────────────────────────────────────────────────────────────

export interface AboutData {
  summary: string;
  highlights: string[];
  location: string;
  currentRole: string;
  currentCompany: string;
  yearsOfExperience: number;
}

// ─── Metrics ──────────────────────────────────────────────────────────────────

export interface Metric {
  value: string;
  label: string;
  sublabel?: string;
  accent?: 'blue' | 'cyan' | 'violet';
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  tags: string[];
  category: ProjectCategory;
  featured: boolean;
  year: number;
  link?: string;
}

export type ProjectCategory =
  | 'generative-ai'
  | 'agentic-ai'
  | 'full-stack'
  | 'analytics'
  | 'platform'
  | 'leadership';

// ─── Technical Capabilities ───────────────────────────────────────────────────

export interface CapabilityGroup {
  id: string;
  label: string;
  icon: string;
  items: Capability[];
}

export interface Capability {
  name: string;
  proficiency?: 'expert' | 'advanced' | 'proficient';
}

// ─── Leadership ───────────────────────────────────────────────────────────────

export interface LeadershipItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  metrics?: string;
}

export interface ClientEngagement {
  client: string;
  sector: string;
  role: string;
  duration: string;
  highlights: string[];
}

// ─── Career Journey ───────────────────────────────────────────────────────────

export interface CareerEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  type: 'full-time' | 'contract' | 'freelance';
  highlights: string[];
  technologies: string[];
  isCurrent?: boolean;
}

// ─── AI Copilot ───────────────────────────────────────────────────────────────

export interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CopilotSuggestedPrompt {
  label: string;
  prompt: string;
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactLink {
  platform: string;
  label: string;
  href: string;
  icon: string;
}
