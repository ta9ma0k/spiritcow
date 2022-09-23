import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import {
  Farm,
  getSchedule,
  scheduleKeyFromString,
  ScheduleMap,
  ScheduleStatus,
} from '../../domain'
import { Time } from '../../domain/time'
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

const findOtherSchedule = (
  schedules: ScheduleMap,
  farmNameMap: { [id in string]: string },
  farmId: string,
  date: number,
  time: Time,
  adviserId: string
): string | undefined => {
  const findedId = [
    ...new Set(
      [...schedules.keys()].map(scheduleKeyFromString).map((key) => key.farmId)
    ),
  ]
    .filter((id) => id !== farmId)
    .find(
      (id) =>
        getSchedule(schedules, { farmId: id, date, time, adviserId }) ===
        ScheduleStatus.ASSIGNED
    )
  if (findedId && farmNameMap[findedId]) {
    return farmNameMap[findedId]
  }
}

type DialogState = {
  farm: Farm
  date: Date
  time: Time
}
type DialogContentsProps = {
  schedules: ScheduleMap
  farmNameMap: { [id in string]: string }
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
  const { farm, date, time, schedules, farmNameMap } = props
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
                'border p-2 rounded-md flex items-center justify-between',
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
              <div className='flex space-x-2'>
                {s === ScheduleStatus.NG ? (
                  <p>
                    <NgIcon />
                  </p>
                ) : (
                  <p
                    className={clsx(
                      s === ScheduleStatus.ASSIGNED
                        ? 'text-lime-500'
                        : 'text-gray-200'
                    )}
                  >
                    <CheckIcon />
                  </p>
                )}
                <p>{`${ad.lastName}${ad.firstName}`}</p>
              </div>
              <div>
                {findOtherSchedule(
                  schedules,
                  farmNameMap,
                  farm.id,
                  date.getDate(),
                  time,
                  ad.id
                )}
              </div>
              <div>{countAdSchedule(schedules, farm.id, ad.id)} times</div>
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
            farmNameMap={props.farms.reduce((acc, cur) => {
              acc[cur.id] = cur.name
              return acc
            }, {} as { [id in string]: string })}
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
