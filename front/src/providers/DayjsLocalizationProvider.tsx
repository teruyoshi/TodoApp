import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'

interface DayjsLocalizationProviderProps {
  children: React.ReactNode
}

function DayjsLocalizationProvider(props: DayjsLocalizationProviderProps) {
  const { children } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  )
}

export default DayjsLocalizationProvider
