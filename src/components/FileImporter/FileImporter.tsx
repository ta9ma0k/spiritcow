import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useCSVReader } from 'react-papaparse'
import { Adviser, Farm, NgData } from '../../domain'
import { Time, timeFromString } from '../../domain/time'
import { BorderButton } from '../Button'
import { CheckIcon } from '../Icon'

type CsvReaderProps = {
  title: string
  onLoad: (data: string[]) => void
}
const CsvReader = (props: CsvReaderProps) => {
  const { CSVReader } = useCSVReader()

  return (
    <CSVReader
      onUploadAccepted={({ data }: { data: string[] }) => {
        props.onLoad(data.slice(1).filter((v) => v.length > 1))
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

type FarmCsv = {
  id: string
  name: string
  adviserIds: string[]
  cost: number
}
type AdviserCsv = {
  id: string
  lastName: string
  firstName: string
  wage: number
}
type NgDataCsv = {
  adviserId: string
  date: number
  time: Time[]
}

type FileImporterProps = {
  onNext: (farms: Farm[], ngdata: NgData[]) => void
  isSummerTime: boolean
}
export const FileImporter = (props: FileImporterProps) => {
  const [farmCsv, setFarmCsv] = useState<FarmCsv[]>([])
  const [adviserCsv, setAdviserCsv] = useState<AdviserCsv[]>([])
  const [ngDataCsv, setNgDataCsv] = useState<NgDataCsv[]>([])

  const handleLoadFarm = useCallback((value: string[]) => {
    setFarmCsv(
      value.map((v) => ({
        id: v[0],
        name: v[1],
        adviserIds: v[2].split(','),
        cost: Number(v[3]),
      }))
    )
  }, [])

  const handleLoadAdviser = useCallback((value: string[]) => {
    setAdviserCsv(
      value.map((v) => ({
        id: v[0],
        lastName: v[1],
        firstName: v[2],
        wage: Number(v[3]),
      }))
    )
  }, [])

  const handleLoadNgData = useCallback((value: string[]) => {
    setNgDataCsv(
      value.map((v) => ({
        adviserId: v[1],
        date: Number(v[5].split(/\D/)[2]),
        time: timeFromString(v[6], props.isSummerTime),
      }))
    )
  }, [])

  const handleClickNext = useCallback(() => {
    const adviserMap = adviserCsv.reduce((acc, cur) => {
      acc[cur.id] = { ...cur }
      return acc
    }, {} as { [key: string]: Adviser })
    const farms: Farm[] = farmCsv.map((f) => ({
      id: f.id,
      name: f.name,
      advisers: f.adviserIds.map((id) => {
        const ad = adviserMap[id]
        if (!ad) {
          throw new Error(`not found adviser [${id}]`)
        }
        return ad
      }),
      cost: f.cost,
    }))
    const ngData: NgData[] = ngDataCsv.flatMap((v) =>
      v.time.map((time) => ({ adviserId: v.adviserId, date: v.date, time }))
    )
    props.onNext(farms, ngData)
  }, [farmCsv, adviserCsv, ngDataCsv])

  return (
    <div className='p-5 flex flex-col items-center space-y-2'>
      <CsvReader title='farm' onLoad={handleLoadFarm} />
      <CsvReader title='adviser' onLoad={handleLoadAdviser} />
      <CsvReader title='ng schedule' onLoad={handleLoadNgData} />
      <BorderButton text='next' onClick={handleClickNext} />
    </div>
  )
}
