import { Login } from "@/features/auth/components/Login"
import { Register } from "@/features/auth/components/Register"
import { useState } from "react"

export function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="bg-white max-w-md mx-auto rounded-2xl p-4 flex flex-col items-center">
      <h2 className="text-2xl m-3">{isLogin ? "Login" : "Register"}</h2>

      {isLogin ? <Login /> : <Register />}
      <button
        className="text-blue-800 cursor-pointer hover:text-blue-500"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Register here"
          : "Already have an account? Login here"}
      </button>
    </div>
  )
}
