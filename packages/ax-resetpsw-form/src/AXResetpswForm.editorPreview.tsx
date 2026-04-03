import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AXResetpswFormPreviewProps } from '../typings/AXResetpswFormProps'
import { ResetPassFormPreview } from './preview/ResetPassFormPreview'

export function preview(_props: AXResetpswFormPreviewProps): ReactElement {
  return <ErrorBoundary><ResetPassFormPreview /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AXResetpswFormPreview.scss')
}
