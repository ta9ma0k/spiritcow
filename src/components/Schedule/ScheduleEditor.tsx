import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import {
  Farm,
  getSchedule,
  scheduleKeyFromString,
  ScheduleMap,
  ScheduleStatus,
} from '../../domain'
import { Time, Times } from '../../domain/time'
import { makeDates, toDayJp } from '../../util/date'
import { Dialog } from '../Dialog'
import { CheckIcon, NgIcon } from '../Icon'
import { ScheduleCard } from './ScheduleCard'

const countAdSchedule = (
  schedules: ScheduleMap,
  farmId: string,
  adviserId: string
): number =>
  [
    ...new Map(
      [...schedules.keys()]
        .map(scheduleKeyFromString)
        .map((key) => [
          `${key.date}-${key.time}`,
          { date: key.date, time: key.time },
        ])
    ),
  ]
    .map(([_, { date, time }]) =>
      getSchedule(schedules, { farmId, date, time, adviserId })
    )
    .filter((s) => s === ScheduleStatus.ASSIGNED).length

type DialogState = {
  farm: Farm
  date: Date
  time: Time
}
type DialogContentsProps = {
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
} & DialogState
const DialogContents = (props: DialogContentsProps) => {
  const { farm, date, time, schedules } = props
  return (
    <div>
      <h3>{farm.name}</h3>
      <h4>{`${date.getDate()}(${toDayJp(date)}) ${time}`}</h4>
      <div className='flex flex-col space-y-2 mt-5'>
        {farm.advisers.map((ad) => {
          const s = getSchedule(schedules, {
            farmId: farm.id,
            date: date.getDate(),
            time: time,
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
                  props.onAssign(farm.id, date.getDate(), time, ad.id)
                } else {
                  props.onUnAssign(farm.id, date.getDate(), time, ad.id)
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
              <span>{`${ad.lastName}${ad.firstName}`}</span>
              <span>{countAdSchedule(schedules, farm.id, ad.id)} times</span>
            </div>
          )
        })}
      </div>
    </div>
  )
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
          <DialogContents
            farm={dialog.farm}
            date={dialog.date}
            time={dialog.time}
            schedules={props.schedules}
            onAssign={props.onAssign}
            onUnAssign={props.onUnAssign}
          />
        )}
      </Dialog>
    </>
  )
}
