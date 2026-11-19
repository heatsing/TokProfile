import type { Metadata } from "next";

import { buildSupportPageMetadata, SupportPage } from "@/components/support/support-page";
import { supportPages } from "@/data/support-pages";

export const metadata: Metadata = buildSupportPageMetadata(supportPages.privacy);

export default function PrivacyPage() {
  return <SupportPage page={supportPages.privacy} />;
}
