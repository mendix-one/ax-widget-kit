import type { ReactElement } from 'react'

import type { AXWebAppContainerProps } from '../typings/AXWebAppProps'

import { WebAppLayout } from './main/WebAppLayout'

export function AXWebApp(props: AXWebAppContainerProps): ReactElement {
  return (
    <WebAppLayout
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
