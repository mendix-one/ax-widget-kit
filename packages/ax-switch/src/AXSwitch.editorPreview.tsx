import { type ReactElement } from 'react'

import { type AXSwitchPreviewProps } from '../typings/AXSwitchProps'
import { SwitchPreview } from './preview/SwitchPreview'

export function preview(props: AXSwitchPreviewProps): ReactElement {
  return (
    <SwitchPreview
      label={props.label}
      color={props.color}
      size={props.size}
      disabled={props.readOnly || props.disabled}
      labelPlacement={props.labelPlacement}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSwitchPreview.scss')
}
