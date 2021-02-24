import { useQuery } from 'react-query'
import { register, registerFormType } from '../../lib/api/auth/emailAuth'
import { QueryOptionsOf } from '../../lib/utils/types'

export default function useRegisterSumbitQuery(data: registerFormType, options: QueryOptionsOf<typeof register> = {}) {
  return useQuery(useRegisterSumbitQuery.createKey(data), () => register(data), options)
}

useRegisterSumbitQuery.createKey = (data: registerFormType) => [
  'register_submit',
  data.email,
  data.name
]
