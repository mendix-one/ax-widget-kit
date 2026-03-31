import { type AXWebAppPreviewProps } from '../typings/AXWebAppProps'

export type Properties = PropertyGroup[]
export type PropertyGroup = { caption: string; propertyGroups?: PropertyGroup[]; properties?: Property[] }
export type Property = { key: string; caption: string; description?: string }

export function getProperties(_values: AXWebAppPreviewProps, defaultProperties: Properties): Properties {
  return defaultProperties
}
