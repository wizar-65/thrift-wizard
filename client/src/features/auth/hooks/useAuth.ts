import {
  useLogoutMutation,
  useRefreshTokenMutation,
} from "@/redux/services/auth"
import { setToken, setUser } from "@/redux/slices/authSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { User } from "@/types/user"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export function useAuth() {
  const userData = useSelector((state: RootState) => state.auth.user)
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useDispatch<AppDispatch>()

  const [refreshToken] = useRefreshTokenMutation()
  const [logoutUser] = useLogoutMutation()

  useEffect(() => {
    const attemptRefreshToken = async () => {
      try {
        const response = await refreshToken().unwrap()
        if (response.accessToken) {
          dispatch(setToken(response.accessToken))
        }
      } catch (error) {
        console.log(error)
      }
    }
    attemptRefreshToken()
  }, [refreshToken])

  // function to call logout endpoint and set the access token to null
  const logout = async () => {
    try {
      await logoutUser().unwrap()
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setToken(null))
      dispatch(setUser(null))
    }
  }

  return {
    user: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      username: userData?.username,
    },
    setUser: (userData: User) => dispatch(setUser(userData)),
    clearUser: () => dispatch(setUser(null)),
    updateToken: (newToken: string) => {
      dispatch(setToken(newToken))
    },
    removeToken: () => dispatch(setToken(null)),
    logout,
    isAuthenticated: !!accessToken,
  }
}
