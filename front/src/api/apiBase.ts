import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const isDocker =
  window.location.hostname === 'front' || window.location.hostname === 'go'

const API_BASE_URL = isDocker
  ? 'http://go:8080'
  : import.meta.env.VITE_API_BASE_URL

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/`,
    mode: 'cors',
    // prepareHeaders: (headers) => {
    //   headers.set('Access-Control-Allow-Origin', 'http://localhost:5173/')
    //   headers.set('Access-Control-Allow-Methods', 'POST,OPTIONS')
    //   headers.set('Access-Control-Allow-Headers', 'Content-type,Accept')
    //   // headers.set('Access-Control-Expose-Headers', 'Content-type,Accept')
    //   // headers.set('Access-Control-Allow-Credentials', 'true')
    //   headers.set('Content-Type', 'application/json')
    //   headers.set('Accept', 'application/json')
    // },
  }),
  tagTypes: ['Todo'],
  endpoints: () => ({}),
})
