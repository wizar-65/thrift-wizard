import { Input } from "@/components/form/Input"
import { useState } from "react"

export function Login() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

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
        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="m-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer">
          Login
        </button>
      </div>
    </form>
  )
}
