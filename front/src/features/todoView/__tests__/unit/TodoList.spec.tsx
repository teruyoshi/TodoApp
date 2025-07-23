import { render } from '@testing-library/react'
import { TodoList } from '../../components'

const setup = () => {
  const Component = <TodoList />
  const screen = render(Component)

  return {
    ...screen,
  }
}

const expectObjectFactory = (title: string, description: string) => {
  return {
    title,
    description,
  }
}

const expectObjects = [
  expectObjectFactory('国語の勉強', '音読と漢字の宿題'),
  expectObjectFactory('数学の勉強', '計算ドリル'),
  expectObjectFactory('英語の勉強', '単語帳の暗記'),
]

describe('TodoList', () => {
  it('タイトルが表示されている', () => {
    const { getByText } = setup()

    expect(getByText('TODOリスト')).toBeInTheDocument()
  })
  describe('TODO が表示されている', () => {
    it('TODOタイトルが表示されている', () => {
      const { getByText } = setup()

      expectObjects.forEach((expectObject) => {
        expect(getByText(expectObject.title)).toBeInTheDocument()
      })
    })

    it('TODO の説明が表示されている', () => {
      const { getByText } = setup()

      expectObjects.forEach((expectObject) => {
        expect(getByText(expectObject.description)).toBeInTheDocument()
      })
    })
  })
})
