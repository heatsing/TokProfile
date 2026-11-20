import Link from "next/link";
import { ArrowRight, Clock3, ShieldCheck } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export interface ToolStatusPageProps {
  description: string;
  expectedResult: string;
  inputLabel: string;
  title: string;
}

export function ToolStatusPage({
  description,
  expectedResult,
  inputLabel,
  title,
}: ToolStatusPageProps) {
  return (
    <main className="min-h-screen bg-white text-[#24211f]">
      <SiteHeader />

      <section className="bg-[#e66f13] px-4 py-12 text-center text-white sm:py-16">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-white/80">
          TokProfile tool status
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-[-0.035em]">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
          {description}
        </p>
      </section>

      <div className="mx-auto w-[calc(100%-2rem)] max-w-[820px] py-10 sm:w-[calc(100%-3rem)] sm:py-14">
        <section className="rounded-lg border border-[#eadfd8] bg-[#fffaf7] p-5 sm:p-7">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#fff0e5] text-[#a13c0d]">
              <Clock3 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-bold">Live result not connected yet</h2>
              <p className="mt-2 text-sm leading-6 text-[#625955]">
                TokProfile does not currently accept {inputLabel} or return{" "}
                {expectedResult}. This page is available so navigation stays stable while
                the verified provider and end-to-end delivery flow are completed.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#e8e2de] p-5">
            <ShieldCheck className="size-5 text-[#a13c0d]" aria-hidden="true" />
            <h2 className="mt-4 text-base font-bold">What we will verify first</h2>
            <p className="mt-2 text-sm leading-6 text-[#625955]">
              A tool becomes active only after its public-data source, error handling and
              final user result have passed end-to-end testing.
            </p>
          </div>
          <div className="rounded-lg border border-[#e8e2de] p-5">
            <h2 className="text-base font-bold">Available now</h2>
            <p className="mt-2 text-sm leading-6 text-[#625955]">
              The homepage can validate the structure of a full public TikTok video URL.
              It does not fetch or save media.
            </p>
            <Link
              href="/#download"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#a13c0d]"
            >
              Open the video link checker
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <p className="mt-8 text-xs leading-5 text-[#756d68]">
          Need help with supported inputs or current limitations?{" "}
          <Link
            href="/help"
            className="font-bold text-[#a13c0d] underline underline-offset-4"
          >
            Read TokProfile Help
          </Link>
          .
        </p>
      </div>

      <SiteFooter />
    </main>
  );
}
