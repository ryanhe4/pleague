import { css } from '@emotion/react'

export type PaginationBaseProps = {
  PrevClick?(): void
  NextClick?(): void
  prevDisable: boolean
  nextDisable: boolean
}

function PaginationBase({
                          prevDisable,
                          nextDisable,
                          NextClick,
                          PrevClick
                        }: PaginationBaseProps) {

  return <div css={baseStyle}>
    <button disabled={prevDisable} onClick={PrevClick}> Prev</button>
    <button disabled={nextDisable} onClick={NextClick}> Next</button>
  </div>
}

const baseStyle = css`
  width: 90%;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default PaginationBase
