import { ReactElement } from 'react'

import { AXSignupFormPreviewProps } from '../typings/AXSignupFormProps'

export function preview(_props: AXSignupFormPreviewProps): ReactElement {
  return (
    <div style={{ padding: 16, border: '1px dashed #ccc', borderRadius: 4, textAlign: 'center', color: '#666' }}>
      AXSignup Form — Sign Up
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSignupFormPreview.scss')
}
