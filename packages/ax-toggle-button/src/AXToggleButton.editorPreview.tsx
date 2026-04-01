import { type ReactElement } from 'react'

import { type AXToggleButtonPreviewProps } from '../typings/AXToggleButtonProps'
import { ToggleButtonPreview } from './preview/ToggleButtonPreview'

export function preview(props: AXToggleButtonPreviewProps): ReactElement {
  return (
    <ToggleButtonPreview
      options={props.options}
      exclusive={props.exclusive}
      color={props.color}
      size={props.size}
      orientation={props.orientation}
      disabled={props.readOnly || props.disabled}
      fullWidth={props.fullWidth}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXToggleButtonPreview.scss')
}
