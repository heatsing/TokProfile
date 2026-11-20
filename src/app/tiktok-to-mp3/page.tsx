import type { Metadata } from "next";
import { AudioLines } from "lucide-react";

import { ToolInput } from "@/components/utility-tool/tool-input";
import { ToolLanding } from "@/components/utility-tool/tool-landing";
import { mp3Content } from "@/data/navigation-tool-content";

export const metadata: Metadata = {
  title: mp3Content.title,
  description: mp3Content.description,
  alternates: { canonical: "/tiktok-to-mp3" },
  robots: { follow: true, index: false },
};

export default function TikTokToMp3Page() {
  return (
    <ToolLanding
      content={mp3Content}
      icon={AudioLines}
      workspace={<ToolInput kind="video" />}
    />
  );
}
