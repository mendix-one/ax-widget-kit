import type { ReactElement, ReactNode } from 'react'

import { AiBg } from './AiBg'

interface AuthLayoutProps {
  tagline?: string
  description?: string
  showBackground?: boolean
  children?: ReactNode
}

export function AuthLayout({ tagline, description, showBackground = true, children }: AuthLayoutProps): ReactElement {
  return (
    <div className="ax-layout-root">
      {showBackground && <AiBg />}

      <div className="ax-layout-container">
        {/* Left panel — branding */}
        <div className="ax-layout-left">
          {tagline && <h3 className="ax-layout-tagline">{tagline}</h3>}
          {description && <p className="ax-layout-description">{description}</p>}
        </div>

        {/* Right panel — form card */}
        <div className="ax-layout-right">
          <div className="ax-layout-card">
            <div className="ax-layout-content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
