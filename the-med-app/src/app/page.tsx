"use client";

import { useState } from "react";
import { inventorySeed } from "@/data";
import { PageHeader } from "@/components/shared/page-header";
import { KpiCard } from "@/components/shared/kpi-card";
import { FilterBar } from "@/components/inventory/filter-bar";
import { InventoryTable } from "@/components/inventory/inventory-table";
import { InventoryAnalytics } from "@/components/inventory/inventory-analytics";
import Link from "next/link";

export default function InventoryPage() {
  const [filters, setFilters] = useState({
    search: "",
    unitType: "",
    status: "",
    releaseState: "",
  });

  const filtered = inventorySeed.units.filter((u) => {
    if (filters.search && !u.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.unitType && u.unitType !== filters.unitType) return false;
    if (filters.status && u.status !== filters.status) return false;
    if (filters.releaseState && u.releaseState !== filters.releaseState) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        subtitle="People & Places — The Med | Project inventory, status, pricing, and release context"
        actions={
          <>
            <Link
              href="/simulation"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Open in Simulation
            </Link>
            <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
              Queue Overnight Run
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {inventorySeed.kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      <InventoryTable units={filtered} />

      <InventoryAnalytics />
    </div>
  );
}
