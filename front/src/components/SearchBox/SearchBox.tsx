import { css } from '@emotion/react'
import React from 'react'

export type SearchBoxProps = {}

function SearchBox({}: SearchBoxProps) {
  return (
    <div css={searchBoxStyle}>
      <input css={inputStyle} />
      <button css={searchButtonStyle}>search Button</button>
    </div>
  )
}

const inputStyle = css`
  display: flex;
`
const searchBoxStyle = css`
  display: flex;
`
const searchButtonStyle = css`
  display: flex;
  margin-left: 1rem;
  font-weight: bold;
`

export default SearchBox
