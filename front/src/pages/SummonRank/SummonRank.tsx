import { css } from '@emotion/react'
import SummonList from '../../components/SummonList'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'

export type WorkspaceProps = {}

function SummonRank({}: WorkspaceProps) {
  const {currentSchool} = useSelector((state:RootState) => state.rankSlice)
  return (
    <div css={pageStyle}>
      <h1>[{currentSchool}] 교내 랭킹</h1>
      <SummonList />
    </div>
  )
}

const pageStyle = css`
`

export default SummonRank
