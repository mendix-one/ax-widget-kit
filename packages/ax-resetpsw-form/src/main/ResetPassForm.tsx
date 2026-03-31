import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
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
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        {onNavigateSignIn && (
          <IconButton size="small" onClick={onNavigateSignIn} aria-label="Back to sign in">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        )}
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Reset Password
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email to receive a reset link
      </Typography>

      {sent ? (
        <Box>
          <Typography color="success.main" variant="body2" sx={{ mb: 1.5 }}>
            A password reset link has been sent to your email.
          </Typography>
          {onNavigateSignIn && (
            <Link component="button" type="button" variant="body2" underline="hover" onClick={onNavigateSignIn}>
              Back to Sign In
            </Link>
          )}
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={readOnly}
            sx={{ mb: 2 }}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth disabled={loading || readOnly} sx={{ mb: 2 }}>
            {loading ? 'Sending\u2026' : 'Send Reset Link'}
          </Button>

          {onNavigateSignIn && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Remember your password?{' '}
              <Link component="button" type="button" underline="hover" onClick={onNavigateSignIn}>
                Sign In
              </Link>
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}
