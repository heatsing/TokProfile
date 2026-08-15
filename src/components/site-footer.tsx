import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

const footerLinks = [
  {
    title: "Product",
    items: [
      { label: "TikTok Viewer", href: "/viewer" },
      { label: "Popular Tools", href: "/#popular-tools" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Profile Viewer", href: "/tiktok-profile-viewer" },
      { label: "Video Viewer", href: "/viewer?mode=video" },
      { label: "Video Downloader", href: "/tiktok-video-downloader" },
      { label: "TikTok Analytics", href: "/tiktok-analytics" },
      {
        label: "Engagement Calculator",
        href: "/tiktok-engagement-rate-calculator",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "FAQ", href: "/#faq" },
      { label: "Research Guides", href: "/blog" },
      {
        label: "Analytics Methodology",
        href: "/blog/how-toklens-estimates-tiktok-engagement",
      },
      { label: "Privacy & Data", href: "/privacy" },
      { label: "Contact", href: "mailto:hello@tokprofile.com" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="container py-14 sm:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.35fr_2fr]">
          <div>
            <BrandMark light />
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
              Public TikTok discovery and creator intelligence for curious viewers,
              creators, and modern marketing teams.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-acid">
                  {group.title}
                </p>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TokLens. Built for public data research.</p>
          <div className="flex gap-5">
            <Link href="/privacy">Privacy</Link>
            <Link href="/#how-it-works">Public data</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="mailto:hello@tokprofile.com">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
