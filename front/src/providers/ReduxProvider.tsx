import React from 'react'
import 'dayjs/locale/ja'
import { Provider } from 'react-redux'
import { store } from '@/store'

interface ReduxProviderProps {
  children: React.ReactNode
}

function ReduxProvider(props: ReduxProviderProps) {
  const { children } = props

  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
