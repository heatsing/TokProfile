export type PublicNavigationItem =
  { href: string; label: string; status: "live" } | { label: string; status: "planned" };

export const primaryNavigation: readonly PublicNavigationItem[] = [
  { href: "/", label: "TikTok Video Checker", status: "live" },
  {
    href: "/tiktok-engagement-rate-calculator",
    label: "Engagement Calculator",
    status: "live",
  },
  { href: "/blog", label: "TikTok Guides", status: "live" },
  { href: "/help", label: "Help", status: "live" },
];

export const utilityFooterNavigation = [
  { href: "/help", label: "Help" },
  { href: "/contact", label: "Contact" },
  { href: "/copyright", label: "Copyright" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export const homepageTools = [
  {
    description: "Check a full public TikTok video URL and review the parsed video ID.",
    href: "/",
    icon: "link",
    label: "Video Link Checker",
    status: "live",
  },
  {
    description: "Calculate a follower-based estimate with the full formula visible.",
    href: "/tiktok-engagement-rate-calculator",
    icon: "calculator",
    label: "Engagement Calculator",
    status: "live",
  },
  {
    description: "Audio export will appear after real MP3 delivery passes testing.",
    icon: "music",
    label: "TikTok to MP3",
    status: "planned",
  },
  {
    description: "Current Story lookup needs a verified public-data provider.",
    icon: "eye",
    label: "Story Viewer",
    status: "planned",
  },
  {
    description: "Story saving stays unavailable until a real file can be delivered.",
    icon: "download",
    label: "Story Downloader",
    status: "planned",
  },
  {
    description: "Live public-profile results are not connected yet.",
    icon: "profile",
    label: "Profile Viewer",
    status: "planned",
  },
  {
    description: "Read practical guides about public content, privacy and analytics.",
    href: "/blog",
    icon: "guides",
    label: "TikTok Guides",
    status: "live",
  },
  {
    description: "See supported inputs, result meanings and current limitations.",
    href: "/help",
    icon: "help",
    label: "TokProfile Help",
    status: "live",
  },
] as const;

export const footerNavigation = [
  {
    title: "Tools",
    items: [
      { href: "/", label: "Video Link Checker" },
      {
        href: "/tiktok-engagement-rate-calculator",
        label: "Engagement Calculator",
      },
    ],
  },
  {
    title: "Support",
    items: [
      { href: "/help", label: "Help" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Guides" },
    ],
  },
  {
    title: "Policies",
    items: [
      { href: "/copyright", label: "Copyright" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
] as const;
