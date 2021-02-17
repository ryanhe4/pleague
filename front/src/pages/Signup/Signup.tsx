import { css } from '@emotion/react'
import RegisterForm from '../../components/RegisterForm'

export type SignupProps = {}

function Signup({}: SignupProps) {
  return <div css={pageStyle}>
    <RegisterForm />
  </div>
}

const pageStyle = css`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100%;
`

export default Signup
