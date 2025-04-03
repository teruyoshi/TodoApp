import { api } from '@/api'

export const todoInputApi = api.injectEndpoints({
  endpoints: (build) => ({
    createTodo: build.mutation({
      query: (todo) => ({
        url: 'todos/',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: [ {type:'Todo', id:'LIST'}],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateTodoMutation } = todoInputApi