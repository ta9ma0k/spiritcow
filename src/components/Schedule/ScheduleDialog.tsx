import clsx from 'clsx'
import { Adviser, Farm } from '../../domain'
import { Time } from '../../domain/time'
import { toDayJp } from '../../util/date'
import { Dialog } from '../Dialog'
import { AssignIcon, CloseIcon, NgIcon } from '../Icon'

type CheckBlockProps = {
  farmId: string
  adviser: Adviser
}
const CheckBlock = (props: CheckBlockProps) => {
  const assigned = props.adviser.schedules[0].status === props.farmId

  return (
    <div className='items-center w-full px-3 py-2 mb-2 border border-transparent rounded-lg duration-100 grid grid-cols-10 bg-gray-50 hover:border-lime-300 hover:cursor-pointer'>
      <div
        className={clsx(
          'col-span1',
          assigned ? 'text-lime-500' : 'text-gray-500'
        )}
      >
        <AssignIcon />
      </div>
      <div className='col-span-4'>
        <h4 className='text-lg leading-none'>{props.adviser.lastName}</h4>
        <h5 className='text-xs'>{props.adviser.wage}</h5>
      </div>
      <div className='col-span-3'>
        {!assigned && props.adviser.scuedules[0].scuedule !== 'none' ? (
          <span>{props.adviser.scuedules[0].scuedule}</span>
        ) : undefined}
      </div>
      <div className='col-span-2'>
        <span className='ml-5'>5 times</span>
      </div>
    </div>
  )
}

type NgBlockProps = {
  adviser: Adviser
}
const NgBlock = (props: NgBlockProps) => (
  <div className='items-center w-full px-3 py-2 mb-2 rounded-lg grid grid-cols-10 bg-gray-50'>
    <div className='col-span-1'>
      <NgIcon />
    </div>
    <div className='col-span-4'>
      <h4 className='text-lg leading-none'>{props.adviser.name}</h4>
      <h5 className='text-xs'>{props.adviser.wage}</h5>
    </div>
    <div className='col-span-3' />
    <div className='col-span-2'>
      <span className='ml-5'>5 times</span>
    </div>
  </div>
)

type ScheduleDialogProps = {
  date?: Date
  time?: Time
  farm?: Farm
  advisers?: Adviser[]
  show: boolean
  onClose: () => void
}
export const ScheduleDialog = (props: ScheduleDialogProps) => {
  return (
    <Dialog show={props.show}>
      <div>
        <button type='button' onClick={props.onClose}>
          <CloseIcon />
        </button>
        {props.date && props.time && props.farm && props.advisers && (
          <div>
            <div className='flex items-end'>
              <div className='mr-5'>
                <h3 className='text-lg'>{props.farm.name}</h3>
                <h4 className='text-2xl'>{`${props.date.getDate()}(${toDayJp(
                  props.date
                )}) ${props.time}`}</h4>
              </div>
              <div>
                <select>
                  <option>-</option>
                  <option>LDMTG</option>
                  <option>ADMTG</option>
                  <option>作業日</option>
                  <option>講習日</option>
                </select>
              </div>
            </div>
            <div className='mt-5'>
              {props.advisers
                .map((ad) => ({
                  id: ad.id,
                  name: `${ad.lastName}${ad.firstName}`,
                  status:
                    ad.schedules.find(
                      (s) =>
                        s.date === props.date.getDate() && s.time === props.time
                    ) ?? 'none',
                }))
                .map((v) => {
                  if (v.status === 'none') {
                    return <div>selectable</div>
                  } else if (v.status === 'NG') {
                    return <div>ng</div>
                  }
                  return <div>selectable</div>
                })}
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
}
