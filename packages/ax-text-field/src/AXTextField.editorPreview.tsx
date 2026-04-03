import { ReactElement } from 'react'

import { AXTextFieldPreviewProps } from '../typings/AXTextFieldProps'
import { TextFieldPreview } from './preview/TextFieldPreview'

export function preview(props: AXTextFieldPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.style}>
    <TextFieldPreview
      label={props.label}
      placeholder={props.placeholder}
      variant={props.variant}
      size={props.size}
      inputType={props.inputType}
      multiline={props.multiline}
      rows={props.rows}
      required={props.required}
      fullWidth={props.fullWidth}
      helperText={props.helperText}
      disabled={props.readOnly}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AXTextFieldPreview.scss')
}
