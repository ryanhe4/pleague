import { css } from '@emotion/react'
import palette from '../../lib/palette'

export type LoginButtonProps = {
  onClick: () => void
  mode: string
}

function LoginButton({onClick, mode}: LoginButtonProps) {
  return <button css={LoginButtonStyle} onClick={onClick} >{mode}</button>
}

const LoginButtonStyle = css`
  margin-left: 2rem;
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  border-radius: 0.2rem;
  border: none;
  outline: none;
  font-weight: bold;
  background: ${palette.blueGrey[600]};
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  color: white;
  &:hover {
    background: ${palette.blueGrey[700]};
  }
`

export default LoginButton
