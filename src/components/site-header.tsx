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

export function SiteHeader({ variant = "default" }: { variant?: "default" | "utility" }) {
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

  const utility = variant === "utility";

  return (
    <header
      className={`relative z-50 border-b bg-white ${
        utility ? "border-[#eee7e1]" : "border-[#dbe6e3]"
      }`}
    >
      <div
        className={`container flex items-center justify-between ${
          utility ? "h-[62px] max-w-[1120px]" : "h-[64px]"
        }`}
      >
        <Link
          href="/"
          aria-label="TokProfile home"
          className={`inline-flex items-center font-extrabold text-[#25201c] ${
            utility
              ? "gap-2 text-lg tracking-[-0.055em] sm:text-[1.35rem]"
              : "font-display text-base tracking-[-0.045em] sm:text-lg"
          }`}
        >
          {utility ? (
            <span className="grid size-[25px] place-items-center rounded-[5px] bg-[#a13c0d] text-white">
              <Download className="size-4" aria-hidden="true" />
            </span>
          ) : null}
          <span>
            Tok
            <span className={utility ? "text-[#a13c0d]" : "text-[#087568]"}>Profile</span>
          </span>
        </Link>

        <nav
          className={`hidden items-center lg:flex ${utility ? "gap-6" : "gap-5"}`}
          aria-label="Primary"
        >
          {primaryNavigation.map((link) => {
            if (link.status === "planned") {
              return (
                <span
                  key={link.label}
                  aria-disabled="true"
                  title="Coming soon"
                  className={`inline-flex cursor-default items-center font-semibold ${
                    utility
                      ? "text-[13px] text-[#302923]"
                      : "gap-1.5 text-xs text-[#6d7e7b]"
                  }`}
                >
                  {link.label}
                  {!utility ? (
                    <span className="rounded-full bg-[#eef5f3] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-[#087568]">
                      Soon
                    </span>
                  ) : null}
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
          className={`grid size-10 place-items-center text-[#24211f] transition-colors focus-visible:outline-none focus-visible:ring-2 lg:hidden ${
            utility
              ? "rounded-[5px] border border-[#e8e2de] hover:bg-[#fff4ed] focus-visible:ring-[#a13c0d]"
              : "rounded-lg hover:bg-[#eef5f3] focus-visible:ring-[#087568]"
          }`}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {open ? (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className={`absolute inset-x-4 bg-white p-2 shadow-lift lg:hidden ${
              utility
                ? "top-[63px] rounded-md border border-[#e8e2de]"
                : "top-[72px] rounded-xl border border-[#dbe6e3]"
            }`}
          >
            {primaryNavigation.map((link) => {
              if (link.status === "planned") {
                return (
                  <span
                    key={link.label}
                    aria-disabled="true"
                    className={`flex min-h-11 items-center justify-between px-4 text-[13px] font-semibold ${
                      utility
                        ? "rounded-[4px] text-[#302923]"
                        : "rounded-lg text-[#6d7e7b]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide ${
                        utility
                          ? "bg-[#fff4ed] text-[#a13c0d]"
                          : "bg-[#eef5f3] text-[#087568]"
                      }`}
                    >
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
