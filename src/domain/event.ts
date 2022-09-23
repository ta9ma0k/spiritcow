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
type EventStatus = typeof EventStatus[keyof typeof EventStatus]
// key format is farmId-date-time
type EventMap = Map<string, EventStatus>
type EventMapKey = {
  farmId: string
  date: number
  time: Time
}
const initialState: EventMap = new Map()

const DELIMITER = '-' as const
const toString = (key: EventMapKey): string =>
  [...Object.values(key)].join(DELIMITER)
const fromString = (stringKey: string): EventMapKey => {
  const _res = stringKey.split(DELIMITER)
  return {
    farmId: _res[0],
    date: Number(_res[1]),
    time: _res[2] as Time,
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
    (status: EventStatus, farmId: string, date: number, time: Time) => {
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
