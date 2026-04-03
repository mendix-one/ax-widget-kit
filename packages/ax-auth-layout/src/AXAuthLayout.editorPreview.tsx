import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AXAuthLayoutPreviewProps } from '../typings/AXAuthLayoutProps'
import { AuthLayoutPreview } from './preview/AuthLayoutPreview'

export function preview(props: AXAuthLayoutPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <AuthLayoutPreview
        content={props.content}
        tagline={props.tagline}
        brandDescription={props.brandDescription}
        showBackground={props.showBackground}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXAuthLayoutPreview.scss')
}
