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
import palette from '../../lib/palette'
import { NavLink } from 'react-router-dom'

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
          <NavLink to='/profile' css={linkStyle} exact>
            <div css={namespaceStyle}>{user!.summon_profile!.name}</div>
          </NavLink>
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

const linkStyle = css`
  text-decoration: none;
  color: ${palette.blueGrey[600]};
  border-bottom: 1px solid ${palette.blueGrey[600]};
`

const searchBoxStyle = css`
  width: calc(100% - 12rem);
  justify-content: left;
  display: flex;
  margin-left: 2rem;
`

const namespaceStyle = css`
  padding-top: 0.4rem;
  padding-right: 0;
  font-weight: bold;
  user-select: none;
  font-size: 1.2rem;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${palette.blueGrey[800]};
  }
`

export default SearchBox
