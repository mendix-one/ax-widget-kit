import { type ReactElement } from 'react'
import { type AXTasksMenuPreviewProps } from '../typings/AXTasksMenuProps'
import { TasksMenuPreview } from './preview/TasksMenuPreview'

export function preview(props: AXTasksMenuPreviewProps): ReactElement {
  return <TasksMenuPreview title={props.title} />
}

export function getPreviewCss(): string {
  return require('./styles/AXTasksMenuPreview.scss')
}
