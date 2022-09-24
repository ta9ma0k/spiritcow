import { BorderButton } from '../Button'
import Icon from '/cow.svg'

const initYear = () => {
  const today = new Date()
  const year = today.getFullYear()
  return [year, year + 1]
}
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
type MonthFormProps = {
  onChangeYear: (year: number) => void
  onChangeMonth: (month: number) => void
  onNext: () => void
}
export const MonthForm = (props: MonthFormProps) => {
  return (
    <div className='flex items-center flex-col space-y-2 pt-5'>
      <h1>
        <img src={Icon} alt='icon' />
        spiritcow v{__APP_VERSION__}
      </h1>
      <select
        className='w-20 rounded-lg p-1 bg-slate-50 border hover:cursor-pointer'
        onChange={(e) => props.onChangeYear(Number(e.target.value))}
      >
        {initYear().map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => props.onChangeMonth(Number(e.target.value))}
        className='w-20 rounded-lg p-1 bg-slate-50 border hover:cursor-pointer'
      >
        {MONTHS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <BorderButton text='next' onClick={props.onNext} />
    </div>
  )
}
