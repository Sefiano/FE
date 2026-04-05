"use client";

import { useState, useCallback } from "react";
import { simulationSeed } from "@/data";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusChip } from "@/components/shared/status-chip";
import { MetricStat } from "@/components/shared/metric-stat";
import { formatEgp } from "@/lib/format";
import Link from "next/link";
import { toast } from "sonner";
import { Play, ArrowRight, FlaskConical } from "lucide-react";

export default function SimulationPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [runStateIdx, setRunStateIdx] = useState(-1);
  const [visibleEvents, setVisibleEvents] = useState(0);
  const [showScenarios, setShowScenarios] = useState(false);
  const [showRec, setShowRec] = useState(false);

  const runSimulation = useCallback(() => {
    setIsRunning(true);
    setActiveStep(0);
    setRunStateIdx(0);
    setVisibleEvents(0);
    setShowScenarios(false);
    setShowRec(false);

    // Animate engine flow steps
    const steps = simulationSeed.engineFlow.length;
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        setActiveStep(i);
        setRunStateIdx(Math.min(i, simulationSeed.runStates.length - 1));
      }, (i + 1) * 600);
    }

    // Animate events
    const eventStart = steps * 600 + 200;
    const evts = simulationSeed.runEvents.length;
    for (let i = 0; i <= evts; i++) {
      setTimeout(() => setVisibleEvents(i), eventStart + i * 200);
    }

    // Show scenarios
    const scenarioTime = eventStart + evts * 200 + 400;
    setTimeout(() => {
      setShowScenarios(true);
      setRunStateIdx(simulationSeed.runStates.length - 1);
    }, scenarioTime);

    // Show recommendation
    setTimeout(() => {
      setShowRec(true);
      setIsRunning(false);
    }, scenarioTime + 600);
  }, []);

  const ctx = simulationSeed.context;
  const rec = simulationSeed.recommendation;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Simulation Lab"
        subtitle="Synthetic buyer simulation and strategy comparison for selected inventory scope"
        actions={
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Running..." : "Simulate 6 Months"}
          </button>
        }
      />

      {/* Context Bar */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-muted/30 px-5 py-3 text-sm">
        <span><b>Project:</b> {ctx.project}</span>
        <span className="text-muted-foreground">&middot;</span>
        <span><b>Phase:</b> {ctx.phase}</span>
        <span className="text-muted-foreground">&middot;</span>
        <span><b>Batch:</b> {ctx.batch}</span>
        <span className="text-muted-foreground">&middot;</span>
        <span><b>Horizon:</b> {ctx.horizonMonths} months</span>
        <span className="text-muted-foreground">&middot;</span>
        <span><b>Arrivals:</b> {ctx.syntheticArrivals.toLocaleString()}</span>
        <span className="text-muted-foreground">&middot;</span>
        <span><b>Objective:</b> {ctx.objective}</span>
        <StatusChip status="Generated" className="ml-auto" />
      </div>

      {/* Setup Panel */}
      <SectionCard title="Setup">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">DECISION SCOPE</h4>
            <div className="space-y-1 text-sm">
              <p>Units in scope: <b>{simulationSeed.selectedScope.totalUnitsInScope}</b></p>
              <p>Available: <b>{simulationSeed.selectedScope.availableNow}</b></p>
              <p>Held/Reserved: <b>{simulationSeed.selectedScope.heldOrReserved}</b></p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">OBJECTIVES</h4>
            <div className="space-y-1">
              {simulationSeed.objectives.map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <span className={`h-3 w-3 rounded-full border-2 ${o === ctx.objective ? "bg-primary border-primary" : "border-muted-foreground"}`} />
                  {o}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">CONSTRAINTS</h4>
            <ul className="space-y-1 text-sm">
              {simulationSeed.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Engine Flow Strip */}
      <SectionCard title="Engine Flow">
        <div className="flex items-center gap-2">
          {simulationSeed.engineFlow.map((step, i) => (
            <div key={step.step} className="flex items-center gap-2">
              <div
                className={`rounded-lg border p-3 text-center transition-all duration-300 ${
                  i <= activeStep
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card"
                }`}
                style={{ minWidth: 140 }}
              >
                <p className="text-xs font-semibold">{step.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{step.body}</p>
              </div>
              {i < simulationSeed.engineFlow.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>
        {runStateIdx >= 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            Status: <b>{simulationSeed.runStates[runStateIdx]}</b>
          </p>
        )}
      </SectionCard>

      {/* Simulation Timeline */}
      {visibleEvents > 0 && (
        <SectionCard title="Simulation Run">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">TIMELINE</h4>
              <div className="space-y-1">
                {simulationSeed.timeline.map((t) => (
                  <div
                    key={t.month}
                    className={`rounded px-3 py-1 text-sm ${t.highlighted ? "bg-primary/10 font-medium" : ""}`}
                  >
                    {t.month}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">EVENT STREAM</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {simulationSeed.runEvents.slice(0, visibleEvents).map((evt, i) => (
                  <p key={i} className="text-xs text-muted-foreground animate-in fade-in">
                    <span className="text-foreground font-medium">#{i + 1}</span> {evt}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">INVENTORY EVOLUTION</h4>
              <div className="grid grid-cols-2 gap-3">
                <MetricStat label="Available (before)" value={simulationSeed.inventoryEvolution.before.available} />
                <MetricStat label="Available (now)" value={simulationSeed.inventoryEvolution.current.available} />
                <MetricStat label="Premium left (before)" value={simulationSeed.inventoryEvolution.before.premiumUnitsLeft} />
                <MetricStat label="Premium left (now)" value={simulationSeed.inventoryEvolution.current.premiumUnitsLeft} />
                <MetricStat label="Avg price (before)" value={formatEgp(simulationSeed.inventoryEvolution.before.avgPrice)} />
                <MetricStat label="Avg realized" value={formatEgp(simulationSeed.inventoryEvolution.current.avgRealizedPrice)} />
                <MetricStat label="Sellout (before)" value={`${simulationSeed.inventoryEvolution.before.expectedSelloutMonths}m`} />
                <MetricStat label="Sellout (now)" value={`${simulationSeed.inventoryEvolution.current.updatedExpectedSelloutMonths}m`} />
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Experiment Classes */}
      <SectionCard title="Experiment Classes">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {simulationSeed.experimentClasses.map((ec) => (
            <div key={ec.id} className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-semibold">{ec.name}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{ec.subtitle}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {ec.levers.map((l) => (
                  <span key={l} className="rounded bg-muted px-1.5 py-0.5 text-xs">{l}</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Outputs: {ec.outputs.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Scenario Cards */}
      {showScenarios && (
        <SectionCard title="Scenario Comparison">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {simulationSeed.scenarios
              .sort((a, b) => a.rank - b.rank)
              .map((s) => (
                <div
                  key={s.id}
                  className={`rounded-xl border p-5 transition-all ${
                    s.tag === "Recommended"
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">#{s.rank}</span>
                      <h4 className="font-semibold">{s.name}</h4>
                    </div>
                    <StatusChip status={s.tag} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <MetricStat label="6M Revenue" value={formatEgp(s.revenue6m)} />
                    <MetricStat label="Sellout" value={`${s.selloutMonths} months`} />
                    <MetricStat label="Leftover" value={`${s.leftoverUnits} units`} />
                    <MetricStat label="Cashflow" value={`${s.cashflowScore}/100`} />
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Inputs:</p>
                    <ul className="space-y-0.5">
                      {s.inputs.map((inp, i) => (
                        <li key={i} className="text-xs flex items-start gap-1.5">
                          <span className="mt-1 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                          {inp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{s.why}</p>
                  <div className="flex items-center gap-2">
                    <StatusChip status={s.confidence} />
                    {s.tag === "Recommended" && (
                      <button
                        onClick={() => toast.success("Sent to approval")}
                        className="ml-auto rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
                      >
                        Send to Approval
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </SectionCard>
      )}

      {/* Methodology */}
      <SectionCard title="Methodology">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {simulationSeed.methodology.map((m) => (
            <div key={m.id} className="rounded-lg border p-4">
              <h4 className="text-sm font-semibold mb-1">{m.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{m.purpose}</p>
              <p className="text-xs"><b>MVP:</b> {m.mvpMethod}</p>
              <p className="text-xs"><b>Later:</b> {m.laterMethod}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Recommendation Panel */}
      {showRec && (
        <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
          <h3 className="text-lg font-semibold mb-1">{rec.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{rec.body}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <MetricStat label="Revenue Uplift" value={`+${rec.upliftRevenuePct}%`} />
            <MetricStat label="Faster Sellout" value={`${rec.fasterSelloutMonths} months`} />
            <MetricStat label="Leftover Reduction" value={`${rec.leftoverReductionUnits} units`} />
            <MetricStat label="Premium Preserved" value={rec.premiumPositioningPreserved ? "Yes" : "No"} />
          </div>
          <div className="flex items-center gap-3">
            <StatusChip status={rec.confidence} />
            <Link
              href="/recommendations/rec-001"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              View Decision Packet
            </Link>
            <Link
              href="/world-model"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              View World Model
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
