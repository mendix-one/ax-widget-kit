import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'
import { type AXNotifyMenuPreviewProps } from '../typings/AXNotifyMenuProps'
import { NotifyMenuPreview } from './preview/NotifyMenuPreview'

export function preview(props: AXNotifyMenuPreviewProps): ReactElement {
  return <ErrorBoundary><NotifyMenuPreview title={props.title} /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AXNotifyMenuPreview.scss')
}
