import { type ReactElement, useEffect, useMemo, useState } from 'react'

import { AxThemeProvider, parseThemeTokens, setGlobalThemeTokens } from '@ax/shared'

import type { AXWebAppContainerProps } from '../typings/AXWebAppProps'

import { WebAppProvider } from './main/context'
import { WebAppStore } from './main/store'
import { WebAppLayout } from './main/WebAppLayout'

export function AXWebApp(props: AXWebAppContainerProps): ReactElement {
  const [store] = useState(() => new WebAppStore())

  const themeOverrides = useMemo(() => parseThemeTokens(props.themeTokens), [props.themeTokens])

  // Layout widget sets global tokens so child widgets can inherit
  useEffect(() => {
    if (themeOverrides) setGlobalThemeTokens(themeOverrides)
  }, [themeOverrides])

  return (
    <AxThemeProvider overrides={themeOverrides} isLayout>
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
    </AxThemeProvider>
  )
}
