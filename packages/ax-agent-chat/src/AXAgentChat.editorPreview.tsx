import { type ReactElement } from 'react'

export function preview(): ReactElement {
  return <div style={{ padding: 8, color: '#666', fontSize: 12 }}>AXAgent Chat</div>
}

export function getPreviewCss(): string {
  return require('./styles/AXAgentChatPreview.scss')
}
