import { css } from '@emotion/react'
import XIcon from '../XIcon/XIcon'
import palette from '../../lib/palette'
import { useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'

export type MonthPickerProps = {
  minimum?: MonthYearValue
  maximum?: MonthYearValue
  value: MonthYearValue
  onChange(value: MonthYearValue): void
  onClose: Parameters<typeof useOnClickOutside>[1]
  visible: boolean
}

export type MonthYearValue = {
  month: number
  year: number
}

export const months = [
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

function MonthPicker({ value, onChange, onClose, visible }: MonthPickerProps) {
  const [localValue, setLocalValue] = useState(value)
  const onClickPrev = () => {
    setLocalValue({
      ...localValue,
      year: localValue.year - 1,
    })
  }
  const onClickNext = () => {
    setLocalValue({
      ...localValue,
      year: localValue.year + 1,
    })
  }

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, onClose)

  if (!visible) return null

  return (
    <div css={block} ref={ref}>
      <div css={header}>
        <button css={arrowButton} onClick={onClickPrev}>
          <XIcon name="arrow_left" />
        </button>
        <div css={year}>{localValue.year}</div>
        <button css={arrowButton} onClick={onClickNext}>
          <XIcon name="arrow_right" />
        </button>
      </div>
      <div css={monthsStyle}>
        {months.map((month, i) => (
          <div
            css={monthItem(
              localValue.year === value.year &&
                months[value.month - 1] === month
            )}
            key={month}
            tabIndex={0}
            onClick={() => {
              onChange({
                month: i + 1,
                year: localValue.year,
              })
            }}
          >
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
const monthItem = (active?: boolean) => css`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  width: 33.3333%;
  font-size: 0.875rem;
  cursor: pointer;
  user-select: none;
  outline: none;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  ${active &&
  css`
    background: ${palette.teal[500]};
    color: white;
    font-weight: bold;

    &:hover {
      background: ${palette.teal[400]};
    }
  `}
  &:focus-visible {
    background: rgba(0, 0, 0, 0.05);
  }
`

export default MonthPicker
