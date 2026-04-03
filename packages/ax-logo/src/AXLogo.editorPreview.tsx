import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AXLogoPreviewProps } from '../typings/AXLogoProps'
import { LogoPreview } from './preview/LogoPreview'

export function preview(props: AXLogoPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <LogoPreview
        logoUrl={props.logoUrl}
        altText={props.altText}
        height={props.height}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXLogoPreview.scss')
}
