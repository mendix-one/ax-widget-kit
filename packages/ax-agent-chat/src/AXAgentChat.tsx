import type { ReactElement } from 'react'

import type { AXAgentChatContainerProps } from '../typings/AXAgentChatProps'

import { AgentChat } from './main/AgentChat'

import './styles/AXAgentChat.scss'

export function AXAgentChat(props: AXAgentChatContainerProps): ReactElement {
  return (
    <AgentChat
      title={props.title?.value}
      welcomeMessage={props.welcomeMessage?.value}
      onSendMessage={props.onSendMessage?.canExecute ? () => props.onSendMessage?.execute() : undefined}
    />
  )
}
