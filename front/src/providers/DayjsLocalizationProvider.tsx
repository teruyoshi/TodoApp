import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'
import 'dayjs/locale/ja'

interface DayjsLocalizationProviderProps {
  children: React.ReactNode
}

function DayjsLocalizationProvider(props: DayjsLocalizationProviderProps) {
  const { children } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      {children}
    </LocalizationProvider>
  )
}

export default DayjsLocalizationProvider
