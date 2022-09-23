type MonthFormProps = {
  onChangeYear: (year: number) => void
  onChangeMonth: (month: number) => void
  onNext: () => void
}
export const MonthForm = (props: MonthFormProps) => {
  return (
    <div className='flex items-center flex-col space-y-2 pt-5'>
      <input
        placeholder='year'
        className='border p-1 w-20 rounded-lg'
        type='number'
        onChange={(e) => props.onChangeYear(e.target.valueAsNumber)}
      />
      <input
        placeholder='month'
        className='border p-1 w-20 rounded-lg'
        type='number'
        onChange={(e) => props.onChangeMonth(e.target.valueAsNumber)}
      />
      <button type='button' onClick={props.onNext}>
        next
      </button>
    </div>
  )
}
