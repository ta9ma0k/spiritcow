import { useState } from 'react'
import { useFarm } from '../../domain'
import { useAdviser } from '../../domain/adviser'
import { CostForm } from '../CostForm'
import { FileImporter } from '../FileImporter'
import { MonthForm } from '../MonthForm'

type Status = 'EDIT_MONTH' | 'IMPORT_FILE' | 'SET_COST' | 'EDIT_SCHEDULES'

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
  const { farms, setFarm, setCost } = useFarm()
  const { setAdviser, setNgSchedule } = useAdviser()

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
        <NextButton onClick={() => setStatus('SET_COST')} />
      </div>
    )
  }
  if (status === 'SET_COST') {
    return (
      <div className='flex flex-col items-center'>
        <CostForm farms={farms} onChangeCost={setCost} />
        <NextButton onClick={() => setStatus('EDIT_SCHEDULES')} />
      </div>
    )
  }
  return <div>edit schedules</div>
}
