import type { Metadata } from "next";

import { ToolStatusPage } from "@/components/tool-status-page";

export const metadata: Metadata = {
  title: "TikTok to MP3 — Audio Tool Status",
  description:
    "Check the current availability of TokProfile's TikTok to MP3 workflow and its verified audio-delivery requirements.",
  alternates: { canonical: "/tiktok-to-mp3" },
  robots: { follow: true, index: false },
};

export default function TikTokToMp3Page() {
  return (
    <ToolStatusPage
      title="TikTok to MP3"
      description="Download TikTok audio only after source validation, real MP3 encoding and playback checks are connected."
      inputLabel="video links for audio extraction"
      expectedResult="an encoded MP3 file"
    />
  );
}
