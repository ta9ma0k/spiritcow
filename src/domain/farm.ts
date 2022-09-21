import produce from 'immer'
import { useCallback, useState } from 'react'

export type Farm = {
  id: string
  name: string
  adviserIds: string[]
  cost: number
}

export const useFarm = () => {
  const [farms, setFarm] = useState<Farm[]>([])

  const setCost = useCallback((id: string, cost: number) => {
    setFarm(
      produce((draft) => {
        const f = draft.find((d) => d.id === id)
        if (f) f.cost = cost
      })
    )
  }, [])

  return {
    farms,
    setFarm,
    setCost,
  }
}
