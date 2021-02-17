import { css } from '@emotion/react'
import React, { useState } from 'react'
import transitions from '../../lib/transitions'
import palette from '../../lib/palette'

export type AuthModalProps = {
  children?: React.ReactNode
  visible: boolean
}

function AuthModal({ children, visible }: AuthModalProps) {
  const [closed, setClosed] = useState(true);

  if (!visible && closed) return null;

  return <div css={ModalStyle}>
    <div css={modalWrapper(visible)}>
      <span css={closeStyle}>&times;</span>
      {children}
    </div>
  </div>
}

const ModalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`
const modalWrapper = (visible: boolean) => css`
  ${visible ? css`
    animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
  ` : css`
    animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
  `}

  width: 30rem;
  height: 36rem;
  position: relative;
  box-sizing: border-box;
  margin: 3.125rem auto;
  padding: 1.25rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
`
const closeStyle = css`
  float: right;
  font-size: 25px;
  margin-right: 0.5rem;
`

export default AuthModal
