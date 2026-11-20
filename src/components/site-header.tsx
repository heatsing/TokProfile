"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";

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
    <header className="relative z-50 border-b border-[#eee7e1] bg-white">
      <div className="container flex h-[62px] max-w-[1120px] items-center justify-between">
        <Link
          href="/"
          aria-label="TokProfile home"
          className="inline-flex items-center gap-2 text-lg font-extrabold tracking-[-0.055em] text-[#25201c] sm:text-[1.35rem]"
        >
          <span className="grid size-[25px] place-items-center rounded-[5px] bg-[#a13c0d] text-white">
            <Download className="size-4" aria-hidden="true" />
          </span>
          <span>
            Tok<span className="text-[#a13c0d]">Profile</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {primaryNavigation.map((link) => {
            if (link.status === "planned") {
              return (
                <span
                  key={link.label}
                  aria-disabled="true"
                  title="Coming soon"
                  className="inline-flex cursor-default items-center text-[13px] font-semibold text-[#302923]"
                >
                  {link.label}
                </span>
              );
            }

            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-[13px] font-semibold transition-colors ${
                  active ? "text-[#a13c0d]" : "text-[#302923] hover:text-[#a13c0d]"
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
          className="grid size-10 place-items-center rounded-[5px] border border-[#e8e2de] text-[#24211f] transition-colors hover:bg-[#fff4ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a13c0d] lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {open ? (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-4 top-[63px] rounded-md border border-[#e8e2de] bg-white p-2 shadow-lift lg:hidden"
          >
            {primaryNavigation.map((link) => {
              if (link.status === "planned") {
                return (
                  <span
                    key={link.label}
                    aria-disabled="true"
                    className="flex min-h-11 items-center justify-between rounded-[4px] px-4 text-[13px] font-semibold text-[#302923]"
                  >
                    {link.label}
                    <span className="rounded-full bg-[#fff4ed] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#a13c0d]">
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
                      ? "bg-[#fff4ed] text-[#a13c0d]"
                      : "text-[#302923] hover:bg-[#fff4ed] hover:text-[#a13c0d]"
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
