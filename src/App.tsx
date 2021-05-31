import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from 'screens/home'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { NotFoundPage } from 'screens/404'
import styled from '@emotion/styled'
import { CourseListScreen } from 'screens/course-list'
import { CourseDetailScreen } from 'screens/course'
import { UnauthenticatedApp } from 'screens/unauthenticated-app'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Main>
          <Switch>
            <Route exact path={'/'} component={HomePage} />
            <Route exact path={'/course'} component={CourseListScreen} />
            <Route
              exact
              path={'/course/:courseId'}
              component={CourseDetailScreen}
            />
            <Route exact path={'/login'} component={UnauthenticatedApp} />
            <Route exact path={'/register'} component={UnauthenticatedApp} />
            <Route path={'*'} component={NotFoundPage} />
          </Switch>
        </Main>
        <Footer />
      </Router>
    </div>
  )
}

export default App

const Main = styled.div`
  padding: 3rem 10rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
`
