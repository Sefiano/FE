"use client";

import { readinessSeed } from "@/data";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusChip } from "@/components/shared/status-chip";
import { formatPct } from "@/lib/format";
import { CheckCircle2, XCircle, Minus } from "lucide-react";

function ProgressBar({ value, color = "bg-primary" }: { value: number; color?: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-muted">
      <div
        className={`h-2 rounded-full ${color} transition-all`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}

function BoolIcon({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
  ) : (
    <XCircle className="h-4 w-4 text-red-400" />
  );
}

export default function ReadinessPage() {
  const s = readinessSeed.summary;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Readiness"
        subtitle="Data, logic, and constraint coverage required for production-grade decision loops"
      />

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border p-5 text-center">
          <p className="text-4xl font-bold">{formatPct(readinessSeed.context.overallReadinessScore)}</p>
          <p className="text-sm text-muted-foreground mt-1">Overall Readiness</p>
          <ProgressBar value={readinessSeed.context.overallReadinessScore} color="bg-indigo-500" />
        </div>
        <div className="rounded-xl border p-5 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Seeded Nodes</span><span className="font-semibold">{s.seededNodes}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Validated</span><span className="font-semibold">{s.validatedNodes}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Missing</span><span className="font-semibold text-red-600">{s.missingClientNodes}</span></div>
        </div>
        <div className="rounded-xl border p-5 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Logic Coverage</span><span className="font-semibold">{formatPct(s.logicCoveragePct)}</span></div>
          <ProgressBar value={s.logicCoveragePct} color="bg-amber-500" />
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Constraint Coverage</span><span className="font-semibold">{formatPct(s.constraintCoveragePct)}</span></div>
          <ProgressBar value={s.constraintCoveragePct} color="bg-emerald-500" />
        </div>
        <div className="rounded-xl border p-5 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Decision Readiness</span><span className="font-semibold">{formatPct(s.decisionReadinessPct)}</span></div>
          <ProgressBar value={s.decisionReadinessPct} color="bg-blue-500" />
        </div>
      </div>

      {/* Data Readiness */}
      <SectionCard title="Data Readiness">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Data Source</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Completeness</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Source</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Required For</th>
              </tr>
            </thead>
            <tbody>
              {readinessSeed.dataReadiness.map((d) => (
                <tr key={d.id} className="border-b">
                  <td className="px-3 py-2 font-medium">{d.name}</td>
                  <td className="px-3 py-2"><StatusChip status={d.status} /></td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <ProgressBar value={d.completenessPct} color={d.completenessPct >= 80 ? "bg-emerald-500" : d.completenessPct >= 50 ? "bg-amber-500" : "bg-red-500"} />
                      <span className="text-xs font-medium">{d.completenessPct}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{d.source}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {d.requiredFor.map((r) => (
                        <span key={r} className="rounded bg-muted px-1.5 py-0.5 text-xs">{r}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Logic Readiness */}
      <SectionCard title="Logic Readiness">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {readinessSeed.logicReadiness.map((l) => (
            <div key={l.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">{l.name}</h4>
                <StatusChip status={l.status} />
              </div>
              <ProgressBar value={l.readinessPct} color="bg-indigo-500" />
              <p className="mt-2 text-xs text-muted-foreground">{l.note}</p>
              <p className="text-xs font-medium mt-1">{l.readinessPct}% ready</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Decision Type Readiness */}
      <SectionCard title="Decision Type Readiness">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Decision Type</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Readiness</th>
                <th className="px-3 py-2 text-center font-medium text-muted-foreground">Simulation</th>
                <th className="px-3 py-2 text-center font-medium text-muted-foreground">Recommendation</th>
                <th className="px-3 py-2 text-center font-medium text-muted-foreground">Autonomy</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Missing Inputs</th>
              </tr>
            </thead>
            <tbody>
              {readinessSeed.decisionTypeReadiness.map((d) => (
                <tr key={d.id} className="border-b">
                  <td className="px-3 py-2 font-medium">{d.name}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <ProgressBar value={d.readinessPct} color="bg-blue-500" />
                      <span className="text-xs font-medium">{d.readinessPct}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center"><BoolIcon value={d.simulationPossibleNow} /></td>
                  <td className="px-3 py-2 text-center"><BoolIcon value={d.recommendationSafeNow} /></td>
                  <td className="px-3 py-2 text-center"><BoolIcon value={d.autonomyLater} /></td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {d.missingInputs.map((m) => (
                        <span key={m} className="rounded bg-red-50 px-1.5 py-0.5 text-xs text-red-700">{m}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* World Model Coverage */}
      <SectionCard title="World Model Coverage">
        <div className="space-y-3">
          {readinessSeed.worldModelReadiness.map((w) => (
            <div key={w.id} className="flex items-center gap-4">
              <span className="text-sm w-40 shrink-0">{w.category}</span>
              <div className="flex-1">
                <ProgressBar value={w.coveragePct} color={w.coveragePct >= 75 ? "bg-emerald-500" : w.coveragePct >= 50 ? "bg-amber-500" : "bg-red-500"} />
              </div>
              <span className="text-sm font-medium w-12 text-right">{w.coveragePct}%</span>
              <StatusChip status={w.status} />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Implementation Implications */}
      <SectionCard title="Implementation Implications">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {readinessSeed.implementationImplications.map((imp, i) => (
            <div
              key={imp.id}
              className={`rounded-xl border p-5 ${
                i === 0 ? "bg-emerald-50 border-emerald-200" : i === 1 ? "bg-blue-50 border-blue-200" : "bg-amber-50 border-amber-200"
              }`}
            >
              <h4 className="text-sm font-semibold mb-2">{imp.title}</h4>
              <p className="text-xs leading-relaxed text-muted-foreground">{imp.body}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
