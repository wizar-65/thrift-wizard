import { api } from "../api"
import { LoginRequest, RegisterUserRequest } from "@/types/auth"

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterUserRequest>({
      query: (body) => ({
        url: `/auth/register`,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<{ accessToken: string }, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation<{ accessToken?: string }, void>({
      query: () => ({
        url: "/auth/token",
        method: "POST",
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi
