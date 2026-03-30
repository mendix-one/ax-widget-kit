import { ReactElement } from 'react'

import { AXResetpswFormPreviewProps } from '../typings/AXResetpswFormProps'

export function preview(_props: AXResetpswFormPreviewProps): ReactElement {
  return (
    <div style={{ padding: 16, border: '1px dashed #ccc', borderRadius: 4, textAlign: 'center', color: '#666' }}>
      AXResetpsw Form — Reset Password
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXResetpswForm.scss')
}
