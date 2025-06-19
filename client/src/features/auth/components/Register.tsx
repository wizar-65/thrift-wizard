import { Input } from "@/components/form/Input"
import { useState } from "react"

export function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <form className="w-full">
      <div className="space-y-2 flex flex-col justify-center">
        <Input
          label="Username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input label="First Name" type="text" id="firstName" />
        <Input label="Last Name" type="text" id="lastName" />
        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="m-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer">
          Register
        </button>
      </div>
    </form>
  )
}
