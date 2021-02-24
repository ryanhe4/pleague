import { css } from '@emotion/react'
import React from 'react'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import LoginButton from '../LoginButton'
import { onScreenMask } from '../../lib/slices/commonSlice'
import { useDispatch } from 'react-redux'
import useLoadUser from '../../hooks/useLoadUser'

export type SearchBoxProps = {}

function SearchBox({}: SearchBoxProps) {
  const dispatch = useDispatch()
  const [user] = useLoadUser()

  const handleLoginClick = () => {
    dispatch(onScreenMask())
  }

  return (
    <div css={wrapper}>
      <div css={searchBoxStyle}>
        <SearchInput />
        <SearchButton />
      </div>
      {user ? <div style={{ display: 'flex' }}>
          {user}
          <LoginButton mode='로그아웃' onClick={() => {
          }} />
        </div> :
        <LoginButton mode='로그인' onClick={handleLoginClick} />}
    </div>
  )
}


const wrapper = css`
  height: 100%;
  display: flex;
  justify-content: right;
`
const searchBoxStyle = css`
  width: calc(100% - 12rem);
  justify-content: left;
  display: flex;
  margin-left: 2rem;
`

export default SearchBox
