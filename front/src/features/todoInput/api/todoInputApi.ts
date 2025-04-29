import { api } from '@/api'
import type { TodoInputFormInputs } from '../components'

export const todoInputApi = api.injectEndpoints({
  endpoints: (build) => ({
    createTodo: build.mutation<void, TodoInputFormInputs>({
      query: (todo) => ({
        url: 'todos/',
        method: 'POST',
        body: {
          TodoTitle: todo.title,
          TodoDescription: todo.description,
          TodoDateFrom: todo.dateFrom,
          TodoDateTo: todo.dateTo,
        },
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateTodoMutation } = todoInputApi
