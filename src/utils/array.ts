export const toWindows = <T>(arr: T[]): T[][] => {
  const windows = []
  for (let i = 0; i < arr.length - 1; ++i) windows.push(arr.slice(i, i + 2))
  return windows
}
