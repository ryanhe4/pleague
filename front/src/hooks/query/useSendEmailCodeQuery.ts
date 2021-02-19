import { useQuery } from 'react-query'
import { sendValidationCode } from '../../lib/api/auth/emailAuth'
import { QueryOptionsOf } from '../../lib/utils/types'

export default function useSendEmailCodeQuery(keyword: string, options: QueryOptionsOf<typeof sendValidationCode> = {}) {
  return useQuery(useSendEmailCodeQuery.createKey(keyword), () => sendValidationCode({ email: keyword }), options)
}

useSendEmailCodeQuery.createKey = (keyword: string) => [
  'send_email',
  keyword
]
