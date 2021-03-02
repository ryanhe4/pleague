import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import React from 'react'
import { Redirect } from 'react-router-dom'

export type ProfileProps = {}

function Profile({}: ProfileProps) {
  const { user } = useSelector((state: RootState) => state.userSlice)

  if (!user) return <Redirect to='/' />

  return <div>Profile</div>
}

export default Profile
