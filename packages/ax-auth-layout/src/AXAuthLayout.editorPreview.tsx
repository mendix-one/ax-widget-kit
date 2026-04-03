import { ReactElement } from 'react'

import { AXAuthLayoutPreviewProps } from '../typings/AXAuthLayoutProps'
import { AuthLayoutPreview } from './preview/AuthLayoutPreview'

export function preview(props: AXAuthLayoutPreviewProps): ReactElement {
  return (
    <AuthLayoutPreview
      content={props.content}
      tagline={props.tagline}
      brandDescription={props.brandDescription}
      showBackground={props.showBackground}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXAuthLayoutPreview.scss')
}
