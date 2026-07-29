import type { NavigationItem } from "@/types/navigation";

export const siteConfig = {
  name: "TokLens",
  description:
    "Public TikTok discovery and creator intelligence for viewers, creators, and marketing teams.",
  navigation: [
    { href: "/viewer", label: "Viewer" },
    { href: "/#popular-tools", label: "Tools" },
    { href: "/tiktok-analytics", label: "Analytics" },
    { href: "/blog", label: "Guides" },
  ] satisfies NavigationItem[],
} as const;
