import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink/15 bg-white/70 px-3 py-1 text-xs font-semibold text-ink",
        className,
      )}
      {...props}
    />
  );
}
