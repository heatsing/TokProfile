import type { TikTokProfile, ToolResultViewModel } from "@/types/tiktok";

import { createPublicSource, type TikTokToolService } from "./contracts";

function presentProfile(profile: TikTokProfile): ToolResultViewModel {
  return {
    description: "The profile input is valid and ready for the public-data connector.",
    eyebrow: "Public profile",
    sections: [
      {
        fields: [
          { label: "Username", value: `@${profile.username}` },
          { label: "Profile URL", value: profile.profileUrl },
          { label: "Source status", value: profile.source.status },
        ],
        title: "Profile identity",
      },
    ],
    title: `@${profile.username}`,
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
