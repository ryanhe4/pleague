import AuthModal from './AuthModal'
import AuthModalForm from './AuthModalForm'
import React, { useState } from 'react'


export type AuthModalControlProps = {}

function AuthModalControl({}: AuthModalControlProps) {
  const [open, setOpen] = useState(false)

  return <>{open ? <AuthModal visible={open}>
    <AuthModalForm />
  </AuthModal> : null}
  </>
}

export default AuthModalControl
