import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import AuthSocialBox from './AuthSocialBox'
import palette from '../../lib/palette'
import { useDispatch } from 'react-redux'
import { offScreenMask } from '../../lib/slices/commonSlice'

export type AuthModalFormProps = {
  onClose: () => void
}

function AuthModalForm({ onClose }: AuthModalFormProps) {

  return <div css={modalFormStyle}>
    <h3>로그인</h3>
    <h4 className='atemail'>이메일로 로그인</h4>
    <input css={loginIDStyle} placeholder='이메일을 입력하세요.' />
    <input css={loginPassStyle} />
    <div css={loginOption}>
      <label>{' '}
        <input type='checkbox' id='hint' /> 로그인 유지하기
      </label>
      <div>아이디/비밀번호 찾기</div>
    </div>
    <button css={loginButtonStyle}>
      {' '}
      로그인{' '}
    </button>
    <h4 className='atemail'>소셜 계정으로 로그인</h4>
    <AuthSocialBox />
    <div css={loginRegStyle}>
      <div className='loginLine'>
        회원이 아니신가요? <Link onClick={onClose} to='/signup'>회원가입</Link>
      </div>
    </div>
  </div>
}

const modalFormStyle = css`
  margin: 0 auto;
  width: 100%;
  position: relative;
  padding: 0 20px 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .atemail {
    color: rgb(134, 142, 150);
    margin-top: 0.1rem;
    margin-bottom: 0.5rem;
  }
`
const loginIDStyle = css`
  margin-top: 30px;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  border: 1px solid #e5e5e5;
  padding: 9px 12px;
  outline: none;
  box-sizing: border-box;
`
const loginPassStyle = css`
  margin-top: 15px;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  border: 1px solid #e5e5e5;
  padding: 9px 12px;
  outline: none;
  box-sizing: border-box;
`
const loginOption = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .autoLogin {
    font-size: 0.8rem;
    color: #8d8d8d;
    line-height: 3;
  }
`

const loginButtonStyle = css`
  height: 40px;
  font-size: 14px;
  padding: 13px 30px;
  cursor: pointer;
  background-color: ${palette.blueGrey[600]};
  color: white;
  line-height: 1px;
  margin-top: 20px;
  margin-bottom: 12px;
  border-radius: 3px;
  border-style: none;
  font-weight: bold;

  &:hover {
    background: ${palette.blueGrey[800]};
  }
`

const loginRegStyle = css`
  text-align: center;

  .loginLine {
    color: #bcbcbc;
    font-size: 1.25rem;
    margin-bottom: 35px;

    a {
      color: ${palette.blueGrey[600]};
      text-decoration: none;
      cursor: pointer;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline ${palette.blueGrey[600]};
    }
  }
`

export default AuthModalForm
