import { Adviser, Farm } from '../../domain'
import { ScheduleCard } from './ScheduleCard'

const makeDates = (year: number, month: number): number[] => {
  const date = new Date(`${year}-${month}-01`)
  date.setDate(-1)
  return [...Array(date.getDate())].map((_, v) => v + 1)
}

type ScheduleEditorProps = {
  month: { year: number; month: number }
  farms: Farm[]
  advisers: Adviser[]
}
export const ScheduleEditor = (props: ScheduleEditorProps) => {
  const dateList = makeDates(props.month.year, props.month.month)
  return (
    <div className='flex w-fit'>
      {props.farms.map((f) => (
        <ScheduleCard
          farm={f}
          am={[]}
          pm={[]}
          dates={dateList}
          onClickDate={() => 1}
        />
      ))}
    </div>
  )
}
