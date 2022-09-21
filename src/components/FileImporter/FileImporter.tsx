import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useCSVReader } from 'react-papaparse'
import { Farm } from '../../domain'
import { Adviser } from '../../domain/adviser'
import { Time, timeFromString } from '../../domain/time'
import { CheckIcon } from '../Icon'
type AdviserCsv = {
  id: string
  lastName: string
  firstName: string
  wage: number
}
type NgScheduleCsv = {
  adviserId: string
  date: number
  time: string
}

type CsvReaderProps = {
  title: string
  onLoad: (data: string[]) => void
}
const CsvReader = (props: CsvReaderProps) => {
  const { CSVReader } = useCSVReader()

  return (
    <CSVReader
      onUploadAccepted={({ data }: { data: string[] }) => {
        props.onLoad(data.slice(1))
      }}
    >
      {({ getRootProps, acceptedFile }: any) => (
        <div className='flex justify-center'>
          <h2 className='flex items-center w-36'>
            <span
              className={clsx(acceptedFile ? 'text-lime-500' : 'text-gray-400')}
            >
              <CheckIcon />
            </span>
            {props.title}
          </h2>
          <button
            type='button'
            {...getRootProps()}
            className='border rounded-full px-2 text-sm duration-200 hover:border-gray-400'
          >
            select file
          </button>
        </div>
      )}
    </CSVReader>
  )
}

const makeDateList = (year: number, month: number): number[] => {
  const lastDate = new Date(year, month)
  lastDate.setDate(-1)
  return [...Array(lastDate.getDate())].map((v) => v + 1)
}
type FileImporterProps = {
  month: { year: number; month: number }
  onLoadFarmCsv: (farms: Farm[]) => void
  onLoadAdviserCsv: (advisers: Adviser[]) => void
  onLoadNgScheduleCsv: (
    data: { adviserId: string; date: number; time: Time }[]
  ) => void
}
export const FileImporter = (props: FileImporterProps) => {
  const [ngSchedules, setNgSchedules] = useState<NgScheduleCsv[]>([])

  const handleLoadFarm = useCallback((data: string[]) => {
    props.onLoadFarmCsv(
      data.map((v) => ({
        id: v[0],
        name: v[1],
        adviserIds: v[2].split(','),
        cost: 0,
      }))
    )
  }, [])

  const handleLoadAdviser = useCallback((data: string[]) => {
    props.onLoadAdviserCsv(
      data.map((v) => ({
        id: v[0],
        lastName: v[1],
        firstName: v[2],
        wage: Number(v[3]),
        schedules: makeDateList(props.month.year, props.month.month).flatMap(
          (v) => [
            { date: v, time: 'AM', status: 'none' },
            { date: v, time: 'PM', status: 'none' },
          ]
        ),
      }))
    )
  }, [])

  const handleLoadNgSchedule = useCallback((data: string[]) => {
    props.onLoadNgScheduleCsv(
      data.map((v) => ({
        adviserId: v[1],
        date: Number(v[5].split(/\D/)[2]),
        time: timeFromString(v[6]),
      }))
    )
  }, [])

  return (
    <div className='p-5 flex flex-col justifiy-center w-full space-y-2'>
      <CsvReader title='farm' onLoad={handleLoadFarm} />
      <CsvReader title='adviser' onLoad={handleLoadAdviser} />
      <CsvReader title='ng schedule' onLoad={handleLoadNgSchedule} />
    </div>
  )
}
