import { css } from '@emotion/react'
import BaseInput from './BaseInput'
import React from 'react'
import useInput from '../../hooks/useInput'

export type EmailInputProps = {
  placeholder: string
  value: string
  onChange: ReturnType<typeof useInput>[1]
}

function EmailInput({ placeholder, value, onChange }: EmailInputProps) {
  return <BaseInput css={emailInput} id='email' type='email' value={value} onChange={onChange} placeholder={placeholder} required readOnly={false} />
}

const emailInput = css`
  width: 75%;
  appearance: none;

  &[readOnly] {
    border-bottom: 1.2px solid #35d0ba;
    color: #616161;
    background-color: #c7f0eb;
    border-radius: 5px 5px 0 0;
  }
`

export default EmailInput
