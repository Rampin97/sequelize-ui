import React from 'react'
import Svg, { SvgProps } from './Svg'

type CloseIconProps = SvgProps & {
  strokeWidth?: number
}

export default function CloseIcon({ title, strokeWidth = 2 }: CloseIconProps): React.ReactElement {
  return (
    <Svg title={title} className="h-6 w-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M6 18L18 6M6 6l12 12"
      />
    </Svg>
  )
}
