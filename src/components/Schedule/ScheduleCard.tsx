import { Adviser, Farm } from '../../domain'
import { toDayJp } from '../../util/date'

type ScheduleCardProps = {
  farm: Farm
  dates: Date[]
  advisers: Adviser[]
  onClickDate: () => void
}
export const ScheduleCard = (props: ScheduleCardProps) => {
  const cost = props.advisers
    .map(
      (a) =>
        a.schedules.filter((s) => s.status === props.farm.id).length *
        a.wage *
        3
    )
    .reduce((acc, current) => acc + current, 0)
  return (
    <div className='w-48'>
      <div className='sticky top-0 p-1 border-b-2 border-r-4 bg-zinc-50'>
        <h2 className='text-lg'>{props.farm.name}</h2>
        <h3 className='text-sm'>
          {cost}/{Math.floor(props.farm.cost * 0.85).toLocaleString()}
        </h3>
      </div>
      <div>
        {props.dates.map((d) => (
          <div key={`d-${d}`} className='border grid grid-cols-10'>
            <div className='flex flex-col items-center text-xs border-r-2 col-span-1'>
              <h5>{d.getDate()}</h5>
              <h5>{toDayJp(d)}</h5>
            </div>
            <div className='col-span-9 grid grid-cols-2'>
              <div
                className='border-r-2 grid-span-1 hover:cursor-pointer hover:bg-lime-100 duration-100'
                onClick={props.onClickDate}
              >
                <h5 className='p-0 text-xs'>am</h5>
                <div className='px-1 text-sm border-t-2'>
                  {props.advisers
                    .filter(
                      (v) =>
                        !!v.schedules.find(
                          (s) =>
                            s.date === d.getDate() &&
                            s.time === 'AM' &&
                            s.status === props.farm.id
                        )
                    )
                    .map((v) => (
                      <p>{`${v.lastName}${v.firstName}`}</p>
                    ))}
                </div>
              </div>
              <div
                className='border-r-2 grid-span-1 hover:cursor-pointer hover:bg-lime-100 duration-100 h-20'
                onClick={props.onClickDate}
              >
                <h5 className='p-0 text-xs'>pm</h5>
                {props.advisers
                  .filter(
                    (v) =>
                      !!v.schedules.find(
                        (s) =>
                          s.date === d.getDate() &&
                          s.time === 'PM' &&
                          s.status === props.farm.id
                      )
                  )
                  .map((v) => (
                    <p>{`${v.lastName}${v.firstName}`}</p>
                  ))}
                <div className='px-1 text-sm border-t-2'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
