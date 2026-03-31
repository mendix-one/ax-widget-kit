import type { ReactElement } from 'react'

import type { AXSigninFormContainerProps } from '../typings/AXSigninFormProps'

import { SignInForm } from './main/SignInForm'

export function AXSigninForm(props: AXSigninFormContainerProps): ReactElement {
  const email = props.emailAttr?.value ?? ''
  const password = props.passwordAttr?.value ?? ''
  const readOnly = props.emailAttr?.readOnly

  const setEmail = (v: string) => props.emailAttr?.setValue(v)
  const setPassword = (v: string) => props.passwordAttr?.setValue(v)

  const handleSubmit = () => {
    if (props.onSubmit?.canExecute) props.onSubmit.execute()
  }

  const nav = (action: AXSigninFormContainerProps['onNavigateSignUp']) => {
    if (action?.canExecute) action.execute()
  }

  return (
    <SignInForm
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      onNavigateSignUp={() => nav(props.onNavigateSignUp)}
      onNavigateResetPass={() => nav(props.onNavigateResetPass)}
      onGoogleSSO={() => nav(props.onGoogleSSO)}
      onMicrosoftSSO={() => nav(props.onMicrosoftSSO)}
      showSSO={props.showSSO}
      readOnly={readOnly}
    />
  )
}
