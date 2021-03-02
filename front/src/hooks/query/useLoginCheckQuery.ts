import { useQuery } from 'react-query'
import { QueryOptionsOf } from '../../lib/utils/types'
import { check } from '../../lib/api/auth/emailAuth'

export default function useLoginCheckQuery(options: QueryOptionsOf<typeof check> = {}) {
  return useQuery(useLoginCheckQuery.createKey(), () => check(), options)
}

useLoginCheckQuery.createKey = () => [
  'check_login'
]
