import { formatDuration } from '../lib/durationFormat'
import type { Solve } from './Solve'

export type StatsResult = number | 'DNF'

export function statsResultToString(result: StatsResult): string {
  if (result === 'DNF') return 'DNF'
  return formatDuration(result)
}

export function isSuccessful(result: StatsResult): boolean {
  return result !== 'DNF'
}

export function compareResults(a: StatsResult, b: StatsResult): number {
  if (a === b) return 0
  if (a === 'DNF') return 1
  if (b === 'DNF') return -1
  return a - b
}

export function toStatsResult(solve: Solve): StatsResult {
  if (solve.penalty === 'DNF') return 'DNF'
  const time = solve.penalty === '+2' ? solve.timeMs + 2000 : solve.timeMs
  return time
}
