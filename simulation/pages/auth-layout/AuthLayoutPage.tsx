import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { EditableValue } from 'mendix'

import { AXAuthLayout } from '@ax/auth-layout/src/AXAuthLayout'
import { AXResetpswForm } from '@ax/resetpsw-form/src/AXResetpswForm'
import { AXSetpswForm } from '@ax/setpsw-form/src/AXSetpswForm'
import { AXSigninForm } from '@ax/signin-form/src/AXSigninForm'
import { AXSignupForm } from '@ax/signup-form/src/AXSignupForm'

type Page = 'signIn' | 'signUp' | 'resetPass' | 'setPass'

const pages: { value: Page; label: string }[] = [
  { value: 'signIn', label: 'Sign In' },
  { value: 'signUp', label: 'Sign Up' },
  { value: 'resetPass', label: 'Reset Password' },
  { value: 'setPass', label: 'Set Password' },
]

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

const mockAction = {
  canExecute: true,
  isExecuting: false,
  execute: () => {},
}

export default function AuthLayoutPage() {
  const [page, setPage] = useState<Page>('signIn')
  const emailAttr = useMockAttr('')
  const passwordAttr = useMockAttr('')
  const fullNameAttr = useMockAttr('')

  const navTo = (target: Page) => ({ ...mockAction, execute: () => setPage(target) })

  const formContent = () => {
    switch (page) {
      case 'signIn':
        return (
          <AXSigninForm
            name="AXSigninForm1"
            class=""
            emailAttr={emailAttr}
            passwordAttr={passwordAttr}
            showSSO={true}
            onSubmit={mockAction}
            onNavigateSignUp={navTo('signUp')}
            onNavigateResetPass={navTo('resetPass')}
            onGoogleSSO={mockAction}
            onMicrosoftSSO={mockAction}
          />
        )
      case 'signUp':
        return (
          <AXSignupForm
            name="AXSignupForm1"
            class=""
            fullNameAttr={fullNameAttr}
            emailAttr={emailAttr}
            passwordAttr={passwordAttr}
            showSSO={true}
            onSubmit={mockAction}
            onNavigateSignIn={navTo('signIn')}
            onGoogleSSO={mockAction}
            onMicrosoftSSO={mockAction}
          />
        )
      case 'resetPass':
        return (
          <AXResetpswForm
            name="AXResetpswForm1"
            class=""
            emailAttr={emailAttr}
            onSubmit={mockAction}
            onNavigateSignIn={navTo('signIn')}
          />
        )
      case 'setPass':
        return (
          <AXSetpswForm
            name="AXSetpswForm1"
            class=""
            passwordAttr={passwordAttr}
            onSubmit={mockAction}
            onNavigateSignIn={navTo('signIn')}
          />
        )
    }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Auth Layout + Form Widgets Preview
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs value={page} onChange={(_e, v: Page) => setPage(v)}>
          {pages.map((p) => (
            <Tab key={p.value} value={p.value} label={p.label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden', height: 700 }}>
        <AXAuthLayout
          name="AXAuthLayout1"
          class=""
          tagline={mockDynamic('AI-Powered\nSmart Manufacturing')}
          brandDescription={mockDynamic(
            'Streamline your semiconductor operations with intelligent planning, real-time monitoring, and predictive analytics.'
          )}
          showBackground={true}
          content={formContent()}
        />
      </Box>
    </Box>
  )
}
