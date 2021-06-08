import './App.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import styled from '@emotion/styled'
import { Routes } from 'routes'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Main>
          <Switch>
            <Routes />
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
  /* background-color: #f0f2f5; */
`
