export type StatsSchemaItem = {
  type: StatsType
  metric: StatsMetric
  scope: StatsScope
  number?: number
  averageTrimPercent?: number
}

export type StatsType = 'best' | 'worst' | 'current'

export type StatsMetric = 'single' | 'average' | 'mean'

export type StatsScope = 'number' | 'all'

export function createStatsSchemaItem(
  type: StatsType,
  metric: StatsMetric,
  scope: StatsScope,
  number: number | undefined = undefined,
  averageTrimPercent: number | undefined = undefined
): StatsSchemaItem {
  const item = { type, metric, scope, number, averageTrimPercent }
  return item
}

export function validateStatsSchemaItem(item: StatsSchemaItem): void {
  if (item.type === 'worst' || item.type === 'best') {
    if (item.metric === 'single' && item.scope === 'number') {
      throw new Error('worst/best single cannot be used with number scope')
    }
    if ((item.metric === 'mean' || item.metric === 'average') && item.scope === 'all') {
      throw new Error('worst/best mean/average cannot be used with all scope')
    }
  } else if (item.type === 'current' && item.metric === 'single') {
    throw new Error('current cannot be used with single metric')
  }
  if (item.metric === 'average') {
    if (!item.averageTrimPercent) {
      throw new Error('average metric must have specify how many results to trim')
    }
    if (item.averageTrimPercent > 50) {
      throw new Error('average trimming percent cannot be greater than 50')
    }
  }

  if (
    (item.metric === 'average' || item.metric === 'mean') &&
    item.scope === 'number' &&
    !item.number
  ) {
    throw new Error('average and mean metrics must specify a number if scope is not "all"')
  }
}
