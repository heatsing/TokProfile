export const BLOG_CATEGORIES = [
  "TikTok Privacy",
  "TikTok Download",
  "TikTok Analytics",
  "Creator Growth",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPostFrontmatter {
  author: BlogAuthor;
  category: BlogCategory;
  description: string;
  publishedAt: string;
  status: "draft" | "published";
  tags: string[];
  title: string;
  updatedAt: string;
}

export interface BlogPostSummary extends BlogPostFrontmatter {
  readingMinutes: number;
  slug: string;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
}
