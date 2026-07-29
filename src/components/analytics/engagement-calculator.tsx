"use client";

import { useState, type FormEvent } from "react";
import { Calculator, Equal, Info, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  calculateFollowerEngagementRate,
  type EngagementRateEstimate,
} from "@/services/tiktok/analytics/engagement-calculator";

const fields = [
  { key: "followers", label: "Followers", placeholder: "25000" },
  { key: "averageLikes", label: "Average likes per post", placeholder: "1200" },
  { key: "averageComments", label: "Average comments per post", placeholder: "80" },
  { key: "averageShares", label: "Average shares per post", placeholder: "40" },
] as const;

type FormValues = Record<(typeof fields)[number]["key"], string>;

const emptyValues: FormValues = {
  averageComments: "",
  averageLikes: "",
  averageShares: "",
  followers: "",
};

export function EngagementCalculator() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [result, setResult] = useState<EngagementRateEstimate>();
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const nextResult = calculateFollowerEngagementRate({
        averageComments: Number(values.averageComments),
        averageLikes: Number(values.averageLikes),
        averageShares: Number(values.averageShares),
        followers: Number(values.followers),
      });
      setResult(nextResult);
    } catch {
      setResult(undefined);
      setError("Enter a follower count above zero and non-negative metric values.");
    }
  }

  function reset() {
    setValues(emptyValues);
    setResult(undefined);
    setError("");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[26px] border border-ink/10 bg-white p-5 shadow-lift sm:p-7"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Your inputs
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold">
              Calculate by followers
            </h2>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-acid">
            <Calculator className="size-5" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.key} className="grid gap-2 text-sm font-bold">
              {field.label}
              <input
                inputMode="decimal"
                min={field.key === "followers" ? "1" : "0"}
                name={field.key}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
                placeholder={field.placeholder}
                required
                step="any"
                type="number"
                value={values[field.key]}
                className="h-12 rounded-2xl border border-ink/15 bg-cream px-4 font-normal outline-none transition focus:border-pine focus:ring-2 focus:ring-acid/60"
              />
            </label>
          ))}
        </div>

        {error ? (
          <p role="alert" className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-800">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button className="sm:flex-1" size="lg" type="submit">
            <Equal className="size-4" />
            Calculate estimate
          </Button>
          <Button onClick={reset} size="lg" type="button" variant="outline">
            <RotateCcw className="size-4" />
            Reset
          </Button>
        </div>
      </form>

      <section
        aria-live="polite"
        aria-label="Estimated engagement rate result"
        className="rounded-[26px] border border-ink/10 bg-ink p-6 text-white sm:p-8"
      >
        <div className="flex flex-wrap gap-2">
          <Badge className="border-white/20 bg-white/10 text-white">Estimated</Badge>
          <Badge className="border-white/20 bg-white/10 text-white">
            Not official TikTok data
          </Badge>
        </div>

        <p className="mt-9 text-sm text-white/55">Estimated engagement rate</p>
        <p className="mt-2 font-display text-6xl font-extrabold tracking-[-0.06em] text-acid sm:text-7xl">
          {result ? `${result.rate.toFixed(2)}%` : "—"}
        </p>
        <p className="mt-4 max-w-lg text-sm leading-6 text-white/60">
          {result
            ? "This estimate uses only the values you entered. It is not a benchmark, prediction or value supplied by TikTok."
            : "Enter your own averages to produce an estimate. TokLens does not prefill or invent account metrics."}
        </p>

        <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-acid">
            <Info className="size-4" />
            Formula
          </div>
          <p className="mt-3 font-mono text-sm leading-6 text-white/80">
            (Average likes + Average comments + Average shares) ÷ Followers × 100
          </p>
          {result ? (
            <p className="mt-3 border-t border-white/10 pt-3 font-mono text-xs text-white/55">
              {result.substitution} = {result.rate.toFixed(2)}%
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
