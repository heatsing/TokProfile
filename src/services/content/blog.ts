import { cache } from "react";

import blogPostSources from "@/data/generated/blog-posts.json";

import type { BlogPost, BlogPostSummary } from "@/types/blog";

import { estimateReadingMinutes, parseBlogFrontmatter } from "./blog-schema";

const safeSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseBlogPost(source: (typeof blogPostSources)[number]): BlogPost {
  const frontmatter = parseBlogFrontmatter(source.frontmatter);

  return {
    ...frontmatter,
    content: source.content,
    readingMinutes: estimateReadingMinutes(source.content),
    slug: source.slug,
  };
}

export const getAllBlogPosts = cache(async (): Promise<BlogPostSummary[]> => {
  const posts = blogPostSources.map(parseBlogPost);

  return posts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .map(({ content: _content, ...summary }) => summary);
});

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!safeSlugPattern.test(slug)) {
    return null;
  }

  const source = blogPostSources.find((candidate) => candidate.slug === slug);
  if (!source) return null;

  const post = parseBlogPost(source);
  return post.status === "published" ? post : null;
});
