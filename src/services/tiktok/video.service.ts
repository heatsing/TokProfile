import type { TikTokVideo, ToolResultViewModel } from "@/types/tiktok";

import { createPublicSource, type TikTokToolService } from "./contracts";

function presentVideo(video: TikTokVideo): ToolResultViewModel {
  return {
    description:
      "The public video URL was recognized and is ready for content retrieval.",
    eyebrow: "Public video",
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
        title: "Video identity",
      },
    ],
    title: video.authorUsername ? `Video by @${video.authorUsername}` : "TikTok video",
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
