export const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
  return a.map((item, index) => [item, b[index]])
}

export const last = <T>(arr: T[]): T | undefined => {
  if (arr.length === 0) return undefined
  return arr[arr.length - 1]
}
