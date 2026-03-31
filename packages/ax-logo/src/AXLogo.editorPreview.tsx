import { type ReactElement } from 'react'

import { type AXLogoPreviewProps } from '../typings/AXLogoProps'

export function preview({ altText }: AXLogoPreviewProps): ReactElement {
  return (
    <div style={{ padding: 8, color: '#3f51b5', fontWeight: 700 }}>
      {altText || 'AXLogo'}
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXLogo.scss')
}
