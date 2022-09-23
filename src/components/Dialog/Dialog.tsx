import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { CloseIcon } from '../Icon'

const variants = {
  hidden: {
    opacity: 0,
    x: '40vw',
    transition: {
      opacity: {
        duration: 0.4,
      },
      x: {
        duration: 0.2,
      },
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: {
        duration: 0.1,
      },
      x: {
        duration: 0.2,
      },
    },
  },
}

type DialogProps = {
  show: boolean
  onClose: () => void
  children: ReactNode
}
export const Dialog = ({ show, onClose, children }: DialogProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={variants}
          className='fixed top-0 right-0 bg-zinc-100 border h-[95%] w-2/5 p-3 m-5 rounded-lg'
        >
          <>
            <button type='button' onClick={onClose}>
              <CloseIcon />
            </button>

            {children}
          </>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
