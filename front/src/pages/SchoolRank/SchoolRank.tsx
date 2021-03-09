import React from 'react'
import SchoolList from '../../components/SchoolList'

export type SchoolRankProps = {}

function SchoolRank({}: SchoolRankProps) {
  return (<>
    <h1>학교 랭킹</h1>
    <SchoolList />
    <div>스쿨pagination</div>
  </>)
}

export default SchoolRank
