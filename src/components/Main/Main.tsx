import { useState } from 'react'
import { useFarm } from '../../domain'
import { useAdviser } from '../../domain/adviser'
import { FileImporter } from '../FileImporter'
import { MonthForm } from '../MonthForm'
import { ScheduleEditor } from '../Schedule'

type Status = 'EDIT_MONTH' | 'IMPORT_FILE' | 'EDIT_SCHEDULES'

type NextButtonProps = {
  onClick: () => void
}
const NextButton = (props: NextButtonProps) => (
  <button
    onClick={props.onClick}
    className='border rounded-full border-blue-300 text-blue-300 px-1'
  >
    next
  </button>
)

export const Main = () => {
  const [status, setStatus] = useState<Status>('EDIT_MONTH')
  const [base, setBase] = useState<{ year: number; month: number }>({
    year: 0,
    month: 0,
  })
  const { farms, setFarm } = useFarm()
  const { advisers, setAdviser, setNgSchedule } = useAdviser()

  if (status === 'EDIT_MONTH') {
    return (
      <div className='flex flex-col items-center space-y-3'>
        <MonthForm
          onChangeYear={(year) => setBase((s) => ({ ...s, year }))}
          onChangeMonth={(month) => setBase((s) => ({ ...s, month }))}
        />
        <NextButton onClick={() => setStatus('IMPORT_FILE')} />
      </div>
    )
  }
  if (status === 'IMPORT_FILE') {
    return (
      <div className='flex flex-col items-center'>
        <FileImporter
          month={base}
          onLoadFarmCsv={setFarm}
          onLoadAdviserCsv={setAdviser}
          onLoadNgScheduleCsv={setNgSchedule}
        />
        <NextButton onClick={() => setStatus('EDIT_SCHEDULES')} />
      </div>
    )
  }
  return (
    <div>
      <ScheduleEditor farms={farms} advisers={advisers} month={base} />
    </div>
  )
}
