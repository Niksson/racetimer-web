import { validateStatsSchemaItem, type StatsSchemaItem } from './StatsSchemaItem'

export type StatsSchema = Record<string, StatsSchemaItem>

export function validateStatsSchema(schema: StatsSchema): void {
  for (const [, item] of Object.entries(schema)) {
    validateStatsSchemaItem(item)
  }
}

export type SchemaCreationOptions = {
  averageTrimPercent: number
  items: StatsSchema
}

export function createStatsSchema(options: SchemaCreationOptions): StatsSchema {
  const schema: StatsSchema = { ...options.items }

  for (const [, item] of Object.entries(schema)) {
    if (item.metric === 'average') item.averageTrimPercent = options.averageTrimPercent
  }

  validateStatsSchema(schema)

  return schema
}
