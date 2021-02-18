import {useQuery} from 'react-query'
import { searchSchools } from '../../lib/api/schools/searchSchools'
import { QueryOptionsOf } from '../../lib/utils/types'

export default function useSearchSchoolsQuery(keyword: string, options: QueryOptionsOf<typeof searchSchools> = {}
){
  return useQuery(
    useSearchSchoolsQuery.createKey(keyword),
    () => searchSchools(keyword),
    options)
}

useSearchSchoolsQuery.createKey = (keyword: string) => [
  'search_schools',
  keyword
]
