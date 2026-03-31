import { type ReactElement } from 'react'

import { type AXSidebarPreviewProps } from '../typings/AXSidebarProps'

export function preview({ content }: AXSidebarPreviewProps): ReactElement {
  const Content = content.renderer
  return (
    <div style={{ padding: 8, border: '1px dashed #ccc', borderRadius: 4, color: '#666', fontSize: 12 }}>
      <div>AXSidebar</div>
      <Content>
        <div />
      </Content>
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSidebar.scss')
}
