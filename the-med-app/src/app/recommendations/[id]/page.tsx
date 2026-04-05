"use client";

import { simulationSeed, decisionLogSeed } from "@/data";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusChip } from "@/components/shared/status-chip";
import { MetricStat } from "@/components/shared/metric-stat";
import { formatEgp } from "@/lib/format";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RecommendationDetailPage() {
  const router = useRouter();
  const rec = simulationSeed.recommendation;
  const scenarios = simulationSeed.scenarios;
  const detail = decisionLogSeed.detailPanels["log-001"];
  const [notes, setNotes] = useState("");

  const handleApprove = () => {
    toast.success("Recommendation approved successfully");
    setTimeout(() => router.push("/decisions"), 1500);
  };

  const handleReject = () => {
    toast.error("Recommendation rejected");
    setTimeout(() => router.push("/decisions"), 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={rec.title}
        subtitle={`Scope: Phase 1 / D4 + E2 / 2BR + 1BR standard inventory`}
        actions={
          <div className="flex items-center gap-2">
            <StatusChip status="Recommended" />
            <Link href="/world-model" className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-muted">
              View World Model
            </Link>
          </div>
        }
      />

      {/* Summary */}
      <SectionCard>
        <p className="text-sm leading-relaxed">{rec.body}</p>
      </SectionCard>

      {/* Expected Outcomes */}
      <SectionCard title="Expected Outcomes">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="rounded-lg border p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Revenue Impact</p>
            <p className="text-2xl font-bold text-emerald-600">+{rec.upliftRevenuePct}%</p>
            <p className="text-xs text-muted-foreground mt-1">uplift projected</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Sell-Through</p>
            <p className="text-2xl font-bold text-blue-600">{rec.fasterSelloutMonths}m</p>
            <p className="text-xs text-muted-foreground mt-1">faster sellout</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Inventory Health</p>
            <p className="text-2xl font-bold text-indigo-600">-{rec.leftoverReductionUnits}</p>
            <p className="text-xs text-muted-foreground mt-1">leftover units</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Premium Position</p>
            <p className="text-2xl font-bold text-violet-600">{rec.premiumPositioningPreserved ? "Preserved" : "At Risk"}</p>
            <p className="text-xs text-muted-foreground mt-1">premium positioning</p>
          </div>
        </div>
      </SectionCard>

      {/* Drivers */}
      {detail && (
        <SectionCard title="Drivers">
          <ol className="space-y-2">
            {detail.rationale.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ol>
        </SectionCard>
      )}

      {/* Constraint Check */}
      {detail && (
        <SectionCard title="Constraint Check">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Constraint</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {detail.constraintCheck.map((c) => (
                  <tr key={c.label} className="border-b">
                    <td className="px-3 py-2">{c.label}</td>
                    <td className="px-3 py-2">
                      <StatusChip status={c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* Alternatives */}
      <SectionCard title="Alternatives Considered">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Strategy</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Revenue</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Sellout</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Leftover</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Cashflow</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {scenarios
                .sort((a, b) => a.rank - b.rank)
                .map((s) => (
                  <tr key={s.id} className={`border-b ${s.tag === "Recommended" ? "bg-primary/5" : ""}`}>
                    <td className="px-3 py-2 font-medium">
                      {s.name}
                      {s.tag === "Recommended" && <StatusChip status="Recommended" className="ml-2" />}
                    </td>
                    <td className="px-3 py-2 text-right">{formatEgp(s.revenue6m)}</td>
                    <td className="px-3 py-2 text-right">{s.selloutMonths}m</td>
                    <td className="px-3 py-2 text-right">{s.leftoverUnits}</td>
                    <td className="px-3 py-2 text-right">{s.cashflowScore}/100</td>
                    <td className="px-3 py-2"><StatusChip status={s.confidence} /></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Approval */}
      <SectionCard title="Approval">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Notes</label>
            <textarea
              className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              rows={3}
              placeholder="Add notes or override reason..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleApprove}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Confirm Approval
            </button>
            <button
              onClick={handleReject}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Confirm Rejection
            </button>
            <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
              Rerun
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
