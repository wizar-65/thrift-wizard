import { Input } from "@/components/form/Input"
import { useEffect, useState } from "react"

type LoginRegisterFormInputs = {
  username: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  email: string
}

export function LoginRegisterForm({ isRegister }: { isRegister: boolean }) {
  const formDefault = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  }

  const [formState, setFormState] =
    useState<LoginRegisterFormInputs>(formDefault)

  useEffect(() => {
    setFormState(formDefault)
  }, [isRegister])

  const handleSetFormState = (field: string, value: string) =>
    setFormState((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-2 flex flex-col justify-center">
        <Input
          label="Username"
          type="text"
          id="username"
          value={formState.username}
          onChange={(e) => handleSetFormState("username", e.target.value)}
        />
        {isRegister && (
          <>
            <Input
              label="First Name"
              type="text"
              id="firstName"
              onChange={(e) => handleSetFormState("firstName", e.target.value)}
            />
            <Input
              label="Last Name"
              type="text"
              id="lastName"
              onChange={(e) => handleSetFormState("lastName", e.target.value)}
            />
            <Input
              label="Email"
              type="text"
              id="email"
              onChange={(e) => handleSetFormState("email", e.target.value)}
            />
          </>
        )}
        <Input
          label="Password"
          type="password"
          id="password"
          value={formState.password}
          onChange={(e) => handleSetFormState("password", e.target.value)}
        />
        {isRegister && (
          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formState.confirmPassword}
            onChange={(e) =>
              handleSetFormState("confirmPassword", e.target.value)
            }
          />
        )}
        <button className="m-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer">
          {isRegister ? "Register" : "Login"}
        </button>
      </div>
    </form>
  )
}
