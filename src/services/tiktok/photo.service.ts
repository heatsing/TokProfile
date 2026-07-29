import type { TikTokPhoto, ToolResultViewModel } from "@/types/tiktok";

import { createPublicSource, type TikTokToolService } from "./contracts";

function presentPhoto(photo: TikTokPhoto): ToolResultViewModel {
  return {
    description:
      "The public photo post was recognized and is ready for content retrieval.",
    eyebrow: "Public photo post",
    sections: [
      {
        fields: [
          { label: "Photo post ID", value: photo.id },
          {
            label: "Creator",
            value: photo.authorUsername ? `@${photo.authorUsername}` : "Unknown",
          },
          { label: "Source status", value: photo.source.status },
        ],
        title: "Photo identity",
      },
    ],
    title: photo.authorUsername
      ? `Photo post by @${photo.authorUsername}`
      : "TikTok photo post",
  };
}

export const photoService: TikTokToolService<"photo"> = {
  type: "photo",
  supports: (input) => input.kind === "photo_url",
  async resolve(input) {
    const data: TikTokPhoto = {
      authorUsername: input.username,
      contentUrl: input.url ?? "",
      id: input.contentId ?? "",
      kind: "photo",
      source: createPublicSource(),
    };

    return { data, view: presentPhoto(data) };
  },
};
