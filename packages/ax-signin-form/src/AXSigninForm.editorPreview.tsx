import { ReactElement } from 'react'

import { AXSigninFormPreviewProps } from '../typings/AXSigninFormProps'

export function preview(_props: AXSigninFormPreviewProps): ReactElement {
  return (
    <div style={{ padding: 16, border: '1px dashed #ccc', borderRadius: 4, textAlign: 'center', color: '#666' }}>
      AXSignin Form — Sign In
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSigninForm.scss')
}
