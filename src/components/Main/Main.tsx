import { useCallback, useState } from 'react'
import { Farm, NgData, useEvents, useFarm, useSchedule } from '../../domain'
import { FileImporter } from '../FileImporter'
import { MonthForm } from '../MonthForm'
import { ScheduleEditor } from '../Schedule'

type Status = 'EDIT_MONTH' | 'IMPORT_FILE' | 'EDIT_SCHEDULES'

export const Main = () => {
  const [status, setStatus] = useState<Status>('EDIT_MONTH')
  const [base, setBase] = useState<{ year: number; month: number }>({
    year: 0,
    month: 0,
  })
  const { farms, setFarm } = useFarm()
  const { setFarm: initSchedule, schedules } = useSchedule()
  const { setFarm: initEvent } = useEvents()

  const handleNextBase = useCallback(() => {
    setStatus('IMPORT_FILE')
  }, [])

  const handleNextFileImporter = useCallback(
    (farms: Farm[], ngData: NgData[]) => {
      setFarm(farms)
      initSchedule(farms, ngData, base.year, base.month)
      initEvent(farms, base.year, base.month)
      setStatus('EDIT_SCHEDULES')
    },
    [base]
  )

  if (status === 'EDIT_MONTH') {
    return (
      <MonthForm
        onChangeYear={(year) => setBase((s) => ({ ...s, year }))}
        onChangeMonth={(month) => setBase((s) => ({ ...s, month }))}
        onNext={handleNextBase}
      />
    )
  }
  if (status === 'IMPORT_FILE') {
    return <FileImporter onNext={handleNextFileImporter} />
  }
  return (
    <ScheduleEditor
      farms={farms}
      schedules={schedules}
      year={base.year}
      month={base.month}
    />
  )
}
