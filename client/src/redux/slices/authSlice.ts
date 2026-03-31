import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@/types/user"

type AuthState = {
  user: User | null
  accessToken: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
    },
    clearToken: (state) => {
      state.accessToken = null
    },
  },
})

export const { setUser, clearUser, setToken, clearToken } = authSlice.actions
export default authSlice.reducer
