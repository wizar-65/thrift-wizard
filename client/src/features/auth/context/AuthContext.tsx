import { createContext, ReactNode, useContext, useState } from "react"
import axios from "axios"

type AuthContextType = {
  accessToken: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

// Define our context that will hold important auth values
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // hold our access token in state instead of browser storage
  const [accessToken, setAccessToken] = useState<string | null>(null)

  // On successful login, set access token
  const login = async (username: string, password: string) => {
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_THRIFT_WIZARD_SERVER_URL}/auth/login`,
      data: {
        username,
        password,
      },
      withCredentials: true,
    })

    setAccessToken(response.data.accessToken)
  }

  const logout = () => setAccessToken(null)

  const register = async (username: string, password: string) => {
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_THRIFT_WIZARD_SERVER_URL}/auth/register`,
      data: {
        username,
        password,
      },
    })

    console.log(response.data)
  }

  const context_value: AuthContextType = {
    accessToken,
    login,
    register,
    logout,
    isAuthenticated: !!accessToken,
  }

  return (
    <AuthContext.Provider value={context_value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth() must only be used from within the AuthProvider")
  }
  return context
}
