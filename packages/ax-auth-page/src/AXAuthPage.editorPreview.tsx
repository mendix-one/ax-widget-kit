import { ReactElement } from 'react'

import { AXAuthPagePreviewProps } from '../typings/AXAuthPageProps'

export function preview({ page }: AXAuthPagePreviewProps): ReactElement {
  const labels: Record<string, string> = {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    resetPass: 'Reset Password',
  }

  return (
    <div style={{ padding: 16, border: '1px dashed #ccc', borderRadius: 4, textAlign: 'center', color: '#666' }}>
      AXAuth Page — {labels[page] ?? page}
    </div>
  )
}

export function getPreviewCss(): string {
  return require('./ui/AXAuthPage.css')
}
