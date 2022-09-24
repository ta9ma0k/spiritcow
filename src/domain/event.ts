import produce from 'immer'
import { useCallback, useState } from 'react'
import { makeDates } from '../util/date'
import { Farm } from './farm'
import { Time, Times } from './time'

export const EventStatus = {
  NONE: 'none',
  LDMTG: 'lgmtg',
  ADMTG: 'admtg',
  TR: 'tr',
  WORK: 'work',
} as const
export type EventStatus = typeof EventStatus[keyof typeof EventStatus]
export const Events = Object.values(EventStatus)
// key format is farmId-date-time
export type EventMap = Map<string, EventStatus>
type EventMapKey = {
  farmId: string
  date: number
  time: Time
}
const initialState: EventMap = new Map()

const DELIMITER = '-' as const
const toString = (key: EventMapKey): string =>
  [...Object.values(key)].join(DELIMITER)
const eventMapKeyFromString = (stringKey: string): EventMapKey => {
  const _res = stringKey.split(DELIMITER)
  return {
    farmId: _res[0],
    date: Number(_res[1]),
    time: _res[2] as Time,
  }
}
export const getEvent = (
  events: EventMap,
  farmId: string,
  date: number,
  time: Time
): EventStatus | undefined => events.get(toString({ farmId, date, time }))
export const toJpString = (event: EventStatus): string => {
  switch (event) {
    case EventStatus.NONE:
      return '-'
    case EventStatus.WORK:
      return '作業日'
    case EventStatus.TR:
      return '講習会'
    default:
      return event.toUpperCase()
  }
}

export const useEvents = () => {
  const [state, setState] = useState(initialState)

  const setFarm = useCallback((farms: Farm[], year: number, month: number) => {
    const dates = makeDates(year, month)
    setState(
      produce((draft) => {
        farms
          .map((f) => f.id)
          .forEach((farmId) => {
            dates.forEach((date) => {
              Times.forEach((time) => {
                draft.set(
                  toString({ farmId, date: date.getDate(), time }),
                  EventStatus.NONE
                )
              })
            })
          })
      })
    )
  }, [])

  const setEvent = useCallback(
    (farmId: string, date: number, time: Time, status: EventStatus) => {
      setState(
        produce((draft) => {
          draft.set(toString({ farmId, date, time }), status)
        })
      )
    },
    []
  )

  return {
    events: state,
    setFarm,
    setEvent,
  }
}
