import { describe, expect, it } from "vitest";

import { estimateReadingMinutes, parseBlogFrontmatter } from "../blog-schema";

const validFrontmatter = {
  author: { name: "TokLens Editorial", role: "Data & Content Team" },
  category: "TikTok Analytics",
  description: "A transparent methodology.",
  publishedAt: "2026-07-26",
  status: "published",
  tags: ["engagement rate", "methodology"],
  title: "How estimates work",
  updatedAt: "2026-07-26",
};

describe("blog schema", () => {
  it("accepts complete editorial metadata", () => {
    expect(parseBlogFrontmatter(validFrontmatter)).toMatchObject(validFrontmatter);
  });

  it("rejects unsupported categories and missing tags", () => {
    expect(() => parseBlogFrontmatter({ ...validFrontmatter, category: "News" })).toThrow(
      "Unsupported blog category",
    );
    expect(() => parseBlogFrontmatter({ ...validFrontmatter, tags: [] })).toThrow(
      '"tags" must be a non-empty array',
    );
  });

  it("estimates reading time with a one-minute minimum", () => {
    expect(estimateReadingMinutes("short article")).toBe(1);
    expect(estimateReadingMinutes(Array(441).fill("word").join(" "))).toBe(3);
  });
});
