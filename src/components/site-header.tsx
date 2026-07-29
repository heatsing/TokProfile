import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
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
