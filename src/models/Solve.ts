import { formatDuration } from '../lib/durationFormat'
import type { Penalty } from './Penalty'
import { compareResults, toStatsResult } from './StatsResult'

export type Solve = {
  timeMs: number
  penalty: Penalty | null
}

export const toString = (solve: Solve): string => {
  if (solve.penalty === 'DNF') return 'DNF'
  const time = solve.penalty === '+2' ? solve.timeMs + 2000 : solve.timeMs
  const formattedTime = formatDuration(time)

  return solve.penalty === '+2' ? `${formattedTime}+` : formattedTime
}

export const compareSolves = (a: Solve, b: Solve): number => {
  const aStatsResult = toStatsResult(a)
  const bStatsResult = toStatsResult(b)
  return compareResults(aStatsResult, bStatsResult)
}
