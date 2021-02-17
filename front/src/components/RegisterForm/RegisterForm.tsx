import { css } from '@emotion/react'
import NameInput from './NameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import Pass2Input from './Pass2Input'
import palette from '../../lib/palette'
import AuthSocialBox from '../auth/AuthSocialBox'
import React from 'react'
import AuthCodeInput from './AuthCodeInput'
import AddressBlock from './AddressBlock'
import useInput from '../../hooks/useInput'

export type RegisterFormProps = {}

function RegisterForm({}: RegisterFormProps) {
  const [name, handleName] = useInput('')
  const [email, handleEmail] = useInput('')
  const [password, handlePassword] = useInput('')
  const [passwordCheck, handlePasswrodCheck] = useInput('')
  const [summonerName, handleSummonerName] = useInput('')
  const [schoolName, handleSchoolName] = useInput('')
  const [verifyNum, handleVerifyNum] = useInput('')

  const onClickSendEmail = () => {
  }

  return (
    <div css={containerStyle}>
      <h2 css={subTitle}>소셜 계정으로 회원가입</h2>
      <AuthSocialBox />
      <div css={lineContainer}>
        <hr />
        <span> 또는 </span>
        <hr />
      </div>

      <h2 css={subTitle}>이메일로 회원가입</h2>
      <form onSubmit={() => {console.log('클릭!')}} autoComplete='off' css={regForm}>
        <label css={labelStyle(false)} htmlFor='name'>이름</label>
        <NameInput name={name} handlename={handleName} />
        {/*{!(name.length < 8) && <InvalidMsg>이름이 너무 길어요 !</InvalidMsg>}*/}
        <div>
          <label css={labelStyle(false)} htmlFor='email'>이메일</label>
          <EmailInput value={email} onChange={handleEmail} placeholder='email@gmail.com' />
          <button type='button' css={sendEmailBtn} disabled>인증</button>
        </div>
        <div>
          <AuthCodeInput value={verifyNum} onChange={handleVerifyNum}/>
          <button type='button' css={sendEmailBtn} onClick={onClickSendEmail}>확인</button>
        </div>
        <label css={labelStyle(false)} htmlFor='password'>비밀번호</label>
        <PasswordInput value={password} onChange={handlePassword} />
        <label css={labelStyle(false)} htmlFor='password2'>비밀번호 확인</label>
        <Pass2Input value={passwordCheck} onChange={handlePasswrodCheck} />
        <div style={{ marginTop: '1rem' }}>
          <label css={labelStyle(true)} htmlFor='password2'>롤 소환사명</label>
          <EmailInput value={summonerName} onChange={handleSummonerName} placeholder='ex) Hide on bush' />
          <button type='button' css={sendEmailBtn}>검색</button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label css={labelStyle(true)} htmlFor='password2'>우리 학교</label>
          <EmailInput value={schoolName} onChange={handleSchoolName} placeholder='XX대학교' />
          <button css={sendEmailBtn} type='button'>검색</button>
          <AddressBlock />
        </div>
        <button css={registerBtn} type='submit' disabled>
          회원가입
        </button>
      </form>
    </div>)
}

const subTitle = css`
  font-size: 1rem;
  margin: 1.5rem 0;
  font-weight: bold;
`

const containerStyle = css`
  width: 450px;
  height: 100%;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding: 0.1rem 1rem;
  box-shadow: 2px 5px 0px rgba(0, 0, 0, 0.1);
`

const regForm = css`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0;
`

const labelStyle = (isHighlight: boolean) => css`
  display: inline-block;

  ${isHighlight ? css`
    color: ${palette.teal[500]};
  ` : css`
    color: #616161;
  `};
  font-size: 0.9rem;
  font-weight: 400;
  width: 100%;
  padding-left: 0.2rem;
`

const sendEmailBtn = css`
  width: 20%;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #35d0ba;
  color: #fff;
  height: 36px;
  margin-left: 1rem;

  &:hover {
    background-color: #30c2ad;
    cursor: pointer;
  }

  &[disabled] {
    background-color: #eeeeee;
    color: #bdbdbd;
    cursor: default;
  }
`

const lineContainer = css`
  margin: 1rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;

  hr {
    width: 44%;
    display: inline-block;
    border: none;
    height: 0.5px;
    background-color: #e0e0e0;
  }

  span {
    color: #bdbdbd;
    font-size: 0.8rem;
    display: inline-block;
    margin: 0.5rem;
  }
`
const registerBtn = css`
  border: none;
  border-radius: 5px;
  width: 100%;
  padding: 0.7rem 0;
  font-size: 1rem;
  color: #fff;
  background-color: #35d0ba;
  margin: 1.5rem 0 1.5rem;

  &:hover {
    background-color: #30c2ad;
    cursor: pointer;
  }

  &[disabled] {
    background-color: #eeeeee;
    color: #bdbdbd;
    cursor: default;
  }
`

export default RegisterForm
