export function formatEgp(value: number): string {
  if (value >= 1_000_000) {
    return `EGP ${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `EGP ${(value / 1_000).toFixed(0)}K`;
  }
  return `EGP ${value.toLocaleString()}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString();
}

export function formatPct(value: number): string {
  return `${value}%`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatKpiValue(value: number, prefix?: string, suffix?: string): string {
  let str = "";
  if (prefix) str += prefix;
  if (value >= 1_000_000) {
    str += (value / 1_000_000).toFixed(1) + "M";
  } else if (value >= 1_000) {
    str += (value / 1_000).toFixed(1) + "K";
  } else {
    str += value.toLocaleString();
  }
  if (suffix) str += suffix;
  return str;
}
