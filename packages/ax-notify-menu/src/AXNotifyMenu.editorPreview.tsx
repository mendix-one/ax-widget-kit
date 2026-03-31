import { type ReactElement } from 'react'

export function preview(): ReactElement {
  return <div style={{ padding: 8, color: '#666', fontSize: 12 }}>AXNotify Menu</div>
}

export function getPreviewCss(): string {
  return require('./styles/AXNotifyMenuPreview.scss')
}
