export const SITE_IDS = ["academic", "neo", "website"] as const;
export type SiteId = (typeof SITE_IDS)[number];
export type Scope = SiteId | "shared";
export type ProjectCategory = "web" | "ml";
export const projectCategory = (project: {
  category?: string;
}): ProjectCategory =>
  ["ai", "ml"].includes(project.category ?? "") ? "ml" : "web";
export type SectionKey =
  | "about"
  | "education"
  | "experience"
  | "research"
  | "projects"
  | "awards"
  | "skills"
  | "receipts"
  | "notes";

export interface Profile {
  fullName: string;
  headline: string;
  bio: string;
  location: string;
  timezone: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  scholar: string;
  facebook: string;
  portrait: string;
  portraitAlt: string;
  resumeUrl: string;
  affiliation: string;
  contactNote: string;
  heroLine1: string;
  heroLine2: string;
  heroLine3: string;
  roles: string[];
  aboutHeading: string;
  status: string;
}
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  github: string;
  demo: string;
  tags: string[];
  category: string;
  featured: boolean;
  company: string;
  role: string;
  period: string;
  highlights: string[];
  stack: string[];
  institution: string;
  degree: string;
  date: string;
  distinction: string;
  details: string;
  authors: string;
  venue: string;
  status: string;
  year: string;
  body: string;
  value: string;
  context: string;
  text: string;
  name: string;
  level: number;
}
export interface ContentSection {
  title: string;
  enabled: boolean;
  items: ContentItem[];
}
export interface ContentDocument {
  profile: Partial<Profile>;
  sections: Partial<Record<SectionKey, ContentSection>>;
}
export interface ResolvedContent {
  profile: Profile;
  sections: Record<SectionKey, ContentSection>;
}
export interface DocumentRow {
  scope: Scope;
  draft: ContentDocument;
  version: number;
  updated_at: string;
}

export const SITES: Record<
  SiteId,
  {
    name: string;
    shortName: string;
    port: number;
    url: string;
    sections: SectionKey[];
    portrait: boolean;
  }
> = {
  academic: {
    name: "Academic Portfolio",
    shortName: "Academic",
    port: 3101,
    url: "https://tanjimriju.online",
    sections: [
      "about",
      "education",
      "experience",
      "research",
      "projects",
      "awards",
    ],
    portrait: true,
  },
  neo: {
    name: "Neo Brutalist Portfolio",
    shortName: "Neo Brutalist",
    port: 3102,
    url: "https://tanjimriju.vercel.app",
    sections: [
      "about",
      "education",
      "experience",
      "research",
      "projects",
      "awards",
      "skills",
      "receipts",
      "notes",
    ],
    portrait: true,
  },
  website: {
    name: "Portfolio Website",
    shortName: "Portfolio Website",
    port: 3103,
    url: "https://tanjimriju.netlify.app",
    sections: ["education", "skills", "projects", "experience", "research"],
    portrait: false,
  },
};
export const SECTION_NAMES: Record<SectionKey, string> = {
  about: "About",
  education: "Education",
  experience: "Experience",
  research: "Research",
  projects: "Projects",
  awards: "Awards & honors",
  skills: "Skills",
  receipts: "Build receipts",
  notes: "Lab notes",
};
export const COMMON_SECTIONS: SectionKey[] = [
  "education",
  "experience",
  "research",
  "projects",
];
export const EMPTY_PROFILE: Profile = {
  fullName: "",
  headline: "",
  bio: "",
  location: "",
  timezone: "",
  email: "",
  phone: "",
  github: "",
  linkedin: "",
  scholar: "",
  facebook: "",
  portrait: "",
  portraitAlt: "",
  resumeUrl: "",
  affiliation: "",
  contactNote: "",
  heroLine1: "",
  heroLine2: "",
  heroLine3: "",
  roles: [],
  aboutHeading: "",
  status: "",
};
export const EMPTY_ITEM: ContentItem = {
  id: "",
  title: "",
  description: "",
  image: "",
  imageAlt: "",
  link: "",
  github: "",
  demo: "",
  tags: [],
  category: "",
  featured: false,
  company: "",
  role: "",
  period: "",
  highlights: [],
  stack: [],
  institution: "",
  degree: "",
  date: "",
  distinction: "",
  details: "",
  authors: "",
  venue: "",
  status: "",
  year: "",
  body: "",
  value: "",
  context: "",
  text: "",
  name: "",
  level: 3,
};

export function resolveContent(
  shared: ContentDocument,
  local: ContentDocument,
  site: SiteId,
): ResolvedContent {
  const sections = {} as ResolvedContent["sections"];
  for (const key of Object.keys(SECTION_NAMES) as SectionKey[]) {
    const section = local.sections[key] ?? shared.sections[key];
    sections[key] =
      SITES[site].sections.includes(key) && section
        ? {
            ...section,
            items: section.items.map((item) => ({ ...EMPTY_ITEM, ...item })),
          }
        : { title: SECTION_NAMES[key], enabled: false, items: [] };
  }
  const profile = { ...EMPTY_PROFILE, ...shared.profile, ...local.profile };
  // Portraits belong to a portfolio and must never inherit from shared content.
  profile.portrait = SITES[site].portrait ? (local.profile.portrait ?? "") : "";
  profile.portraitAlt = SITES[site].portrait
    ? (local.profile.portraitAlt ?? "")
    : "";
  return { profile, sections };
}

export function itemsOf(
  content: ResolvedContent,
  key: SectionKey,
): ContentItem[] {
  return content.sections[key].enabled ? content.sections[key].items : [];
}

export async function fetchPublished(
  url: string,
  key: string,
  site: SiteId,
  fallback: ResolvedContent,
): Promise<ResolvedContent> {
  if (!url || !key) return fallback;
  const response = await fetch(
    `${url}/rest/v1/cms_publications?select=scope,content&scope=in.(shared,${site})`,
    {
      headers: { apikey: key },
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    },
  );
  if (!response.ok)
    throw new Error(`Portfolio content request failed (${response.status})`);
  const rows = (await response.json()) as {
    scope: Scope;
    content: ContentDocument;
  }[];
  const shared = rows.find((row) => row.scope === "shared")?.content;
  const local = rows.find((row) => row.scope === site)?.content;
  if (!shared || !local)
    throw new Error("Portfolio has not been published yet");
  return resolveContent(shared, local, site);
}

export function safeLink(value: string): string {
  return /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(value) ? value : "";
}
