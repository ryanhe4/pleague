import { useEffect, useState } from 'react'
import useLoginCheckQuery from './query/useLoginCheckQuery'
import { useDispatch } from 'react-redux'
import { loadUser } from '../lib/slices/userSlice'

export default function useLoadUser() {
  const dispatch = useDispatch()
  const [username, setUserName] = useState('')
  //쿼리로 ? 1. 데이터 가져오기 2. 데이터 설정 username, 그리고 리덕스

  const { data, refetch } = useLoginCheckQuery({
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false
  })
  useEffect(() => {
    if (username !== '') {
      return
    }
    const applyAsync = async () => {
      const ret = await refetch()
      if (ret.isError) {
        return
      }
      dispatch(loadUser(ret.data))
    }

    applyAsync()
  }, [dispatch, refetch, username])

  return [username] as [string]
}
