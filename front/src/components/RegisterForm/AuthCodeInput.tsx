import BaseInput from './BaseInput'
import { css } from '@emotion/react'
import useInput from '../../hooks/useInput'

export type AuthCodeInputProps = {
  value: string
  onChange: ReturnType<typeof useInput>[1]
  readonly : boolean
}

function AuthCodeInput({value, onChange, readonly}: AuthCodeInputProps) {
  return <BaseInput css={authCodeStyle} value={value} onChange={onChange} type='text' placeholder='인증번호 6자리를 입력해주세요!' readOnly={readonly} maxLength={6}/>
}

const authCodeStyle = css`
  margin: -1rem 0 1.5rem;

  width: 75%;
  font-size: 1rem;
  height: 40px;
  border: none;
  border-bottom: 1.1px solid #bdbdbd;
  padding-left: 0.2rem;
  &[value] {
    letter-spacing: 4px;
  }
  &::placeholder {
    letter-spacing: normal;
    font-size: 0.8rem;
  }
  &[readOnly] {
    border-bottom: 1.2px solid #35d0ba;
    color: #bdbdbd;
  }
`

export default AuthCodeInput
