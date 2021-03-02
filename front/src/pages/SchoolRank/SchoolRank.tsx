import React from 'react'
import SchoolList from '../../components/SchoolList'

export type SchoolRankProps = {}

function SchoolRank({}: SchoolRankProps) {
  return (<div>
    <SchoolList />
    <div>스쿨pagination</div>
  </div>)
}

export default SchoolRank
