import { type ReactElement } from 'react'
import { type AXNotifyMenuPreviewProps } from '../typings/AXNotifyMenuProps'
import { NotifyMenuPreview } from './preview/NotifyMenuPreview'

export function preview(props: AXNotifyMenuPreviewProps): ReactElement {
  return <NotifyMenuPreview title={props.title} />
}

export function getPreviewCss(): string {
  return require('./styles/AXNotifyMenuPreview.scss')
}
