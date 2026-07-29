import { AlertTriangle, CheckCircle2, Database, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { TikTokToolResult } from "@/types/tiktok";

export function ToolResultRenderer({ result }: { result: TikTokToolResult }) {
  if (!result.ok) {
    return (
      <section
        aria-labelledby="tool-error-title"
        className="rounded-[24px] border border-amber-500/25 bg-amber-50 p-6 sm:p-8"
      >
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-amber-700">
            <AlertTriangle className="size-5" />
          </span>
          <div>
            <Badge className="border border-amber-700/20 bg-white text-amber-800">
              {result.error.code.replaceAll("_", " ")}
            </Badge>
            <h2
              id="tool-error-title"
              className="mt-4 font-display text-2xl font-extrabold"
            >
              We could not prepare this result.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink/60">
              {result.error.message}
            </p>
            {result.error.retryable ? (
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-ink/55">
                <RotateCcw className="size-3.5" />
                Check the link and try again.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="tool-result-title"
      className="rounded-[24px] border border-ink/10 bg-white p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand text-pine">
          <CheckCircle2 className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-pine">
            {result.view.eyebrow}
          </p>
          <h2
            id="tool-result-title"
            className="mt-1 break-words font-display text-2xl font-extrabold"
          >
            {result.view.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink/55">
            {result.view.description}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {result.view.sections.map((section) => (
          <section key={section.title} className="rounded-2xl bg-sand p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <Database className="size-4 text-pine" />
              {section.title}
            </h3>
            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              {section.fields.map((field) => (
                <div key={field.label} className="min-w-0">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ink/40">
                    {field.label}
                  </dt>
                  <dd className="mt-1 break-words text-sm text-ink/75">{field.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </section>
  );
}
