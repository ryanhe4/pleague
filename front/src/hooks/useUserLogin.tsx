import { useQuery } from 'react-query'
import { login } from '../lib/api/auth/emailAuth'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { loadUser } from '../lib/slices/userSlice'
import { offScreenMask } from '../lib/slices/commonSlice'

export default function useUserLogin(email: string, password: string) {
  const { refetch } = useQuery('login', () => login({ email, password }), {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false
    }
  )
  const dispatch = useDispatch()

  const handleLogin = useCallback(async () => {
    const ret = await refetch()
    if (ret.isError) {
      alert(ret.error)
      return
    }
    dispatch(loadUser(ret.data))
    dispatch(offScreenMask())
  }, [dispatch, refetch])

  return [handleLogin]
}
