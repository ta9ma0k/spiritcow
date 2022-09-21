import { Adviser, Farm } from '../../domain'

type ScheduleCardProps = {
  farm: Farm
  am: Adviser[]
  pm: Adviser[]
  dates: number[]
  onClickDate: () => void
}
export const ScheduleCard = (props: ScheduleCardProps) => {
  return (
    <div className='w-48'>
      <div className='sticky top-0 p-2 border-b-2 border-r-4 bg-zinc-50'>
        <h2 className='text-lg'>{props.farm.name}</h2>
        <h3 className='text-sm'>
          0/{props.farm.cost * 0.85}({props.farm.cost})
        </h3>
      </div>
      <div>
        {props.dates.map((d) => (
          <div key={`d-${d}`} className='border grid grid-cols-10'>
            <div className='flex flex-col items-center text-sm border-r-2 col-span-1'>
              <h5>{d}</h5>
              <h5>S</h5>
            </div>
            <div className='col-span-9 grid grid-cols-2'>
              <div
                className='border-r-2 grid-span-1 hover:cursor-pointer hover:bg-lime-100 duration-100'
                onClick={props.onClickDate}
              >
                <h5 className='p-0 text-xs'>am</h5>
                <div className='px-1 text-sm border-t-2'>
                  {props.am.map((v) => (
                    <p>{`${v.lastName}${v.firstName}`}</p>
                  ))}
                </div>
              </div>
              <div
                className='border-r-2 grid-span-1 hover:cursor-pointer hover:bg-lime-100 duration-100 h-20'
                onClick={props.onClickDate}
              >
                <h5 className='p-0 text-xs'>pm</h5>
                <div className='px-1 text-sm border-t-2'>
                  {props.pm.map((v) => (
                    <p>{`${v.lastName}${v.firstName}`}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
