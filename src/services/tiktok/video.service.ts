import type { TikTokVideo, ToolResultViewModel } from "@/types/tiktok";

import { createPublicSource, type TikTokToolService } from "./contracts";

function presentVideo(video: TikTokVideo): ToolResultViewModel {
  return {
    description:
      "The URL format was recognized, but no video, audio, duration, or availability was retrieved because the TikTok media connector is not connected.",
    eyebrow: "Unverified video URL",
    sections: [
      {
        fields: [
          { label: "Video ID", value: video.id },
          {
            label: "Creator",
            value: video.authorUsername ? `@${video.authorUsername}` : "Unknown",
          },
          { label: "Source status", value: video.source.status },
        ],
        title: "Parsed URL only",
      },
    ],
    title: video.authorUsername
      ? `Video URL for @${video.authorUsername} was not verified`
      : "TikTok video URL was not verified",
  };
}

export const videoService: TikTokToolService<"video"> = {
  type: "video",
  supports: (input) => input.kind === "video_url",
  async resolve(input) {
    const data: TikTokVideo = {
      authorUsername: input.username,
      contentUrl: input.url ?? "",
      id: input.contentId ?? "",
      kind: "video",
      source: createPublicSource(),
    };

    return { data, view: presentVideo(data) };
  },
};
