import { formatDuration } from '../lib/durationFormat'

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
