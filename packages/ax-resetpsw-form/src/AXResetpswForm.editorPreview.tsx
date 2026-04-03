import { ReactElement } from 'react'

import { AXResetpswFormPreviewProps } from '../typings/AXResetpswFormProps'
import { ResetPassFormPreview } from './preview/ResetPassFormPreview'

export function preview(_props: AXResetpswFormPreviewProps): ReactElement {
  return <ResetPassFormPreview />
}

export function getPreviewCss(): string {
  return require('./styles/AXResetpswFormPreview.scss')
}
