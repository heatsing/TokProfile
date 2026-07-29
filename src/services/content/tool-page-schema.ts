import {
  TOOL_PAGE_TEMPLATES,
  type ToolPageContentItem,
  type ToolPageData,
  type ToolPageFaq,
  type ToolPageLink,
} from "@/types/tool-page";
import { TIKTOK_TOOL_TYPES } from "@/types/tiktok";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new TypeError(`Tool page field "${field}" must be a non-empty string.`);
  }

  return value.trim();
}

function requireStringArray(value: unknown, field: string, minimum = 1) {
  if (!Array.isArray(value) || value.length < minimum) {
    throw new TypeError(
      `Tool page field "${field}" must contain at least ${minimum} items.`,
    );
  }

  return value.map((item, index) => requireString(item, `${field}[${index}]`));
}

function parseContentItems(value: unknown, field: string): ToolPageContentItem[] {
  if (!Array.isArray(value) || value.length < 2) {
    throw new TypeError(`Tool page field "${field}" must contain at least 2 items.`);
  }

  return value.map((item, index) => {
    if (!isRecord(item)) {
      throw new TypeError(`Tool page field "${field}[${index}]" must be an object.`);
    }

    return {
      description: requireString(item.description, `${field}[${index}].description`),
      title: requireString(item.title, `${field}[${index}].title`),
    };
  });
}

function parseFaq(value: unknown): ToolPageFaq[] {
  if (!Array.isArray(value) || value.length < 3) {
    throw new TypeError('Tool page field "faq" must contain at least 3 items.');
  }

  return value.map((item, index) => {
    if (!isRecord(item)) {
      throw new TypeError(`Tool page field "faq[${index}]" must be an object.`);
    }

    return {
      answer: requireString(item.answer, `faq[${index}].answer`),
      question: requireString(item.question, `faq[${index}].question`),
    };
  });
}

function parseRelatedTools(value: unknown): ToolPageLink[] {
  if (!Array.isArray(value) || value.length < 2) {
    throw new TypeError('Tool page field "relatedTools" must contain at least 2 items.');
  }

  return value.map((item, index) => {
    if (!isRecord(item)) {
      throw new TypeError(`Tool page field "relatedTools[${index}]" must be an object.`);
    }

    const href = requireString(item.href, `relatedTools[${index}].href`);
    if (!href.startsWith("/") || href.startsWith("//")) {
      throw new TypeError(
        `Tool page field "relatedTools[${index}].href" must be an internal path.`,
      );
    }

    return {
      href,
      label: requireString(item.label, `relatedTools[${index}].label`),
    };
  });
}

export function parseToolPageData(value: unknown): ToolPageData {
  if (!isRecord(value)) {
    throw new TypeError("Tool page data must be an object.");
  }

  const slug = requireString(value.slug, "slug");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new TypeError(`Tool page slug "${slug}" is invalid.`);
  }

  const route = requireString(value.route, "route");
  if (route !== `/${slug}`) {
    throw new TypeError(`Tool page route must be "/${slug}".`);
  }

  const template = requireString(value.template, "template");
  if (!TOOL_PAGE_TEMPLATES.includes(template as ToolPageData["template"])) {
    throw new TypeError(`Unsupported tool page template "${template}".`);
  }

  const toolType = requireString(value.toolType, "toolType");
  if (!TIKTOK_TOOL_TYPES.includes(toolType as ToolPageData["toolType"])) {
    throw new TypeError(`Unsupported TikTok tool type "${toolType}".`);
  }

  const routing = requireString(value.routing, "routing");
  if (routing !== "fixed" && routing !== "dynamic") {
    throw new TypeError('Tool page field "routing" must be fixed or dynamic.');
  }

  if (!isRecord(value.ui)) {
    throw new TypeError('Tool page field "ui" must be an object.');
  }

  return {
    applicationCategory: requireString(value.applicationCategory, "applicationCategory"),
    badge: requireString(value.badge, "badge"),
    breadcrumb: requireString(value.breadcrumb, "breadcrumb"),
    description: requireString(value.description, "description"),
    examples: parseContentItems(value.examples, "examples"),
    faq: parseFaq(value.faq),
    faqDescription: requireString(value.faqDescription, "faqDescription"),
    faqEyebrow: requireString(value.faqEyebrow, "faqEyebrow"),
    faqTitle: requireString(value.faqTitle, "faqTitle"),
    h1: requireString(value.h1, "h1"),
    intro: requireString(value.intro, "intro"),
    keywords: requireStringArray(value.keywords, "keywords", 3),
    relatedTools: parseRelatedTools(value.relatedTools),
    route,
    routing,
    slug,
    template: template as ToolPageData["template"],
    tips: parseContentItems(value.tips, "tips"),
    title: requireString(value.title, "title"),
    toolType: toolType as ToolPageData["toolType"],
    updatedAt: requireString(value.updatedAt, "updatedAt"),
    useCases: parseContentItems(value.useCases, "useCases"),
    ui: value.ui,
  };
}
