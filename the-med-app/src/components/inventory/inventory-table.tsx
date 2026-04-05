"use client";

import { useState } from "react";
import type { InventoryUnit } from "@/data/types";
import { StatusChip } from "@/components/shared/status-chip";
import { formatEgp, formatNumber } from "@/lib/format";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

export function InventoryTable({ units }: { units: InventoryUnit[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-left">
            <th className="px-3 py-2.5 font-medium text-muted-foreground w-8"></th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">Unit Code</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">Building</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">Type</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">BR</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">Area</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">Floor</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">View</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground text-right">Price</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground text-right">Price/sqm</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">Status</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">Release</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground text-right">Days</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">Premium</th>
            <th className="px-3 py-2.5 font-medium text-muted-foreground">Flag</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u) => (
            <>
              <tr
                key={u.id}
                className="border-b cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedId(expandedId === u.id ? null : u.id)}
              >
                <td className="px-3 py-2.5">
                  {expandedId === u.id ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </td>
                <td className="px-3 py-2.5 font-medium">{u.id}</td>
                <td className="px-3 py-2.5">{u.building}</td>
                <td className="px-3 py-2.5">{u.unitType}</td>
                <td className="px-3 py-2.5">{u.bedrooms}</td>
                <td className="px-3 py-2.5">{u.areaSqm} sqm</td>
                <td className="px-3 py-2.5">{u.floor}</td>
                <td className="px-3 py-2.5">{u.view}</td>
                <td className="px-3 py-2.5 text-right">{formatEgp(u.priceEgp)}</td>
                <td className="px-3 py-2.5 text-right">{formatNumber(u.pricePerSqm)}</td>
                <td className="px-3 py-2.5"><StatusChip status={u.status} /></td>
                <td className="px-3 py-2.5"><StatusChip status={u.releaseState} /></td>
                <td className="px-3 py-2.5 text-right">{u.daysOnMarket}</td>
                <td className="px-3 py-2.5 text-xs">{u.premiumClass}</td>
                <td className="px-3 py-2.5">
                  {u.recommendationFlag !== "None" && (
                    <StatusChip status={u.recommendationFlag} />
                  )}
                </td>
              </tr>
              {expandedId === u.id && (
                <tr key={`${u.id}-detail`} className="bg-muted/20">
                  <td colSpan={15} className="px-6 py-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-xs text-muted-foreground">Cluster</span>
                        <p className="font-medium">{u.cluster}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Orientation</span>
                        <p className="font-medium">{u.orientation}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Finishing</span>
                        <p className="font-medium">{u.finishing}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Payment Plan</span>
                        <p className="font-medium">{u.paymentPlan}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Inquiry Trend</span>
                        <p className="font-medium">{u.inquiryTrend}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Reservation Trend</span>
                        <p className="font-medium">{u.reservationTrend}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Last Simulation</span>
                        <p className="font-medium">{u.lastSimulationTouch}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Link
                        href="/simulation"
                        className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
                      >
                        Open in Simulation
                      </Link>
                      <Link
                        href="/recommendations/rec-001"
                        className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                      >
                        View Recommendation
                      </Link>
                      <Link
                        href="/world-model"
                        className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                      >
                        View in World Model
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
