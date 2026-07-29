import type {
  TikTokProfile,
  TikTokToolErrorShape,
  TikTokToolResult,
} from "@/types/tiktok";

export const PROFILE_VIEW_TABS = ["overview", "videos", "analytics"] as const;

export type ProfileViewTab = (typeof PROFILE_VIEW_TABS)[number];

export type ProfileViewerState =
  | { status: "empty" }
  | { error: TikTokToolErrorShape; status: "error" }
  | { profile: TikTokProfile; status: "private" }
  | { profile: TikTokProfile; status: "success" };

export function resolveProfileViewTab(value: string | undefined): ProfileViewTab {
  return PROFILE_VIEW_TABS.includes(value as ProfileViewTab)
    ? (value as ProfileViewTab)
    : "overview";
}

export function createProfileViewerState(
  result: TikTokToolResult | undefined,
): ProfileViewerState {
  if (!result) {
    return { status: "empty" };
  }

  if (!result.ok) {
    return { error: result.error, status: "error" };
  }

  if (result.tool !== "profile") {
    return {
      error: {
        code: "INTERNAL_ERROR",
        message: "The profile viewer received an unexpected result type.",
        retryable: true,
      },
      status: "error",
    };
  }

  if (result.data.visibility === "private") {
    return { profile: result.data, status: "private" };
  }

  return { profile: result.data, status: "success" };
}

export function createProfileTabHref(input: string, tab: ProfileViewTab): string {
  const params = new URLSearchParams({ q: input });

  if (tab !== "overview") {
    params.set("tab", tab);
  }

  return `/tiktok-profile-viewer?${params.toString()}`;
}
