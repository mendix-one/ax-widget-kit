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
      <span className="ax-logo-text" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        {alt}
      </span>
    )
  }

  return (
    <img
      className="ax-logo-img"
      src={src}
      alt={alt}
      style={{ height, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    />
  )
}
