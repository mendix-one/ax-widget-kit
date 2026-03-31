import type { ReactElement } from 'react'

import type { AXLogoContainerProps } from '../typings/AXLogoProps'

import { Logo } from './main/Logo'

import './styles/AXLogo.scss'

export function AXLogo(props: AXLogoContainerProps): ReactElement {
  return (
    <Logo
      src={props.logoUrl?.value}
      alt={props.altText?.value}
      height={props.height}
      onClick={props.onClick?.canExecute ? () => props.onClick?.execute() : undefined}
    />
  )
}
