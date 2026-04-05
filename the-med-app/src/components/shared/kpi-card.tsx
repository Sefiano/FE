import { formatKpiValue } from "@/lib/format";
import type { LabelValue } from "@/data/types";

export function KpiCard({ kpi }: { kpi: LabelValue }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{kpi.label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">
        {formatKpiValue(kpi.value, kpi.prefix, kpi.suffix)}
      </p>
    </div>
  );
}
