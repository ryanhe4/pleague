import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { getSummonerList } from '../lib/api/summoner/searchSummoner'
import { setSummonerList } from '../lib/slices/rankSlice'

export default function useSummonerLists() {
  const dispatch = useDispatch()
  const { summonerList, currentSchool } = useSelector((state: RootState) => state.rankSlice)
  const { refetch } = useQuery('summoner_list', () => getSummonerList(currentSchool), {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false
  })
  useEffect(() => {
    const apply = async () => {
      const res = await refetch()
      //const sorted = res.data?.slice().sort((a, b) => b.point - a.point) 정렬

      //Redux
      currentSchool !== '1' ? dispatch(setSummonerList(res.data?.summoner)): dispatch(setSummonerList(res.data?.summoner))
    }
    apply()
  }, [currentSchool, dispatch, refetch, summonerList])

  return [summonerList]
}
