import { css } from '@emotion/react'
import React from 'react'
import transitions from '../../lib/transitions'
import palette from '../../lib/palette'

export type AuthModalProps = {
  children?: React.ReactNode
  visible: boolean
}

function AuthModal({ children,visible }: AuthModalProps) {
  return <div css={ModalStyle}>
    <div css={modalWrapper(visible)}>
    <div css={loginModalStyle}>
      <span css={closeStyle}>&times;</span>
      {children}
    </div>
    </div>
  </div>
}

const ModalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width:100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  background: rgba(0,0,0,0.6);
`
const modalWrapper = (visible: boolean) => css`
  ${visible ? css`
    animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
  ` : css`
    animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
  `}
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background: white;
`

const loginModalStyle = css`
  //width: 30rem;
  //height: 36rem;
  //position: relative;
  //box-sizing: border-box;
  //margin: 3.125rem auto;
  //padding: 1.25rem;
  //background: #fff;
  //border-radius: 0.5rem;
`
const closeStyle = css`
  float: right;
  font-size: 25px;
`

export default AuthModal
