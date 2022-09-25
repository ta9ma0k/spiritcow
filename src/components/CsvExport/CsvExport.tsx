import { useCallback, useRef } from 'react'
import { CSVLink } from 'react-csv'
import {
  EventMap,
  eventMapKeyFromString,
  EventStatus,
  Farm,
  scheduleKeyFromString,
  ScheduleMap,
  ScheduleStatus,
  toJpString,
} from '../../domain'
import { eventTimeToString, Time, timeToString } from '../../domain/time'
import {
  EventCsv,
  EVENT_HEADERS,
  JinjaCsv,
  JINJA_HEADERS,
  ShiftCsv,
  SHIFT_HEADERS,
} from './csv'

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
      const [start, end] = timeToString(key.time)
      return {
        name: `${ad.lastName} ${ad.firstName}`,
        adId: key.adviserId,
        date: `${year}/${month}/${key.date}`,
        gId: '36',
        gName: '農園',
        start,
        end,
      }
    })
}

const toShiftCsv = (
  schedules: ScheduleMap,
  farms: Farm[],
  year: number,
  month: number
): ShiftCsv[] => {
  return [...schedules.entries()]
    .filter(([_, s]) => s === ScheduleStatus.ASSIGNED)
    .map(([strKey]) => {
      const key = scheduleKeyFromString(strKey)
      const farm = farms.find(({ id }) => id === key.farmId)
      if (!farm) {
        throw new Error(`not found farm. ${key.farmId}`)
      }
      const ad = farm.advisers.find(({ id }) => id === key.adviserId)
      if (!ad) {
        throw new Error(`not found adviser. ${key.adviserId}`)
      }
      const [start, end] = timeToString(key.time)
      return {
        display: '1',
        workType: 'farm', //TODO other?
        version: '2022_07',
        adId: key.adviserId,
        lastName: ad.lastName + ' ',
        firstName: ad.firstName,
        farmName: farm.name,
        farmId: key.farmId,
        date: `${year}/${month}/${key.date}`,
        start,
        end,
      }
    })
}

const objectByEventKey = (
  e: EventStatus,
  time: Time
): Omit<
  EventCsv,
  | 'displayStatus'
  | 'displayAd'
  | 'displayUser'
  | 'date'
  | 'farmId'
  | 'version'
  | 'eventType'
> => {
  switch (e) {
    case EventStatus.TR:
      const [start, end] = eventTimeToString(time)
      return { title: '体験会', allDay: '0', start, end }
    case EventStatus.LDMTG:
    case EventStatus.ADMTG:
    case EventStatus.WORK:
      return { title: toJpString(e), allDay: '1' }
    default:
      throw new Error('not expexted value.')
  }
}
const toEventCsv = (
  events: EventMap,
  year: number,
  month: number
): EventCsv[] => {
  return [...events.entries()]
    .filter(([_, e]) => e !== EventStatus.NONE)
    .map(([strKey, e]) => {
      const key = eventMapKeyFromString(strKey)
      return {
        displayStatus: '1',
        displayUser: '1',
        displayAd: '0',
        version: '2022_07',
        eventType: 'nothing',
        date: `${year}/${month}/${key.date}`,
        farmId: key.farmId,
        ...objectByEventKey(e, key.time),
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
          headers={SHIFT_HEADERS}
          data={toShiftCsv(
            props.schedules,
            props.farms,
            props.year,
            props.month
          )}
          filename={SHIFT_FILENAME}
          ref={ref2}
          enclosingCharacter=''
        />
        <CSVLink
          headers={EVENT_HEADERS}
          data={toEventCsv(props.events, props.year, props.month)}
          filename={EVENT_FILENAME}
          ref={ref3}
          enclosingCharacter=''
        />
      </div>
    </>
  )
}
