import { ReactNode } from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={
        "px-6 py-3 bg-white text-secondary font-semibold rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer"
      }
    >
      {children}
    </button>
  )
}
