import { type StatsSchema, createStatsSchema } from "../models/StatsSchema";

export const statsSchema: StatsSchema = createStatsSchema({
  averageTrimPercent: 5,
  items: {
    avg5: { type: 'current', metric: 'average', scope: 'number', number: 5 },
    avg12: { type: 'current', metric: 'average', scope: 'number', number: 12 },
    avg25: { type: 'current', metric: 'average', scope: 'number', number: 25 },
    avg50: { type: 'current', metric: 'average', scope: 'number', number: 50 },
    avg100: { type: 'current', metric: 'average', scope: 'number', number: 100 }
  }
})