import { useEffect, useState } from 'react'
import useLoginCheckQuery from './query/useLoginCheckQuery'
import { useDispatch } from 'react-redux'
import { loadUser } from '../lib/slices/userSlice'

export default function useLoadUser() {
  const dispatch = useDispatch()
  const [username, setUserName] = useState('')
  //쿼리로 ? 1. 데이터 가져오기 2. 데이터 설정 username, 그리고 리덕스

  const { data, refetch } = useLoginCheckQuery({ })
  useEffect(() => {
    refetch().then(r => {
      dispatch(loadUser(r.data))
      console.log(r.data)
      if (r.data === false) {
        setUserName('')
        return
      }
      setUserName(r.data?.summon_profile?.name)
    })
  }, [dispatch, refetch, username])

  return [username] as [string]
}
