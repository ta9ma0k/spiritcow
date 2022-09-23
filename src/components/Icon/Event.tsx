import clsx from 'clsx'

const BaseIcon = ({
  colorClass,
  text,
}: {
  colorClass: string
  text: string
}) => (
  <div
    className={clsx(
      'border text-xs font-bold w-4 h-4 border-2 rounded-md flex items-center justify-center',
      colorClass
    )}
  >
    {text}
  </div>
)

export const LdmtgIcon = () => (
  <BaseIcon colorClass='text-yellow-500 border-yellow-500' text='L' />
)

export const AdmtgIcon = () => (
  <BaseIcon colorClass='text-pink-500 border-pink-500' text='A' />
)

export const TraningIcon = () => (
  <BaseIcon colorClass='text-blue-500 border-blue-500' text='T' />
)

export const WorkIcon = () => (
  <BaseIcon colorClass='text-emerald-600 border-emerald-600' text='W' />
)
