import { css } from '@emotion/react'
import LabSettings from '../../components/LabSettings'

export type WorkspaceProps = {}

function Workspace({}: WorkspaceProps) {
  return (
    <div css={pageStyle}>
      <LabSettings />
      <div css={contentStyle}>asdf</div>
    </div>
  )
}

const pageStyle = css``
const contentStyle = css`
  padding-left: 22.5rem;
`
export default Workspace
