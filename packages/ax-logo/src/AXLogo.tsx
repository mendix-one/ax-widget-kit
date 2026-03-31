import { type ReactElement, useEffect, useState } from 'react'

import type { AXLogoContainerProps } from '../typings/AXLogoProps'

import { LogoProvider } from './main/context'
import { Logo } from './main/Logo'
import { LogoStore } from './main/store'

export function AXLogo(props: AXLogoContainerProps): ReactElement {
  const [store] = useState(() => new LogoStore())

  useEffect(() => {
    store.src = props.logoUrl?.value
  }, [store, props.logoUrl?.value])

  useEffect(() => {
    store.alt = props.altText?.value
  }, [store, props.altText?.value])

  useEffect(() => {
    store.height = props.height
  }, [store, props.height])

  useEffect(() => {
    store.setOnClick(props.onClick?.canExecute ? () => props.onClick?.execute() : undefined)
  }, [store, props.onClick?.canExecute])

  return (
    <LogoProvider store={store}>
      <Logo />
    </LogoProvider>
  )
}
