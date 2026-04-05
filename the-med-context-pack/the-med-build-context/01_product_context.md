# The Med Demo — Product Context

## Purpose

This folder is the build context for the demo product around **People & Places — The Med**. It is intended to let an AI coding agent start implementation immediately without needing to reconstruct the product story from chat history.

The demo is **frontend-only** and uses **hardcoded data**. It should look believable, structured, and enterprise-ready, but it is not expected to connect to a backend or execute real simulation logic.

The demo is designed to communicate one core thesis:

> If the client’s inventory data, decision types, constraints, and business logic are mapped into a machine-readable world model, the same system can support recurring simulation, decision support, and later controlled autonomous decision loops.

## What the demo is and is not

### It is
- a product demo
- a decision operating interface
- a simulation-led story
- an inventory-first experience
- a structured context / world-model story
- a human-in-the-loop system

### It is not
- a real pricing engine
- a live market intelligence platform
- a data science tool
- a BI dashboard
- a full ontology editor
- a backend product

## Product narrative

The product should tell this story in sequence:

1. Start from **inventory truth**
2. Surface **signals and watchlist issues**
3. Move into a **simulation lab**
4. Compare strategies over simulated time
5. Produce a **recommendation**
6. Show that the recommendation is grounded in a **world model**
7. Log the decision and expose what is needed for real deployment

## User promise

The user should feel:

- “I can see my project inventory clearly.”
- “I can see which inventory needs intervention.”
- “I can compare strategies instead of relying on gut feel.”
- “I understand why the system is recommending this.”
- “I understand what data and logic are required to make this real.”

## Demo scope

The demo should include these pages:

1. Inventory (home page)
2. Simulation
3. Recommendation Detail
4. World Model
5. Decisions
6. Readiness

## Information architecture

### Inventory
The operational entry point. Shows project stock, rich unit metadata, filters, and bottom analytics.

### Simulation
The strategy engine page. Shows how time is simulated, how buyer choice is modeled, what experiments are run, and what strategy is recommended.

### Recommendation Detail
The decision packet. Shows rationale, metrics, constraints, and approval actions.

### World Model
The behind-the-scenes structured business context. Shows how inventory, decision types, logic, constraints, and outcomes are connected.

### Decisions
The decision history and audit trail.

### Readiness
The implementation bridge that shows what is seeded versus what the client still needs to provide.

## Primary personas in the demo

The product should feel relevant to these stakeholders:

### Commercial Director
Cares about sell-through, pricing actions, stock prioritization, and tactical performance.

### Business Analysis / Pricing Lead
Cares about reasoning quality, scenario comparison, pricing structure, and consistency.

### Finance Director
Cares about cash recovery, payment-plan effects, and rule compliance.

### Executive / CEO / Board stakeholder
Cares about premium positioning, strategy tradeoffs, and the fact that the system is controlled and auditable.

## UX tone

The interface should feel:
- executive
- calm
- structured
- high-trust
- legible
- enterprise-ready

It should avoid:
- flashy startup aesthetics
- gaming-style AI UI
- generic dashboard clutter
- excessive technical detail

## Design principles

### 1. Business-first, not model-first
Always present the business story before the methodology.

### 2. Recommendations, not magic
The system should propose and explain, not behave like an oracle.

### 3. Traceability matters
Every recommendation should feel connected to:
- data
- logic
- constraints
- scenario comparison
- approval

### 4. Simplicity over realism
Because the demo is hardcoded, favor a believable and coherent flow over fake complexity.

### 5. The world model is a framing device
The ontology / graph experience exists to show that machine-readable business context is what unlocks the system.

## Simulation framing

The simulation story should be extremely clear:

- start with inventory
- generate synthetic buyer arrivals
- let buyers evaluate available units
- choose probabilistically
- remove sold unit
- repeat through a 6-month horizon

The page should make the user understand that the system compares **better versus worse strategies** using internal project structure and assumptions. It should not imply perfect market prediction.

## Experiment classes that must appear

The simulation screen must include these experiment classes:

### Pricing
- increase or decrease price
- compare revenue, time to sell, and leftover inventory

### Release strategy
- release all vs phased release
- hold premium vs sell early

### Payment plans
- 5-year vs 8-year installment
- lower DP vs higher DP

### Portfolio shaping
- push smaller units first
- push larger units first
- rebalance inventory exposure

## Product capabilities the demo should imply

The demo should imply these future capabilities without needing to implement them:

- scenario generation
- overnight runs
- ranked recommendations
- decision packets
- approval workflows
- outcome logging
- logic / rule validation
- feedback loops into future simulation quality

## Core status vocabulary

Use consistent chips/tags across the UI:

### Data / model status
- Seeded
- Imported
- Configured
- Learned
- Missing
- Awaiting Validation

### Decision status
- Recommended
- Approved
- Rejected
- Overridden
- Executed
- Outcome Pending
- Outcome Observed

### Inventory / operational status
- Available
- Reserved
- Sold
- Held
- Released
- Unreleased
- Phased Hold
- Aging Risk
- Simulation Candidate
- Protected

## Build intent

This context should allow implementation to begin immediately.

The frontend should be built as if it is a polished clickable prototype with realistic hardcoded data. The code should be structured cleanly enough that real backend integration could happen later, but real backend integration is out of scope for this phase.
