import { type AXLogoPreviewProps } from '../typings/AXLogoProps'

export type Properties = PropertyGroup[]
export type PropertyGroup = { caption: string; propertyGroups?: PropertyGroup[]; properties?: Property[] }
export type Property = { key: string; caption: string; description?: string }

export function getProperties(_values: AXLogoPreviewProps, defaultProperties: Properties): Properties {
  return defaultProperties
}
