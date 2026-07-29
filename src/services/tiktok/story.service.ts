import type { TikTokStory, ToolResultViewModel } from "@/types/tiktok";

import { createPublicSource, type TikTokToolService } from "./contracts";

function presentStory(story: TikTokStory): ToolResultViewModel {
  return {
    description:
      "The public story URL was recognized. Availability can change as stories expire.",
    eyebrow: "Public story",
    sections: [
      {
        fields: [
          { label: "Creator", value: `@${story.username}` },
          { label: "Story ID", value: story.id ?? "Not provided" },
          { label: "Source status", value: story.source.status },
        ],
        title: "Story identity",
      },
    ],
    title: `Story by @${story.username}`,
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
