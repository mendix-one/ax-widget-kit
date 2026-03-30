import { type FormEvent, type ReactElement, useState } from 'react'

export interface SetPasswordFormProps {
  password: string
  onPasswordChange: (value: string) => void
  onSubmit: () => void
  onNavigateSignIn?: () => void
  readOnly?: boolean
}

export function SetPasswordForm({
  password,
  onPasswordChange,
  onSubmit,
  onNavigateSignIn,
  readOnly,
}: SetPasswordFormProps): ReactElement {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!password || !confirmPassword) {
      setError('Both fields are required.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    onSubmit()
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 600)
  }

  return (
    <div className="ax-auth-form">
      <h2 className="ax-auth-title">Set New Password</h2>
      <p className="ax-auth-subtitle">Enter your new password below</p>

      {success ? (
        <div className="ax-auth-success">
          <p className="ax-auth-success-text">Your password has been updated successfully.</p>
          {onNavigateSignIn && (
            <button type="button" className="ax-auth-link" onClick={onNavigateSignIn}>
              Back to Sign In
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="ax-auth-field">
            <label htmlFor="ax-setpsw-password">New password</label>
            <div className="ax-auth-password-wrap">
              <input
                id="ax-setpsw-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                disabled={readOnly}
                className="form-control"
              />
              <button
                type="button"
                className="ax-auth-toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '\u{1F648}' : '\u{1F441}'}
              </button>
            </div>
          </div>

          <div className="ax-auth-field">
            <label htmlFor="ax-setpsw-confirm">Confirm password</label>
            <input
              id="ax-setpsw-confirm"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={readOnly}
              className="form-control"
            />
          </div>

          {error && <p className="ax-auth-error">{error}</p>}

          <button type="submit" className="ax-auth-submit" disabled={loading || readOnly}>
            {loading ? 'Updating\u2026' : 'Set Password'}
          </button>

          {onNavigateSignIn && (
            <p className="ax-auth-footer">
              <button type="button" className="ax-auth-link" onClick={onNavigateSignIn}>
                Back to Sign In
              </button>
            </p>
          )}
        </form>
      )}
    </div>
  )
}
