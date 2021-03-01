import AuthModal from './AuthModal'
import AuthModalForm from './AuthModalForm'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import { offScreenMask } from '../../lib/slices/commonSlice'

export type AuthModalControlProps = {}

function AuthModalControl({}: AuthModalControlProps) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const { screenMask } = useSelector((state: RootState) => state.commonSlice)

  const handleClose = () => {
    dispatch(offScreenMask())
  }

  useEffect(() => {
    setOpen(screenMask)
  }, [screenMask])



  return <AuthModal onClose={handleClose} visible={open}>
    <AuthModalForm onClose={handleClose}/>
  </AuthModal>
}

export default AuthModalControl
