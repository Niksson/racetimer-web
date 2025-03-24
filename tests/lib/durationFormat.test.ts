import { formatDuration } from '../../src/lib/durationFormat'

test.each([
  [693.3333333333334, '00.693'],
  [696.6666666666667, '00.697'],
  [0, '00.000'],
  [1, '00.001'],
  [10, '00.010'],
  [100, '00.100'],
  [1000, '01.000'],
  [10000, '10.000'],
  [60000, '01:00.000'],
  [62300, '01:02.300'],
  [3600000, '01:00:00.000'],
  [86400000, '01:00:00:00.000']
])('%i milliseconds should be converted to %s', (milliseconds, expectedString) => {
  const result = formatDuration(milliseconds)
  expect(result).toBe(expectedString)
})
