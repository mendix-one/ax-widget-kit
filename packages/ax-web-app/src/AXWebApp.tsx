import { type ReactElement, useState } from 'react'

import type { AXWebAppContainerProps } from '../typings/AXWebAppProps'

import { WebAppProvider } from './main/context'
import { WebAppStore } from './main/store'
import { WebAppLayout } from './main/WebAppLayout'

export function AXWebApp(props: AXWebAppContainerProps): ReactElement {
  const [store] = useState(() => new WebAppStore())

  return (
    <WebAppProvider store={store}>
      <WebAppLayout
        logo={props.logo}
        tasksMenu={props.tasksMenu}
        notifyMenu={props.notifyMenu}
        userMenu={props.userMenu}
        sidebar={props.sidebar}
        content={props.content}
        agentChat={props.agentChat}
      />
    </WebAppProvider>
  )
}
