import { type StatsSchema, createStatsSchema } from "../models/StatsSchema";

export const statsSchema: StatsSchema = createStatsSchema({
  averageTrimPercent: 5,
  items: {
    avg5: { type: 'current', metric: 'average', scope: 'number', number: 5, averageTrimPercent: 5 },
    avg12: { type: 'current', metric: 'average', scope: 'number', number: 12, averageTrimPercent: 5 },
    avg25: { type: 'current', metric: 'average', scope: 'number', number: 25, averageTrimPercent: 5 },
    avg50: { type: 'current', metric: 'average', scope: 'number', number: 50, averageTrimPercent: 5 },
    avg100: { type: 'current', metric: 'average', scope: 'number', number: 100, averageTrimPercent: 5 },
  }
})