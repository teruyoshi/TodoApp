import { MyRoutes } from '@/routes'
import { BrowserRouter } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import { DayjsLocalizationProvider } from './providers'
import { store } from '@/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <DayjsLocalizationProvider>
          <BrowserRouter>
            <MyRoutes />
          </BrowserRouter>
        </DayjsLocalizationProvider>
      </Provider>
    </>
  )
}

export default App
