import { render, screen } from '@testing-library/react'

import { TodoInput } from '../../components'
import { TodoInputFormInputs } from '../../components/TodoInputForm'

const spyOnProps = jest.fn()
const createTodoMock = jest.fn()

jest.mock('../../api/todoInputApi', () => ({
  useCreateTodoMutation: () => [createTodoMock],
}))

jest.mock('../../components/TodoInputForm', () => ({
  __esModule: true,
  default: (props: {
    onSubmitHandler: (data: TodoInputFormInputs) => void
  }) => {
    spyOnProps(props)
    return <div>TodoInputForm</div>
  },
}))

const setup = () => {
  render(<TodoInput />)
}

afterEach(() => {
  jest.clearAllMocks()
})

describe('TodoInputs', () => {
  it('タイトルが表示されている', () => {
    setup()
    const title = screen.getByRole('heading', { name: 'Todoを追加' })

    expect(title).toBeInTheDocument()
  })

  it('API の送信処理が TodoInputApi.useCreateTodoMutation から取得され Form に handler として渡されている', () => {
    setup()
    const { onSubmitHandler } = spyOnProps.mock.calls[0][0]
    onSubmitHandler()
    expect(createTodoMock).toHaveBeenCalledTimes(1)
  })
})
