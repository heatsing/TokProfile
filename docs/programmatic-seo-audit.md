# Programmatic SEO Architecture Audit

Last reviewed: 2026-07-28

## Scope and UI constraint

This migration keeps every existing URL, interaction component, JSX layout and
Tailwind class unchanged. It moves page copy and SEO facts into validated JSON and
adds a separate dynamic template for future data-only expansion.

The repository did not contain the example cat, dog or baby-name pages. Adding those
topics would be unrelated to TokLens and was intentionally avoided.

## Before the migration

### App Router

- Fixed tool routes:
  - `/tiktok-profile-viewer`
  - `/tiktok-video-downloader`
  - `/tiktok-analytics`
  - `/tiktok-engagement-rate-calculator`
- Query result routes use `noindex, follow`.
- Blog is the only existing content collection using `[slug]` and
  `generateStaticParams`.
- No dynamic route existed for tool-page JSON.

### Data source

- Tool titles, descriptions, introductions, FAQ entries and section cards were
  declared directly inside each `page.tsx`.
- No `/data/tools` directory or common tool-page schema existed.
- Adding a similar landing page required copying a page component and its SEO setup.

### Repetition

- Breadcrumb, FAQ JSON-LD, OpenGraph and Twitter construction were repeated.
- Every tool page separately mapped the same FAQ accordion structure.
- Content quality depended on manual review; there was no duplicate intro, FAQ or
  example gate.

### Structured data

- Breadcrumb and FAQ structured data existed on fixed tool pages.
- WebApplication structured data was not consistently present.
- Structured data and visible FAQ copy could drift because both were assembled inside
  each page module.

### Internal linking

- Site-wide footer links existed.
- Some tools included strong contextual guide links, while others relied mainly on
  the footer.
- No page-level related-tool data was available to a scalable template.

## After the migration

### Data boundary

Each tool owns one JSON file under `src/data/tools`. Required fields include:

- title
- description
- h1
- intro
- useCases
- examples
- tips
- faq
- relatedTools
- keywords

Route, template, tool type, update date and application category are also explicit.
Fixed-page visual copy lives in the `ui` object instead of the route module.

### Validation

The parser rejects:

- Invalid or mismatched slugs and routes.
- Unsupported templates or TikTok tool types.
- Missing content groups.
- Fewer than three FAQ entries.
- Fewer than two use cases, examples, tips or related links.
- External related links.
- Missing keywords or UI data.

### Quality audit

The collection audit checks:

- Exact duplicate introductions.
- Exact duplicate FAQ question-and-answer pairs.
- Exact duplicate examples.
- Self-referential or repeated related links.
- Unique three-word phrase ratio above 70% compared with every other tool page.

This catches both direct duplication and high-overlap keyword-swapped templates
without adding an NLP dependency.

### SEO generation

One helper now builds:

- Existing title and meta description.
- Canonical.
- OpenGraph.
- Twitter cards.
- Query-page `noindex, follow`.
- BreadcrumbList.
- FAQPage.
- WebApplication.

Visible FAQ data and FAQ Schema use the same JSON array.

### Future routing

`src/app/[slug]/page.tsx` serves JSON entries marked `routing: "dynamic"`.
Specific existing routes continue to take precedence and retain their specialized
tools and visual layouts.

The dynamic template renders:

- Unique introduction.
- Tool input that submits to the existing unified result route.
- Use cases.
- Examples.
- Tips.
- FAQ.
- Related internal links.

It remains a Server Component and uses the existing Tool Engine, header, footer,
search input, result renderer, badges and design tokens.

### Sitemap

Tool URLs now come from the same validated data collection. New dynamic JSON pages are
included automatically after a successful quality check and build.

## Remaining editorial responsibility

Automation prevents structural duplication; it cannot prove factual usefulness.
Every new JSON page still needs:

1. A distinct user and task.
2. Evidence appropriate to the claim.
3. Examples written for that exact task.
4. Limitations matching actual product capability.
5. Related links that help the user take a logical next step.
6. Human review before changing `routing` to `dynamic`.

Do not create a page only because a keyword can be inserted into the template.
