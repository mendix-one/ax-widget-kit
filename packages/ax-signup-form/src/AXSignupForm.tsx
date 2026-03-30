import type { ReactElement } from 'react'

import type { AXSignupFormContainerProps } from '../typings/AXSignupFormProps'

import { SignUpForm } from './main/SignUpForm'

import './styles/AXSignupForm.scss'

export function AXSignupForm(props: AXSignupFormContainerProps): ReactElement {
  const fullName = props.fullNameAttr?.value ?? ''
  const email = props.emailAttr?.value ?? ''
  const password = props.passwordAttr?.value ?? ''
  const readOnly = props.emailAttr?.readOnly

  const setFullName = (v: string) => props.fullNameAttr?.setValue(v)
  const setEmail = (v: string) => props.emailAttr?.setValue(v)
  const setPassword = (v: string) => props.passwordAttr?.setValue(v)

  const handleSubmit = () => {
    if (props.onSubmit?.canExecute) props.onSubmit.execute()
  }

  const nav = (action: AXSignupFormContainerProps['onNavigateSignIn']) => {
    if (action?.canExecute) action.execute()
  }

  return (
    <SignUpForm
      fullName={fullName}
      email={email}
      password={password}
      onFullNameChange={setFullName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      onNavigateSignIn={() => nav(props.onNavigateSignIn)}
      onGoogleSSO={() => nav(props.onGoogleSSO)}
      onMicrosoftSSO={() => nav(props.onMicrosoftSSO)}
      showSSO={props.showSSO}
      readOnly={readOnly}
    />
  )
}
