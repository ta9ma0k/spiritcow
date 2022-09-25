import { useCallback, useRef } from 'react'
import { CSVLink } from 'react-csv'
import {
  EventMap,
  Farm,
  scheduleKeyFromString,
  ScheduleMap,
  ScheduleStatus,
} from '../../domain'
import { Time } from '../../domain/time'
import { JinjaCsv, JINJA_HEADERS } from './csv'

const headers = [
  { label: 'First Name', key: 'firstname' },
  { label: 'Last Name', key: 'lastname' },
  { label: 'Email', key: 'email' },
]

const data = [
  { firstname: 'Ahmed', lastname: 'Tomi' },
  { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
  { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
]

const JINJA_FILENAME = 'jinjerインポート用.csv'
const SHIFT_FILENAME = '管理画面シフトインポート用.csv'
const EVENT_FILENAME = '管理画面イベントインポート用.csv'

const toJinjaCsv = (
  schedules: ScheduleMap,
  farms: Farm[],
  year: number,
  month: number
): JinjaCsv[] => {
  return [...schedules.entries()]
    .filter(([_, s]) => s === ScheduleStatus.ASSIGNED)
    .map(([strKey]) => {
      const key = scheduleKeyFromString(strKey)
      const farm = farms.find(({ id }) => id === key.farmId)
      if (!farm) {
        throw new Error(`not found farm id. ${key.farmId}`)
      }
      const ad = farm.advisers.find(({ id }) => id === key.adviserId)
      if (!ad) {
        throw new Error(`not found adviser id. ${key.adviserId}`)
      }
      return {
        name: `${ad.lastName} ${ad.firstName}`,
        adId: key.adviserId,
        date: `${year}/${month}/${key.date}`,
        gId: '36',
        gName: '農園',
        start: key.time === Time.AM ? '9:00' : '13:00',
        end: key.time === Time.AM ? '12:00' : '16:00',
      }
    })
}

type CsvExportButtonProps = {
  farms: Farm[]
  schedules: ScheduleMap
  events: EventMap
  year: number
  month: number
}
export const CsvExportButton = (props: CsvExportButtonProps) => {
  const ref1 = useRef<
    CSVLink & HTMLAnchorElement & { link?: HTMLAnchorElement }
  >(null)
  const ref2 = useRef<
    CSVLink & HTMLAnchorElement & { link?: HTMLAnchorElement }
  >(null)
  const ref3 = useRef<
    CSVLink & HTMLAnchorElement & { link?: HTMLAnchorElement }
  >(null)

  const handleClick = useCallback(() => {
    if (ref1?.current) {
      ref1.current.link?.click()
    }
    if (ref2?.current) {
      ref2.current.link?.click()
    }
    if (ref3?.current) {
      ref3.current.link?.click()
    }
  }, [ref1, ref2, ref3])

  return (
    <>
      <button
        onClick={handleClick}
        className='hover:bg-zinc-300 hover:text-white duration-200 w-full border font-bold text-zinc-500'
      >
        Download
      </button>
      <div className='hidden'>
        <CSVLink
          headers={JINJA_HEADERS}
          data={toJinjaCsv(
            props.schedules,
            props.farms,
            props.year,
            props.month
          )}
          filename={JINJA_FILENAME}
          ref={ref1}
          enclosingCharacter=''
        />
        <CSVLink
          headers={headers}
          data={data}
          filename={SHIFT_FILENAME}
          ref={ref2}
        />
        <CSVLink
          headers={headers}
          data={data}
          filename={EVENT_FILENAME}
          ref={ref3}
        />
      </div>
    </>
  )
}
