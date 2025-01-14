import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import ThemeProvider from './context/ThemeContext.tsx'
import { BrowserRouter } from 'react-router'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>

  </StrictMode>,
)
