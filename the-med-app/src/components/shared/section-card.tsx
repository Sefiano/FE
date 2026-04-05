import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function SectionCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-6 shadow-sm", className)}>
      {title && <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>}
      {children}
    </div>
  );
}
