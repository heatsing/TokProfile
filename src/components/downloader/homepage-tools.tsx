import Link from "next/link";
import {
  BookOpen,
  Calculator,
  CircleHelp,
  Download,
  Eye,
  Link2,
  Music2,
  UserRound,
} from "lucide-react";

import { homepageTools } from "@/config/public-navigation";

const icons = {
  calculator: Calculator,
  download: Download,
  eye: Eye,
  guides: BookOpen,
  help: CircleHelp,
  link: Link2,
  music: Music2,
  profile: UserRound,
} as const;

export function HomepageTools() {
  return (
    <section id="tools" className="scroll-mt-20 border-b border-[#dbe6e3] bg-[#edf8fc]">
      <div className="container max-w-[1200px] py-10 sm:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#087568]">
              TokProfile tools
            </p>
            <h2 className="mt-2 font-display text-xl font-extrabold tracking-[-0.035em] sm:text-2xl">
              Choose what you want to do
            </h2>
          </div>
          <p className="max-w-lg text-xs leading-5 text-[#5d706c]">
            Available tools open now. Planned tools stay clearly marked until their real
            result has passed end-to-end testing.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {homepageTools.map((tool) => {
            const Icon = icons[tool.icon];
            const content = (
              <>
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-lg border ${
                    tool.status === "live"
                      ? "border-[#bfe6dc] bg-[#effcf7] text-[#087568]"
                      : "border-[#f2dcc2] bg-[#fff7ee] text-[#e85d04]"
                  }`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-sm font-extrabold leading-5 text-[#172a2d]">
                    {tool.label}
                    {tool.status === "planned" ? (
                      <span className="rounded-full bg-[#fff3e5] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-[#b84b08]">
                        Coming soon
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-4 text-[#60726f]">
                    {tool.description}
                  </span>
                </span>
              </>
            );

            return "href" in tool ? (
              <Link
                key={tool.label}
                href={tool.href}
                className="flex min-h-28 items-start gap-4 rounded-xl border border-[#adc3cf] bg-white/70 p-4 shadow-[0_3px_8px_rgba(30,67,88,0.09)] transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-[#087568] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087568]"
              >
                {content}
              </Link>
            ) : (
              <div
                key={tool.label}
                aria-disabled="true"
                className="flex min-h-28 items-start gap-4 rounded-xl border border-[#c7d6dd] bg-white/45 p-4"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
