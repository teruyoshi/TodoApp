import { cleanup, render } from '@testing-library/react'
import { TodoInput } from '.'
import { DayjsLocalizationProvider } from '@/providers'

const spyOnProps = jest.fn()
const createTodoMock = jest.fn()

jest.mock('../api/todoInputApi', () => ({
  useCreateTodoMutation: () => [createTodoMock],
}))

jest.mock('../components/TodoInputForm', () => ({
  __esModule: true,
  default: (props: any) => {
    spyOnProps(props)
    return <div>TodoInputForm</div>
  },
}))

const setup = () => {
  const screen = render(
    <DayjsLocalizationProvider>
      <TodoInput />
    </DayjsLocalizationProvider>
  )

  return {
    ...screen,
  }
}

afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})

describe('TodoInputs', () => {
  it('タイトルが表示されている', () => {
    const { getByRole } = setup()
    const title = getByRole('heading', { name: 'Todoを追加' })

    expect(title).toBeInTheDocument()
  })
  it('TodoInputApi.useCreateTodoMutation の返り値が Form に handler として渡されている', () => {
    setup()
    const { onSubmitHandler } = spyOnProps.mock.calls[0][0]
    onSubmitHandler()
    expect(createTodoMock).toHaveBeenCalledTimes(1)
  })
})
