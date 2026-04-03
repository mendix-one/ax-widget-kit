import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AXSigninFormPreviewProps } from '../typings/AXSigninFormProps'
import { SignInFormPreview } from './preview/SignInFormPreview'

export function preview(props: AXSigninFormPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <SignInFormPreview
        showSSO={props.showSSO}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSigninFormPreview.scss')
}
