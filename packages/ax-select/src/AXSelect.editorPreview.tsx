import { type ReactElement } from 'react'

import { type AXSelectPreviewProps } from '../typings/AXSelectProps'
import { SelectPreview } from './preview/SelectPreview'

export function preview(props: AXSelectPreviewProps): ReactElement {
  return (
    <SelectPreview
      label={props.label || 'Select'}
      options={props.options}
      variant={props.variant}
      size={props.size}
      disabled={props.readOnly}
      fullWidth={props.fullWidth}
      helperText={props.helperText}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSelectPreview.scss')
}
