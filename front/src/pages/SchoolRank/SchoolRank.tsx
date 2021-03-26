import React from 'react'
import SchoolList from '../../components/SchoolList'
import SummonerPagination from '../../components/Pagination/SummonerPagination'

export type SchoolRankProps = {}

function SchoolRank({}: SchoolRankProps) {
  return (<>
    <h1>학교 랭킹</h1>
    <SchoolList />
    <SummonerPagination />
  </>)
}

export default SchoolRank
