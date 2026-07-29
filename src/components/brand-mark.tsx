import Link from "next/link";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="TokLens home"
      className={`inline-flex items-center gap-2.5 font-display text-xl font-extrabold tracking-[-0.04em] ${
        light ? "text-white" : "text-ink"
      }`}
    >
      <span
        className={`relative grid size-8 place-items-center rounded-[10px] ${
          light ? "bg-acid" : "bg-ink"
        }`}
      >
        <span
          className={`size-3 rounded-full border-[3px] ${
            light ? "border-ink" : "border-acid"
          }`}
        />
        <span
          className={`absolute right-1.5 top-1.5 size-1.5 rounded-full ${
            light ? "bg-ink" : "bg-white"
          }`}
        />
      </span>
      TokLens
    </Link>
  );
}
