import { useEffect, useState } from 'react'
import useLoginCheckQuery from './query/useLoginCheckQuery'
import { useDispatch } from 'react-redux'
import { loadUser } from '../lib/slices/userSlice'
import { setCurrentSchool } from '../lib/slices/rankSlice'

export default function useLoadUser() {
  const dispatch = useDispatch()
  const [username, setUserName] = useState('')
  //쿼리로
  // 1. 사용자 데이터 가져오기
  // 2. 사용자 데이터 설정 username,
  // 그리고 리덕스 설정

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
      //dispatch currentSchool
      dispatch(setCurrentSchool(ret.data.school_info.school_name))
    }

    applyAsync()
  }, [dispatch, refetch, username])

  return [username] as [string]
}
