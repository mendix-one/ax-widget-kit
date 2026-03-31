import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { type ReactElement } from 'react'

interface LogoProps {
  src?: string
  alt?: string
  height?: number
  onClick?: () => void
}

export function Logo({ src, alt = 'Logo', height = 24, onClick }: LogoProps): ReactElement {
  if (!src) {
    return (
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          letterSpacing: -0.5,
          cursor: onClick ? 'pointer' : 'default',
          userSelect: 'none',
        }}
        onClick={onClick}
      >
        {alt}
      </Typography>
    )
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        height,
        objectFit: 'contain',
        display: 'block',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    />
  )
}
