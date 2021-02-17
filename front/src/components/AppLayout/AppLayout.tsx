import { css } from '@emotion/react'
import React from 'react'
import palette from '../../lib/palette'

export type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <div>{children}</div>
}

export type SideProps = {
  children: React.ReactNode
}
function Side({ children }: SideProps) {
  return <aside css={sidebarStyle}>{children}</aside>
}

export type MainProps = {
  children: React.ReactNode
}

function Main({ children }: MainProps) {
  return <main css={mainStyle}>{children}</main>
}

export type HeaderProps = {
  children: React.ReactNode
}

function Header({ children }: HeaderProps) {
  return <header css={headerStyle}>{children}</header>
}

AppLayout.Side = Side
AppLayout.Main = Main
AppLayout.Header = Header

const sidebarStyle = css`
  width: 16.25rem;
  height: 100%;
  position: fixed;
  display: flex;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 3rem;
  background: ${palette.grey[50]};
`
const mainStyle = css`
  padding-left: 2rem;
  padding-top: 1rem;
  padding-bottom: 3rem;
  margin-left: 16.25rem;
`

const headerStyle = css`
  padding-left: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-right: 4rem;
  margin-left: 16.25rem;
`
