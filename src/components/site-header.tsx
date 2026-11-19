import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const utilityNavigation = [
  { label: "Download TikTok Stories" },
  { label: "Download TikTok MP3" },
  { href: "/viewer?mode=story", label: "Story Viewer" },
  { href: "/tiktok-profile-viewer", label: "Profile Viewer" },
] as const;

export function SiteHeader({ variant = "default" }: { variant?: "default" | "utility" }) {
  if (variant === "utility") {
    return (
      <header className="relative z-50 border-b border-[#dbe6e3] bg-white">
        <div className="container flex h-[68px] items-center justify-between">
          <Link
            href="/"
            aria-label="TokProfile home"
            className="font-display text-xl font-extrabold tracking-[-0.045em] text-[#172a2d]"
          >
            Tok<span className="text-[#087568]">Profile</span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {utilityNavigation.map((link) => (
              <span key={link.label} className="contents">
                {"href" in link ? (
                  <Link
                    href={link.href}
                    className="text-[13px] font-bold text-[#233438] transition-colors hover:text-[#087568]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Coming soon"
                    className="cursor-default text-[13px] font-bold text-[#233438]"
                  >
                    {link.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <details className="group relative lg:hidden">
            <summary
              className="grid size-11 cursor-pointer list-none place-items-center rounded-lg text-[#172a2d] transition-colors hover:bg-[#eef5f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087568] [&::-webkit-details-marker]:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute right-0 top-14 w-64 rounded-xl border border-[#dbe6e3] bg-white p-2 shadow-lift"
            >
              {utilityNavigation.map((link) => (
                <span key={link.label} className="contents">
                  {"href" in link ? (
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-[#31474a] hover:bg-[#eef5f3] hover:text-[#087568]"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-[#7b8987]"
                    >
                      {link.label}
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Soon
                      </span>
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </details>
        </div>
      </header>
    );
  }

  return (
    <header className="relative z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
      <div className="container flex h-[72px] items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {siteConfig.navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/viewer">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/viewer">
              Analyze free <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
        <details className="group relative md:hidden">
          <summary
            className="grid size-11 cursor-pointer list-none place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid [&::-webkit-details-marker]:hidden"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-14 w-64 rounded-2xl border border-ink/10 bg-white p-3 shadow-lift"
          >
            {siteConfig.navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-ink/70 hover:bg-sand hover:text-ink"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" />
              </Link>
            ))}
            <Button className="mt-2 w-full" asChild>
              <Link href="/viewer">Analyze free</Link>
            </Button>
          </nav>
        </details>
      </div>
    </header>
  );
}
