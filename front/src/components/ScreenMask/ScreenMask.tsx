import { css } from '@emotion/react'
import transitions from '../../lib/transitions'
import { useEffect, useRef, useState } from 'react'

export type ScreenMaskProps = {
  visible: boolean
}

function ScreenMask({ visible }: ScreenMaskProps) {
  const [animate, setAnimate] = useState(false)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [closed, setClosed] = useState(true)
  const mounted = useRef(false)

  useEffect(() => {
    // scrollbar
    document.body.style.overflowY = visible ? 'hidden' : 'initial'

    // animate
    if (!mounted.current) {
      mounted.current = true
    } else {
      setAnimate(true)
      timeoutId.current = setTimeout(() => {
        setAnimate(false)
        if (!visible) {
          setClosed(true)
        }
      }, 250)
    }

    if (visible) {
      setClosed(false)
    }
    return () => {
      if (!timeoutId.current) return
      clearTimeout(timeoutId.current)
    }
  }, [visible])

  useEffect(() => {
    return () => {
      document.body.style.overflowY = 'initial'
    }
  }, [])

  if (!animate && !visible && closed) return null

  return <div css={screenmaskStyle(animate, visible)} />
}

const screenmaskStyle = (animate: boolean, visible: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(249, 249, 249, 0.85);
  z-index: 10;

  ${visible ? css`
            animation: ${transitions.fadeIn} 0.25s forwards;
          ` :
          css`
            animation: ${transitions.fadeOut} 0.25s forwards;
          `}
`

export default ScreenMask
