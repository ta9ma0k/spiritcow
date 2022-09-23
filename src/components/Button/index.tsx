type ButtonProps = {
  text: string
  onClick: () => void
}
export const BorderButton = (props: ButtonProps) => (
  <button
    onClick={props.onClick}
    className='border rounded-full py-1 px-2 hover:bg-blue-300 hover:border-blue-300 hover:text-gray-50 duration-200'
  >
    {props.text}
  </button>
)
