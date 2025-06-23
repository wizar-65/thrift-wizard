import { setUser } from "@/redux/slices/userSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { User } from "@/types/user"
import { useDispatch, useSelector } from "react-redux"

export function useUser() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  return {
    user,
    setUser: (userData: User) => dispatch(setUser({ user: userData })),
    clearUser: () => dispatch(setUser(null)),
  }
}
