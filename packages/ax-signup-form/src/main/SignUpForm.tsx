import { type FormEvent, type ReactElement, useState } from 'react'

export interface SignUpFormProps {
  fullName: string
  email: string
  password: string
  onFullNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: () => void
  onNavigateSignIn?: () => void
  onGoogleSSO?: () => void
  onMicrosoftSSO?: () => void
  showSSO: boolean
  readOnly?: boolean
}

export function SignUpForm({
  fullName,
  email,
  password,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onNavigateSignIn,
  onGoogleSSO,
  onMicrosoftSSO,
  showSSO,
  readOnly,
}: SignUpFormProps): ReactElement {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fullName || !email || !password || !confirmPassword) {
      setError('All fields are required.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    onSubmit()
    setTimeout(() => setLoading(false), 600)
  }

  return (
    <div className="ax-auth-form">
      <h2 className="ax-auth-title">Sign Up</h2>
      <p className="ax-auth-subtitle">Create your account to get started</p>

      {showSSO && (
        <>
          <div className="ax-auth-sso">
            <button type="button" className="ax-auth-sso-btn" onClick={onGoogleSSO} disabled={readOnly}>
              <img src={googleSvg} alt="" className="ax-auth-sso-icon" />
              Google
            </button>
            <button type="button" className="ax-auth-sso-btn" onClick={onMicrosoftSSO} disabled={readOnly}>
              <img src={microsoftSvg} alt="" className="ax-auth-sso-icon" />
              Microsoft
            </button>
          </div>
          <div className="ax-auth-divider">
            <span>or continue with</span>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="ax-auth-field">
          <label htmlFor="ax-signup-name">Full name</label>
          <input
            id="ax-signup-name"
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            disabled={readOnly}
            className="form-control"
          />
        </div>

        <div className="ax-auth-field">
          <label htmlFor="ax-signup-email">Email</label>
          <input
            id="ax-signup-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={readOnly}
            className="form-control"
          />
        </div>

        <div className="ax-auth-field">
          <label htmlFor="ax-signup-password">Password</label>
          <div className="ax-auth-password-wrap">
            <input
              id="ax-signup-password"
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
          <label htmlFor="ax-signup-confirm-password">Confirm password</label>
          <input
            id="ax-signup-confirm-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={readOnly}
            className="form-control"
          />
        </div>

        {error && <p className="ax-auth-error">{error}</p>}

        <button type="submit" className="ax-auth-submit" disabled={loading || readOnly}>
          {loading ? 'Creating account\u2026' : 'Sign Up'}
        </button>

        {onNavigateSignIn && (
          <p className="ax-auth-footer">
            Already have an account?{' '}
            <button type="button" className="ax-auth-link" onClick={onNavigateSignIn}>
              Sign In
            </button>
          </p>
        )}
      </form>
    </div>
  )
}

const googleSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23fbc02d' d='M43.6 20.1H42V20H24v8h11.3C33.9 33.1 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z'/%3E%3Cpath fill='%23e53935' d='M6.3 14.7l6.6 4.8C14.3 15.7 18.8 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z'/%3E%3Cpath fill='%234caf50' d='M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.2 26.7 36 24 36c-5.4 0-9.9-3.5-11.5-8.3l-6.5 5C9.5 39.5 16.2 44 24 44z'/%3E%3Cpath fill='%231565c0' d='M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.6l6.2 5.2C37 39.3 44 34 44 24c0-1.3-.1-2.7-.4-3.9z'/%3E%3C/svg%3E"

const microsoftSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23 23'%3E%3Crect x='1' y='1' width='10' height='10' fill='%23f25022'/%3E%3Crect x='12' y='1' width='10' height='10' fill='%237fba00'/%3E%3Crect x='1' y='12' width='10' height='10' fill='%2300a4ef'/%3E%3Crect x='12' y='12' width='10' height='10' fill='%23ffb900'/%3E%3C/svg%3E"
