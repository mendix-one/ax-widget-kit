import type { ReactElement } from 'react'

import type { AXAuthPageContainerProps } from '../typings/AXAuthPageProps'

import { ResetPassForm } from './components/auth/ResetPassForm'
import { SignInForm } from './components/auth/SignInForm'
import { SignUpForm } from './components/auth/SignUpForm'

import './ui/AXAuthPage.css'

export function AXAuthPage(props: AXAuthPageContainerProps): ReactElement {
  const email = props.emailAttr?.value ?? ''
  const password = props.passwordAttr?.value ?? ''
  const fullName = props.fullNameAttr?.value ?? ''
  const readOnly = props.emailAttr?.readOnly

  const setEmail = (v: string) => props.emailAttr?.setValue(v)
  const setPassword = (v: string) => props.passwordAttr?.setValue(v)
  const setFullName = (v: string) => props.fullNameAttr?.setValue(v)

  const handleSubmit = () => {
    if (props.onSubmit?.canExecute) props.onSubmit.execute()
  }

  const nav = (action: AXAuthPageContainerProps['onNavigateSignIn']) => {
    if (action?.canExecute) action.execute()
  }

  return (
    <div className="widget-ax-auth-page">
      {props.page === 'signIn' && (
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
      )}
      {props.page === 'signUp' && (
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
      )}
      {props.page === 'resetPass' && (
        <ResetPassForm
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
          onNavigateSignIn={() => nav(props.onNavigateSignIn)}
          readOnly={readOnly}
        />
      )}
    </div>
  )
}
