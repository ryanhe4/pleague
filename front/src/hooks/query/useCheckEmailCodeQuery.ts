import { useQuery } from 'react-query'
import { checkValidationCode } from '../../lib/api/auth/emailAuth'
import { QueryOptionsOf } from '../../lib/utils/types'

export default function useCheckEmailCodeQuery(email: string, code: string, options: QueryOptionsOf<typeof checkValidationCode> = {}) {
  return useQuery(useCheckEmailCodeQuery.createKey(email, code), () => checkValidationCode({ email, code }), options)
}

useCheckEmailCodeQuery.createKey = (email: string, code: string) => [
  'check_code',
  email, code
]
