export interface PublicNavigationLink {
  href: string;
  label: string;
}

export type PublicNavigationItem = PublicNavigationLink | { href: null; label: string };

export interface PublicNavigationGroup {
  items: readonly PublicNavigationItem[];
  label: string;
}

export const directDownloadNavigation = [
  { href: "/#download", label: "Download TikTok Video" },
  { href: "/download-tiktok-stories", label: "Download TikTok Story" },
] as const satisfies readonly PublicNavigationLink[];

export const groupedNavigation: readonly PublicNavigationGroup[] = [
  {
    label: "TikTok Downloaders",
    items: [
      { href: null, label: "Downloader TikTok Photo" },
      { href: "/tiktok-to-mp3", label: "Download TikTok Audio" },
      { href: null, label: "Downloader TikTok Slide" },
      { href: null, label: "Downloader TikTok Notes" },
    ],
  },
  {
    label: "Viewers",
    items: [
      { href: "/story-viewer", label: "Story Viewer" },
      { href: "/profile-viewer", label: "Profile Viewer" },
    ],
  },
];

export const primaryNavigation: readonly PublicNavigationLink[] = [
  ...directDownloadNavigation,
  ...groupedNavigation.flatMap(({ items }) =>
    items.filter((item): item is PublicNavigationLink => item.href !== null),
  ),
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
