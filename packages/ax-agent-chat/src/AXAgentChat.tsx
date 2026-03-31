import { type ReactElement, useEffect, useState } from 'react'
import { AxThemeProvider } from '@ax/shared'

import type { AXAgentChatContainerProps } from '../typings/AXAgentChatProps'

import { AgentChat } from './main/AgentChat'
import { AgentChatProvider } from './main/context'
import { AgentChatStore } from './main/store'

export function AXAgentChat(props: AXAgentChatContainerProps): ReactElement {
  const [store] = useState(() => new AgentChatStore(props.welcomeMessage?.value))

  useEffect(() => {
    if (props.title?.value) store.setTitle(props.title.value)
  }, [store, props.title?.value])

  useEffect(() => {
    store.setOnSendMessage(props.onSendMessage?.canExecute ? () => props.onSendMessage?.execute() : undefined)
  }, [store, props.onSendMessage?.canExecute])

  return (
    <AxThemeProvider>
      <AgentChatProvider store={store}>
        <AgentChat />
      </AgentChatProvider>
    </AxThemeProvider>
  )
}
