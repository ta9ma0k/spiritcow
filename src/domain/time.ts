export const Time = {
  AM: 'am',
  PM: 'pm',
} as const
export type Time = typeof Time[keyof typeof Time]
export const Times = Object.values(Time)
export const checkSummerTime = (month: number): boolean =>
  7 === month || 8 === month
export const timeFromString = (
  value: string,
  isSummerTime: boolean
): Time[] => {
  if (value === '休み') {
    return [Time.AM, Time.PM]
  }
  const [start, end] = value.split(' ~ ').map((v) => Number(v.split(':')[0]))
  if (start >= 12) {
    return [Time.PM]
  }
  if (end <= (isSummerTime ? 15 : 13)) {
    return [Time.AM]
  }
  return [Time.AM, Time.PM]
}

//TODO summertime
export const timeToString = (
  time: Time,
  isSummerTime: boolean
): [string, string] => {
  switch (time) {
    case Time.AM:
      return isSummerTime ? ['8:00', '11:00'] : ['9:00', '12:00']
    case Time.PM:
      return isSummerTime ? ['15:00', '18:00'] : ['13:00', '16:00']
  }
}
export const eventTimeToString = (time: Time): [string, string] => {
  switch (time) {
    case Time.AM:
      return ['9:30', '10:30']
    case Time.PM:
      return ['13:30', '14:30']
  }
}
