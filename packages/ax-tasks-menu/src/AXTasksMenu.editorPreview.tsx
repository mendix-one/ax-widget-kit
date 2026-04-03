import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'
import { type AXTasksMenuPreviewProps } from '../typings/AXTasksMenuProps'
import { TasksMenuPreview } from './preview/TasksMenuPreview'

export function preview(props: AXTasksMenuPreviewProps): ReactElement {
  return <ErrorBoundary><TasksMenuPreview title={props.title} /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AXTasksMenuPreview.scss')
}
