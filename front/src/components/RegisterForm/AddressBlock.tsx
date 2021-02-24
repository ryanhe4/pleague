import { css } from '@emotion/react'
import React from 'react'
import { SearchSchoolsResult } from '../../lib/api/schools/searchSchools'

export type AddressBlockProps = {
  data: SearchSchoolsResult[]
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

function AddressBlock({ data, onClick }: AddressBlockProps) {
  return (<>
    {data?.length > 0 &&
    <div css={wrapper}>
      <ul css={addressListStyle}>
        {data.map((schoolList) => (
          <li css={addressItem}
              key={schoolList.id}
              onClick={onClick}
              id={`${schoolList.schoolName} (${schoolList.region})`}
              value={`${schoolList.adres}`}
          >
            {schoolList.schoolName}, {schoolList.adres}
          </li>
        ))}
      </ul>
    </div>
    }
  </>)
}

const wrapper = css`
`

const addressListStyle = css`
  margin-top: -0.5rem;
  padding-left: 0;
`
const addressItem = css`
  display: flex;
  padding-left: 0.5rem;
  align-items: center;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  height: 42px;
  margin-bottom: 0.5rem;
  color: #424242;
  font-size: 0.8rem;

  &:hover {
    background-color: #35d0ba;
    border: 1px solid #35d0ba;
    cursor: pointer;
    color: #fff;
    font-weight: 400;
  }

  &:focus {
    background-color: #35d0ba;
    border: 1px solid #35d0ba;
  }
`

export default AddressBlock
