import { MemoryRouter } from 'react-router'
import { render } from '@testing-library/react'

import { MyRoutes } from '@/routes'
import { ReduxProvider, DayjsLocalizationProvider } from '@/providers'

function setup() {
  const Component = (
    <ReduxProvider>
      <DayjsLocalizationProvider>
        <MemoryRouter initialEntries={['/todo']}>
          <MyRoutes />
        </MemoryRouter>
      </DayjsLocalizationProvider>
    </ReduxProvider>
  )
  const view = render(Component)
  return { ...view }
}

describe('ルーティングのテスト', () => {
  it('「/todo」にアクセスすると TODO リストページが表示される', () => {
    const { getByText } = setup()
    expect(getByText('TODOリスト')).toBeInTheDocument()
  })
})
