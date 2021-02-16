import { css, keyframes } from '@emotion/react'
import palette from '../../lib/palette'

export type AuthModalProps = {
  visible: boolean
}

function AuthModal({ visible }: AuthModalProps) {
  if (!visible) return null

  return (
    <div css={AuthModalBlock(true)}>
      <div>음 modal!</div>
    </div>
  )
}

const popOutToBottom = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px) scale(1.0);
  }
  100% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }
`

const AuthModalBlock = (visible: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;

  .wrapper {
    width: 606px;
    height: 480px;

    ${visible
      ? css`
          animation: ${popOutToBottom} 0.4s forwards ease-in-out;
        `
      : css`
          animation: ${popOutToBottom} 0.2s forwards ease-in-out;
        `};

    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
    display: flex;

    .gray-block {
      width: 216px;
      background: ${palette.grey[100]};
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: auto;
        display: block;
      }

      .welcome {
        font-size: 1.75rem;
        margin-top: 1.5rem;
        color: ${palette.grey[700]};
        text-align: center;
        font-weight: 600;
      }
    }

    .white-block {
      flex: 1;
      background: white;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;

      .exit-wrapper {
        display: flex;
        justify-content: flex-end;
        font-size: 1.5rem;
        color: ${palette.grey[600]};
        margin-bottom: 2.25rem;

        svg {
          cursor: pointer;
        }
      }

      .block-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
`

export default AuthModal
