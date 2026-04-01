import { ReactElement } from 'react'

import { AXButtonGroupPreviewProps } from '../typings/AXButtonGroupProps'
import { ButtonGroupPreview } from './preview/ButtonGroupPreview'

export function preview(props: AXButtonGroupPreviewProps): ReactElement {
  return (
    <ButtonGroupPreview
      content={props.content}
      variant={props.variant}
      color={props.color}
      size={props.size}
      orientation={props.orientation}
      disabled={props.readOnly || props.disabled}
      fullWidth={props.fullWidth}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXButtonGroupPreview.scss')
}
