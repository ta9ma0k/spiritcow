import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { Farm, getSchedule, ScheduleMap, ScheduleStatus } from '../../domain'
import { Time } from '../../domain/time'
import { makeDates, toDayJp } from '../../util/date'
import { Dialog } from '../Dialog'
import { CheckIcon, NgIcon } from '../Icon'
import { ScheduleCard } from './ScheduleCard'

type DialogState = {
  farm: Farm
  date: Date
  time: Time
}
type ScheduleEditorProps = {
  year: number
  month: number
  farms: Farm[]
  schedules: ScheduleMap
  onAssign: (
    farmId: string,
    date: number,
    time: Time,
    adviserId: string
  ) => void
  onUnAssign: (
    farmId: string,
    date: number,
    time: Time,
    adviserId: string
  ) => void
}
export const ScheduleEditor = (props: ScheduleEditorProps) => {
  const [dialog, setDialog] = useState<DialogState>()
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
              onClickDate={(farm, date, time) =>
                setDialog({ farm, date, time })
              }
            />
          </React.Fragment>
        ))}
      </div>
      <Dialog show={!!dialog} onClose={() => setDialog(undefined)}>
        {dialog && (
          <div>
            <h3>{dialog.farm.name}</h3>
            <h4>{`${dialog.date.getDate()}(${toDayJp(dialog.date)}) ${
              dialog.time
            }`}</h4>
            <div className='flex flex-col space-y-2 mt-5'>
              {dialog.farm.advisers.map((ad) => {
                const s = getSchedule(props.schedules, {
                  farmId: dialog.farm.id,
                  date: dialog.date.getDate(),
                  time: dialog.time,
                  adviserId: ad.id,
                })
                return (
                  <div
                    className={clsx(
                      'border p-2 rounded-md flex items-center space-x-2',
                      s !== ScheduleStatus.NG
                        ? 'hover:cursor-pointer hover:border-lime-400'
                        : ''
                    )}
                    onClick={() => {
                      if (s === ScheduleStatus.NG) return
                      if (s === ScheduleStatus.FREE) {
                        props.onAssign(
                          dialog.farm.id,
                          dialog.date.getDate(),
                          dialog.time,
                          ad.id
                        )
                      } else {
                        props.onUnAssign(
                          dialog.farm.id,
                          dialog.date.getDate(),
                          dialog.time,
                          ad.id
                        )
                      }
                    }}
                  >
                    {s === ScheduleStatus.NG ? (
                      <span>
                        <NgIcon />
                      </span>
                    ) : (
                      <span
                        className={clsx(
                          s === ScheduleStatus.ASSIGNED
                            ? 'text-lime-500'
                            : 'text-gray-200'
                        )}
                      >
                        <CheckIcon />
                      </span>
                    )}
                    <p>{`${ad.lastName}${ad.firstName}`}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Dialog>
    </>
  )
}
