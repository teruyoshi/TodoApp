import { render } from '@testing-library/react'
import { TodoInput } from '../'
import { DayjsLocalizationProvider } from '../../../providers'

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

describe('TodoInputs', () => {
  it('タイトルが表示されている', () => {
    const { getByRole } = setup()
    const title = getByRole('heading', { name: 'Todoを追加' })

    expect(title).toBeInTheDocument()
  })
})
