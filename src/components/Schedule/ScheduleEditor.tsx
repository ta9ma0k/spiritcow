import React, { useMemo } from 'react'
import { Farm, ScheduleMap } from '../../domain'
import { makeDates } from '../../util/date'
import { ScheduleCard } from './ScheduleCard'

type ScheduleEditorProps = {
  year: number
  month: number
  farms: Farm[]
  schedules: ScheduleMap
}
export const ScheduleEditor = (props: ScheduleEditorProps) => {
  const dates = useMemo(() => makeDates(props.year, props.month), [props.month])
  return (
    <>
      <div className='flex w-fit'>
        {props.farms.map((f) => (
          <React.Fragment key={`schedule-${f.id}`}>
            <ScheduleCard
              farm={f}
              schedules={props.schedules}
              dates={dates}
              onClickDate={(farm, date, time) => 0}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}
