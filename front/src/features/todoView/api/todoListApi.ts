import { api } from '@/api'
import type { Todos } from '../components'

export const todoListApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchTodos: build.query<Todos, void>({
      query: () => ({
        url: 'todos/',
        method: 'GET',
      }),
      providesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const { useFetchTodosQuery } = todoListApi
