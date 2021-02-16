import { css } from '@emotion/react'
import React from 'react'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import LoginButton from '../LoginButton'

export type SearchBoxProps = {}

function SearchBox({}: SearchBoxProps) {
  return (
    <div css={wrapper}>
      <div css={searchBoxStyle}>
        <SearchInput />
        <SearchButton />
      </div>
      <LoginButton />
    </div>
  )
}

const wrapper = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const searchBoxStyle = css`
  width: calc(100% - 12rem);
  justify-content: left;
  display: flex;
`

export default SearchBox
