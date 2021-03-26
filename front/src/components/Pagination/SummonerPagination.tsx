import PaginationBase from './PaginationBase'
import useSummonerLists from '../../hooks/useSummonerLists'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'

export type SummonerPaginationProps = {}

function SummonerPagination({}: SummonerPaginationProps) {
  const [, handleLoad,,handlePrev] = useSummonerLists()
  const { prevable, nextable } = useSelector((state: RootState) => state.rankSlice)

  return <PaginationBase prevDisable={!prevable} nextDisable={!nextable} NextClick={handleLoad} PrevClick={handlePrev}/>
}

export default SummonerPagination
