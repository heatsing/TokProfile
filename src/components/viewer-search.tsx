import { ArrowRight, Link2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ViewerSearch({
  action = "/viewer",
  buttonLabel = "View",
  compact = false,
  defaultValue = "",
  helperText,
  mode,
}: {
  action?: string;
  buttonLabel?: string;
  compact?: boolean;
  defaultValue?: string;
  helperText?: string;
  mode?: string;
}) {
  const helperId = "viewer-search-helper";

  return (
    <form
      action={action}
      method="get"
      className={`border border-ink/15 bg-white p-2 shadow-lift ${
        compact ? "rounded-2xl" : "rounded-[22px]"
      }`}
    >
      {mode ? <input name="mode" type="hidden" value={mode} /> : null}
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
          <Link2 className="size-5 shrink-0 text-pine/50" />
          <span className="sr-only">TikTok username, profile URL or video URL</span>
          <input
            name="q"
            defaultValue={defaultValue}
            type="text"
            aria-describedby={helperText ? helperId : undefined}
            autoComplete="off"
            minLength={2}
            placeholder="@username or paste a public TikTok link"
            required
            className="h-12 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink/40"
          />
        </label>
        <Button type="submit" size="lg" className="h-12 sm:h-14">
          <Sparkles className="size-4 text-acid" />
          {buttonLabel}
          <ArrowRight className="size-4" />
        </Button>
      </div>
      {helperText ? (
        <p id={helperId} className="px-3 pb-1 pt-2 text-xs text-ink/50 sm:px-4">
          {helperText}
        </p>
      ) : null}
    </form>
  );
}
