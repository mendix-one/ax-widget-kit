import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AXSidebarPreviewProps } from '../typings/AXSidebarProps'
import { SidebarPreview } from './preview/SidebarPreview'

export function preview(props: AXSidebarPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={{ ...props.styleObject, display: "contents" as const }}>
    <SidebarPreview
      content={props.content}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AXSidebarPreview.scss')
}
