import { useState } from 'react'
import { useNavigate } from 'react-router'

import type { EditableValue } from 'mendix'

import { AXAuthLayout } from '@ax/auth-layout/src/AXAuthLayout'
import { AXSetpswForm } from '@ax/setpsw-form/src/AXSetpswForm'

function useMockAttr(initial = '') {
  const [value, setVal] = useState(initial)
  return {
    status: 'available',
    readOnly: false,
    value,
    displayValue: value,
    setValue: setVal,
    validation: undefined,
    setValidator: () => {},
    setTextValue: setVal,
    formatter: { format: (v: string) => v, parse: () => ({ valid: true }) },
    setFormatter: () => {},
    isList: false,
  } as unknown as EditableValue<string>
}

function mockDynamic(value: string) {
  return { status: 'available' as const, value }
}

export default function SetPswPage() {
  const navigate = useNavigate()
  const passwordAttr = useMockAttr('')

  const mockAction = { canExecute: true, isExecuting: false, execute: () => {} }
  const navAction = (path: string) => ({ ...mockAction, execute: () => navigate(path) })

  return (
    <AXAuthLayout
      name="AXAuthLayout1"
      class=""
      tagline={mockDynamic('AI-Powered\nSmart Manufacturing')}
      brandDescription={mockDynamic(
        'Streamline your semiconductor operations with intelligent planning, real-time monitoring, and predictive analytics.'
      )}
      showBackground={true}
      content={
        <AXSetpswForm
          name="AXSetpswForm1"
          class=""
          passwordAttr={passwordAttr}
          onSubmit={mockAction}
          onNavigateSignIn={navAction('/sign-in')}
        />
      }
    />
  )
}
