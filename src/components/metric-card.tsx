import { ArrowUp, type LucideIcon } from "lucide-react";

export function MetricCard({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4">
      <div className="flex items-center justify-between text-ink/45">
        <Icon className="size-4" />
        <span className="flex items-center text-[11px] font-bold text-emerald-700">
          <ArrowUp className="size-3" /> {change}
        </span>
      </div>
      <p className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-1 text-xs text-ink/55">{label}</p>
    </div>
  );
}
