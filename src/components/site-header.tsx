"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { directDownloadNavigation, groupedNavigation } from "@/config/public-navigation";

function isActivePath(pathname: string, href: string) {
  const route = href.split("#")[0] || "/";
  if (route === "/") return pathname === "/";
  return pathname === route || pathname.startsWith(`${route}/`);
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
          className="inline-flex shrink-0 items-center"
        >
          <Image
            src="/tokprofile-logo.png"
            alt="TokProfile"
            width={180}
            height={60}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {directDownloadNavigation.map((link) => {
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

          {groupedNavigation.map((group) => {
            const active = group.items.some((item) => isActivePath(pathname, item.href));
            return (
              <details key={group.label} className="group relative">
                <summary
                  className={`flex cursor-pointer list-none items-center gap-1 text-[13px] font-semibold transition-colors marker:hidden [&::-webkit-details-marker]:hidden ${
                    active ? "text-[#a13c0d]" : "text-[#302923] hover:text-[#a13c0d]"
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    className="size-3.5 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="absolute right-0 top-[calc(100%+14px)] min-w-52 rounded-md border border-[#e8e2de] bg-white p-2 shadow-[0_16px_36px_rgba(70,42,24,0.14)]">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex min-h-10 items-center rounded px-3 text-[13px] font-semibold text-[#302923] hover:bg-[#fff4ed] hover:text-[#a13c0d]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
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
          className="inline-flex h-10 items-center gap-2 rounded-[5px] border border-[#e8e2de] px-3 text-[#24211f] transition-colors hover:bg-[#fff4ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a13c0d] lg:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          <span className="text-xs font-bold">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      <nav
        aria-label="Mobile download shortcuts"
        className="grid grid-cols-2 border-t border-[#f2ece8] lg:hidden"
      >
        {directDownloadNavigation.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center justify-center border-r border-[#f2ece8] px-2 text-center text-[11px] font-bold text-[#302923] last:border-r-0 hover:bg-[#fff4ed] hover:text-[#a13c0d]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-4 top-full rounded-md border border-[#e8e2de] bg-white p-3 shadow-[0_16px_36px_rgba(70,42,24,0.16)] lg:hidden"
        >
          {groupedNavigation.map((group) => (
            <div key={group.label} className="py-1 first:pt-0 last:pb-0">
              <p className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#a13c0d]">
                {group.label}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded px-3 text-[13px] font-semibold text-[#302923] hover:bg-[#fff4ed] hover:text-[#a13c0d]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
