export const AssignIcon = () => (
  <svg
    className='w-5 h-5'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
)
export const NgIcon = () => (
  <svg
    className='w-5 h-5 text-red-500'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='10' /> <line x1='15' y1='9' x2='9' y2='15' />{' '}
    <line x1='9' y1='9' x2='15' y2='15' />
  </svg>
)
export const CloseIcon = () => (
  <svg
    className='w-8 h-8 text-gray-500'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path stroke='none' d='M0 0h24v24H0z' />{' '}
    <line x1='18' y1='6' x2='6' y2='18' />{' '}
    <line x1='6' y1='6' x2='18' y2='18' />
  </svg>
)

export const CheckIcon = () => (
  <svg
    className='h-6 w-6'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {' '}
    <polyline points='9 11 12 14 22 4' />{' '}
    <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
  </svg>
)
