import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getApiBaseUrl } from '@/functions'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getApiBaseUrl()}/api/v1/`,
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
