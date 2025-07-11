import { render } from '@testing-library/react'
import { TodoList } from '../../components'

const setup = () => {
  const Component = <TodoList />
  const screen = render(Component)

  return {
    ...screen,
  }
}

describe('TodoList', () => {
  it('タイトルが表示されている', () => {
    const { getByText } = setup()

    expect(getByText('TODOリスト')).toBeInTheDocument()
  })
  describe('TODOが表示されている', () => {
    it('TODOタイトルが表示されている', () => {
      const { getByText } = setup()

      expect(getByText('国語の勉強')).toBeInTheDocument()
      expect(getByText('数学の勉強')).toBeInTheDocument()
      expect(getByText('英語の勉強')).toBeInTheDocument()
    })
  })
})
