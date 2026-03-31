import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
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

  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
      </IconButton>
    </InputAdornment>
  )

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
        Set New Password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your new password below
      </Typography>

      {success ? (
        <Box>
          <Typography color="success.main" variant="body2" sx={{ mb: 1.5 }}>
            Your password has been updated successfully.
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
            label="New password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            size="small"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            disabled={readOnly}
            sx={{ mb: 2 }}
            slotProps={{ input: { endAdornment: passwordAdornment } }}
          />

          <TextField
            label="Confirm password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            size="small"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={readOnly}
            sx={{ mb: 2 }}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth disabled={loading || readOnly} sx={{ mb: 2 }}>
            {loading ? 'Updating\u2026' : 'Set Password'}
          </Button>

          {onNavigateSignIn && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              <Link component="button" type="button" underline="hover" onClick={onNavigateSignIn}>
                Back to Sign In
              </Link>
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}
