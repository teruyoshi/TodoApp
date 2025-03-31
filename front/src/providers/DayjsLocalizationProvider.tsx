import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'
import 'dayjs/locale/ja'
// import { jaJP } from '@mui/x-date-pickers/locales'

interface DayjsLocalizationProviderProps {
  children: React.ReactNode
}

function DayjsLocalizationProvider(props: DayjsLocalizationProviderProps) {
  const { children } = props

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ja"
      // localeText={
      //   jaJP.components.MuiLocalizationProvider.defaultProps.localeText
      // }
    >
      {children}
    </LocalizationProvider>
  )
}

export default DayjsLocalizationProvider
