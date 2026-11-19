import type { TikTokProfile, ToolResultViewModel } from "@/types/tiktok";

import { createPublicSource, type TikTokToolService } from "./contracts";

function presentProfile(profile: TikTokProfile): ToolResultViewModel {
  return {
    description:
      "The username format is valid, but no live TikTok profile lookup was performed because the public-data connector is not connected.",
    eyebrow: "Unverified profile input",
    sections: [
      {
        fields: [
          { label: "Username", value: `@${profile.username}` },
          { label: "Profile URL", value: profile.profileUrl },
          { label: "Source status", value: profile.source.status },
        ],
        title: "Parsed input only",
      },
    ],
    title: `@${profile.username} was not verified`,
  };
}

export const profileService: TikTokToolService<"profile"> = {
  type: "profile",
  supports: (input) => input.kind === "username" || input.kind === "profile_url",
  async resolve(input) {
    const username = input.username ?? "";
    const data: TikTokProfile = {
      kind: "profile",
      profileUrl: `https://www.tiktok.com/@${username}`,
      source: createPublicSource(),
      username,
      visibility: "unknown",
    };

    return { data, view: presentProfile(data) };
  },
};
