import { ReactElement } from 'react'

import { AXSetpswFormPreviewProps } from '../typings/AXSetpswFormProps'
import { SetPasswordFormPreview } from './preview/SetPasswordFormPreview'

export function preview(_props: AXSetpswFormPreviewProps): ReactElement {
  return <SetPasswordFormPreview />
}

export function getPreviewCss(): string {
  return require('./styles/AXSetpswFormPreview.scss')
}
