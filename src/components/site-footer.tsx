import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { Download, Eye, Music2, Smartphone, UserRound } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    items: [
      { label: "TikTok Viewer", href: "/viewer" },
      { label: "Popular Tools", href: "/explore#popular-tools" },
      { label: "How It Works", href: "/explore#how-it-works" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Profile Viewer", href: "/tiktok-profile-viewer" },
      { label: "Video Viewer", href: "/viewer?mode=video" },
      { label: "Video Downloader", href: "/" },
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

const utilityTools = [
  { icon: Smartphone, label: "Download Stories" },
  { icon: Music2, label: "Download MP3" },
  { icon: Eye, label: "Story Viewer", href: "/viewer?mode=story" },
  { icon: UserRound, label: "Profile Viewer", href: "/tiktok-profile-viewer" },
] as const;

export function SiteFooter({ variant = "default" }: { variant?: "default" | "utility" }) {
  if (variant === "utility") {
    return (
      <footer className="border-t border-[#dbe6e3] bg-white text-[#294442]">
        <div className="container flex flex-col items-center py-12 text-center sm:py-16">
          <nav
            aria-label="More TikTok tools"
            className="flex max-w-5xl flex-wrap items-center justify-center gap-3"
          >
            {utilityTools.map((tool) => {
              const Icon = tool.icon;
              const content = (
                <>
                  <Icon className="size-5 text-[#087568]" aria-hidden="true" />
                  {tool.label}
                </>
              );

              return "href" in tool ? (
                <Link
                  key={tool.label}
                  href={tool.href}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#eff5f3] px-5 text-[13px] font-extrabold transition-colors hover:bg-[#e2efeb] hover:text-[#087568] sm:text-sm"
                >
                  {content}
                </Link>
              ) : (
                <span
                  key={tool.label}
                  aria-disabled="true"
                  title="Coming soon"
                  className="inline-flex min-h-12 cursor-default items-center gap-3 rounded-full bg-[#eff5f3] px-5 text-[13px] font-extrabold text-[#294442] sm:text-sm"
                >
                  {content}
                </span>
              );
            })}
          </nav>

          <Link
            href="/"
            aria-current="page"
            className="mt-8 inline-flex items-center gap-3 font-display text-lg font-extrabold tracking-[-0.02em] sm:text-xl"
          >
            <span className="grid size-11 place-items-center rounded-full bg-[#087568] text-white">
              <Download className="size-5" aria-hidden="true" />
            </span>
            TikTok Video Downloader
          </Link>

          <nav
            aria-label="Footer"
            className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] text-[#49605d] sm:text-sm"
          >
            <Link className="hover:text-[#087568]" href="#download-help">
              Help
            </Link>
            <Link className="hover:text-[#087568]" href="mailto:hello@tokprofile.com">
              Contact
            </Link>
            <Link className="hover:text-[#087568]" href="#site-copyright">
              Copyright
            </Link>
            <Link className="hover:text-[#087568]" href="/privacy">
              Privacy Policy
            </Link>
            <span aria-disabled="true" title="Coming soon">
              Terms of Service
            </span>
          </nav>

          <p className="mt-8 text-xs text-[#576d69] sm:text-[13px]">
            TokProfile is independent of TikTok and ByteDance.
          </p>
          <p id="site-copyright" className="mt-3 text-xs text-[#576d69] sm:text-[13px]">
            © {new Date().getFullYear()} TokProfile. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

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
          <p>© {new Date().getFullYear()} TokProfile. Built for public data research.</p>
          <div className="flex gap-5">
            <Link href="/privacy">Privacy</Link>
            <Link href="/explore#how-it-works">Public data</Link>
            <Link href="/explore#faq">FAQ</Link>
            <Link href="mailto:hello@tokprofile.com">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
