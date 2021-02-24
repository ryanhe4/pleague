import React from 'react'
import ScreenMask from '../ScreenMask'
import AuthModalControl from '../auth/AuthModalControl'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'

export type CoreProps = {}

function Core({}: CoreProps) {
  const { screenMask } = useSelector((state: RootState) => state.commonSlice)

  return <>
    <ScreenMask visible={screenMask} />
    <AuthModalControl />
  </>
}

export default Core
