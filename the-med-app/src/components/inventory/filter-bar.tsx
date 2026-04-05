"use client";

import { inventorySeed } from "@/data";

export function FilterBar({
  filters,
  onChange,
}: {
  filters: {
    search: string;
    unitType: string;
    status: string;
    releaseState: string;
  };
  onChange: (f: typeof filters) => void;
}) {
  const sel =
    "rounded-lg border bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search unit code..."
        className="rounded-lg border bg-card px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />
      <select
        className={sel}
        value={filters.unitType}
        onChange={(e) => onChange({ ...filters, unitType: e.target.value })}
      >
        <option value="">All Types</option>
        {inventorySeed.filters.unitTypes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <select
        className={sel}
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
      >
        <option value="">All Statuses</option>
        {inventorySeed.filters.statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select
        className={sel}
        value={filters.releaseState}
        onChange={(e) => onChange({ ...filters, releaseState: e.target.value })}
      >
        <option value="">All Release States</option>
        {inventorySeed.filters.releaseStates.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
    </div>
  );
}
