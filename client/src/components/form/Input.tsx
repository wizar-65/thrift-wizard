import { FieldError } from "react-hook-form"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: FieldError
}

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className={`border rounded px-3 py-2 w-full transition
    focus:outline-none
    ${
      error
        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
    }
  `}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  )
}
