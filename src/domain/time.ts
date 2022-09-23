export const Time = {
  AM: 'am',
  PM: 'pm',
} as const
export type Time = typeof Time[keyof typeof Time]
export const Times = Object.values(Time)
//TODO SUMMER TIME
export const timeFromString = (value: string): Time[] => {
  if (value === '休み') {
    return [Time.AM, Time.PM]
  }
  const [start, end] = value.split(' ~ ').map((v) => Number(v.split(':')[0]))
  if (start >= 12) {
    return [Time.PM]
  }
  if (end <= 13) {
    return [Time.AM]
  }
  return [Time.AM, Time.PM]
}
