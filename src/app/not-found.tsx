import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested TokProfile page could not be found.",
  robots: { follow: true, index: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-[#172a2d]">
      <SiteHeader />
      <section className="flex flex-1 items-center border-b border-[#e2ece9] bg-[#eef8f6] py-16">
        <div className="container max-w-[760px] text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-white text-[#087568] shadow-sm">
            <SearchX className="size-6" aria-hidden="true" />
          </span>
          <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#087568]">
            Error 404
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold tracking-[-0.05em]">
            This page could not be found.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#596c69]">
            The address may be incomplete or the page may have moved. Use a verified
            TokProfile entry point below.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#087568] px-5 text-xs font-extrabold text-white hover:bg-[#09665c]"
            >
              Open video link checker
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/help"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#b7c9c5] bg-white px-5 text-xs font-extrabold text-[#294442] hover:border-[#087568]"
            >
              Visit Help
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
