import './App.css'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/lib'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from 'screens/home'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { NotFoundPage } from 'screens/404'
import styled from '@emotion/styled'
import { LoginScreen } from 'screens/login'
import { RegisterScreen } from 'screens/register'
import { CourseListScreen } from 'screens/course-list'

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <Router>
          <Header />
          <Main>
            <Switch>
              <Route exact path={'/'} component={HomePage} />
              <Route exact path={'/course'} component={CourseListScreen} />
              <Route exact path={'/login'} component={LoginScreen} />
              <Route exact path={'/register'} component={RegisterScreen} />
              <Route path={'*'} component={NotFoundPage} />
            </Switch>
          </Main>
          <Footer />
        </Router>
      </ErrorBoundary>
    </div>
  )
}

export default App

const Main = styled.div`
  padding: 3rem 10rem;
  flex: 1;
`
