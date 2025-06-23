import { useUser } from "@/hooks/useUser"
import {
  useLogoutMutation,
  useRefreshTokenMutation,
} from "@/redux/services/auth"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

type AuthContextType = {
  accessToken: string | null
  handleSetAccessToken: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

// Define our context that will hold important auth values
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [refreshToken] = useRefreshTokenMutation()

  // hold our access token in state instead of browser storage
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const { clearUser } = useUser()

  useEffect(() => {
    const attemptRefreshToken = async () => {
      try {
        const response = await refreshToken().unwrap()
        setAccessToken(response.accessToken || null)
      } catch (error) {
        console.log(error)
      }
    }
    attemptRefreshToken()
  }, [refreshToken])

  const [logoutUser] = useLogoutMutation()

  // function to set access token when user logs in
  const handleSetAccessToken = (token: string) => setAccessToken(token)

  // function to call logout endpoint and set the access token to null
  const logout = async () => {
    try {
      await logoutUser().unwrap()
      setAccessToken(null)
      clearUser()
    } catch (error) {
      console.error(error)
    }
  }

  const context_value: AuthContextType = {
    accessToken,
    handleSetAccessToken,
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
