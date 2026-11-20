import type { Metadata } from "next";

import { ToolStatusPage } from "@/components/tool-status-page";

export const metadata: Metadata = {
  title: "Download TikTok Story — Tool Status",
  description:
    "Check the current availability of TokProfile's TikTok Story download workflow and its public-data limitations.",
  alternates: { canonical: "/download-tiktok-stories" },
  robots: { follow: true, index: false },
};

export default function DownloadTikTokStoriesPage() {
  return (
    <ToolStatusPage
      title="Download TikTok Story"
      description="Save an authorized public TikTok Story after real Story lookup and file delivery have passed verification."
      inputLabel="Story links"
      expectedResult="a Story media file"
    />
  );
}
