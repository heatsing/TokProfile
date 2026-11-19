import type { Metadata } from "next";

import { buildSupportPageMetadata, SupportPage } from "@/components/support/support-page";
import { supportPages } from "@/data/support-pages";

export const metadata: Metadata = buildSupportPageMetadata(supportPages.terms);

export default function TermsPage() {
  return <SupportPage page={supportPages.terms} />;
}
