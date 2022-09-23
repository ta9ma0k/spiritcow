import { useState } from 'react'

export type Farm = {
  id: string
  name: string
  advisers: Adviser[]
  cost: number
}
export type Adviser = {
  id: string
  lastName: string
  firstName: string
  wage: number
}

export const useFarm = () => {
  const [farms, setFarm] = useState<Farm[]>([])

  return {
    farms,
    setFarm,
  }
}
