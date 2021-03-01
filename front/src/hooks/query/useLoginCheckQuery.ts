import { useQuery } from 'react-query'
import { QueryOptionsOf } from '../../lib/utils/types'
import { check, logout } from '../../lib/api/auth/emailAuth'

export default function useLoginCheckQuery(options: QueryOptionsOf<typeof check> = {}) {
  return useQuery(useLoginCheckQuery.createKey(), () => check(), options)
}

useLoginCheckQuery.createKey = () => [
  'check_login'
]

export function useLogoutQuery(options: QueryOptionsOf<typeof logout> = {}) {
  return useQuery(useLogoutQuery.createKey(), () => logout(), options)
}

useLogoutQuery.createKey = () => [
  'user_logout'
]
