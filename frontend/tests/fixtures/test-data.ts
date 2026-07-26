export const GREETING_MARKERS = ['hi', 'hello', 'help', 'vadym'];

// Liveness markers: does the bot still answer as Vadym's portfolio assistant?
// Kept broad on purpose, so a reworded greeting doesn't fail the check. QA
// terms stay because the bot still mentions its quality engineering background.
export const PORTFOLIO_MARKERS = [
  // Current AI automation positioning
  'vadym',
  'automation',
  'ai',
  'workflow',
  'engineer',
  'llm',
  'agent',
  // Supporting quality engineering background
  'qa',
  'quality',
  'testing',
  'playwright',
];
