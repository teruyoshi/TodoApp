import { render, screen } from '@testing-library/react'

import { ReduxProvider } from '@/providers'

import { TodoList } from '../../components'

jest.mock('../../api/todoListApi', () => ({
  useFetchTodosQuery: jest.fn(() => ({
    data: [
      { id: 1, todoTitle: '国語の勉強', todoDescription: '音読と漢字の宿題' },
      { id: 2, todoTitle: '数学の勉強', todoDescription: '計算ドリル' },
      { id: 3, todoTitle: '英語の勉強', todoDescription: '単語帳の暗記' },
    ],
  })),
}))

const setup = () => {
  const Component = (
    <ReduxProvider>
      <TodoList />
    </ReduxProvider>
  )
  render(Component)
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
    setup()

    expect(screen.getByText('TODOリスト')).toBeInTheDocument()
  })
  describe('TODO が表示されている', () => {
    it('TODOタイトルが表示されている', () => {
      setup()

      expectObjects.forEach((expectObject) => {
        expect(screen.getByText(expectObject.title)).toBeInTheDocument()
      })
    })

    it('TODO の説明が表示されている', () => {
      setup()

      expectObjects.forEach((expectObject) => {
        expect(screen.getByText(expectObject.description)).toBeInTheDocument()
      })
    })
  })
})
