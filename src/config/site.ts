import type { NavigationItem } from "@/types/navigation";

export const siteConfig = {
  name: "TokProfile",
  description:
    "Clear TikTok link validation and engagement calculations with visible limitations.",
  navigation: [
    { href: "/", label: "Video Link Checker" },
    {
      href: "/tiktok-engagement-rate-calculator",
      label: "Engagement Calculator",
    },
    { href: "/blog", label: "Guides" },
    { href: "/help", label: "Help" },
  ] satisfies NavigationItem[],
} as const;
