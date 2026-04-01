import { ReactElement } from 'react'

import { AXSignupFormPreviewProps } from '../typings/AXSignupFormProps'
import { SignUpFormPreview } from './preview/SignUpFormPreview'

export function preview(props: AXSignupFormPreviewProps): ReactElement {
  return (
    <SignUpFormPreview
      showSSO={props.showSSO}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSignupFormPreview.scss')
}
