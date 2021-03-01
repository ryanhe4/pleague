import React from 'react'
import ScreenMask from '../ScreenMask'
import AuthModalControl from '../auth/AuthModalControl'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import useLoadUser from '../../hooks/useLoadUser'

export type CoreProps = {}

function Core({}: CoreProps) {
  const { screenMask } = useSelector((state: RootState) => state.commonSlice)
  const [user] = useLoadUser()

  return <>
    <ScreenMask visible={screenMask} />
    <AuthModalControl />
  </>
}

export default Core
