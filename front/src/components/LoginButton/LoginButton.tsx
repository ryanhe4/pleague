import { css } from '@emotion/react'
import palette from '../../lib/palette'

export type LoginButtonProps = {}

function LoginButton({}: LoginButtonProps) {
  return <button css={LoginButtonStyle}>로그인</button>
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
`

export default LoginButton
