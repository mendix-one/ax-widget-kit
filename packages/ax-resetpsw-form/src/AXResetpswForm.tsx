import type { ReactElement } from 'react'

import type { AXResetpswFormContainerProps } from '../typings/AXResetpswFormProps'

import { ResetPassForm } from './main/ResetPassForm'

export function AXResetpswForm(props: AXResetpswFormContainerProps): ReactElement {
  const email = props.emailAttr?.value ?? ''
  const readOnly = props.emailAttr?.readOnly

  const setEmail = (v: string) => props.emailAttr?.setValue(v)

  const handleSubmit = () => {
    if (props.onSubmit?.canExecute) props.onSubmit.execute()
  }

  const handleNavigateSignIn = () => {
    if (props.onNavigateSignIn?.canExecute) props.onNavigateSignIn.execute()
  }

  return (
    <ResetPassForm
      email={email}
      onEmailChange={setEmail}
      onSubmit={handleSubmit}
      onNavigateSignIn={handleNavigateSignIn}
      readOnly={readOnly}
    />
  )
}
