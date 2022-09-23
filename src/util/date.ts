export const toDayJp = (d: Date): string => {
  switch (d.getUTCDay()) {
    case 0:
      return '日'
    case 1:
      return '月'
    case 2:
      return '火'
    case 3:
      return '水'
    case 4:
      return '木'
    case 5:
      return '金'
    case 6:
      return '土'
    default:
      throw new Error('not expected value.')
  }
}

export const makeDates = (year: number, month: number): Date[] => {
  const lastDate = new Date()
  lastDate.setFullYear(year, month)
  lastDate.setDate(0)
  return [...Array(lastDate.getDate())].map(
    (_, i) => new Date(`${year}-${month}-${i + 1}`)
  )
}
