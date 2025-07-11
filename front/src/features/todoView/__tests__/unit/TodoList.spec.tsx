import { render } from '@testing-library/react'
import { TodoList } from '../../components'

describe('TodoList', () => {
  it('タイトルが表示されている', () => {
    const { getByText } = render(<TodoList />)
    expect(getByText('TODOリスト')).toBeInTheDocument()
  })
})
