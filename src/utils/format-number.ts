const compactNumberFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 1,
  notation: "compact",
});

const exactNumberFormatter = new Intl.NumberFormat("en");

export function formatCompactNumber(value: number): string {
  return compactNumberFormatter.format(value);
}

export function formatExactNumber(value: number): string {
  return exactNumberFormatter.format(value);
}
