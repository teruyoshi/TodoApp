import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/' }),
  endpoints: () => ({}),
})