import { type ReactElement } from 'react'

import { type AXLogoPreviewProps } from '../typings/AXLogoProps'
import { LogoPreview } from './preview/LogoPreview'

export function preview(props: AXLogoPreviewProps): ReactElement {
  return (
    <LogoPreview
      logoUrl={props.logoUrl}
      altText={props.altText}
      height={props.height}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXLogoPreview.scss')
}
