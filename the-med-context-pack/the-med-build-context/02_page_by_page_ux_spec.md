# The Med Demo — Page-by-Page UX Spec

## Global navigation

Sidebar order:

1. Inventory
2. Simulation
3. World Model
4. Decisions
5. Readiness

Global top bar elements:
- project selector
- phase selector
- last run timestamp
- demo mode badge

---

## 1. Inventory Page

### Purpose
This is the home page and first impression. It should look like a real operational surface for inventory review.

### User goals
- inspect inventory
- filter and search units
- understand status and pricing structure
- identify watchlist issues
- move selected inventory into simulation

### Layout
1. page header
2. KPI row
3. filter toolbar
4. inventory table
5. bottom analytics section

### Header content
- title: Inventory
- subtitle: People & Places — The Med | Project inventory, status, pricing, and release context
- buttons:
  - Open in Simulation
  - Queue Overnight Run

### KPI cards
- Total Units
- Available
- Reserved
- Avg Price / sqm
- Avg Aging
- Premium Unreleased

### Filter toolbar
Fields:
- search by unit code
- filter by unit type
- filter by status
- filter by building / cluster
- filter by view
- filter by price range
- filter by release state
- filter by aging band

Buttons:
- Save View
- Run Scenario on Selection

### Inventory table columns
- Unit Code
- Phase
- Building
- Unit Type
- Bedrooms
- Area (sqm)
- Floor
- View
- Orientation
- Finishing
- Price
- Price / sqm
- Payment Plan
- Status
- Release State
- Days on Market
- Premium Class
- Recommendation Flag

### Row detail drawer
Each row expansion should show:
- full unit details
- activity summary
- last simulation touch
- recommendation history

Buttons in row drawer:
- Open in Simulation
- View linked recommendation
- View in World Model

### Bottom analytics section

#### Card 1 — Status Distribution
Shows available / reserved / sold / held

#### Card 2 — Unit Mix by Type
Shows apartments / chalets / townhouses / villas

#### Card 3 — Price / sqm by Unit Type
Shows pricing structure by type

#### Card 4 — Aging Buckets
Shows 0–30 / 31–60 / 61–90 / 90+

#### Card 5 — Premium Exposure
Shows released premium / held premium / sold premium / aging premium

#### Card 6 — Payment Plan Mix
Shows plan distribution

#### Card 7 — Simulation Watchlist
Ranked list of watchlist signals with button:
- Simulate

#### Card 8 — Revenue vs Sell-Through Preview
Teaser chart that links into the simulation story

### Main actions from this page
- select rows
- run scenario on selected units
- open simulation from a watchlist item
- inspect unit details

### Suggested user journey
1. user lands on inventory
2. scans KPIs
3. reviews inventory table
4. notices watchlist signal
5. clicks Simulate
6. moves into Simulation page

---

## 2. Simulation Page

### Purpose
This is the strategy comparison page. It explains the engine, runs the fake simulation, compares scenarios, and highlights the best recommendation.

### User goals
- understand how the engine works
- compare strategic scenarios
- view business tradeoffs
- move into decision review

### Layout
1. header and context bar
2. setup panel
3. engine flow strip
4. simulation run panel
5. experiment class grid
6. scenario comparison results
7. methodology panel
8. recommendation panel

### Header content
- title: Simulation Lab
- subtitle: Synthetic buyer simulation and strategy comparison for selected inventory scope
- buttons:
  - Run Simulation
  - Queue Overnight
  - Save Scenario

### Context bar
Show:
- project
- developer
- phase
- selected batch
- horizon = 6 months
- synthetic arrivals = 1,200
- objective = Balanced
- Demo Mode tag

### Setup panel
Sections:

#### Decision scope
- project
- phase
- building / batch
- selected inventory segment

#### Objective preset
- Maximize Revenue
- Accelerate Sell-Through
- Improve Cash Recovery
- Protect Premium Positioning
- Balanced

#### Constraints
- Minimum price floor
- Protect premium corner units
- Do not discount lagoon-facing stock
- Maintain monthly absorption band

#### Experiment classes
- Pricing
- Release Strategy
- Payment Plans
- Portfolio Shaping

Buttons:
- Simulate 6 Months
- Queue Overnight

### Engine flow strip
Five steps:
1. Start with inventory
2. Generate buyer arrivals
3. Evaluate available units
4. Pick probabilistically
5. Remove sold unit and repeat

### Simulation run panel
Three columns:

#### Left
Month timeline:
- Month 1
- Month 2
- Month 3
- Month 4
- Month 5
- Month 6

#### Center
Event stream:
- buyer events
- selections
- non-conversions
- inventory updates

#### Right
Inventory evolution snapshot:
- available before / current
- premium units left
- avg price / realized price
- expected sellout before / current

### Experiment class grid
Four cards:
- Pricing
- Release Strategy
- Payment Plans
- Portfolio Shaping

Each card must show:
- short description
- key levers
- output metrics

### Scenario comparison results
Use four scenario cards:
- Current Strategy
- AI Optimized Strategy
- Fast Cash Strategy
- Premium Protection Strategy

Each card shows:
- inputs summary
- projected 6M revenue
- sellout months
- leftover units
- avg realized price
- cashflow score
- confidence
- why selected / why not selected

Buttons on each scenario card:
- Inspect
- Compare
- Send to Approval

### Methodology panel
Show four method cards:
- Discrete Choice Modeling
- Survival Modeling
- Monte Carlo Simulation
- Optimization Layer

This is explanatory only.

### Recommendation panel
This should show:
- recommendation title
- short explanation
- uplift metrics
- confidence
- buttons:
  - View Decision Packet
  - View World Model
  - Rerun with Constraints

### Suggested user journey
1. user arrives from inventory
2. sees setup and context
3. clicks Simulate 6 Months
4. sees engine flow steps animate
5. sees event stream and timeline
6. sees ranked scenario cards
7. opens recommended scenario
8. moves to Recommendation Detail

---

## 3. Recommendation Detail Page

### Purpose
This is the full decision packet and approval screen.

### User goals
- inspect one recommendation in detail
- understand rationale
- review constraints and tradeoffs
- approve or reject

### Layout
1. header
2. recommendation summary
3. expected outcomes
4. drivers
5. constraint check
6. alternatives considered
7. approval section

### Header content
- recommendation title
- scope
- status
- source run
- buttons:
  - Approve
  - Reject
  - Rerun
  - View World Model

### Recommendation summary
One concise statement of:
- what action is proposed
- for which units
- why now

### Expected outcomes
Metric blocks:
- Revenue Impact
- Sell-Through Impact
- Cashflow Impact
- Inventory Health Impact

### Drivers
Ranked list of top contributing reasons

### Constraint check
List or table of:
- constraint
- pass / fail

### Alternatives considered
Small comparison table of alternative strategies

### Approval section
Fields:
- Decision
- Reason Code
- Notes
- Optional Override

Buttons:
- Confirm Approval
- Confirm Rejection

### Suggested user journey
1. user opens recommendation from simulation
2. reviews business summary
3. checks drivers and constraints
4. compares alternatives
5. approves or rejects
6. recommendation appears in decision log

---

## 4. World Model Page

### Purpose
This is the fake ontology / context graph page. Its role is to show the machine-readable structure behind the product.

### User goals
- understand what the system knows
- inspect nodes and relationships
- see how business objects, logic, and recommendations connect
- understand what is seeded vs missing

### Layout
1. header
2. left node navigator
3. center graph canvas
4. right inspector panel

### Header content
- title: World Model Studio
- subtitle: Structured business objects, decision types, constraints, and logic used by the simulation engine
- toggle:
  - Graph View
  - Table View
- button:
  - Show Data Gaps

### Left navigator
Groups:
- Business Objects
- Decision Objects
- Logic Objects
- Signal Objects
- System Objects

Each group shows item counts and status tags.

### Graph canvas
Show a selected neighborhood only, not the entire graph.

Important nodes to include:
- Project
- Phase
- Repricing
- Release Strategy
- Balanced Strategy
- Minimum Price Floor
- Protect Premium Positioning
- Corner Unit Premium
- Aging 2BR Inventory
- Reservation Softness
- Overnight Run
- AI Optimized Strategy
- Recommendation
- Commercial Approval
- Outcome Feedback

### Inspector panel
For selected node show:
- name
- type
- status
- source
- description
- properties
- linked objects

Buttons:
- View in Simulation
- Mark as Client-Required
- Show Downstream Effects

### Suggested user journey
1. user opens world model from recommendation
2. clicks Repricing node
3. inspects linked constraints and objectives
4. clicks signal node
5. sees how signal triggered experiment run
6. understands how recommendation was generated

---

## 5. Decisions Page

### Purpose
Audit trail and decision history.

### User goals
- view recommendation history
- inspect approval outcomes
- understand overrides and observed outcomes

### Layout
1. header
2. filter bar
3. decision table
4. detail side panel or row expansion

### Header content
- title: Decision Log
- subtitle: Trace of recommendations, approvals, overrides, and observed outcomes

### Filters
- date range
- decision type
- status
- project / phase
- confidence

### Table columns
- Date
- Recommendation Title
- Scope
- Decision Type
- Recommended Action
- Final Action
- Owner
- Confidence
- Outcome Status

### Row expansion / detail panel
Show:
- rationale
- constraint check
- linked world model nodes
- notes
- outcome summary

### Suggested user journey
1. user approves a recommendation
2. later opens Decisions
3. sees recommendation history and status
4. inspects one row in detail

---

## 6. Readiness Page

### Purpose
This is the implementation bridge. It explains what is already seeded and what the client must provide for real deployment.

### User goals
- understand what data is missing
- understand what logic still needs validation
- see which decision types are ready
- see what autonomy would require later

### Layout
1. header
2. readiness summary
3. data readiness section
4. logic readiness section
5. decision type readiness section
6. world model readiness section
7. implementation implications

### Header content
- title: Readiness
- subtitle: Data, logic, and constraint coverage required for production-grade decision loops

### Readiness summary
Show:
- overall readiness score
- seeded nodes
- validated nodes
- missing client nodes
- logic coverage %
- constraint coverage %
- decision readiness %

### Data readiness section
Rows:
- Unit Master Data
- Inventory Status History
- Pricing History
- Payment Plan History
- Reservation / Conversion Data
- Inquiry / Funnel Signals

Columns:
- status
- completeness %
- source
- required for

### Logic readiness section
Rows:
- Premium Logic
- Release Logic
- Hold / Reserve Logic
- Price Floors / Ceilings
- Brand Positioning Constraints

### Decision type readiness section
Rows:
- Repricing
- Release Strategy
- Inventory Prioritization
- Payment Plan Adjustment

For each row show:
- readiness %
- simulation possible now
- recommendation safe now
- autonomy later
- missing inputs

### World model readiness section
Show coverage by category:
- Business Objects
- Decision Types
- Logic Objects
- Signal Objects
- Feedback / Outcomes

### Implementation implications
Three cards:
- Demo-ready today
- Recommendation-grade with client data
- Autonomy requires validated logic

### Suggested user journey
1. user finishes world model exploration
2. opens Readiness
3. understands what exists now versus what must be supplied
4. sees the path from demo to real deployment
