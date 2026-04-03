import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AXSetpswFormPreviewProps } from '../typings/AXSetpswFormProps'
import { SetPasswordFormPreview } from './preview/SetPasswordFormPreview'

export function preview(_props: AXSetpswFormPreviewProps): ReactElement {
  return <ErrorBoundary><SetPasswordFormPreview /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AXSetpswFormPreview.scss')
}
