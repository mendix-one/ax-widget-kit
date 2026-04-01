import { type ReactElement } from 'react'
import { type AXUserMenuPreviewProps } from '../typings/AXUserMenuProps'
import { UserMenuPreview } from './preview/UserMenuPreview'

export function preview(props: AXUserMenuPreviewProps): ReactElement {
  return <UserMenuPreview userName={props.userName} userEmail={props.userEmail} />
}

export function getPreviewCss(): string {
  return require('./styles/AXUserMenuPreview.scss')
}
