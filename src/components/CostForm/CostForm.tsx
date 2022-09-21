import { Farm } from '../../domain'

type CostFormProps = {
  farms: Farm[]
}
export const CostForm = (props: CostFormProps) => {
  return (
    <div className='my-5'>
      <ul className='space-y-1 flex flex-col items-center'>
        {props.farms.map((v) => (
          <li key={v.id} className='flex items-center'>
            <h5 className='w-24'>{v.name}</h5>
            <input
              type='number'
              className='border rounded-lg p-1 w-32 text-sm'
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
