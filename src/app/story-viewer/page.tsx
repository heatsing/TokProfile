import type { Metadata } from "next";
import { Eye } from "lucide-react";

import { ToolInput } from "@/components/utility-tool/tool-input";
import { ToolLanding } from "@/components/utility-tool/tool-landing";
import { storyViewerContent } from "@/data/navigation-tool-content";

export const metadata: Metadata = {
  title: storyViewerContent.title,
  description: storyViewerContent.description,
  alternates: { canonical: "/story-viewer" },
  robots: { follow: true, index: false },
};

export default function StoryViewerPage() {
  return (
    <ToolLanding
      content={storyViewerContent}
      icon={Eye}
      workspace={<ToolInput kind="username" />}
    />
  );
}
