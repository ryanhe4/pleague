import { css } from "@emotion/react"
import React from 'react'

export type BaseInputProps = {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

function BaseInput({className, style, children, ...rest}: BaseInputProps) {
  return <input css={baseInput} style={style} className={className} {...rest} />
}

const baseInput = css`
  width: 100%;
  height: 40px;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  color: #424242;
  border-bottom: 1.1px solid #bdbdbd;
  margin-bottom: 1.5rem;
  border-radius: 0;
  padding-left: 0.2rem;

  &:focus, &:valid {
    border-bottom: 1.2px solid #35d0ba;
  }

  &::placeholder {
    font-weight: 300;
    color: #757575;
  }
`

export default BaseInput
