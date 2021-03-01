import { css } from '@emotion/react'
import React, { useCallback } from 'react'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import LoginButton from '../LoginButton'
import { onScreenMask } from '../../lib/slices/commonSlice'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../../lib/slices/userSlice'
import { RootState } from '../../lib/store'
import { useQuery } from 'react-query'
import { logout } from '../../lib/api/auth/emailAuth'

export type SearchBoxProps = {}

function SearchBox({}: SearchBoxProps) {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.userSlice)

  const handleLoginClick = () => {
    dispatch(onScreenMask())
  }

  const { refetch } = useQuery('logout', () => logout(), {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false
  })
  const handleLogoutClick = useCallback(async () => {
    const ret = await refetch()
    if (ret.isError) {
      alert(ret.error)
      return
    }
    if (ret.data)
      dispatch(clearUser())
    else alert('로그아웃 불가')
  }, [dispatch, refetch])
  return (
    <div css={wrapper}>
      <div css={searchBoxStyle}>
        <SearchInput />
        <SearchButton />
      </div>
      {user ? <div style={{ display: 'flex' }}>
          이름
          <LoginButton mode='로그아웃' onClick={handleLogoutClick} />
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
