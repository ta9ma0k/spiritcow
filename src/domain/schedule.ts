import produce from 'immer'
import { useCallback, useState } from 'react'
import { makeDates } from '../util/date'
import { Farm } from './farm'
import { Time, Times } from './time'

export type NgData = {
  adviserId: string
  date: number
  time: Time
}

export const ScheduleStatus = {
  ASSIGNED: 'assigned',
  FREE: 'free',
  NG: 'ng',
} as const
type ScheduleStatus = typeof ScheduleStatus[keyof typeof ScheduleStatus]
// key format is farmId-date-time-adviserId
type ScheduleMapKey = {
  farmId: string
  date: number
  time: Time
  adviserId: string
}
export type ScheduleMap = Map<string, ScheduleStatus>
const initialState: ScheduleMap = new Map()
const DELIMITER = '-' as const
const toString = (key: ScheduleMapKey): string =>
  [...Object.values(key)].join(DELIMITER)
export const scheduleKeyFromString = (stringKey: string): ScheduleMapKey => {
  const splited = stringKey.split(DELIMITER)
  return {
    farmId: splited[0],
    date: Number(splited[1]),
    time: splited[2] as Time,
    adviserId: splited[3],
  }
}
export const getSchedule = (
  value: ScheduleMap,
  key: ScheduleMapKey
): ScheduleStatus => {
  const res = value.get(toString(key))
  if (!res) {
    throw new Error('not found value.')
  }
  return res
}
export const useSchedule = () => {
  const [state, setState] = useState(initialState)

  const setFarm = useCallback(
    (farms: Farm[], ngDatas: NgData[], year: number, month: number) => {
      const dates = makeDates(year, month)
      setState(
        produce((draft) => {
          farms.forEach((f) => {
            dates.forEach((d) => {
              Times.forEach((t) => {
                f.advisers.forEach((a) => {
                  const isNg = ngDatas.find(
                    (v) =>
                      v.adviserId === a.id &&
                      v.date === d.getDay() &&
                      v.time === t
                  )
                  draft.set(
                    toString({
                      farmId: f.id,
                      date: d.getDate(),
                      time: t,
                      adviserId: a.id,
                    }),
                    isNg ? ScheduleStatus.NG : ScheduleStatus.FREE
                  )
                })
              })
            })
          })
        })
      )
    },
    []
  )

  const assign = useCallback(
    (farmId: string, date: number, time: Time, adviserId: string) => {
      setState(
        produce((draft) => {
          const s = draft.get(toString({ farmId, date, time, adviserId }))
          if (s === undefined || s === ScheduleStatus.NG) {
            return
          }
          ;[
            ...new Set(
              [...draft.keys()].map(scheduleKeyFromString).map((v) => v.farmId)
            ),
          ].forEach((fId) => {
            const key = toString({ farmId: fId, date, time, adviserId })
            if (draft.has(key)) {
              draft.set(
                key,
                farmId === fId ? ScheduleStatus.ASSIGNED : ScheduleStatus.FREE
              )
            }
          })
        })
      )
    },
    []
  )

  const unassign = useCallback(
    (farmId: string, date: number, time: Time, adviserId: string) => {
      setState(
        produce((draft) => {
          const key = toString({ farmId, date, time, adviserId })
          const s = draft.get(key)
          if (s === undefined || s === ScheduleStatus.NG) {
            return
          }
          draft.set(key, ScheduleStatus.FREE)
        })
      )
    },
    []
  )

  return {
    schedules: state,
    setFarm,
    assign,
    unassign,
  }
}
