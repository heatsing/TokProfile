export interface PublicNavigationLink {
  href: string;
  label: string;
}

export interface PublicNavigationGroup {
  items: readonly PublicNavigationLink[];
  label: string;
}

interface HomepageToolLink {
  description: string;
  href: string;
  icon: "music";
  label: string;
  status: "live" | "planned";
}

export const directDownloadNavigation = [
  { href: "/#download", label: "Download TikTok Video" },
  { href: "/download-tiktok-stories", label: "Download TikTok Story" },
] as const satisfies readonly PublicNavigationLink[];

export const groupedNavigation = [
  {
    label: "TikTok Downloaders",
    items: [{ href: "/tiktok-to-mp3", label: "TikTok to MP3" }],
  },
  {
    label: "Viewers",
    items: [
      { href: "/story-viewer", label: "Story Viewer" },
      { href: "/profile-viewer", label: "Profile Viewer" },
    ],
  },
] as const satisfies readonly PublicNavigationGroup[];

export const primaryNavigation: readonly PublicNavigationLink[] = [
  ...directDownloadNavigation,
  ...groupedNavigation[0].items,
  ...groupedNavigation[1].items,
];

export const homepageTools: readonly HomepageToolLink[] = [
  {
    description: "Audio export will appear after real MP3 delivery passes testing.",
    href: "/tiktok-to-mp3",
    icon: "music",
    label: "TikTok to MP3",
    status: "planned",
  },
];

export const footerNavigation = [
  {
    title: "Downloaders",
    items: [
      { href: "/#download", label: "Download TikTok Video" },
      { href: "/download-tiktok-stories", label: "Download TikTok Story" },
      { href: "/tiktok-to-mp3", label: "TikTok to MP3" },
    ],
  },
  {
    title: "Viewers",
    items: [
      { href: "/story-viewer", label: "Story Viewer" },
      { href: "/profile-viewer", label: "Profile Viewer" },
    ],
  },
  {
    title: "Support",
    items: [
      { href: "/help", label: "Help" },
      { href: "/contact", label: "Contact" },
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
