import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  Available: "bg-emerald-100 text-emerald-800",
  Approved: "bg-emerald-100 text-emerald-800",
  Executed: "bg-emerald-100 text-emerald-800",
  "Outcome Observed": "bg-emerald-100 text-emerald-800",
  Pass: "bg-emerald-100 text-emerald-800",
  Strong: "bg-emerald-100 text-emerald-800",
  Reserved: "bg-amber-100 text-amber-800",
  Pending: "bg-amber-100 text-amber-800",
  "Outcome Pending": "bg-amber-100 text-amber-800",
  "Under Review": "bg-amber-100 text-amber-800",
  "Phased Hold": "bg-amber-100 text-amber-800",
  Partial: "bg-amber-100 text-amber-800",
  Sold: "bg-slate-200 text-slate-700",
  Held: "bg-orange-100 text-orange-800",
  Protected: "bg-blue-100 text-blue-800",
  "Simulation Candidate": "bg-blue-100 text-blue-800",
  Generated: "bg-blue-100 text-blue-800",
  Good: "bg-blue-100 text-blue-800",
  Recommended: "bg-indigo-100 text-indigo-800",
  Released: "bg-teal-100 text-teal-800",
  Unreleased: "bg-slate-100 text-slate-600",
  "Aging Risk": "bg-red-100 text-red-800",
  Rejected: "bg-red-100 text-red-800",
  Overridden: "bg-purple-100 text-purple-800",
  Configured: "bg-sky-100 text-sky-800",
  Imported: "bg-sky-100 text-sky-800",
  Seeded: "bg-violet-100 text-violet-800",
  Learned: "bg-cyan-100 text-cyan-800",
  Missing: "bg-red-100 text-red-700",
  Early: "bg-orange-100 text-orange-700",
  None: "bg-slate-100 text-slate-500",
};

export function StatusChip({ status, className }: { status: string; className?: string }) {
  const colors = colorMap[status] ?? "bg-slate-100 text-slate-600";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        colors,
        className
      )}
    >
      {status}
    </span>
  );
}
