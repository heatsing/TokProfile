"use client";

import { ClipboardPaste, Search } from "lucide-react";
import { useState, type FormEvent } from "react";

import { parseTikTokInput } from "@/services/tiktok/input-parser";

type InputKind = "video" | "story" | "username" | "profile";

const inputs = {
  video: {
    button: "Check video link",
    label: "TikTok video link",
    placeholder: "Paste a TikTok video link",
    hint: "Paste the full link to a TikTok video.",
    accepted: "video_url",
    unavailable: "The video link format is valid. MP3 conversion is unavailable.",
  },
  story: {
    button: "Check Story link",
    label: "TikTok Story link",
    placeholder: "Paste a TikTok Story link",
    hint: "Paste the full link to a TikTok Story.",
    accepted: "story_url",
    unavailable: "The Story link format is valid. Story downloads are unavailable.",
  },
  username: {
    button: "Check username",
    label: "TikTok username",
    placeholder: "@username",
    hint: "Enter a TikTok username such as @creator.",
    accepted: "username",
    unavailable: "The username format is valid. Live Story lookup is unavailable.",
  },
  profile: {
    button: "View profile",
    label: "TikTok username or profile link",
    placeholder: "@username or paste a public profile link",
    hint: "Use a TikTok username or public profile link.",
    accepted: "profile_url",
    unavailable: "",
  },
} as const;

export function ToolInput({
  kind,
  defaultValue = "",
}: {
  kind: InputKind;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);
  const input = inputs[kind];
  const profile = kind === "profile";

  async function paste() {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (text) setValue(text);
      setMessage(text ? "Pasted." : "Your clipboard is empty.");
    } catch {
      setMessage("Paste directly into the field.");
    }
    setInvalid(false);
  }

  function validate(event: FormEvent<HTMLFormElement>) {
    if (profile) return;
    event.preventDefault();
    try {
      if (parseTikTokInput(value).kind === input.accepted) {
        setMessage(input.unavailable);
        setInvalid(false);
        return;
      }
    } catch {
      // Show the same next step for malformed and unsupported input.
    }
    setMessage(input.hint);
    setInvalid(true);
  }

  return (
    <form
      action={profile ? "/profile-viewer" : undefined}
      method="get"
      onSubmit={validate}
    >
      <label className="sr-only" htmlFor="tool-input">
        {input.label}
      </label>
      <div className="grid gap-1.5 rounded-[5px] bg-white p-[5px] sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex min-h-[42px] min-w-0 items-center rounded-[3px] focus-within:shadow-[inset_0_0_0_2px_#eaa27e]">
          <input
            aria-describedby="tool-input-feedback"
            aria-invalid={invalid || undefined}
            autoComplete="off"
            className="h-[42px] min-w-0 flex-1 bg-transparent px-3 text-sm text-[#24211f] outline-none placeholder:text-[#68605c]"
            id="tool-input"
            inputMode={kind === "video" || kind === "story" ? "url" : "text"}
            maxLength={2_048}
            name={profile ? "q" : undefined}
            onChange={(event) => {
              setValue(event.target.value);
              setInvalid(false);
              setMessage("");
            }}
            placeholder={input.placeholder}
            required={profile}
            spellCheck={false}
            type="text"
            value={value}
          />
          <button
            className="inline-flex h-[38px] items-center gap-1.5 rounded-[3px] bg-[#9a306e] px-3 text-[13px] font-bold text-white hover:bg-[#7c2357]"
            onClick={paste}
            type="button"
          >
            <ClipboardPaste aria-hidden="true" className="size-4" />
            Paste
          </button>
        </div>
        <button
          className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[3px] bg-[#2563eb] px-5 text-[13px] font-bold text-white hover:bg-[#1d4ed8]"
          type="submit"
        >
          <Search aria-hidden="true" className="size-4" />
          {input.button}
        </button>
      </div>
      <p aria-live="polite" className="mt-2 text-sm leading-5" id="tool-input-feedback">
        {message}
      </p>
    </form>
  );
}
