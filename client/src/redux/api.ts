import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_THRIFT_WIZARD_SERVER_URL,
    credentials: "include",
  }),
  endpoints: () => ({}),
})
