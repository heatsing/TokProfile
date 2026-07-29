import type {
  ToolPageContentItem,
  ToolPageData,
  ToolPageQualityIssue,
  ToolPageQualityResult,
} from "@/types/tool-page";

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function contentUnits(page: ToolPageData) {
  const itemText = (items: ToolPageContentItem[]) =>
    items.flatMap((item) => [item.title, item.description]);

  return [
    page.intro,
    ...itemText(page.useCases),
    ...itemText(page.examples),
    ...itemText(page.tips),
    ...page.faq.flatMap((faq) => [faq.question, faq.answer]),
  ];
}

function trigrams(page: ToolPageData) {
  const words = normalize(contentUnits(page).join(" ")).split(" ").filter(Boolean);
  const result = new Set<string>();

  for (let index = 0; index <= words.length - 3; index += 1) {
    result.add(words.slice(index, index + 3).join(" "));
  }

  return result;
}

function duplicateOwners(
  pages: ToolPageData[],
  selector: (page: ToolPageData) => string[],
) {
  const owners = new Map<string, Set<string>>();

  for (const page of pages) {
    for (const value of selector(page)) {
      const key = normalize(value);
      const current = owners.get(key) ?? new Set<string>();
      current.add(page.slug);
      owners.set(key, current);
    }
  }

  return owners;
}

export function auditToolPageCollection(pages: ToolPageData[]): ToolPageQualityResult {
  const issues: ToolPageQualityIssue[] = [];
  const introOwners = duplicateOwners(pages, (page) => [page.intro]);
  const faqOwners = duplicateOwners(pages, (page) =>
    page.faq.map((faq) => `${faq.question} ${faq.answer}`),
  );
  const exampleOwners = duplicateOwners(pages, (page) =>
    page.examples.map((example) => `${example.title} ${example.description}`),
  );
  const pageTrigrams = new Map(pages.map((page) => [page.slug, trigrams(page)]));
  const uniqueContentRatios: Record<string, number> = {};

  for (const page of pages) {
    const addDuplicateIssues = (
      owners: Map<string, Set<string>>,
      values: string[],
      code: ToolPageQualityIssue["code"],
      label: string,
    ) => {
      for (const value of values) {
        if ((owners.get(normalize(value))?.size ?? 0) > 1) {
          issues.push({
            code,
            message: `${label} duplicates another tool page.`,
            slug: page.slug,
          });
        }
      }
    };

    addDuplicateIssues(introOwners, [page.intro], "DUPLICATE_INTRO", "Introduction");
    addDuplicateIssues(
      faqOwners,
      page.faq.map((faq) => `${faq.question} ${faq.answer}`),
      "DUPLICATE_FAQ",
      "FAQ",
    );
    addDuplicateIssues(
      exampleOwners,
      page.examples.map((example) => `${example.title} ${example.description}`),
      "DUPLICATE_EXAMPLE",
      "Example",
    );

    const ownTrigrams = pageTrigrams.get(page.slug) ?? new Set<string>();
    const otherTrigrams = new Set(
      pages
        .filter((candidate) => candidate.slug !== page.slug)
        .flatMap((candidate) => [...(pageTrigrams.get(candidate.slug) ?? [])]),
    );
    const uniqueCount = [...ownTrigrams].filter(
      (trigram) => !otherTrigrams.has(trigram),
    ).length;
    const ratio = ownTrigrams.size ? uniqueCount / ownTrigrams.size : 0;
    uniqueContentRatios[page.slug] = ratio;

    if (ratio <= 0.7) {
      issues.push({
        code: "LOW_UNIQUE_CONTENT",
        message: `Unique three-word phrase ratio is ${(ratio * 100).toFixed(1)}%; expected more than 70%.`,
        slug: page.slug,
      });
    }

    const seenLinks = new Set<string>();
    for (const related of page.relatedTools) {
      if (
        related.href === page.route ||
        seenLinks.has(related.href) ||
        !related.href.startsWith("/")
      ) {
        issues.push({
          code: "INVALID_RELATED_LINK",
          message: `Related link "${related.href}" is self-referential, duplicated or external.`,
          slug: page.slug,
        });
      }
      seenLinks.add(related.href);
    }
  }

  return { issues, uniqueContentRatios };
}
