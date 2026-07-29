"use client";

import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  FileVideo2,
  Link2,
  LoaderCircle,
  LockKeyhole,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type {
  DownloaderErrorShape,
  DownloaderPreview,
  DownloaderPreviewResponse,
} from "@/services/tiktok/downloader/types";

type PreviewState =
  | { status: "idle" }
  | { status: "loading" }
  | { error: DownloaderErrorShape; status: "error" }
  | { data: DownloaderPreview; status: "success" };

export function DownloaderWorkspace() {
  const [state, setState] = useState<PreviewState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const url = String(formData.get("url") ?? "");
    const rightsConfirmed = formData.get("rightsConfirmed") === "on";

    setState({ status: "loading" });

    try {
      const response = await fetch("/api/tiktok-video-downloader/preview", {
        body: JSON.stringify({ rightsConfirmed, url }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await response.json()) as DownloaderPreviewResponse;

      setState(
        result.ok
          ? { data: result.data, status: "success" }
          : { error: result.error, status: "error" },
      );
    } catch {
      setState({
        error: {
          code: "INTERNAL_ERROR",
          message: "The preview service is unavailable. Please try again.",
        },
        status: "error",
      });
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[28px] border border-ink/10 bg-white p-5 shadow-lift sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
          Input
        </p>
        <h2 className="mt-3 font-display text-2xl font-extrabold">
          Paste a TikTok video URL
        </h2>
        <p className="mt-3 text-sm leading-6 text-ink/55">
          Profile pages, short links and non-TikTok domains are rejected.
        </p>

        <form className="mt-7" onSubmit={handleSubmit}>
          <label className="block text-sm font-bold" htmlFor="downloader-url">
            Public TikTok video URL
          </label>
          <div className="mt-2 flex min-h-14 items-center gap-3 rounded-2xl border border-ink/15 bg-cream px-4 focus-within:border-pine focus-within:ring-2 focus-within:ring-acid">
            <Link2 className="size-5 shrink-0 text-pine/50" aria-hidden="true" />
            <input
              id="downloader-url"
              name="url"
              autoComplete="off"
              maxLength={2_048}
              placeholder="https://www.tiktok.com/@creator/video/..."
              required
              type="url"
              className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink/35"
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-sand p-4 text-sm leading-6 text-ink/65">
            <input
              className="mt-1 size-4 accent-ink"
              name="rightsConfirmed"
              required
              type="checkbox"
            />
            <span>
              I own this content or have permission from the rights holder to save it.
            </span>
          </label>

          <Button
            className="mt-5 w-full"
            disabled={state.status === "loading"}
            size="lg"
            type="submit"
          >
            {state.status === "loading" ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Video className="size-4 text-acid" />
            )}
            {state.status === "loading" ? "Checking safely…" : "Preview video"}
          </Button>
        </form>
      </section>

      <section
        aria-live="polite"
        aria-labelledby="download-preview-title"
        className="rounded-[28px] border border-ink/10 bg-ink p-5 text-white sm:p-7"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-acid">
              Preview
            </p>
            <h2
              id="download-preview-title"
              className="mt-3 font-display text-2xl font-extrabold"
            >
              Video check
            </h2>
          </div>
          <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-acid">
            <FileVideo2 className="size-5" aria-hidden="true" />
          </span>
        </div>

        {state.status === "idle" ? (
          <div className="mt-8 rounded-2xl border border-dashed border-white/20 p-8 text-center">
            <LockKeyhole className="mx-auto size-6 text-acid" />
            <p className="mt-4 text-sm font-bold">Waiting for a validated URL</p>
            <p className="mt-2 text-xs leading-5 text-white/50">
              Nothing is fetched or stored before the security checks pass.
            </p>
          </div>
        ) : null}

        {state.status === "loading" ? (
          <div className="mt-8 space-y-3">
            <div className="h-20 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-28 animate-pulse rounded-2xl bg-white/10" />
          </div>
        ) : null}

        {state.status === "error" ? (
          <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
            <AlertTriangle className="size-6 text-amber-300" />
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-amber-200">
              {state.error.code.replaceAll("_", " ")}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">{state.error.message}</p>
          </div>
        ) : null}

        {state.status === "success" ? (
          <>
            <div className="mt-8 rounded-2xl bg-white/10 p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-acid">
                <CheckCircle2 className="size-4" />
                Valid TikTok video URL
              </div>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-white/40">
                    Creator
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {state.data.authorUsername
                      ? `@${state.data.authorUsername}`
                      : "Unavailable"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-white/40">
                    Video ID
                  </dt>
                  <dd className="mt-1 break-all text-sm">{state.data.contentId}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-acid">
                Download options
              </p>
              {state.data.options.map((option) => (
                <div
                  key={option.id}
                  className="mt-3 flex flex-col gap-4 rounded-2xl border border-white/15 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-bold">
                      {option.label} · {option.format}
                    </p>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-white/50">
                      {option.description}
                    </p>
                  </div>
                  <Button disabled variant="acid">
                    <Download className="size-4" />
                    Not available
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-white/45">
              <Clock3 className="size-3.5 text-acid" />
              Temporary media expires within {
                state.data.storagePolicy.retentionMinutes
              }{" "}
              minutes and is deleted after delivery.
            </p>
          </>
        ) : null}
      </section>
    </div>
  );
}
