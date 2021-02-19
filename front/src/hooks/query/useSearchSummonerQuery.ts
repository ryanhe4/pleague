import { useQuery } from 'react-query'
import { QueryOptionsOf } from '../../lib/utils/types'
import { searchSummoner } from '../../lib/api/summoner/searchSummoner'

export default function useSearchSummonerQuery(keyword: string, options: QueryOptionsOf<typeof searchSummoner> = {}) {
  return useQuery(useSearchSummonerQuery.createKey(keyword), () => searchSummoner(keyword),
    options)
}

useSearchSummonerQuery.createKey = (keyword: string) => [
  'search_summoners',
  keyword
]
