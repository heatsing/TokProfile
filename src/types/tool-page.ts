export const TOOL_PAGE_TEMPLATES = [
  "profile-viewer",
  "video-downloader",
  "creator-analytics",
  "engagement-calculator",
  "programmatic-tool",
] as const;

export type ToolPageTemplate = (typeof TOOL_PAGE_TEMPLATES)[number];

export interface ToolPageContentItem {
  description: string;
  title: string;
}

export interface ToolPageFaq {
  answer: string;
  question: string;
}

export interface ToolPageLink {
  href: string;
  label: string;
}

export interface ToolPageData {
  applicationCategory: string;
  badge: string;
  breadcrumb: string;
  description: string;
  examples: ToolPageContentItem[];
  faq: ToolPageFaq[];
  faqDescription: string;
  faqEyebrow: string;
  faqTitle: string;
  h1: string;
  intro: string;
  keywords: string[];
  relatedTools: ToolPageLink[];
  route: string;
  routing: "dynamic" | "fixed";
  slug: string;
  template: ToolPageTemplate;
  tips: ToolPageContentItem[];
  title: string;
  toolType: "analytics" | "photo" | "profile" | "story" | "video";
  updatedAt: string;
  useCases: ToolPageContentItem[];
  ui: Record<string, unknown>;
}

export interface ToolPageQualityIssue {
  code:
    | "DUPLICATE_EXAMPLE"
    | "DUPLICATE_FAQ"
    | "DUPLICATE_INTRO"
    | "INVALID_RELATED_LINK"
    | "LOW_UNIQUE_CONTENT";
  message: string;
  slug: string;
}

export interface ToolPageQualityResult {
  issues: ToolPageQualityIssue[];
  uniqueContentRatios: Record<string, number>;
}
