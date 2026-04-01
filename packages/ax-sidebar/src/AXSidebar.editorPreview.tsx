import { type ReactElement } from 'react'

import { type AXSidebarPreviewProps } from '../typings/AXSidebarProps'
import { SidebarPreview } from './preview/SidebarPreview'

export function preview(props: AXSidebarPreviewProps): ReactElement {
  return (
    <SidebarPreview
      content={props.content}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSidebarPreview.scss')
}
