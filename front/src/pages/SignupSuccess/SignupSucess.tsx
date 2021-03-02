import useLoadUser from '../../hooks/useLoadUser'

export type SignupSucessProps = {}

function SignupSucess({}: SignupSucessProps) {
  useLoadUser()

  return (
    <div>회원 가입 완료!</div>
  )
}

export default SignupSucess
