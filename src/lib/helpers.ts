export const last = <T>(arr: T[]): T | undefined => {
  if (arr.length === 0) return undefined
  return arr[arr.length - 1]
}
