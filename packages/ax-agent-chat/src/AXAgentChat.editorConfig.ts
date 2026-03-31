import { type AXAgentChatPreviewProps } from '../typings/AXAgentChatProps'

export type Properties = PropertyGroup[]
export type PropertyGroup = { caption: string; propertyGroups?: PropertyGroup[]; properties?: Property[] }
export type Property = { key: string; caption: string; description?: string }

export function getProperties(_values: AXAgentChatPreviewProps, defaultProperties: Properties): Properties {
  return defaultProperties
}
