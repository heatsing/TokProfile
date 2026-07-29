import { BLOG_CATEGORIES, type BlogPostFrontmatter } from "@/types/blog";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new TypeError(`Blog frontmatter field "${field}" must be a non-empty string.`);
  }

  return value.trim();
}

function requireDate(value: unknown, field: string) {
  const text = requireString(value, field);

  if (Number.isNaN(new Date(text).getTime())) {
    throw new TypeError(`Blog frontmatter field "${field}" must be a valid date.`);
  }

  return text;
}

export function parseBlogFrontmatter(value: unknown): BlogPostFrontmatter {
  if (!isRecord(value)) {
    throw new TypeError("Blog frontmatter must be an object.");
  }

  const category = requireString(value.category, "category");
  if (!BLOG_CATEGORIES.includes(category as (typeof BLOG_CATEGORIES)[number])) {
    throw new TypeError(`Unsupported blog category "${category}".`);
  }

  if (!Array.isArray(value.tags) || value.tags.length === 0) {
    throw new TypeError('Blog frontmatter field "tags" must be a non-empty array.');
  }
  const tags = value.tags.map((tag, index) => requireString(tag, `tags[${index}]`));

  if (!isRecord(value.author)) {
    throw new TypeError('Blog frontmatter field "author" must be an object.');
  }

  const status = requireString(value.status, "status");
  if (status !== "draft" && status !== "published") {
    throw new TypeError('Blog frontmatter field "status" must be draft or published.');
  }

  return {
    author: {
      name: requireString(value.author.name, "author.name"),
      role: requireString(value.author.role, "author.role"),
    },
    category: category as BlogPostFrontmatter["category"],
    description: requireString(value.description, "description"),
    publishedAt: requireDate(value.publishedAt, "publishedAt"),
    status,
    tags,
    title: requireString(value.title, "title"),
    updatedAt: requireDate(value.updatedAt, "updatedAt"),
  };
}

export function estimateReadingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
