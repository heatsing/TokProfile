import Image from "next/image";
import Link from "next/link";

import { footerNavigation } from "@/config/public-navigation";

export function SiteFooter({
  variant: _variant = "default",
}: {
  variant?: "default" | "utility";
}) {
  return (
    <footer className="mt-12 border-t border-[#e8e2de] bg-[#faf8f6] text-[#56514e]">
      <div className="container max-w-[1120px] py-9 sm:py-11">
        <div className="grid gap-8 border-b border-[#e8e2de] pb-8 sm:grid-cols-[1.1fr_2fr]">
          <div>
            <Link
              href="/"
              aria-label="TokProfile home"
              className="inline-flex items-center"
            >
              <Image
                src="/tokprofile-logo.png"
                alt="TokProfile"
                width={180}
                height={60}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-5">
              Rights-aware TikTok utilities. TokProfile is independent of TikTok and
              ByteDance.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          >
            {footerNavigation.map((group) => (
              <div key={group.title}>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#a13c0d]">
                  {group.title}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-xs leading-5 text-[#56514e] transition-colors hover:text-[#a13c0d]"
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

        <div className="flex flex-col gap-2 pt-5 text-[11px] leading-5 text-[#756d68] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TokProfile. All rights reserved.</p>
          <p>Use public links and media only when you have the right to do so.</p>
        </div>
      </div>
    </footer>
  );
}
