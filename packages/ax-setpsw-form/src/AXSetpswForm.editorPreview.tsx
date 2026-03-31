import { ReactElement } from 'react'

import { AXSetpswFormPreviewProps } from '../typings/AXSetpswFormProps'

export function preview(_props: AXSetpswFormPreviewProps): ReactElement {
  return (
    <div style={{ padding: 16, border: '1px dashed #ccc', borderRadius: 4, textAlign: 'center', color: '#666' }}>
      AXSetpsw Form — Set New Password
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSetpswFormPreview.scss')
}
