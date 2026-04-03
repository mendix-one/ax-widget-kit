import { ReactElement } from 'react'

import { AXSigninFormPreviewProps } from '../typings/AXSigninFormProps'
import { SignInFormPreview } from './preview/SignInFormPreview'

export function preview(props: AXSigninFormPreviewProps): ReactElement {
  return (
    <SignInFormPreview
      showSSO={props.showSSO}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSigninFormPreview.scss')
}
