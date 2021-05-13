import './App.css'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/lib'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { Content } from 'screens/home/content'

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <Header />
        <Content />
        <Footer />
      </ErrorBoundary>
    </div>
  )
}

export default App
