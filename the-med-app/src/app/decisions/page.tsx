"use client";

import { useState } from "react";
import { decisionLogSeed } from "@/data";
import { PageHeader } from "@/components/shared/page-header";
import { StatusChip } from "@/components/shared/status-chip";
import { formatDate } from "@/lib/format";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DecisionsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const rows = decisionLogSeed.rows.filter((r) => {
    if (typeFilter && r.decisionType !== typeFilter) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });

  const sel = "rounded-lg border bg-card px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Decision Log"
        subtitle="Trace of recommendations, approvals, overrides, and observed outcomes"
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select className={sel} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          {decisionLogSeed.filters.decisionTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select className={sel} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {decisionLogSeed.filters.statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left">
              <th className="px-3 py-2.5 font-medium text-muted-foreground w-8"></th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Date</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Title</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Scope</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Type</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Recommended</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Final</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Owner</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Confidence</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const detail = decisionLogSeed.detailPanels[row.id];
              return (
                <>
                  <tr
                    key={row.id}
                    className="border-b cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
                  >
                    <td className="px-3 py-2.5">
                      {expandedId === row.id ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{formatDate(row.date)}</td>
                    <td className="px-3 py-2.5 font-medium">{row.title}</td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground max-w-[200px] truncate">{row.scope}</td>
                    <td className="px-3 py-2.5"><StatusChip status={row.decisionType} /></td>
                    <td className="px-3 py-2.5 text-xs">{row.recommendedAction}</td>
                    <td className="px-3 py-2.5 text-xs">{row.finalAction}</td>
                    <td className="px-3 py-2.5 text-xs">{row.owner}</td>
                    <td className="px-3 py-2.5"><StatusChip status={row.confidence} /></td>
                    <td className="px-3 py-2.5"><StatusChip status={row.outcomeStatus} /></td>
                  </tr>
                  {expandedId === row.id && (
                    <tr key={`${row.id}-detail`} className="bg-muted/20">
                      <td colSpan={10} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {detail ? (
                            <>
                              <div>
                                <h4 className="text-xs font-semibold text-muted-foreground mb-2">RATIONALE</h4>
                                <ul className="space-y-1">
                                  {detail.rationale.map((r, i) => (
                                    <li key={i} className="text-xs flex items-start gap-2">
                                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-muted-foreground mb-2">CONSTRAINT CHECK</h4>
                                <div className="space-y-1">
                                  {detail.constraintCheck.map((c) => (
                                    <div key={c.label} className="flex items-center justify-between text-xs">
                                      <span>{c.label}</span>
                                      <StatusChip status={c.status} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-muted-foreground mb-2">LINKED WORLD MODEL</h4>
                                <div className="flex flex-wrap gap-1">
                                  {detail.linkedWorldModelNodes.map((n) => (
                                    <Link
                                      key={n}
                                      href="/world-model"
                                      className="rounded bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 hover:bg-indigo-100"
                                    >
                                      {n}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="col-span-3">
                              <p className="text-xs text-muted-foreground mb-1"><b>Status:</b> {row.status}</p>
                              {row.notes && <p className="text-xs text-muted-foreground"><b>Notes:</b> {row.notes}</p>}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
