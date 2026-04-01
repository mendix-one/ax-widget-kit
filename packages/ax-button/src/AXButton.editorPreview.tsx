import { ReactElement } from 'react'

import { AXButtonPreviewProps } from '../typings/AXButtonProps'
import { ButtonPreview } from './preview/ButtonPreview'

export function preview(props: AXButtonPreviewProps): ReactElement {
  return (
    <ButtonPreview
      label={props.label}
      variant={props.variant}
      color={props.color}
      size={props.size}
      disabled={props.readOnly || props.disabled}
      fullWidth={props.fullWidth}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXButtonPreview.scss')
}
