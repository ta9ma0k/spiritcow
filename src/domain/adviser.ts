import produce from 'immer'
import { useCallback, useState } from 'react'
import { Time } from './time'

type FarmId = string
type Schedule = {
  date: number
  time: Time
  status: FarmId | 'none' | 'NG'
}
type Adviser = {
  id: string
  lastName: string
  firstName: string
  wage: number
  schedules: Schedule[]
}

export const useAdviser = () => {
  const [advisers, setAdviser] = useState<Adviser[]>([])

  const setNgSchedule = useCallback(
    (data: { adviserId: string; date: number; time: Time }[]) => {
      setAdviser(
        produce((draft) => {
          data.forEach((v) => {
            const ad = draft.find((d) => d.id === v.adviserId)
            if (v.time === 'AMPM') {
              const am = ad?.schedules.find(
                (s) => s.date === v.date && s.time === 'AM'
              )
              if (am) am.status = 'NG'
              const pm = ad?.schedules.find(
                (s) => s.date === v.date && s.time === 'PM'
              )
              if (pm) pm.status = 'NG'
            } else if (v.time === 'AM') {
              const am = ad?.schedules.find(
                (s) => s.date === v.date && s.time === 'AM'
              )
              if (am) am.status = 'NG'
            } else if (v.time === 'PM') {
              const pm = ad?.schedules.find(
                (s) => s.date === v.date && s.time === 'PM'
              )
              if (pm) pm.status = 'NG'
            }
          })
        })
      )
    },
    []
  )

  return {
    advisers,
    setAdviser,
    setNgSchedule,
  }
}
