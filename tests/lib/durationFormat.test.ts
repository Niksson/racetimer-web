import { formatDuration } from '../../src/lib/durationFormat'

test.each([
  [693.3333333333334, '0.693'],
  [696.6666666666667, '0.697'],
  [0, '0.000'],
  [1, '0.001'],
  [10, '0.010'],
  [100, '0.100'],
  [1000, '1.000'],
  [10000, '10.000'],
  [60000, '1:00.000'],
  [62300, '1:02.300'],
  [3600000, '1:00:00.000'],
  [86400000, '1:00:00:00.000']
])('%i milliseconds should be converted to %s', (milliseconds, expectedString) => {
  const result = formatDuration(milliseconds)
  expect(result).toBe(expectedString)
})
