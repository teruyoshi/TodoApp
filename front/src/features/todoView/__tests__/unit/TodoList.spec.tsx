import { render } from '@testing-library/react'
import { TodoList } from '../../components'

const setup = () => {
  const Component = <TodoList />
  const screen = render(Component)

  return {
    ...screen,
  }
}

const expects = {
  titles: ['国語の勉強', '数学の勉強', '英語の勉強'],
  descriptions: ['音読と漢字の宿題', '計算ドリル', '単語帳の暗記'],
}

describe('TodoList', () => {
  it('タイトルが表示されている', () => {
    const { getByText } = setup()

    expect(getByText('TODOリスト')).toBeInTheDocument()
  })
  describe('TODO が表示されている', () => {
    it('TODOタイトルが表示されている', () => {
      const { getByText } = setup()

      expects.titles.forEach((title) => {
        expect(getByText(title)).toBeInTheDocument()
      })
    })

    it('TODO の説明が表示されている', () => {
      const { getByText } = setup()

      expects.descriptions.forEach((description) => {
        expect(getByText(description)).toBeInTheDocument()
      })
    })
  })
})
