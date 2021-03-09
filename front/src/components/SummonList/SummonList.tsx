import React from 'react'
import { css } from '@emotion/react'
import palette from '../../lib/palette'
import useSummonerLists from '../../hooks/useSummonerLists'
import XIcon from '../XIcon/XIcon'
import { medalStyle } from '../SchoolList/SchoolList'

export type SummonListProps = {}

function SummonList({}: SummonListProps) {
  const [summonerList] = useSummonerLists()

  console.log(summonerList)

  return <div css={listStyle}>
    <div>랭킹</div>
    <div>소환사</div>
    <div>티어</div>
    <div>LP</div>
    <>
      {summonerList && summonerList.map((summoner, index) => (
        <React.Fragment key={summoner.name}>
          <div>
            {(index + 1) === 1 && <XIcon name='medal' css={medalStyle(index + 1)} />}
            {(index + 1) === 2 && <XIcon name='medal' css={medalStyle(index + 1)} />}
            {(index + 1) === 3 && <XIcon name='medal' css={medalStyle(index + 1)} />}

            {index > 3 && index + 1}
          </div>
          <div>
            <span>{summoner.name}</span>
          </div>
          <div>
            {summoner.tier === null ? `Unranked`
              : <>
                <img src={`http://localhost:3000/rank_emblem/${summoner.tier}.png`} />
                {summoner.tier} {summoner.rank}
              </>
            }

          </div>
          <div>
            {summoner.leaguePoints}
          </div>
        </React.Fragment>
      ))}
    </>
  </div>
}

const listStyle = css`
  display: grid;
  justify-content: center;
  width: 90%;
  height: 100%;
  grid-template-columns: [Rank] 1fr [Summoner] 4fr [Tier] 2fr [LP] 0.8fr;
  grid-auto-rows: 50px;
  border: 2px solid #bdbdbd;
  border-radius: 12px;
  background: ${palette.grey[50]};

  img {
    width: 32px;
    margin-right: 0.5rem;
  }

  & > div {
    border-top: 1px solid #bdbdbd;
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3),
    &:nth-of-type(4) {
      border-top: none;
    }
  }
`

export default SummonList
