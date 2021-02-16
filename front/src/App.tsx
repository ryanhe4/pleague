import React from 'react'
import { Global, css } from '@emotion/react'
import AppLayout from './components/AppLayout'
import Sidebar from './components/Sidebar'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Workspace from './pages/Workspace'
import SchoolRank from './pages/SchoolRank'
import SearchBox from './components/SearchBox'
import AuthModalControl from './components/auth/AuthModalControl'

function App() {
  return (
    <>
      <AppLayout>
        <AuthModalControl/>
        <AppLayout.Side>
          <Sidebar />
        </AppLayout.Side>
        <AppLayout.Header>
          <SearchBox />
        </AppLayout.Header>
        <AppLayout.Main>
          <Switch>
            <Route path={['/', '/home']} exact>
              <Home />
            </Route>
            <Route path='/workspace'>
              <Workspace />
            </Route>
            <Route path='/chat'>
              <SchoolRank />
            </Route>
          </Switch>
        </AppLayout.Main>
      </AppLayout>
      <Global styles={globalStyle} />
    </>
  )
}

const globalStyle = css`
  html {
    box-sizing: border-box;

    * {
      box-sizing: inherit;
    }
  }
`
export default App
