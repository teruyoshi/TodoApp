import { BrowserRouter } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'

import { MyRoutes } from '@/routes'

import { ReduxProvider, DayjsLocalizationProvider } from './providers'

function App() {
  return (
    <>
      <CssBaseline />
      <ReduxProvider>
        <DayjsLocalizationProvider>
          <BrowserRouter>
            <MyRoutes />
          </BrowserRouter>
        </DayjsLocalizationProvider>
      </ReduxProvider>
    </>
  )
}

export default App
