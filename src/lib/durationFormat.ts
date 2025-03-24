import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export function formatDuration(millis: number): string {
  const rounded = Math.round(millis)
  const duration = dayjs.duration(rounded)
  const parts: string[] = []

  const days = duration.days()
  if (days) parts.push(duration.format('DD:'))

  const hours = duration.hours()
  if (days || hours) parts.push(duration.format('HH:'))

  const minutes = duration.minutes()
  if (days || hours || minutes) parts.push(duration.format('mm:'))

  parts.push(duration.format('ss.SSS'))

  return parts.join('')
}
