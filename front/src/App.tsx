import { MyRoutes } from '@/routes'
import { BrowserRouter } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import { DayjsLocalizationProvider } from './providers'

function App() {
  return (
    <>
      <CssBaseline />
      <DayjsLocalizationProvider>
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      </DayjsLocalizationProvider>
    </>
  )
}

export default App
