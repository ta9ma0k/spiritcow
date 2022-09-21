import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useCSVReader } from 'react-papaparse'
import { CheckIcon } from '../Icon'

type FarmCsv = {
  id: string
  name: string
  adviserIds: string[]
}
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

export const FileImporter = () => {
  const [farms, setFarms] = useState<FarmCsv[]>([])
  const [advisers, setAdvisers] = useState<AdviserCsv[]>([])
  const [ngSchedules, setNgSchedules] = useState<NgScheduleCsv[]>([])

  const handleLoadFarm = useCallback((data: string[]) => {
    setFarms(
      data.map((v) => ({
        id: v[0],
        name: v[1],
        adviserIds: v[2].split(','),
      }))
    )
  }, [])

  const handleLoadAdviser = useCallback((data: string[]) => {
    setAdvisers(
      data.map((v) => ({
        id: v[0],
        lastName: v[1],
        firstName: v[2],
        wage: Number(v[3]),
      }))
    )
  }, [])

  const handleLoadNgSchedule = useCallback((data: string[]) => {
    setNgSchedules(
      data.map((v) => ({
        adviserId: v[1],
        date: Number(v[5].split(/\D/)[2]),
        time: v[6],
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
