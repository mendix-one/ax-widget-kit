import type { ReactElement } from 'react'

import type { AXAuthLayoutContainerProps } from '../typings/AXAuthLayoutProps'

import { AuthLayout } from './main/AuthLayout'

export function AXAuthLayout(props: AXAuthLayoutContainerProps): ReactElement {
  return (
    <AuthLayout
      tagline={props.tagline?.value}
      description={props.brandDescription?.value}
      showBackground={props.showBackground}
    >
      {props.content}
    </AuthLayout>
  )
}
