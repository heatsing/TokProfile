import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { footerNavigation, utilityFooterNavigation } from "@/config/public-navigation";

export function SiteFooter({ variant = "default" }: { variant?: "default" | "utility" }) {
  if (variant === "utility") {
    return (
      <footer className="mt-12 border-t border-[#e8e2de] bg-white text-[#56514e]">
        <div className="container flex max-w-[1120px] flex-col gap-4 py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>TokProfile is independent of TikTok and ByteDance.</p>
          <nav aria-label="Help and policies" className="flex flex-wrap gap-x-4 gap-y-2">
            {utilityFooterNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#56514e] underline-offset-4 hover:text-[#a13c0d] hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[#dbe6e3] bg-[#f7faf9] text-[#294442]">
      <div className="container py-10 sm:py-12">
        <div className="grid gap-9 border-b border-[#dbe6e3] pb-9 sm:grid-cols-[1.25fr_2fr] sm:gap-12">
          <div>
            <Link
              href="/"
              aria-label="TokProfile home"
              className="font-display text-lg font-extrabold tracking-[-0.04em] text-[#172a2d]"
            >
              Tok<span className="text-[#087568]">Profile</span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-5 text-[#576d69]">
              Clear, rights-aware TikTok utilities. TokProfile is independent of TikTok
              and ByteDance.
            </p>
            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#576d69]">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#087568]" />
              Only tools with a truthful, testable result appear in public navigation.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNavigation.map((group) => (
              <div key={group.title}>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#087568]">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-xs text-[#49605d] transition-colors hover:text-[#087568]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-[11px] leading-5 text-[#637673] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TokProfile. All rights reserved.</p>
          <p>Use public links and media only when you have the right to do so.</p>
        </div>
      </div>
    </footer>
  );
}
