"use client";

import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  LoaderCircle,
} from "lucide-react";

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
  const [url, setUrl] = useState("");
  const [pasteMessage, setPasteMessage] = useState("");

  async function handlePaste() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setUrl(clipboardText.trim());
      setPasteMessage(clipboardText.trim() ? "Link pasted" : "Clipboard is empty");
    } catch {
      setPasteMessage("Paste the link into the field");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
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
    <section
      aria-label="TikTok video download check"
      className="rounded-xl border border-[#d9e3e1] bg-white p-5 shadow-[0_8px_30px_rgba(25,70,65,0.05)] sm:p-6"
    >
      <form onSubmit={handleSubmit}>
        <label
          className="block text-[13px] font-extrabold text-[#172a2d]"
          htmlFor="downloader-url"
        >
          TikTok video link
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <div className="flex min-h-[52px] flex-1 items-center rounded-lg border border-[#aebfbc] bg-white p-1 focus-within:border-[#087568] focus-within:ring-2 focus-within:ring-[#087568]/15">
            <input
              id="downloader-url"
              name="url"
              autoComplete="off"
              maxLength={2_048}
              placeholder="Paste a TikTok video link"
              required
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-[#172a2d] outline-none placeholder:text-[#71807e]"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="h-10 rounded-md bg-[#edf5f3] px-4 text-[13px] font-extrabold text-[#087568] transition-colors hover:bg-[#e0efeb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087568]"
            >
              Paste
            </button>
          </div>
          <button
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-[#087568] px-6 text-[13px] font-extrabold text-white transition-colors hover:bg-[#075f55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087568] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-40"
            disabled={state.status === "loading"}
            type="submit"
          >
            {state.status === "loading" ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Download className="size-4" aria-hidden="true" />
            )}
            {state.status === "loading" ? "Checking…" : "Check video"}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {pasteMessage}
        </p>

        <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs leading-5 text-[#5c6c6a]">
          <input
            className="mt-0.5 size-4 shrink-0 accent-[#087568]"
            name="rightsConfirmed"
            required
            type="checkbox"
          />
          <span>
            I own this video or have permission from the rights holder to save it.
          </span>
        </label>
      </form>

      <div aria-live="polite">
        {state.status === "error" ? (
          <div className="mt-5 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-left">
            <AlertTriangle
              className="mt-0.5 size-5 shrink-0 text-amber-700"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                {state.error.code.replaceAll("_", " ")}
              </p>
              <p className="mt-1 text-[13px] leading-5 text-amber-950">
                {state.error.message}
              </p>
            </div>
          </div>
        ) : null}

        {state.status === "success" ? (
          <div className="mt-5 border-t border-[#dbe6e3] pt-5 text-left">
            <div className="flex items-center gap-2 text-[13px] font-extrabold text-[#087568]">
              <CheckCircle2 className="size-5" aria-hidden="true" />
              Valid public TikTok video URL
            </div>
            <dl className="mt-4 grid gap-3 rounded-lg bg-[#f1f8f6] p-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[#657572]">
                  Creator
                </dt>
                <dd className="mt-1 text-[13px] font-bold text-[#172a2d]">
                  {state.data.authorUsername
                    ? `@${state.data.authorUsername}`
                    : "Unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[#657572]">
                  Video ID
                </dt>
                <dd className="mt-1 break-all text-[13px] text-[#172a2d]">
                  {state.data.contentId}
                </dd>
              </div>
            </dl>

            {state.data.options.map((option) => (
              <div
                key={option.id}
                className="mt-3 flex flex-col gap-3 rounded-lg border border-[#dbe6e3] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-[13px] font-extrabold text-[#172a2d]">
                    {option.label} · {option.format}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#657572]">
                    {option.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#eef4f2] px-3 py-1.5 text-xs font-bold text-[#526663]">
                  Not available
                </span>
              </div>
            ))}

            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#657572]">
              <Clock3
                className="mt-0.5 size-3.5 shrink-0 text-[#087568]"
                aria-hidden="true"
              />
              Temporary media expires within {state.data.storagePolicy.retentionMinutes}{" "}
              minutes and is deleted after delivery.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
