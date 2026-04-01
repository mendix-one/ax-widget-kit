import { type ReactElement } from 'react'

import { type AXCheckboxPreviewProps } from '../typings/AXCheckboxProps'
import { CheckboxPreview } from './preview/CheckboxPreview'

export function preview(props: AXCheckboxPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.style}>
    <CheckboxPreview
      label={props.label || 'Checkbox'}
      color={props.color}
      size={props.size}
      disabled={props.readOnly}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AXCheckboxPreview.scss')
}
