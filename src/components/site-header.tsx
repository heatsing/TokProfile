"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { primaryNavigation } from "@/config/public-navigation";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({
  variant: _variant = "default",
}: {
  variant?: "default" | "utility";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="relative z-50 border-b border-[#dbe6e3] bg-white">
      <div className="container flex h-[64px] items-center justify-between">
        <Link
          href="/"
          aria-label="TokProfile home"
          className="font-display text-base font-extrabold tracking-[-0.045em] text-[#172a2d] sm:text-lg"
        >
          Tok<span className="text-[#087568]">Profile</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {primaryNavigation.map((link) => {
            if (link.status === "planned") {
              return (
                <span
                  key={link.label}
                  aria-disabled="true"
                  className="inline-flex cursor-default items-center gap-1.5 text-xs font-bold text-[#6d7e7b]"
                >
                  {link.label}
                  <span className="rounded-full bg-[#eef5f3] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-[#087568]">
                    Soon
                  </span>
                </span>
              );
            }

            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-xs font-bold transition-colors ${
                  active ? "text-[#087568]" : "text-[#31474a] hover:text-[#087568]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((current) => !current)}
          className="grid size-10 place-items-center rounded-lg text-[#172a2d] transition-colors hover:bg-[#eef5f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087568] lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {open ? (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-5 top-[72px] rounded-xl border border-[#dbe6e3] bg-white p-2 shadow-lift lg:hidden"
          >
            {primaryNavigation.map((link) => {
              if (link.status === "planned") {
                return (
                  <span
                    key={link.label}
                    aria-disabled="true"
                    className="flex min-h-11 items-center justify-between rounded-lg px-4 text-[13px] font-semibold text-[#6d7e7b]"
                  >
                    {link.label}
                    <span className="rounded-full bg-[#eef5f3] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#087568]">
                      Coming soon
                    </span>
                  </span>
                );
              }

              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-11 items-center rounded-lg px-4 text-[13px] font-semibold ${
                    active
                      ? "bg-[#eef5f3] text-[#087568]"
                      : "text-[#31474a] hover:bg-[#eef5f3] hover:text-[#087568]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
