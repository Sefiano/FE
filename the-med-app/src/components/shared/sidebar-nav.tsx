"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Package,
  FlaskConical,
  Globe,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

const items = [
  { label: "Inventory", href: "/", icon: Package },
  { label: "Simulation", href: "/simulation", icon: FlaskConical },
  { label: "World Model", href: "/world-model", icon: Globe },
  { label: "Decisions", href: "/decisions", icon: ClipboardList },
  { label: "Readiness", href: "/readiness", icon: ShieldCheck },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-5">
        <span className="text-base font-semibold tracking-tight">People &amp; Places</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t px-5 py-3">
        <p className="text-xs text-muted-foreground">The Med &middot; Demo</p>
      </div>
    </aside>
  );
}
