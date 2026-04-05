# The Med Demo — Frontend Build Spec

## Build target

Create a polished **frontend-only React / Next.js demo** using hardcoded local data. The implementation should be modular, type-safe, and easy to extend later with a backend, but backend logic is not required now.

## Suggested stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for charts
- Framer Motion for light transitions if desired

## Route structure

- `/` → Inventory page
- `/simulation` → Simulation page
- `/recommendations/[id]` → Recommendation detail
- `/world-model` → World Model page
- `/decisions` → Decision log
- `/readiness` → Readiness page

## Required data files
The app should consume these hardcoded seed files:
- inventorySeed.ts
- simulationSeed.ts
- worldModelSeed.ts
- decisionLogSeed.ts
- readinessSeed.ts

## Core app shell

### Sidebar
Use a left sidebar with:
- Inventory
- Simulation
- World Model
- Decisions
- Readiness

### Top bar
Display:
- project selector
- phase selector
- last run timestamp
- demo mode badge

## Component architecture

### Shared components
- AppShell
- SidebarNav
- TopBar
- PageHeader
- KpiCard
- StatusChip
- SectionCard
- MetricStat
- EmptyState
- FilterBar

### Inventory components
- InventoryTable
- InventoryRow
- InventoryRowDrawer
- InventoryAnalyticsGrid
- WatchlistCard

### Simulation components
- SimulationContextBar
- SetupPanel
- EngineFlowStrip
- SimulationTimeline
- EventStream
- ScenarioCard
- MethodologyCard
- RecommendationPanel

### Recommendation components
- RecommendationHeader
- OutcomeMetricsGrid
- DriverList
- ConstraintCheckTable
- AlternativesTable
- ApprovalPanel

### World model components
- WorldModelNavigator
- GraphCanvas
- NodeInspector
- CategorySummaryPills

### Decisions components
- DecisionTable
- DecisionRowDetail
- DecisionFilters

### Readiness components
- ReadinessSummary
- DataReadinessTable
- LogicReadinessList
- DecisionTypeReadinessTable
- WorldModelCoverage
- ImplicationCards

## Inventory page implementation

### Layout order
1. `PageHeader`
2. KPI row
3. `FilterBar`
4. `InventoryTable`
5. `InventoryAnalyticsGrid`

### Required interactions
- row selection
- row expand / collapse
- watchlist simulate button routes to `/simulation`
- Open in Simulation button routes to `/simulation`
- Run Scenario on Selection button routes to `/simulation`

### Inventory analytics cards
Implement these as separate cards so they remain reusable:
- Status Distribution
- Unit Mix by Type
- Price / sqm by Type
- Aging Buckets
- Premium Exposure
- Payment Plan Mix
- Simulation Watchlist
- Revenue vs Sell-Through Preview

## Simulation page implementation

### Layout order
1. `PageHeader`
2. `SimulationContextBar`
3. `SetupPanel`
4. `EngineFlowStrip`
5. `SimulationRunPanel`
6. `ExperimentClassGrid`
7. `ScenarioResultsGrid`
8. `MethodologyPanel`
9. `RecommendationPanel`

### Interaction model
This page is fake-interactive, not real-compute.

#### Recommended behavior
When user clicks `Simulate 6 Months`:
1. highlight engine flow steps sequentially
2. show fake run states
3. animate event stream entries
4. reveal scenario cards
5. highlight recommended scenario
6. show recommendation panel active

This can be done entirely with local UI state and timeouts.

### Scenario card requirements
Each scenario card must contain:
- name
- tag
- rank
- input bullets
- revenue
- sellout months
- leftover units
- avg realized price
- cashflow score
- confidence
- explanatory sentence
- action button

Recommended buttons:
- Inspect
- Compare
- Send to Approval

### Recommendation panel buttons
- View Decision Packet → route to `/recommendations/rec-001`
- View World Model → route to `/world-model`
- Rerun with Constraints → fake state reset or no-op button

## Recommendation detail implementation

### Layout
Use a two-level hierarchy:
- high-level summary first
- detailed traceability below

### Sections to implement
- recommendation header
- summary statement
- outcome metrics grid
- drivers list
- constraint check table
- alternatives table
- approval panel

### Buttons
- Approve
- Reject
- Rerun
- View World Model

### Approval behavior
Since no backend exists:
- clicking Approve can show a success toast and optionally route to `/decisions`
- clicking Reject can do the same
- do not mutate persistent state unless you want fake local state only

## World model implementation

### Goal
This page should look legible, not graph-theory-heavy.

### Recommended approach
Use a simplified graph visualization or even a node-link mock with controlled positioning. It does not need full drag-and-drop graph editing.

### Layout
- left navigator list
- center graph display
- right inspector

### Required interactions
- click node in navigator → select node
- click node in graph → update inspector
- buttons in inspector can route to relevant pages or act as no-ops

### Important
Graph should only show a focused subset of relationships at once. Avoid clutter.

## Decisions page implementation

### Table behavior
- sortable columns optional
- expandable rows recommended
- filters can be visual-only or locally applied

### Suggested interactions
- click row or expand icon → show rationale, constraints, notes
- linked recommendation id can route to detail page

## Readiness page implementation

### Recommended sections
- score summary cards
- data readiness table
- logic readiness cards
- decision type readiness table
- world model coverage bars
- implementation implication cards

### Visual emphasis
This page should make the commercial point:
- the demo already works as a concept
- client data makes it stronger
- validated logic is needed for autonomy

## Design system guidance

### Visual tone
- clean enterprise UI
- soft borders
- muted surfaces
- strong spacing
- limited accent usage
- avoid neon / hacker aesthetics

### Typography
Use clear hierarchy:
- page title
- section title
- card title
- label
- body
- metadata

### Spacing
Prefer roomy layouts. Do not compress too much dense data into small cards.

### Chips
Create reusable chip variants for:
- status
- confidence
- severity
- data source
- readiness

## Suggested code organization

```txt
src/
  app/
    layout.tsx
    page.tsx
    simulation/page.tsx
    recommendations/[id]/page.tsx
    world-model/page.tsx
    decisions/page.tsx
    readiness/page.tsx

  components/
    shared/
    inventory/
    simulation/
    recommendation/
    world-model/
    decisions/
    readiness/

  data/
    inventorySeed.ts
    simulationSeed.ts
    worldModelSeed.ts
    decisionLogSeed.ts
    readinessSeed.ts
    index.ts
    types.ts

  lib/
    format.ts
    constants.ts
    ui.ts
```

## Feature expectations by page

### Inventory
Must feel operational and rich.

### Simulation
Must feel dynamic and strategy-led.

### Recommendation Detail
Must feel auditable and decision-grade.

### World Model
Must feel like the system’s structured brain.

### Decisions
Must feel like a trace log.

### Readiness
Must feel like a bridge to real implementation.

## Button map

### Inventory page
- Open in Simulation
- Queue Overnight Run
- Save View
- Run Scenario on Selection
- Open in Simulation (row drawer)
- View linked recommendation
- View in World Model
- Simulate (watchlist row)

### Simulation page
- Run Simulation
- Queue Overnight
- Save Scenario
- Simulate 6 Months
- Inspect
- Compare
- Send to Approval
- View Decision Packet
- View World Model
- Rerun with Constraints

### Recommendation detail page
- Approve
- Reject
- Rerun
- View World Model
- Confirm Approval
- Confirm Rejection

### World model page
- Show Data Gaps
- View in Simulation
- Mark as Client-Required
- Show Downstream Effects

## Minimal implementation sequence

Build in this order:

1. app shell + sidebar + top bar
2. Inventory page
3. Simulation page
4. Recommendation detail page
5. World Model page
6. Decisions page
7. Readiness page

This order matches the demo story and gets the strongest visual payoff earliest.

## Done criteria

The frontend is ready when:

- every page exists and is routed
- all pages render from local hardcoded seed data
- inventory page is the landing page
- simulation page has the full narrative flow
- recommendation page feels reviewable
- world model page feels inspectable
- decisions page feels traceable
- readiness page makes deployment requirements obvious

At that point, the product is ready for direct demo use and ready for later backend integration.
