export type Time = 'AM' | 'PM' | 'AMPM'
//TODO SUMMER TIME
export const timeFromString = (value: string): Time => {
  if (value === '休み') {
    return 'AMPM'
  }
  const [start, end] = value.split(' ~ ').map((v) => Number(v.split(':')[0]))
  if (start >= 12) {
    return 'PM'
  }
  if (end <= 13) {
    return 'AM'
  }
  return 'AMPM'
}
