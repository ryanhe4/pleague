import { css } from '@emotion/react'
import XIcon from '../XIcon/XIcon'
import palette from '../../lib/palette'

export type SearchButtonProps = {}

function SearchButton({}: SearchButtonProps) {
  return (
    <button css={searchButtonStyle}>
      <XIcon name="magnifier" />
    </button>
  )
}

const searchButtonStyle = css`
  height: 2.5rem;
  cursor: pointer;
  width: 6rem;
  color: white;
  border-radius: 0.1rem;
  border: 1px solid ${palette.blueGrey[500]};
  margin-left: 2rem;
  background: ${palette.blueGrey[600]};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:hover {
    background: ${palette.blueGrey[700]};
  }
`

export default SearchButton
