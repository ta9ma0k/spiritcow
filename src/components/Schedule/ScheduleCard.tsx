import { Farm, getSchedule, ScheduleMap, ScheduleStatus } from '../../domain'
import { Time, Times } from '../../domain/time'
import { toDayJp } from '../../util/date'

const calcCost = (farm: Farm, schedules: ScheduleMap, dates: Date[]): number =>
  farm.advisers
    .map((ad) => {
      const statuses = dates
        .map((d) => d.getDate())
        .flatMap((date) =>
          Times.map((time) =>
            getSchedule(schedules, {
              farmId: farm.id,
              date,
              time,
              adviserId: ad.id,
            })
          )
        )
      return (
        statuses.filter((s) => s === ScheduleStatus.ASSIGNED).length *
        3 *
        ad.wage
      )
    })
    .reduce((acc, cur) => acc + cur, 0)

type ScheduleCardProps = {
  farm: Farm
  schedules: ScheduleMap
  dates: Date[]
  onClickDate: (farm: Farm, date: Date, time: Time) => void
}
export const ScheduleCard = (props: ScheduleCardProps) => {
  const { farm, schedules, dates, onClickDate } = props
  const cost = calcCost(farm, schedules, dates)
  return (
    <div className='w-48'>
      <div className='sticky top-0 p-1 border-b-2 border-r-4 bg-zinc-50'>
        <h2 className='text-lg'>{farm.name}</h2>
        <h3 className='text-sm'>
          {cost.toLocaleString()}/
          {Math.floor(farm.cost * 0.85).toLocaleString()}
        </h3>
      </div>
      <div>
        {dates.map((d) => (
          <div key={`d-${d}`} className='border grid grid-cols-10'>
            <div className='flex flex-col items-center text-xs border-r-2 col-span-1'>
              <h5>{d.getDate()}</h5>
              <h5>{toDayJp(d)}</h5>
            </div>
            <div className='col-span-9 grid grid-cols-2'>
              <div
                className='border-r-2 grid-span-1 hover:cursor-pointer hover:bg-lime-100 duration-100'
                onClick={() => onClickDate(farm, d, Time.AM)}
              >
                <h5 className='p-0 text-xs'>am</h5>
                <div className='px-1 text-xs border-t-2'>
                  {farm.advisers.map((ad) => {
                    const s = getSchedule(schedules, {
                      farmId: farm.id,
                      date: d.getDate(),
                      time: Time.AM,
                      adviserId: ad.id,
                    })
                    if (s === ScheduleStatus.ASSIGNED) {
                      return (
                        <p
                          key={`${farm.id}-${ad.id}`}
                        >{`${ad.lastName}${ad.firstName}`}</p>
                      )
                    }
                  })}
                </div>
              </div>
              <div
                className='border-r-2 grid-span-1 hover:cursor-pointer hover:bg-lime-100 duration-100 h-20'
                onClick={() => onClickDate(farm, d, Time.PM)}
              >
                <h5 className='p-0 text-xs'>pm</h5>
                <div className='px-1 text-xs border-t-2'>
                  {props.farm.advisers.map((ad) => {
                    const s = getSchedule(schedules, {
                      farmId: farm.id,
                      date: d.getDate(),
                      time: Time.PM,
                      adviserId: ad.id,
                    })
                    if (s === ScheduleStatus.ASSIGNED) {
                      return (
                        <p
                          key={`${farm.id}-${ad.id}`}
                        >{`${ad.lastName}${ad.firstName}`}</p>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
