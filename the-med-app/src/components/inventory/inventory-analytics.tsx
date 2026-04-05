"use client";

import { inventorySeed } from "@/data";
import { SectionCard } from "@/components/shared/section-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  CartesianGrid,
} from "recharts";

const COLORS = ["#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0", "#3b82f6", "#6366f1"];

function MiniBar({ data, color = "#64748b" }: { data: { label: string; value: number }[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function MiniPie({ data }: { data: { label: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={60} innerRadius={30}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function InventoryAnalytics() {
  const a = inventorySeed.analytics;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SectionCard title="Status Distribution">
        <MiniBar data={a.statusDistribution} color="#64748b" />
      </SectionCard>
      <SectionCard title="Unit Mix by Type">
        <MiniPie data={a.unitMixByType} />
      </SectionCard>
      <SectionCard title="Price / sqm by Type">
        <MiniBar data={a.pricePerSqmByType} color="#6366f1" />
      </SectionCard>
      <SectionCard title="Aging Buckets">
        <MiniBar data={a.agingBuckets} color="#f59e0b" />
      </SectionCard>
      <SectionCard title="Premium Exposure">
        <MiniBar data={a.premiumExposure} color="#3b82f6" />
      </SectionCard>
      <SectionCard title="Payment Plan Mix">
        <MiniPie data={a.paymentPlanMix} />
      </SectionCard>
      <SectionCard title="Simulation Watchlist">
        <div className="space-y-2">
          {inventorySeed.watchlist.map((w) => (
            <div key={w.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    w.severity === "High" ? "bg-red-500" : w.severity === "Medium" ? "bg-amber-500" : "bg-slate-400"
                  }`}
                />
                <span className="text-xs">{w.signal}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Revenue vs Sell-Through">
        <ResponsiveContainer width="100%" height={160}>
          <ScatterChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="sellthroughMonths" name="Months" tick={{ fontSize: 11 }} axisLine={false} />
            <YAxis dataKey="revenue" name="Revenue" tick={{ fontSize: 11 }} axisLine={false} hide />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
            <Scatter
              data={a.revenueFrontierPreview}
              fill="#6366f1"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
}
