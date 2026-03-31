import { type ReactElement } from 'react'

import { type AXWebAppPreviewProps } from '../typings/AXWebAppProps'

export function preview({ content }: AXWebAppPreviewProps): ReactElement {
  const Content = content.renderer
  return (
    <div style={{ padding: 16, border: '1px dashed #ccc', borderRadius: 4, textAlign: 'center', color: '#666' }}>
      <div>AXWeb App Layout</div>
      <div style={{ marginTop: 8, padding: 12, border: '1px dashed #ddd', borderRadius: 4, minHeight: 60 }}>
        <Content>
          <div />
        </Content>
      </div>
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXWebAppPreview.scss')
}
