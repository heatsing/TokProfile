import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { format, resolveConfig } from "prettier";

const root = process.cwd();
const blogDirectory = path.join(root, "content", "blog");
const outputDirectory = path.join(root, "src", "data", "generated");
const outputFile = path.join(outputDirectory, "blog-posts.json");

const filenames = (await fs.readdir(blogDirectory))
  .filter((filename) => filename.endsWith(".md"))
  .sort();

const posts = await Promise.all(
  filenames.map(async (filename) => {
    const source = await fs.readFile(path.join(blogDirectory, filename), "utf8");
    const parsed = matter(source);

    return {
      slug: filename.replace(/\.md$/, ""),
      frontmatter: parsed.data,
      content: parsed.content.trim(),
    };
  }),
);

await fs.mkdir(outputDirectory, { recursive: true });
const prettierConfig = await resolveConfig(outputFile);
const generatedJson = await format(JSON.stringify(posts), {
  ...prettierConfig,
  parser: "json",
});
await fs.writeFile(outputFile, generatedJson, "utf8");

console.warn(
  `Generated ${posts.length} blog posts in ${path.relative(root, outputFile)}.`,
);
