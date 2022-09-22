import produce from 'immer'
import { useCallback, useState } from 'react'
import { Time } from './time'

type Event = 'LDMTG' | 'ADMTG' | 'TR' | 'WORK' | 'NONE'
type EventSchedule = {
  date: number
  time: Time
  event: Event
}
export type Farm = {
  id: string
  name: string
  adviserIds: string[]
  cost: number
  schedules: EventSchedule[]
}

export const useFarm = () => {
  const [farms, setFarm] = useState<Farm[]>([])

  return {
    farms,
    setFarm,
  }
}
