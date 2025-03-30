export const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
  return a.map((item, index) => [item, b[index]])
}
