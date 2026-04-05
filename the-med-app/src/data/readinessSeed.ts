import type { ReadinessSeed } from './types';

export const readinessSeed: ReadinessSeed = {
  context: {
    project: 'The Med',
    developer: 'People & Places',
    overallReadinessScore: 68,
    demoMode: true,
  },

  summary: {
    seededNodes: 42,
    validatedNodes: 19,
    missingClientNodes: 11,
    logicCoveragePct: 61,
    constraintCoveragePct: 74,
    decisionReadinessPct: 68,
  },

  dataReadiness: [
    {
      id: 'data-1',
      name: 'Unit Master Data',
      status: 'Available',
      completenessPct: 100,
      source: 'Seeded / Client-Required',
      requiredFor: ['Inventory', 'Repricing', 'Release Strategy'],
    },
    {
      id: 'data-2',
      name: 'Inventory Status History',
      status: 'Partial',
      completenessPct: 72,
      source: 'Client-Required',
      requiredFor: ['Inventory Aging', 'Release Strategy', 'Simulation'],
    },
    {
      id: 'data-3',
      name: 'Pricing History',
      status: 'Partial',
      completenessPct: 65,
      source: 'Client-Required',
      requiredFor: ['Repricing', 'Price Sensitivity'],
    },
    {
      id: 'data-4',
      name: 'Payment Plan History',
      status: 'Partial',
      completenessPct: 58,
      source: 'Client-Required',
      requiredFor: ['Payment Plan Optimization', 'Cashflow Strategy'],
    },
    {
      id: 'data-5',
      name: 'Reservation / Conversion Data',
      status: 'Partial',
      completenessPct: 54,
      source: 'Client-Required',
      requiredFor: ['Simulation', 'Choice Modeling', 'Survival Modeling'],
    },
    {
      id: 'data-6',
      name: 'Inquiry / Funnel Signals',
      status: 'Missing',
      completenessPct: 20,
      source: 'Client-Required',
      requiredFor: ['Early Demand Signals', 'Simulation Quality'],
    },
  ],

  logicReadiness: [
    {
      id: 'logic-1',
      name: 'Premium Logic',
      status: 'Seeded',
      readinessPct: 60,
      note: 'Seeded priors exist but require client validation.',
    },
    {
      id: 'logic-2',
      name: 'Release Logic',
      status: 'Partial',
      readinessPct: 55,
      note: 'Basic phasing assumptions exist; executive rules still needed.',
    },
    {
      id: 'logic-3',
      name: 'Hold / Reserve Logic',
      status: 'Partial',
      readinessPct: 50,
      note: 'Needs policy and approval pathway mapping.',
    },
    {
      id: 'logic-4',
      name: 'Price Floors / Ceilings',
      status: 'Configured',
      readinessPct: 85,
      note: 'Seeded as demo constraints; real thresholds still client-specific.',
    },
    {
      id: 'logic-5',
      name: 'Brand Positioning Constraints',
      status: 'Partial',
      readinessPct: 62,
      note: 'High-level rules exist; detailed execution logic missing.',
    },
  ],

  decisionTypeReadiness: [
    {
      id: 'decision-1',
      name: 'Repricing',
      readinessPct: 78,
      simulationPossibleNow: true,
      recommendationSafeNow: true,
      autonomyLater: true,
      missingInputs: ['Full pricing history', 'Validated premium logic'],
    },
    {
      id: 'decision-2',
      name: 'Release Strategy',
      readinessPct: 66,
      simulationPossibleNow: true,
      recommendationSafeNow: true,
      autonomyLater: true,
      missingInputs: ['Detailed release policy', 'Scarcity strategy rules'],
    },
    {
      id: 'decision-3',
      name: 'Inventory Prioritization',
      readinessPct: 71,
      simulationPossibleNow: true,
      recommendationSafeNow: true,
      autonomyLater: true,
      missingInputs: ['Team sales priorities', 'Execution-side constraints'],
    },
    {
      id: 'decision-4',
      name: 'Payment Plan Adjustment',
      readinessPct: 59,
      simulationPossibleNow: true,
      recommendationSafeNow: false,
      autonomyLater: true,
      missingInputs: ['Installment performance history', 'Cashflow targets'],
    },
  ],

  worldModelReadiness: [
    {
      id: 'wm-1',
      category: 'Business Objects',
      coveragePct: 88,
      status: 'Strong',
    },
    {
      id: 'wm-2',
      category: 'Decision Types',
      coveragePct: 74,
      status: 'Good',
    },
    {
      id: 'wm-3',
      category: 'Logic Objects',
      coveragePct: 61,
      status: 'Partial',
    },
    {
      id: 'wm-4',
      category: 'Signal Objects',
      coveragePct: 58,
      status: 'Partial',
    },
    {
      id: 'wm-5',
      category: 'Feedback / Outcomes',
      coveragePct: 45,
      status: 'Early',
    },
  ],

  implementationImplications: [
    {
      id: 'impl-1',
      title: 'Demo-ready today',
      body: 'The seeded world model and hardcoded inventory are sufficient to demonstrate the decision simulation concept.',
    },
    {
      id: 'impl-2',
      title: 'Recommendation-grade with client data',
      body: 'Once pricing history, inventory history, and funnel signals are mapped, the same system can produce more credible recommendation loops.',
    },
    {
      id: 'impl-3',
      title: 'Autonomy requires validated logic',
      body: 'Nightly autonomous loops should only activate after decision types, approval rules, and business constraints are fully encoded and signed off.',
    },
  ],
};
