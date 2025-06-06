import { compareResults, type StatsResult } from '../models/StatsResult'
import type { StatsSchemaItem } from '../models/StatsSchemaItem'

export function computeAverage(item: StatsSchemaItem, results: StatsResult[]): StatsResult | null {
  let pickedResults: StatsResult[]
  if (item.scope === 'number') {
    if (results.length < item.number!) return null
    else pickedResults = results.slice(-item.number!)
  } else pickedResults = results
  console.log('pickedResults', pickedResults)

  const trimAmount = Math.ceil((pickedResults.length * item.averageTrimPercent!) / 100)
  if (pickedResults.length < 2 * trimAmount) return null

  const dnf = pickedResults.filter((result) => result === 'DNF')
  if (dnf.length > trimAmount) return 'DNF'

  const sorted = [...pickedResults].sort(compareResults)
  const middle = sorted.slice(trimAmount, -trimAmount)

  const sum = middle.reduce((acc: number, result) => acc + (result as number), 0)
  return Math.round(sum / middle.length)
}

export function computeMean(item: StatsSchemaItem, results: StatsResult[]): StatsResult | null {
  let pickedResults: StatsResult[]
  if (item.scope === 'number') {
    if (results.length < item.number!) return null
    else pickedResults = results.slice(-item.number!)
  } else pickedResults = results

  const dnf = pickedResults.find((result) => result === 'DNF')
  if (dnf) return 'DNF'

  const sum = pickedResults.reduce((acc: number, result) => acc + (result as number), 0)
  return Math.round(sum / pickedResults.length)
}

export function selectBestOrWorst(
  item: StatsSchemaItem,
  result: StatsResult | null,
  previous: StatsResult | null
): StatsResult | null {
  if (previous === null) {
    return result
  } else {
    if (result === null) return result
    else if (item.type === 'best') {
      if (result === 'DNF' && previous !== 'DNF') return previous
      else if (result === 'DNF' && previous === 'DNF') return 'DNF'
      else if (result !== 'DNF' && previous === 'DNF') return result
      else if (result !== 'DNF' && previous !== 'DNF') return result < previous ? result : previous
    } else if (item.type === 'worst') {
      if (result === 'DNF') return result
      else if (previous === 'DNF') return previous
      else return result > previous ? result : previous
    }
  }
  return result
}
