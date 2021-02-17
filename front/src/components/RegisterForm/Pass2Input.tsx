import { css } from '@emotion/react'
import BaseInput from './BaseInput'
import useInput from '../../hooks/useInput'

export type Pass2InputProps = {
  value: string
  onChange: ReturnType<typeof useInput>[1]
}

function Pass2Input({value, onChange}: Pass2InputProps) {
  return <BaseInput css={pass2Style(true)} id='password2' type='password' value={value} onChange={onChange} placeholder='비밀번호 확인' required/>
}

const pass2Style = (isMatch: boolean) => css`
  &:focus {
    ${isMatch ? css` border-bottom: 1.2px solid #35d0ba` :
            css`border-bottom: 1.2px solid #e74c3c`};
  }

  &:not([value=""]) {
    border-bottom: ${isMatch ? '1.2px solid #35d0ba' : '1.2px solid #e74c3c'};
  }
`

export default Pass2Input
