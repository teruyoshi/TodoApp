import { render } from '@testing-library/react'
import { TodoInputs } from '../'

const setup = () => {
  const screen = render(<TodoInputs />)

  return {
    ...screen,
  }
}

describe('TodoInputs', () => {
  it('タイトルが表示されている', () => {
    const { getByRole } = setup()
    const title = getByRole('heading', { name: 'Todoを追加' })

    expect(title).toBeInTheDocument()
  })
})
