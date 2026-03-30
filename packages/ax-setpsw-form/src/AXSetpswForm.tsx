import type { ReactElement } from 'react'

import type { AXSetpswFormContainerProps } from '../typings/AXSetpswFormProps'

import { SetPasswordForm } from './main/SetPasswordForm'

import './styles/AXSetpswForm.scss'

export function AXSetpswForm(props: AXSetpswFormContainerProps): ReactElement {
  const password = props.passwordAttr?.value ?? ''
  const readOnly = props.passwordAttr?.readOnly

  const setPassword = (v: string) => props.passwordAttr?.setValue(v)

  const handleSubmit = () => {
    if (props.onSubmit?.canExecute) props.onSubmit.execute()
  }

  const handleNavigateSignIn = () => {
    if (props.onNavigateSignIn?.canExecute) props.onNavigateSignIn.execute()
  }

  return (
    <SetPasswordForm
      password={password}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      onNavigateSignIn={handleNavigateSignIn}
      readOnly={readOnly}
    />
  )
}
