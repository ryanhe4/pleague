import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { schoolLists } from '../lib/api/schools/searchSchools'
import { setSchoolList } from '../lib/slices/rankSlice'

export default function useSchoolLists() {
  const dispatch = useDispatch()
  const { schoolList } = useSelector((state: RootState) => state.rankSlice)
  const { refetch } = useQuery('school_list', () => schoolLists(), {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false
  })
  useEffect(() => {
    // refetch
    if (schoolList !== null) {
      return
    }
    const apply = async () => {
      const res = await refetch()
      const sorted = res.data?.slice().sort((a, b) => b.point - a.point)
      //Redux?
      dispatch(setSchoolList(sorted))
    }
    apply()
  }, [dispatch, refetch])

  return [schoolList]
}
