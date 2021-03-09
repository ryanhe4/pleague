import { css } from '@emotion/react'
import palette from '../../lib/palette'
import XIcon from '../XIcon/XIcon'
import SidebarItem from '../SidebarItem'

export type SidebarProps = {}

function Sidebar({}: SidebarProps) {
  return (
    <div css={sidebarStyle}>
      <div className="logo">pLeague</div>
      <ul css={menuStyle}>
        <SidebarItem icon="flask" text="Home" to="/" />
        <SidebarItem icon="globe" text="PeerRank" to="/peerRank" />
        <SidebarItem icon="workspace" text="SummonRank" to="/summonerRank" />
      </ul>
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

const menuStyle = css`
  margin-left: -1rem;
  list-style: none;
  padding: 0;
  margin-top: 5.625rem;
`

export default Sidebar
