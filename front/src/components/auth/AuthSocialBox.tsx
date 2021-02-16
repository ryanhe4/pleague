import { css } from '@emotion/react'
import XIcon from '../XIcon/XIcon'
import palette from '../../lib/palette'

export type AuthSocialBoxProps = {}

function AuthSocialBox({}: AuthSocialBoxProps) {
  return <div css={socialBoxStyle}>
    <div css={googleStyle}>
      <XIcon name='google' />
    </div>
    <div css={githubStyle}>
      <XIcon name='github' />
    </div>
  </div>
}

const socialBoxStyle = css`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`

const googleStyle = css`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: 0.125s all ease-in;
  color: white;
  background: white;
  border: 1px solid ${palette.grey[300]};

  &:focus {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.35);
  }
`
const githubStyle = css`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: 0.125s all ease-in;
  color: white;
  background: black;
  
  &:focus {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.35);
  }
`

export default AuthSocialBox
