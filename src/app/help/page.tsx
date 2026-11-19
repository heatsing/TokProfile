import type { Metadata } from "next";

import { buildSupportPageMetadata, SupportPage } from "@/components/support/support-page";
import { supportPages } from "@/data/support-pages";

export const metadata: Metadata = buildSupportPageMetadata(supportPages.help);

export default function HelpPage() {
  return <SupportPage page={supportPages.help} />;
}
