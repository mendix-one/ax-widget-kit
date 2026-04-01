import { type ReactElement } from 'react'

import { type AXRadioGroupPreviewProps } from '../typings/AXRadioGroupProps'
import { RadioGroupPreview } from './preview/RadioGroupPreview'

export function preview(props: AXRadioGroupPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.style}>
    <RadioGroupPreview
      label={props.label || 'Radio Group'}
      options={props.options}
      row={props.row}
      color={props.color}
      size={props.size}
      disabled={props.readOnly}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AXRadioGroupPreview.scss')
}
