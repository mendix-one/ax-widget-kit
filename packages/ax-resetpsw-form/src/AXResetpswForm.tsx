import { type ReactElement, useEffect, useState } from 'react'

import type { AXResetpswFormContainerProps } from '../typings/AXResetpswFormProps'

import { ResetPassFormProvider } from './main/context'
import { ResetPassForm } from './main/ResetPassForm'
import { ResetPassFormStore } from './main/store'

export function AXResetpswForm(props: AXResetpswFormContainerProps): ReactElement {
  const [store] = useState(() => new ResetPassFormStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncEmail(props.emailAttr?.value ?? '')
  }, [props.emailAttr?.value])

  useEffect(() => {
    store.setReadOnly(props.emailAttr?.readOnly ?? false)
  }, [props.emailAttr?.readOnly])

  // Sync callbacks
  useEffect(() => {
    store.onEmailChange = (v: string) => props.emailAttr?.setValue(v)
    store.onSubmit = props.onSubmit?.canExecute ? () => props.onSubmit!.execute() : undefined
    store.onNavigateSignIn = props.onNavigateSignIn?.canExecute ? () => props.onNavigateSignIn!.execute() : undefined
  })

  return (
    <ResetPassFormProvider store={store}>
      <ResetPassForm />
    </ResetPassFormProvider>
  )
}
