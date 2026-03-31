import { type ReactElement, useEffect, useState } from 'react'
import { AxThemeProvider } from '@ax/shared'

import type { AXUserMenuContainerProps } from '../typings/AXUserMenuProps'

import { UserMenuProvider } from './main/context'
import { UserMenuStore } from './main/store'
import { UserMenu } from './main/UserMenu'

export function AXUserMenu(props: AXUserMenuContainerProps): ReactElement {
  const [store] = useState(() => new UserMenuStore())

  useEffect(() => {
    if (props.userName?.value !== undefined) {
      store.setName(props.userName.value)
    }
  }, [store, props.userName?.value])

  useEffect(() => {
    if (props.userEmail?.value !== undefined) {
      store.setEmail(props.userEmail.value)
    }
  }, [store, props.userEmail?.value])

  useEffect(() => {
    store.setOnSignOut(props.onSignOut?.canExecute ? () => props.onSignOut?.execute() : undefined)
  }, [store, props.onSignOut?.canExecute])

  useEffect(() => {
    store.setOnProfile(props.onProfile?.canExecute ? () => props.onProfile?.execute() : undefined)
  }, [store, props.onProfile?.canExecute])

  useEffect(() => {
    store.setOnSettings(props.onSettings?.canExecute ? () => props.onSettings?.execute() : undefined)
  }, [store, props.onSettings?.canExecute])

  return (
    <AxThemeProvider>
      <UserMenuProvider store={store}>
        <UserMenu />
      </UserMenuProvider>
    </AxThemeProvider>
  )
}
