import { createStatsContext, addSolve, computeStats } from "../../src/models/StatsContext";
import type { StatsSchema } from "../../src/models/StatsSchema";

const schema = {
  avg5: { type: 'current', metric: 'average', scope: 'number', number: 5, averageTrimPercent: 5 },
} as StatsSchema;

test('ao5 is DNF if two or more solves are DNF', () => {

  const context = createStatsContext(schema);
  
  // Add two DNF solves
  addSolve(context, { timeMs: 200, penalty: null });
  computeStats(context);
  addSolve(context, { timeMs: 200, penalty: 'DNF' });
  computeStats(context);
  addSolve(context, { timeMs: 300, penalty: 'DNF' });
  computeStats(context);
  addSolve(context, { timeMs: 200, penalty: null });
  computeStats(context);
  addSolve(context, { timeMs: 200, penalty: null });
  computeStats(context);
  
  
  // Check the computed stats
  expect(context.computedStats.avg5).toBe('DNF');
})