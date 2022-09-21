import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

type DialogProps = {
  show: boolean
  children: ReactNode
}
export const Dialog = ({ show, children }: DialogProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: '30vw' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '30vw' }}
          className='fixed top-0 right-0 bg-zinc-100 border h-[95%] w-2/5 p-3 m-5 rounded-lg'
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
