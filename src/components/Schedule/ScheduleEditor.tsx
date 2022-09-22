import { useMemo } from 'react'
import { Adviser, Farm } from '../../domain'
import { makeDates } from '../../util/date'
import { ScheduleCard } from './ScheduleCard'

type ScheduleEditorProps = {
  month: { year: number; month: number }
  farms: Farm[]
  advisers: Adviser[]
}
export const ScheduleEditor = (props: ScheduleEditorProps) => {
  const dates = useMemo(
    () => makeDates(props.month.year, props.month.month),
    [props.month]
  )
  return (
    <div className='flex w-fit'>
      {props.farms.map((f) => (
        <ScheduleCard
          farm={f}
          dates={dates}
          advisers={
            f.adviserIds
              .map((adId) => props.advisers.find((ad) => ad.id === adId))
              .filter((v) => !!v) as Adviser[]
          }
          onClickDate={() => 1}
        />
      ))}
    </div>
  )
}
