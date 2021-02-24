import React from 'react'
import { Global, css } from '@emotion/react'
import AppLayout from './components/AppLayout'
import Sidebar from './components/Sidebar'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Workspace from './pages/Workspace'
import SchoolRank from './pages/SchoolRank'
import SearchBox from './components/SearchBox'
import Core from './components/Core'
import Signup from './pages/Signup'
import SignupSucess from './pages/SignupSuccess/SignupSucess'

function App() {
  return (
    <>
      <AppLayout>
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
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/signupsuccess' component={SignupSucess}/>
          </Switch>
        </AppLayout.Main>
      </AppLayout>
      <Global styles={globalStyle} />
      <Core />
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
