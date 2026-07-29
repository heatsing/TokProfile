import type { TikTokAnalytics, ToolResultViewModel } from "@/types/tiktok";

import { createPublicSource, type TikTokToolService } from "./contracts";

function presentAnalytics(analytics: TikTokAnalytics): ToolResultViewModel {
  return {
    description:
      "The creator is ready for public-signal analysis. Historical metrics require an authorized data source.",
    eyebrow: "Creator analytics",
    sections: [
      {
        fields: [
          { label: "Creator", value: `@${analytics.account.username}` },
          { label: "Period", value: analytics.period.label },
          { label: "Source status", value: analytics.source.status },
        ],
        title: "Analysis scope",
      },
    ],
    title: `@${analytics.account.username} analytics`,
  };
}

export const analyticsService: TikTokToolService<"analytics"> = {
  type: "analytics",
  supports: (input) => input.kind === "username" || input.kind === "profile_url",
  async resolve(input) {
    const username = input.username ?? "";
    const data: TikTokAnalytics = {
      account: {
        profileUrl: `https://www.tiktok.com/@${username}`,
        username,
      },
      kind: "analytics",
      period: { label: "Current public snapshot" },
      source: createPublicSource(),
    };

    return { data, view: presentAnalytics(data) };
  },
};
