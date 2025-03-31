import { computeMean, computeAverage, selectBestOrWorst } from '../lib/stats'
import type { Solve } from './Solve'
import { toStatsResult, type StatsResult } from './StatsResult'
import type { StatsSchema } from './StatsSchema'

export type ComputedStats = Record<string, StatsResult | null>

export type StatsContext = {
  schema: StatsSchema
  results: StatsResult[]
  computedStats: ComputedStats
}

export function createStatsContext(schema: StatsSchema): StatsContext {
  const computedStats = {} as ComputedStats
  for (const key in schema) {
    computedStats[key] = null
  }
  return {
    schema,
    results: [],
    computedStats
  }
}

export function addSolve(context: StatsContext, solve: Solve): StatsContext {
  const result = toStatsResult(solve)
  context.results.push(result)

  return context
}

export function computeStats(context: StatsContext): StatsContext {
  const [newResult] = context.results.slice(-1)
  const newComputedStats = {} as ComputedStats
  for (const key in context.schema) {
    const item = context.schema[key]
    const previous = context.computedStats[key]
    let computed: StatsResult | null = null
    if (item.metric === 'single') {
      computed = newResult
    } else if (item.metric === 'mean') {
      computed = computeMean(item, context.results)
    } else if (item.metric === 'average') {
      computed = computeAverage(item, context.results)
    }
    newComputedStats[key] = selectBestOrWorst(item, computed, previous)
  }

  context.computedStats = newComputedStats

  return context
}
