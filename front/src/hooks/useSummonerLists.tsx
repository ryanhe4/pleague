import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { useQuery } from 'react-query'
import { useCallback, useEffect } from 'react'
import { getSummonerList } from '../lib/api/summoner/searchSummoner'
import {
  addSummonTopRank,
  loadSummonerList,
  prevSummonerList,
  setCurrentSchool,
  setSummonerList
} from '../lib/slices/rankSlice'

export default function useSummonerLists() {
  const dispatch = useDispatch()
  const { summonerList, currentSchool, summonerTopRank } = useSelector((state: RootState) => state.rankSlice)
  const { refetch } = useQuery('summoner_list', () => getSummonerList(currentSchool), {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false
  })

  let cursor: number | undefined
  if (summonerList !== null) {
    cursor = summonerList[summonerList.length - 1].id
  }

  const { refetch: refetchWithCursor } = useQuery('summoner_list', () => getSummonerList(currentSchool, cursor), {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false
  })
  useEffect(() => {
    const apply = async () => {
      if (summonerList === null) {
        const res = await refetch()

        //Redux
        if (res.data?.school) {
          dispatch(setCurrentSchool(res.data.school))
        }

        dispatch(setSummonerList(res.data?.summoner))
      }
    }
    apply()
  }, [currentSchool, dispatch, refetch, summonerList])

  const handleLoad = useCallback(async () => {
    // load된 데이터의 길이가 n+2 이상이면 load 하지 않기
    if (summonerList && summonerList.length > summonerTopRank) {
      dispatch(addSummonTopRank())
      return
    }
    const res = await refetchWithCursor()

    dispatch(loadSummonerList(res.data?.summoner))
  }, [dispatch, refetchWithCursor])

  const handlePrev = useCallback(async () => {
    dispatch(prevSummonerList())
  }, [dispatch])

  return [summonerList, handleLoad, summonerTopRank, handlePrev] as [
    typeof summonerList,
    typeof handleLoad,
    number,
    typeof handlePrev
  ]
}
