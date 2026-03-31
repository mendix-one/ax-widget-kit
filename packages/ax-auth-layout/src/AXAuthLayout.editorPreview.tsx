import { ReactElement } from 'react'

import { AXAuthLayoutPreviewProps } from '../typings/AXAuthLayoutProps'

export function preview({ content }: AXAuthLayoutPreviewProps): ReactElement {
  const Content = content.renderer

  return (
    <div style={{ padding: 16, border: '1px dashed #ccc', borderRadius: 4, textAlign: 'center', color: '#666' }}>
      <div>AXAuth Layout</div>
      <div style={{ marginTop: 8, padding: 12, border: '1px dashed #ddd', borderRadius: 4, minHeight: 60 }}>
        <Content>
          <div />
        </Content>
      </div>
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXAuthLayoutPreview.scss')
}
