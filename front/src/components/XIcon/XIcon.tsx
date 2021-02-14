import * as svg from './svg'
import React from 'react'

export type XIconType = keyof typeof svg
export type XIconProps = {
  name: XIconType
  className?: string
  style?: React.CSSProperties
}

function XIcon({ name, className, style }: XIconProps) {
  return React.createElement(svg[name], {
    className,
    style,
  })
}

export default XIcon
