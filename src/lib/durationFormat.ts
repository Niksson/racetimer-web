import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export function formatDuration(millis: number): string {
  const rounded = Math.round(millis)
  const duration = dayjs.duration(rounded)
  const parts: string[] = []

  const days = duration.days()
  if (days) parts.push(duration.format('D:'))

  const hours = duration.hours()
  const hoursFormat = days ? 'HH:' : 'H:'
  if (days || hours) parts.push(duration.format(hoursFormat))

  const minutes = duration.minutes()
  const minutesFormat = days || hours ? 'mm:' : 'm:'
  if (days || hours || minutes) parts.push(duration.format(minutesFormat))

  const secondsFormat = days || hours || minutes ? 'ss.SSS' : 's.SSS'
  parts.push(duration.format(secondsFormat))

  return parts.join('')
}
