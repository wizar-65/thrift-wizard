import { LoginRegisterForm } from "@/features/auth/components/LoginRegisterForm"
import { useState } from "react"

export function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="bg-white max-w-md mx-auto rounded-2xl p-4 flex flex-col items-center">
      <h2 className="text-2xl m-3">{!isRegister ? "Login" : "Register"}</h2>

      <LoginRegisterForm isRegister={isRegister} />
      <button
        className="text-blue-800 cursor-pointer hover:text-blue-500"
        onClick={() => setIsRegister(!isRegister)}
      >
        {!isRegister
          ? "Don't have an account? Register here"
          : "Already have an account? Login here"}
      </button>
    </div>
  )
}
