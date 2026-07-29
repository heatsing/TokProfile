import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProgrammaticToolPageTemplate } from "@/components/programmatic-seo/tool-page-template";
import { buildToolPageMetadata } from "@/services/content/tool-page-seo";
import { getAllToolPages, getToolPage } from "@/services/content/tool-pages";

export async function generateStaticParams() {
  const pages = await getAllToolPages();
  return pages
    .filter((page) => page.routing === "dynamic")
    .map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getToolPage(slug);

  if (!page || page.routing !== "dynamic") {
    return {};
  }

  return buildToolPageMetadata(page);
}

export default async function ProgrammaticToolRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getToolPage(slug);

  if (!page || page.routing !== "dynamic") {
    notFound();
  }

  return <ProgrammaticToolPageTemplate page={page} />;
}
