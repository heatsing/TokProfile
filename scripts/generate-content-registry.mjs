import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

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
await fs.writeFile(outputFile, `${JSON.stringify(posts, null, 2)}\n`, "utf8");

console.warn(
  `Generated ${posts.length} blog posts in ${path.relative(root, outputFile)}.`,
);
