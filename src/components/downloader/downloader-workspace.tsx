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
    <section aria-label="TikTok video link check" className="text-left">
      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="downloader-url">
          TikTok video link
        </label>
        <div className="grid gap-1.5 rounded-[5px] bg-white p-[5px] sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="flex min-h-[42px] min-w-0 items-center rounded-[3px] bg-white focus-within:shadow-[inset_0_0_0_2px_#eaa27e]">
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
              className="h-[42px] min-w-0 flex-1 bg-transparent px-3 text-sm text-[#24211f] outline-none placeholder:text-[#68605c]"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="h-[38px] rounded-[3px] bg-[#d652c8] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#bd42b1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Paste
            </button>
          </div>
          <button
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[3px] bg-[#2563eb] px-6 text-[13px] font-bold text-white transition-colors hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={state.status === "loading"}
            type="submit"
          >
            {state.status === "loading" ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Download className="size-4" aria-hidden="true" />
            )}
            {state.status === "loading" ? "Checking…" : "Check video link"}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {pasteMessage}
        </p>

        <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs leading-5 text-[#fff5ee]">
          <input
            className="mt-0.5 size-4 shrink-0 accent-[#26221f]"
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
          <div className="mt-4 flex gap-3 rounded-[5px] border border-[#f1c5ad] bg-[#fff7f1] p-4 text-left">
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
          <div className="mt-4 rounded-[5px] bg-white p-4 text-left text-[#24211f]">
            <div className="flex items-center gap-2 text-[13px] font-extrabold text-[#a13c0d]">
              <CheckCircle2 className="size-5" aria-hidden="true" />
              Valid public TikTok video URL
            </div>
            <dl className="mt-4 grid gap-3 rounded-[4px] bg-[#fff4ed] p-4 sm:grid-cols-2">
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

            <div className="mt-3 rounded-lg border border-[#dbe6e3] p-4">
              <p className="text-[13px] font-extrabold text-[#172a2d]">
                URL validation complete
              </p>
              <p className="mt-1 text-xs leading-5 text-[#657572]">
                This result does not fetch the source video or create a downloadable file.
              </p>
            </div>

            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#657572]">
              <Clock3
                className="mt-0.5 size-3.5 shrink-0 text-[#a13c0d]"
                aria-hidden="true"
              />
              No media bytes are requested or stored by the current checker.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
