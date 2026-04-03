import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'
import { type AXUserMenuPreviewProps } from '../typings/AXUserMenuProps'
import { UserMenuPreview } from './preview/UserMenuPreview'

export function preview(props: AXUserMenuPreviewProps): ReactElement {
  return <ErrorBoundary><UserMenuPreview userName={props.userName} userEmail={props.userEmail} /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AXUserMenuPreview.scss')
}
