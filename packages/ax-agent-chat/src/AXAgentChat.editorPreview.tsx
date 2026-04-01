import { type ReactElement } from 'react'

import { type AXAgentChatPreviewProps } from '../typings/AXAgentChatProps'
import { AgentChatPreview } from './preview/AgentChatPreview'

export function preview(props: AXAgentChatPreviewProps): ReactElement {
  return (
    <AgentChatPreview
      title={props.title}
      welcomeMessage={props.welcomeMessage}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXAgentChatPreview.scss')
}
