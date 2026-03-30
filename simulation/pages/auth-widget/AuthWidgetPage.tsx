import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { EditableValue } from 'mendix'

import { AXAuthPage } from '@ax/auth-page/src/AXAuthPage'
import { type PageEnum } from '@ax/auth-page/typings/AXAuthPageProps'

const pages: { value: PageEnum; label: string }[] = [
  { value: 'signIn', label: 'Sign In' },
  { value: 'signUp', label: 'Sign Up' },
  { value: 'resetPass', label: 'Reset Password' },
]

/** Mock EditableValue to simulate Mendix attribute binding */
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

export default function AuthWidgetPage() {
  const [page, setPage] = useState<PageEnum>('signIn')
  const emailAttr = useMockAttr('')
  const passwordAttr = useMockAttr('')
  const fullNameAttr = useMockAttr('')

  const mockAction = {
    canExecute: true,
    isExecuting: false,
    execute: () => {},
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        AXAuthPage Preview
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs value={page} onChange={(_e, v: PageEnum) => setPage(v)}>
          {pages.map((p) => (
            <Tab key={p.value} value={p.value} label={p.label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <AXAuthPage
          name="AXAuthPage1"
          class=""
          page={page}
          showSSO={true}
          emailAttr={emailAttr}
          passwordAttr={passwordAttr}
          fullNameAttr={fullNameAttr}
          onSubmit={mockAction}
          onNavigateSignIn={{ ...mockAction, execute: () => setPage('signIn') }}
          onNavigateSignUp={{ ...mockAction, execute: () => setPage('signUp') }}
          onNavigateResetPass={{ ...mockAction, execute: () => setPage('resetPass') }}
          onGoogleSSO={mockAction}
          onMicrosoftSSO={mockAction}
        />
      </Box>
    </Box>
  )
}
