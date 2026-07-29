import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { BlogPost, BlogPostSummary } from "@/types/blog";

import { estimateReadingMinutes, parseBlogFrontmatter } from "./blog-schema";

const blogDirectory = path.join(process.cwd(), "content", "blog");
const safeSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function readPostFile(filename: string): Promise<BlogPost> {
  const slug = filename.replace(/\.md$/, "");
  const source = await fs.readFile(path.join(blogDirectory, filename), "utf8");
  const parsed = matter(source);
  const frontmatter = parseBlogFrontmatter(parsed.data);

  return {
    ...frontmatter,
    content: parsed.content.trim(),
    readingMinutes: estimateReadingMinutes(parsed.content),
    slug,
  };
}

export const getAllBlogPosts = cache(async (): Promise<BlogPostSummary[]> => {
  const filenames = (await fs.readdir(blogDirectory)).filter((filename) =>
    filename.endsWith(".md"),
  );
  const posts = await Promise.all(filenames.map(readPostFile));

  return posts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .map(({ content: _content, ...summary }) => summary);
});

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!safeSlugPattern.test(slug)) {
    return null;
  }

  try {
    const post = await readPostFile(`${slug}.md`);
    return post.status === "published" ? post : null;
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return null;
    }

    throw error;
  }
});
