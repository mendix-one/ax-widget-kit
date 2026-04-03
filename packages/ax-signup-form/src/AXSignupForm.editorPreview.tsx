import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AXSignupFormPreviewProps } from '../typings/AXSignupFormProps'
import { SignUpFormPreview } from './preview/SignUpFormPreview'

export function preview(props: AXSignupFormPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <SignUpFormPreview
        showSSO={props.showSSO}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSignupFormPreview.scss')
}
