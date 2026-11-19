import type { TikTokStory, ToolResultViewModel } from "@/types/tiktok";

import { createPublicSource, type TikTokToolService } from "./contracts";

function presentStory(story: TikTokStory): ToolResultViewModel {
  return {
    description:
      "The URL format was recognized, but live Story availability and media were not checked because the TikTok source connector is not connected.",
    eyebrow: "Unverified story URL",
    sections: [
      {
        fields: [
          { label: "Creator", value: `@${story.username}` },
          { label: "Story ID", value: story.id ?? "Not provided" },
          { label: "Source status", value: story.source.status },
        ],
        title: "Parsed URL only",
      },
    ],
    title: `Story URL for @${story.username} was not verified`,
  };
}

export const storyService: TikTokToolService<"story"> = {
  type: "story",
  supports: (input) => input.kind === "story_url",
  async resolve(input) {
    const data: TikTokStory = {
      contentUrl: input.url,
      id: input.contentId,
      kind: "story",
      source: createPublicSource(),
      username: input.username ?? "",
    };

    return { data, view: presentStory(data) };
  },
};
