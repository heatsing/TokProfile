import type { Metadata } from "next";
import { Film } from "lucide-react";

import { ToolInput } from "@/components/utility-tool/tool-input";
import { ToolLanding } from "@/components/utility-tool/tool-landing";
import { storyDownloadContent } from "@/data/navigation-tool-content";

export const metadata: Metadata = {
  title: storyDownloadContent.title,
  description: storyDownloadContent.description,
  alternates: { canonical: "/download-tiktok-stories" },
  robots: { follow: true, index: false },
};

export default function DownloadTikTokStoriesPage() {
  return (
    <ToolLanding
      content={storyDownloadContent}
      icon={Film}
      workspace={<ToolInput kind="story" />}
    />
  );
}
