import React from 'react'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './i18n/config'
import { AppProviders } from './context'
import { ErrorBoundary } from './components/error-boundary'
import { FullPageErrorFallback } from './components/lib'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      <AppProviders>
        <App />
      </AppProviders>
    </ErrorBoundary>
  </React.StrictMode>,
)

reportWebVitals()
