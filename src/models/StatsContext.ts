import { computeMean, computeAverage, selectBestOrWorst } from '../lib/stats'
import type { StatsResult } from './StatsResult'
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

export function computeStats(context: StatsContext, newResult: StatsResult): ComputedStats {
  const allResults = [...context.results, newResult]
  const newComputedStats = {} as ComputedStats
  for (const key in context.schema) {
    const item = context.schema[key]
    const previous = context.computedStats[key]
    let computed: StatsResult | null = null
    if (item.metric === 'single') {
      computed = newResult
    } else if (item.metric === 'mean') {
      computed = computeMean(item, allResults)
    } else if (item.metric === 'average') {
      computed = computeAverage(item, allResults)
    }
    newComputedStats[key] = selectBestOrWorst(item, computed, previous)
  }

  return newComputedStats
}
