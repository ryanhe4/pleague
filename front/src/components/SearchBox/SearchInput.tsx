import { css } from '@emotion/react'
import palette from '../../lib/palette'

export type SearchInputProps = {}

function SearchInput({}: SearchInputProps) {
  return <input css={searchInputStyle} placeholder="소환사명을 입력하세요." />
}

const searchInputStyle = css`
  height: 2.5rem;
  line-height: 2.5rem;
  text-indent: 0.8rem;
  font-size: 1rem;
  color: ${palette.blueGrey[800]};
  border: 1px solid ${palette.grey[600]};
  width: 60%;
  margin-top: 0;
`

export default SearchInput
