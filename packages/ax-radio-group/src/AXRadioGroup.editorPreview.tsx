import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AXRadioGroupPreviewProps } from '../typings/AXRadioGroupProps'
import { RadioGroupPreview } from './preview/RadioGroupPreview'

export function preview(props: AXRadioGroupPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.styleObject}>
    <RadioGroupPreview
      label={props.label || 'Radio Group'}
      options={props.options as any}
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
