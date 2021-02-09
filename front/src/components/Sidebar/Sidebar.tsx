import { css } from '@emotion/react'
import palette from '../../lib/palette'

export type SidebarProps = {}

function Sidebar({}: SidebarProps) {
  return (
    <div css={sidebarStyle}>
      <div className="logo">pLeague</div>
    </div>
  )
}

const sidebarStyle = css`
  flex: 1;
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${palette.blueGrey[600]};
  }
`

export default Sidebar
