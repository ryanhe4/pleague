import { css } from '@emotion/react'
import XIcon from '../XIcon/XIcon'
import palette from '../../lib/palette'

export type MonthPickerProps = {
  minimum?: Value
  maximum?: Value
  value: Value
  onChange(value: Value): void
}

type Value = {
  month: number
  year: number
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function MonthPicker({}: MonthPickerProps) {
  return (
    <div css={block}>
      <div css={header}>
        <button css={arrowButton}>
          <XIcon name="arrow_left" />
        </button>
        <div css={year}>2021</div>
        <button css={arrowButton}>
          <XIcon name="arrow_right" />
        </button>
      </div>
      <div css={monthsStyle}>
        {months.map((month) => (
          <div css={monthItem} key={month}>
            {month}
          </div>
        ))}
      </div>
    </div>
  )
}

const block = css`
  width: 16rem;

  position: absolute;
  background: white;
  box-shadow: 0px 0.25rem 0.5rem rgba(0, 0, 0, 0.07);
  border-radius: 0.5rem;
  bottom: -0.5rem;
  transform: translate3d(0, 100%, 0);
  z-index: 5;
  overflow: hidden;
`
const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
`

const arrowButton = css`
  background: none;
  border: none;
  outline: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

const year = css`
  line-height: 1.5;
  font-size: 1rem;
`

const monthsStyle = css`
  display: flex;
  flex-wrap: wrap;
  color: ${palette.blueGrey[600]};
`
const monthItem = css`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  width: 33.3333%;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

export default MonthPicker
