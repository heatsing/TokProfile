import type { Metadata } from "next";

import { ToolStatusPage } from "@/components/tool-status-page";

export const metadata: Metadata = {
  title: "TikTok Story Viewer — Tool Status",
  description:
    "Check the current availability of TokProfile's public TikTok Story viewer and its data-source limitations.",
  alternates: { canonical: "/story-viewer" },
  robots: { follow: true, index: false },
};

export default function StoryViewerPage() {
  return (
    <ToolStatusPage
      title="TikTok Story Viewer"
      description="View currently available public Stories only after a verified public-data connector is active."
      inputLabel="TikTok usernames for Story lookup"
      expectedResult="a current public Story result"
    />
  );
}
