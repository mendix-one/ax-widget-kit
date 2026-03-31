import { type ReactElement } from 'react'

export function preview(): ReactElement {
  return (
    <div style={{ padding: 8, color: '#666', fontSize: 12 }}>
      AXUser Menu
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXUserMenu.scss')
}
