import type { ReactElement } from 'react'

import type { AXUserMenuContainerProps } from '../typings/AXUserMenuProps'

import { UserMenu } from './main/UserMenu'

export function AXUserMenu(props: AXUserMenuContainerProps): ReactElement {
  return (
    <UserMenu
      name={props.userName?.value}
      email={props.userEmail?.value}
      onSignOut={props.onSignOut?.canExecute ? () => props.onSignOut?.execute() : undefined}
      onProfile={props.onProfile?.canExecute ? () => props.onProfile?.execute() : undefined}
      onSettings={props.onSettings?.canExecute ? () => props.onSettings?.execute() : undefined}
    />
  )
}
