import { css } from '@emotion/react'
import React from 'react'

export type AddressBlockProps = {}

type schoolList = {
  schoolName: string,
  address: string,
  region: string,
  id: number
}

const schoolLists: schoolList[] = [
  { schoolName: '서울대학교', address: '서울', region: '서울', id: 1 },
  { schoolName: '경희대학교', address: '세종특별자치시 조치원읍 세종로 2511(서창리, 고려대학교세종캠퍼스)', region: '경희', id: 2 }
]

function AddressBlock({}: AddressBlockProps) {
  return (<>
    {schoolLists?.length > 0 &&
    <div css={wrapper}>
      <ul css={addressListStyle}>
        {schoolLists.map((schooList) => (
          <li css={addressItem} key={schooList.id}>
            {schooList.schoolName}, {schooList.address}
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
