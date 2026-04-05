"use client";

import { useState } from "react";
import { worldModelSeed } from "@/data";
import { PageHeader } from "@/components/shared/page-header";
import { StatusChip } from "@/components/shared/status-chip";
import type { WorldModelNode } from "@/data/types";
import { ChevronDown, ChevronRight } from "lucide-react";

// Hardcoded positions for nodes in the graph, grouped by category
const nodePositions: Record<string, { x: number; y: number }> = {
  "project-the-med": { x: 80, y: 50 },
  "phase-1": { x: 240, y: 50 },
  "decision-repricing": { x: 80, y: 160 },
  "decision-release": { x: 240, y: 160 },
  "objective-balanced": { x: 420, y: 160 },
  "constraint-price-floor": { x: 80, y: 270 },
  "constraint-protect-premium": { x: 260, y: 270 },
  "rule-corner-premium": { x: 460, y: 270 },
  "signal-aging-2br": { x: 80, y: 380 },
  "signal-reservation-drop": { x: 260, y: 380 },
  "experiment-run-001": { x: 460, y: 380 },
  "scenario-optimized": { x: 620, y: 270 },
  "recommendation-001": { x: 620, y: 380 },
  "decision-packet-001": { x: 780, y: 380 },
  "approval-commercial": { x: 620, y: 490 },
  "outcome-feedback": { x: 460, y: 490 },
};

const typeColors: Record<string, string> = {
  Project: "#3b82f6",
  Phase: "#3b82f6",
  "Decision Type": "#6366f1",
  Objective: "#8b5cf6",
  Constraint: "#f59e0b",
  "Premium Logic": "#f59e0b",
  "Inventory Aging": "#ef4444",
  "Reservation Trend": "#ef4444",
  Scenario: "#10b981",
  Recommendation: "#10b981",
  "Decision Packet": "#10b981",
  Approval: "#64748b",
  Outcome: "#64748b",
  "Experiment Run": "#06b6d4",
};

export default function WorldModelPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    worldModelSeed.inspectorDefaults.selectedNodeId
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(worldModelSeed.categories.map((c) => c.id))
  );

  const selectedNode = worldModelSeed.nodes.find((n) => n.id === selectedNodeId);
  const linkedEdges = worldModelSeed.edges.filter(
    (e) => e.from === selectedNodeId || e.to === selectedNodeId
  );
  const linkedNodeIds = linkedEdges.map((e) =>
    e.from === selectedNodeId ? e.to : e.from
  );

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="World Model Studio"
        subtitle="Structured business objects, decision types, constraints, and logic used by the simulation engine"
      />

      <div className="grid grid-cols-[240px_1fr_300px] gap-4 min-h-[600px]">
        {/* Left Navigator */}
        <div className="rounded-xl border bg-card p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">CATEGORIES</h3>
          {worldModelSeed.categories.map((cat) => (
            <div key={cat.id} className="mb-2">
              <button
                onClick={() => toggleCategory(cat.id)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-muted"
              >
                {expandedCategories.has(cat.id) ? (
                  <ChevronDown className="h-3.5 w-3.5" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5" />
                )}
                {cat.name}
                <span className="ml-auto text-xs text-muted-foreground">{cat.nodes.length}</span>
              </button>
              {expandedCategories.has(cat.id) && (
                <div className="ml-5 space-y-0.5">
                  {worldModelSeed.nodes
                    .filter((n) => cat.nodes.includes(n.label))
                    .map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setSelectedNodeId(n.id)}
                        className={`w-full flex items-center gap-2 rounded-md px-2 py-1 text-xs transition-colors ${
                          n.id === selectedNodeId
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: typeColors[n.type] ?? "#94a3b8" }}
                        />
                        {n.label}
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Center Graph */}
        <div className="rounded-xl border bg-card p-4 overflow-auto">
          <svg width="900" height="560" className="w-full h-full" viewBox="0 0 900 560">
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Edges */}
            {worldModelSeed.edges.map((edge, i) => {
              const from = nodePositions[edge.from];
              const to = nodePositions[edge.to];
              if (!from || !to) return null;
              const isLinked =
                edge.from === selectedNodeId || edge.to === selectedNodeId;
              return (
                <g key={i}>
                  <line
                    x1={from.x + 60}
                    y1={from.y + 20}
                    x2={to.x + 60}
                    y2={to.y + 20}
                    stroke={isLinked ? "#6366f1" : "#cbd5e1"}
                    strokeWidth={isLinked ? 2 : 1}
                    markerEnd="url(#arrowhead)"
                  />
                  <text
                    x={(from.x + to.x) / 2 + 60}
                    y={(from.y + to.y) / 2 + 16}
                    fontSize={9}
                    fill="#94a3b8"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {worldModelSeed.nodes.map((node) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;
              const isSelected = node.id === selectedNodeId;
              const isLinked = linkedNodeIds.includes(node.id);
              const color = typeColors[node.type] ?? "#94a3b8";
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="cursor-pointer"
                >
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={120}
                    height={40}
                    rx={8}
                    fill={isSelected ? color + "20" : isLinked ? "#f1f5f9" : "#ffffff"}
                    stroke={isSelected ? color : isLinked ? "#cbd5e1" : "#e2e8f0"}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  <text
                    x={pos.x + 60}
                    y={pos.y + 24}
                    fontSize={10}
                    fill={isSelected ? color : "#334155"}
                    textAnchor="middle"
                    fontWeight={isSelected ? 600 : 400}
                  >
                    {node.label.length > 16 ? node.label.slice(0, 15) + "..." : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Inspector */}
        <div className="rounded-xl border bg-card p-4 overflow-y-auto">
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold">{selectedNode.label}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <StatusChip status={selectedNode.status} />
                  <span className="text-xs text-muted-foreground">{selectedNode.type}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Source</p>
                <p className="text-sm">{selectedNode.source}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Description</p>
                <p className="text-sm leading-relaxed">{selectedNode.description}</p>
              </div>

              {Object.keys(selectedNode.properties).length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Properties</p>
                  <div className="space-y-1">
                    {Object.entries(selectedNode.properties).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-medium text-right max-w-[150px] truncate">
                          {Array.isArray(val) ? val.join(", ") : String(val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {linkedEdges.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Relationships</p>
                  <div className="space-y-1">
                    {linkedEdges.map((e, i) => {
                      const otherNode = worldModelSeed.nodes.find(
                        (n) => n.id === (e.from === selectedNodeId ? e.to : e.from)
                      );
                      return (
                        <div key={i} className="text-xs">
                          <span className="text-muted-foreground">
                            {e.from === selectedNodeId ? "→" : "←"}
                          </span>{" "}
                          <span className="font-medium text-indigo-600">{e.label}</span>{" "}
                          <button
                            onClick={() => setSelectedNodeId(otherNode?.id ?? "")}
                            className="text-blue-600 hover:underline"
                          >
                            {otherNode?.label}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-1.5 pt-2">
                {worldModelSeed.inspectorDefaults.availableActions.map((action) => (
                  <button
                    key={action}
                    className="w-full rounded-lg border px-3 py-1.5 text-xs font-medium text-left hover:bg-muted"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Select a node to inspect</p>
          )}
        </div>
      </div>
    </div>
  );
}
