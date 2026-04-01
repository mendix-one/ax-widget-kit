import { type ReactElement } from 'react'

import { type AXAgentChatPreviewProps } from '../typings/AXAgentChatProps'
import { AgentChatPreview } from './preview/AgentChatPreview'

export function preview(props: AXAgentChatPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={{ ...props.style, display: "flex", flexDirection: "column" as const, height: "100%" }}>
    <AgentChatPreview
      title={props.title}
      welcomeMessage={props.welcomeMessage}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AXAgentChatPreview.scss')
}
