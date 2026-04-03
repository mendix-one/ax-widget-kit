import { type ReactElement } from 'react'

import { type AXWebAppPreviewProps } from '../typings/AXWebAppProps'
import { WebAppPreview } from './preview/WebAppPreview'

export function preview(props: AXWebAppPreviewProps): ReactElement {
  return (
    <WebAppPreview
      logo={props.logo}
      tasksMenu={props.tasksMenu}
      notifyMenu={props.notifyMenu}
      userMenu={props.userMenu}
      sidebar={props.sidebar}
      content={props.content}
      agentChat={props.agentChat}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXWebAppPreview.scss')
}
