import BaseInput from './BaseInput'
import { css } from '@emotion/react'
import useInput from '../../hooks/useInput'

export type PasswordInputProps = {
  value: string
  onChange: ReturnType<typeof useInput>[1]
}

function PasswordInput({value, onChange}: PasswordInputProps) {
  return <BaseInput id='password' type='password' value={value} onChange={onChange} placeholder='8자리이상' required />
}

const passStyle = css`

`

export default PasswordInput
