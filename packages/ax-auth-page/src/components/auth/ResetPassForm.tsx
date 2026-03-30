import { type FormEvent, type ReactElement, useState } from 'react'

export interface ResetPassFormProps {
  email: string
  onEmailChange: (value: string) => void
  onSubmit: () => void
  onNavigateSignIn?: () => void
  readOnly?: boolean
}

export function ResetPassForm({
  email,
  onEmailChange,
  onSubmit,
  onNavigateSignIn,
  readOnly,
}: ResetPassFormProps): ReactElement {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required.')
      return
    }

    setLoading(true)
    onSubmit()
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 600)
  }

  return (
    <div className="ax-auth-form">
      <div className="ax-auth-title-row">
        {onNavigateSignIn && (
          <button type="button" className="ax-auth-back" onClick={onNavigateSignIn} aria-label="Back to sign in">
            ←
          </button>
        )}
        <h2 className="ax-auth-title">Reset Password</h2>
      </div>
      <p className="ax-auth-subtitle">Enter your email to receive a reset link</p>

      {sent ? (
        <div className="ax-auth-success">
          <p className="ax-auth-success-text">A password reset link has been sent to your email.</p>
          {onNavigateSignIn && (
            <button type="button" className="ax-auth-link" onClick={onNavigateSignIn}>
              Back to Sign In
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="ax-auth-field">
            <label htmlFor="ax-auth-email">Email</label>
            <input
              id="ax-auth-email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              disabled={readOnly}
              className="form-control"
            />
          </div>

          {error && <p className="ax-auth-error">{error}</p>}

          <button type="submit" className="ax-auth-submit" disabled={loading || readOnly}>
            {loading ? 'Sending…' : 'Send Reset Link'}
          </button>

          {onNavigateSignIn && (
            <p className="ax-auth-footer">
              Remember your password?{' '}
              <button type="button" className="ax-auth-link" onClick={onNavigateSignIn}>
                Sign In
              </button>
            </p>
          )}
        </form>
      )}
    </div>
  )
}
