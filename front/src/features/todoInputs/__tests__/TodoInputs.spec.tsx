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
  describe('フォーム送信', () => {
    it('Todo のタイトルを入力出来る', () => {})
    it('Todo の説明を入力出来る', () => {})
    it('Todo の期間を入力出来る', () => {})
    it('Todo のデータを送信できる', () => {})
  })
})
