export const last = <T>(arr: T[]): T | undefined => {
  if (arr.length === 0) return undefined
  return arr[arr.length - 1]
}

export const getFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key)
  if (item === null) return null
  try {
    return JSON.parse(item) as T
  } catch (e) {
    console.error(`Error parsing localStorage item "${key}":`, e)
    return null
  }
}