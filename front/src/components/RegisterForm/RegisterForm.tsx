import { css } from '@emotion/react'
import NameInput from './NameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import Pass2Input from './Pass2Input'
import palette from '../../lib/palette'
import AuthSocialBox from '../auth/AuthSocialBox'
import React, { useCallback, useState } from 'react'
import AuthCodeInput from './AuthCodeInput'
import AddressBlock from './AddressBlock'
import useInput from '../../hooks/useInput'
import useSearchSchoolsQuery from '../../hooks/query/useSearchSchoolsQuery'
import PacmanLoader from 'react-spinners/PacmanLoader'
import useSearchSummonerQuery from '../../hooks/query/useSearchSummonerQuery'
import { searchSummonerType } from '../../lib/api/summoner/searchSummoner'
import { QueryObserverResult } from 'react-query'
import useSendEmailCodeQuery from '../../hooks/query/useSendEmailCodeQuery'
import useCheckEmailCodeQuery from '../../hooks/query/useCheckEmailCodeQuery'
import { SearchSchoolsResult } from '../../lib/api/schools/searchSchools'
import useRegisterSumbitQuery from '../../hooks/query/useRegisterSubmitQuery'
import { summonerForm } from '../../lib/api/auth/emailAuth'
import { Redirect, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'

export type RegisterFormProps = {}

function RegisterForm({}: RegisterFormProps) {
  const [name, handleName] = useInput('')
  const [email, handleEmail] = useInput('')
  const [password, handlePassword] = useInput('')
  const [passwordCheck, handlePasswordCheck] = useInput('')
  const [summonerName, handleSummonerName] = useInput('')
  const [schoolName, handleSchoolName, resetSchool, setSchoolName] = useInput('')
  const [verifyNum, handleVerifyNum] = useInput('')
  const [summoner, setSummoner] = useState<summonerForm | null>(null)
  const [school, setSchool] = useState<SearchSchoolsResult | null>(null)
  const [summonerValidity, setSummonerValidity] = useState(false)
  const [schoolValidity, setSchoolValidity] = useState(false)
  const { user } = useSelector((state: RootState) => state.userSlice)

  const handleSchoolClick = useCallback((e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const el = e.target as HTMLInputElement
    const idval = el.getAttribute('id')
    const adres = el.getAttribute('value')
    const info = idval?.split('(')

    if (!(info && info[1])) {
      return
    }

    const region = info[1].slice(0, info[1].length - 1)

    setSchoolName(() => `${idval}`)
    setSchoolValidity(true)
    setSchool({
      schoolName: info[0],
      adres,
      region
    })
  }, [setSchoolName])
  const history = useHistory()

  const { isLoading: schoolInfoLoading, data: schoolData, refetch: refetchSchool } = useSearchSchoolsQuery(schoolName, {
    refetchOnWindowFocus: false,
    enabled: false
  })

  const {
    isLoading: checkCodeLoading,
    data: checkCodeResult,
    refetch: refetchCheckCode
  } = useCheckEmailCodeQuery(email, verifyNum, {
    refetchOnWindowFocus: false,
    enabled: false
  })

  const {
    isLoading: registerLoading,
    refetch: registerFetch
  } = useRegisterSumbitQuery({
    email,
    password,
    name,
    summoner,
    school
  }, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false
  })

  const {
    isLoading: sendmailLoading,
    data: sendmailResult = true,
    refetch: sendmailFetch
  } = useSendEmailCodeQuery(email, {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false
  })

  const {
    isLoading: searchSummonerLoading,
    data: summonerData,
    refetch: refetchSummoner
  } = useSearchSummonerQuery(summonerName, {
    refetchOnWindowFocus: false,
    enabled: false
  })

  const handleCheckCodeClick = useCallback(() => {
    const regString = /^[0-9]{6}$/
    if (regString.test(verifyNum)) {
      refetchCheckCode().then(r => {
        if (r.error !== null) {
          alert('오류발생')
          return
        }
        if (r.data === true) {
          alert('인증되었습니다.')
        } else {
          alert('알맞지 않은 인증코드 입니다.')
        }
      })
    } else {
      alert('알맞지 않은 인증코드 형식 입니다.')
    }
  }, [refetchCheckCode, verifyNum])

  const handleSendMailClick = useCallback(() => {
    const mailformat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (mailformat.test(email)) {
      sendmailFetch().then(r => {
        if (r.error !== null) {
          if (r.data === true) {
            alert('이미 등록된 사용자 입니다.')
          }
          return
        } else {
          alert('인증번호를 입력해주세요.')
        }
      })
    } else {
      alert('이메일 형식을 다시 확인해주세요')
    }
  }, [email, sendmailFetch])
  const handleSummonerSearchClick = useCallback(() => {
    refetchSummoner().then((r) => {
      const { data }: QueryObserverResult<searchSummonerType, unknown> = r
      if (data?.name === summonerName) {
        setSummonerValidity(true)
        if (data[0]?.queueType === 'RANKED_SOLO_5X5') {
          const { tier = '', rank = '', leaguePoints = 0 } = data[0]
          setSummoner({
            name: data.name,
            id: data.id,
            profileIconId: data.profileIconId,
            summonerLevel: data.summonerLevel,
            tier,
            rank,
            leaguePoints
          })
        } else if (data[1]?.queueType === 'RANKED_SOLO_5x5') {
          const { tier = '', rank = '', leaguePoints = 0 } = data[1]
          setSummoner({
            name: data.name,
            id: data.id,
            profileIconId: data.profileIconId,
            summonerLevel: data.summonerLevel,
            tier,
            rank,
            leaguePoints
          })
        } else {
          setSummoner({
            name: data.name,
            id: data.id,
            profileIconId: data.profileIconId,
            summonerLevel: data.summonerLevel
          })
        }
        alert('인증되었어요 !')
      } else {
        alert('해당 소환사가 존재하지 않습니다.')
      }
    })
  }, [refetchSummoner, summonerName])
  const handleSchoolSearchClick = useCallback(() => {
    if (schoolName.includes('중학교') || schoolName.includes('고등학교') || schoolName.includes('대학교')) {
      if (schoolName === '중학교' || schoolName === '고등학교' || schoolName === '대학교') {
        alert('학교이름을 정확하게 입력해주세요!')
        resetSchool()
      } else {
        refetchSchool()
      }
    } else {
      alert('학교이름을 정확하게 입력해주세요!')
      resetSchool()
    }
  }, [refetchSchool, resetSchool, schoolName])
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (password === passwordCheck && schoolValidity && summonerValidity && checkCodeResult) {
      // query 요청
      registerFetch().then(r => {
        if (r.error) {
          console.log(r.error)
          return
        }
        if (r.data) {
          //회원가입 성공페이지 이동?
          history.push('/signupsuccess')
        } else {
          alert('회원가입에 실패 다시 시도해주세요.')
        }
      })

    } else if (!checkCodeResult) {
      alert('이메일 인증을 완료해주세요!')
    } else if (password !== passwordCheck) {
      alert('비밀번호를 다시 확인해주세요')
    } else if (!summonerValidity) {
      alert('소환사 인증을 다시 진행해주세요.')
    } else if (!schoolValidity) {
      alert('학교 정보를 입력해주세요')
    }
  }, [checkCodeResult, history, password, passwordCheck, registerFetch, schoolValidity, summonerValidity])

  if (user) return <Redirect to='/' />

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
      <form onSubmit={handleSubmit} autoComplete='off' css={regForm}>
        <label css={labelStyle(false)} htmlFor='name'>이름</label>
        <NameInput name={name} handlename={handleName} />
        {!(name.length < 8) && <div css={InvalidMsg}>이름이 너무 길어요 !</div>}
        <div>
          <label css={labelStyle(false)} htmlFor='email'>이메일</label>
          <EmailInput id='email' value={email} readOnly={!sendmailResult} onChange={handleEmail}
                      placeholder='email@gmail.com' />
          {sendmailLoading ? <div css={spinnerBoxStyle}>
              <PacmanLoader size={17} color='#F7F700' loading={sendmailLoading} />
            </div> :
            <button type='button' css={sendEmailBtn} disabled={!email || !sendmailResult}
                    onClick={handleSendMailClick}>인증</button>
          }
        </div>
        {!sendmailResult &&
        <div>
          <AuthCodeInput value={verifyNum} onChange={handleVerifyNum} readonly={checkCodeResult} />
          {checkCodeLoading ?
            <div css={spinnerBoxStyle}><PacmanLoader size={17} color='#F7F700' loading={checkCodeLoading} /></div>
            : <button type='button' css={sendEmailBtn} disabled={!verifyNum || checkCodeResult}
                      onClick={handleCheckCodeClick}>확인</button>
          }
        </div>}
        <label css={labelStyle(false)} htmlFor='password'>비밀번호</label>
        <PasswordInput value={password} onChange={handlePassword} />
        {(password !== '') &&
        password.length < 8 && ( // 비밀번호 Validation 체크
          <div css={InvalidMsg}>비밀번호는 8자리 이상이어야 해요 !</div>
        )}
        <label css={labelStyle(false)} htmlFor='password2'>비밀번호 확인</label>
        <Pass2Input value={passwordCheck} onChange={handlePasswordCheck} />
        {(passwordCheck !== '') &&
        password !== passwordCheck && ( // 비밀번호 Validation 체크
          <div css={InvalidMsg}>비밀번호가 다릅니다.</div>
        )}
        <div style={{ marginTop: '1rem' }}>
          <label css={labelStyle(true)} htmlFor='password2'>롤 소환사명</label>
          <EmailInput id='summoner' value={summonerName} onChange={handleSummonerName} placeholder='ex) Hide on bush'
                      readOnly={summonerValidity} />
          {searchSummonerLoading ?
            <div css={spinnerBoxStyle}>
              <PacmanLoader size={17} color='#F7F700' loading={searchSummonerLoading} />
            </div> :
            <button type='button' css={sendEmailBtn} onClick={handleSummonerSearchClick}
                    disabled={!summonerName || summonerValidity}>검색</button>
          }
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label css={labelStyle(true)} htmlFor='password2'>우리 학교</label>
          <EmailInput id='school' value={schoolName} readOnly={schoolValidity} onChange={handleSchoolName}
                      placeholder='ex) 서울대학교' />
          {schoolInfoLoading ? <div css={spinnerBoxStyle}>
              <PacmanLoader size={17} color='#F7F700' loading={schoolInfoLoading} />
            </div> :
            <button css={sendEmailBtn} type='button' onClick={handleSchoolSearchClick}
                    disabled={!schoolName || schoolValidity}>검색</button>}
          {schoolData && <AddressBlock data={schoolData} onClick={handleSchoolClick} />}
        </div>
        {registerLoading ? <div css={spinnerBoxStyle}>
          <PacmanLoader size={17} color='#F7F700' loading={registerLoading} />
        </div> : <button css={registerBtn} type='submit'
                         disabled={!(name && email && password && passwordCheck && schoolValidity && summonerValidity)}>
          회원가입
        </button>}
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

const InvalidMsg = css`
  margin: -1rem 0 1.5rem;
  padding-left: 0.2rem;
  color: #e74c3c;
  font-size: 0.8rem;
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
const spinnerBoxStyle = css`
  display: inline-block;
  margin-left: 1.1rem;
  margin-bottom: 0.5rem;
`

export default RegisterForm
