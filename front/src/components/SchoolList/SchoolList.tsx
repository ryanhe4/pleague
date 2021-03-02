import { css } from '@emotion/react'
import React from 'react'
import useSchoolLists from '../../hooks/useSchoolLists'
import palette from '../../lib/palette'
import XIcon from '../XIcon/XIcon'

export type SchoolListProps = {}

function SchoolList({}: SchoolListProps) {
  const [schoolList] = useSchoolLists()

  return <div css={wrapper}>
    <div>랭킹</div>
    <div>학교</div>
    <div>점수</div>
    <>
      {schoolList && schoolList.map((school, index) => (
        <React.Fragment key={school.school_name}>
          <div>
            {(index + 1) === 1 && <XIcon name='medal' css={medalStyle(index + 1)} />}
            {(index + 1) === 2 && <XIcon name='medal' css={medalStyle(index + 1)} />}
            {(index + 1) === 3 && <XIcon name='medal' css={medalStyle(index + 1)} />}

            {index > 3 &&index + 1}
          </div>
          <div css={schoolNameStyle}>
            <span>{school.school_name}</span>
          </div>
          <div>
            {school.point}
          </div>
        </React.Fragment>
      ))}
    </>
  </div>
}

const schoolNameStyle = css`
  font-weight: bold;
  color: ${palette.teal[500]};

  span:hover {
    cursor: pointer;
  }
`
const medalStyle = (rank: number) => css`
  ${rank && rank === 1 && css`
    color: gold;
  `}
  ${rank && rank === 2 && css`
    color: silver;
  `}
  ${rank && rank === 3 && css`
    color: saddlebrown;
  `}
`

const wrapper = css`
  display: grid;
  justify-content: center;
  width: 90%;
  height: 100%;
  grid-template-columns: [Rank] 1fr [School] 3fr [Score] 1fr;
  grid-auto-rows: 50px;
  border-bottom: 2px solid #9e9e9e;
  border-left: 2px solid #9e9e9e;
  border-top: 2px solid #9e9e9e;
  border-radius: 12px;
  background: ${palette.grey[50]};

  & > div {
    border-top: 1px dotted #9e9e9e;
    border-right: 2px solid #9e9e9e;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  //header
  & > div:nth-child(1),
  div:nth-child(2),
  div:nth-child(3) {
    border-top: none;
    border-bottom: 2px solid #9e9e9e;
    font-weight: bold;

  }

  & > div:nth-child(4),
  div:nth-child(5),
  div:nth-child(6) {
    border-top: none;
  }

  & div:nth-child(3) {
    border-radius: 0 12px 0 0;
  }

  & div:last-child {
    border-radius: 0 0 12px 0;
  }
`

export default SchoolList
