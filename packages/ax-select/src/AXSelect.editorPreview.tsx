import { type ReactElement } from 'react'

import { type AXSelectPreviewProps } from '../typings/AXSelectProps'
import { SelectPreview } from './preview/SelectPreview'

export function preview(props: AXSelectPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.style}>
    <SelectPreview
      label={props.label || 'Select'}
      options={props.options}
      variant={props.variant}
      size={props.size}
      disabled={props.readOnly}
      fullWidth={props.fullWidth}
      helperText={props.helperText}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AXSelectPreview.scss')
}
