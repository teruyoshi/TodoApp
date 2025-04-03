import { MemoryRouter } from 'react-router'
import { render } from '@testing-library/react'
import { MyRoutes } from '@/routes'

function setup() {
  const Component = (
    <MemoryRouter initialEntries={['/todo']}>
      <MyRoutes />
    </MemoryRouter>
  )
  const screen = render(Component)
  return { ...screen }
}

describe('ルーティングのテスト', () => {
  it('「/todo」にアクセスすると TODO リストページが表示される ', () => {
    const { getByText } = setup()
    expect(getByText('TODO リスト')).toBeInTheDocument()
  })
})
