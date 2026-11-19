export interface PublicNavigationItem {
  href: string;
  label: string;
}

export const primaryNavigation = [
  { href: "/", label: "Video Link Checker" },
  {
    href: "/tiktok-engagement-rate-calculator",
    label: "Engagement Calculator",
  },
  { href: "/blog", label: "Guides" },
  { href: "/help", label: "Help" },
] as const satisfies readonly PublicNavigationItem[];

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
