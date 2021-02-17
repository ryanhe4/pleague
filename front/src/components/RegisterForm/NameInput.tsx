import BaseInput from './BaseInput'
import { css } from '@emotion/react'
import useInput from '../../hooks/useInput'
import React from 'react'

export type NameInputProps = {
  name: string
  handlename: ReturnType<typeof useInput>[1]
}

function NameInput({ name, handlename }: NameInputProps) {
  return <BaseInput css={nameInput(true)} value={name} onChange={handlename} required id='name' type='text'
                    placeholder='ex) 홍길동' />
}

const nameInput = (isValid: boolean) => css`
  &:not([value=""]) {
    border-bottom: ${isValid ? '1.2px solid #35d0ba' : '1.2px solid #e74c3c'};
  }
`

export default React.memo(NameInput)
