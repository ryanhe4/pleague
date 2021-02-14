import React from 'react'
import { Global, css } from '@emotion/react'
import AppLayout from './components/AppLayout'
import Sidebar from './components/Sidebar'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Workspace from './pages/Workspace'
import Chat from './pages/Chat'
import SearchBox from './components/SearchBox'

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
            <Route path="/workspace">
              <Workspace />
            </Route>
            <Route path="/chat">
              <Chat />
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
