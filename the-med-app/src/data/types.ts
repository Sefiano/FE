export type StatusChip =
  | 'Available'
  | 'Reserved'
  | 'Sold'
  | 'Held'
  | 'Released'
  | 'Unreleased'
  | 'Phased Hold'
  | 'Protected'
  | 'Aging Risk'
  | 'Simulation Candidate'
  | 'Under Review'
  | 'None'
  | 'Recommended'
  | 'Approved'
  | 'Rejected'
  | 'Overridden'
  | 'Executed'
  | 'Outcome Pending'
  | 'Outcome Observed'
  | 'Pending'
  | 'Configured'
  | 'Generated'
  | 'Imported'
  | 'Learned'
  | 'Seeded'
  | 'Partial'
  | 'Missing'
  | 'Available';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type SeverityLevel = 'High' | 'Medium' | 'Low';
export type UnitType = 'Apartment' | 'Chalet' | 'Townhouse' | 'Villa';
export type InventoryStatus = 'Available' | 'Reserved' | 'Sold' | 'Held';
export type ReleaseState = 'Released' | 'Unreleased' | 'Phased Hold';
export type DecisionType =
  | 'Repricing'
  | 'Release Strategy'
  | 'Payment Plan'
  | 'Payment Plan Adjustment'
  | 'Portfolio Shaping'
  | 'Inventory Prioritization';

export interface DemoContext {
  project: string;
  developer: string;
  demoMode: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface LabelValue {
  id?: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface InventoryUnit {
  id: string;
  phase: string;
  building: string;
  cluster: string;
  unitType: UnitType;
  bedrooms: number;
  areaSqm: number;
  floor: number | string;
  view: string;
  orientation: string;
  finishing: string;
  priceEgp: number;
  pricePerSqm: number;
  paymentPlan: string;
  status: InventoryStatus;
  releaseState: ReleaseState;
  daysOnMarket: number;
  premiumClass: string;
  recommendationFlag: string;
  inquiryTrend: string;
  reservationTrend: string;
  lastSimulationTouch: string;
}

export interface WatchlistItem {
  id: string;
  signal: string;
  severity: SeverityLevel;
  cta: string;
  linkedScenarioId: string;
}

export interface InventoryAnalytics {
  statusDistribution: LabelValue[];
  unitMixByType: LabelValue[];
  pricePerSqmByType: LabelValue[];
  agingBuckets: LabelValue[];
  premiumExposure: LabelValue[];
  paymentPlanMix: LabelValue[];
  revenueFrontierPreview: Array<{
    strategy: string;
    revenue: number;
    sellthroughMonths: number;
  }>;
}

export interface InventorySeed {
  context: DemoContext & {
    region: string;
    phase: string;
    currency: string;
    lastUpdated: string;
  };
  summary: {
    totalUnits: number;
    availableUnits: number;
    reservedUnits: number;
    soldUnits: number;
    heldUnits: number;
    avgPricePerSqm: number;
    avgAgingDays: number;
    premiumUnitsUnreleased: number;
  };
  kpis: LabelValue[];
  filters: {
    unitTypes: UnitType[];
    statuses: InventoryStatus[];
    views: string[];
    releaseStates: ReleaseState[];
    agingBands: string[];
  };
  units: InventoryUnit[];
  analytics: InventoryAnalytics;
  watchlist: WatchlistItem[];
}

export interface ExperimentClass {
  id: string;
  name: string;
  subtitle: string;
  levers: string[];
  outputs: string[];
}

export interface EngineFlowStep {
  step: number;
  title: string;
  body: string;
}

export interface ScenarioCard {
  id: string;
  name: string;
  tag: string;
  rank: number;
  inputs: string[];
  revenue6m: number;
  selloutMonths: number;
  leftoverUnits: number;
  avgRealizedPrice: number;
  cashflowScore: number;
  confidence: ConfidenceLevel;
  why: string;
}

export interface SimulationSeed {
  context: DemoContext & {
    phase: string;
    batch: string;
    horizonMonths: number;
    syntheticArrivals: number;
    objective: string;
    lastRunAt: string;
  };
  selectedScope: {
    totalUnitsInScope: number;
    availableNow: number;
    heldOrReserved: number;
    soldHistorically: number;
    unitMix: LabelValue[];
  };
  objectives: string[];
  constraints: string[];
  experimentClasses: ExperimentClass[];
  engineFlow: EngineFlowStep[];
  runStates: string[];
  runEvents: string[];
  timeline: Array<{ month: string; highlighted: boolean }>;
  inventoryEvolution: {
    before: {
      available: number;
      premiumUnitsLeft: number;
      avgPrice: number;
      expectedSelloutMonths: number;
    };
    current: {
      available: number;
      premiumUnitsLeft: number;
      avgRealizedPrice: number;
      updatedExpectedSelloutMonths: number;
    };
  };
  scenarios: ScenarioCard[];
  methodology: Array<{
    id: string;
    title: string;
    mvpMethod: string;
    laterMethod: string;
    purpose: string;
  }>;
  recommendation: {
    id: string;
    title: string;
    body: string;
    upliftRevenuePct: number;
    fasterSelloutMonths: number;
    leftoverReductionUnits: number;
    premiumPositioningPreserved: boolean;
    confidence: ConfidenceLevel;
    actions: string[];
  };
}

export interface WorldModelNode {
  id: string;
  label: string;
  type: string;
  status: string;
  source: string;
  description: string;
  properties: Record<string, string | number | boolean | string[]>;
}

export interface WorldModelEdge {
  from: string;
  to: string;
  label: string;
}

export interface WorldModelSeed {
  context: DemoContext & {
    viewMode: string;
  };
  categories: Array<{
    id: string;
    name: string;
    nodes: string[];
  }>;
  nodes: WorldModelNode[];
  edges: WorldModelEdge[];
  inspectorDefaults: {
    selectedNodeId: string;
    availableActions: string[];
  };
}

export interface DecisionLogRow {
  id: string;
  date: string;
  title: string;
  scope: string;
  decisionType: DecisionType;
  recommendedAction: string;
  finalAction: string;
  owner: string;
  confidence: ConfidenceLevel;
  status: string;
  outcomeStatus: string;
  notes: string;
  linkedRecommendationId: string;
}

export interface DecisionLogSeed {
  context: DemoContext;
  filters: {
    dateRanges: string[];
    decisionTypes: DecisionType[];
    statuses: string[];
    confidenceLevels: ConfidenceLevel[];
  };
  rows: DecisionLogRow[];
  detailPanels: Record<
    string,
    {
      rationale: string[];
      constraintCheck: Array<{ label: string; status: string }>;
      linkedWorldModelNodes: string[];
    }
  >;
}

export interface ReadinessSeed {
  context: DemoContext & {
    overallReadinessScore: number;
  };
  summary: {
    seededNodes: number;
    validatedNodes: number;
    missingClientNodes: number;
    logicCoveragePct: number;
    constraintCoveragePct: number;
    decisionReadinessPct: number;
  };
  dataReadiness: Array<{
    id: string;
    name: string;
    status: string;
    completenessPct: number;
    source: string;
    requiredFor: string[];
  }>;
  logicReadiness: Array<{
    id: string;
    name: string;
    status: string;
    readinessPct: number;
    note: string;
  }>;
  decisionTypeReadiness: Array<{
    id: string;
    name: string;
    readinessPct: number;
    simulationPossibleNow: boolean;
    recommendationSafeNow: boolean;
    autonomyLater: boolean;
    missingInputs: string[];
  }>;
  worldModelReadiness: Array<{
    id: string;
    category: string;
    coveragePct: number;
    status: string;
  }>;
  implementationImplications: Array<{
    id: string;
    title: string;
    body: string;
  }>;
}
