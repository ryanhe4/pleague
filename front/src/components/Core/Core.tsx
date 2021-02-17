import React from 'react'
import ScreenMask from '../ScreenMask'
import AuthModalControl from '../auth/AuthModalControl'
export type CoreProps = {}

function Core({}: CoreProps) {
  return <>
    <ScreenMask visible={false}/>
    <AuthModalControl/>
  </>
}

export default Core
