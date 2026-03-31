import { type ReactElement, useState } from 'react'

import { cn } from '@ax/shared'

interface UserMenuProps {
  name?: string
  email?: string
  onSignOut?: () => void
  onProfile?: () => void
  onSettings?: () => void
}

export function UserMenu({
  name = 'Operator',
  email = 'operator@amoza.ai',
  onSignOut,
  onProfile,
  onSettings,
}: UserMenuProps): ReactElement {
  const [open, setOpen] = useState(false)
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <div className="ax-user-menu">
      <button className="ax-user-menu-trigger" onClick={() => setOpen((p) => !p)} type="button" aria-label="User menu">
        <span className="ax-user-menu-avatar">{initials}</span>
      </button>

      {open && (
        <>
          <div className="ax-user-menu-backdrop" onClick={() => setOpen(false)} />
          <div className="ax-user-menu-dropdown">
            {/* User info */}
            <div className="ax-user-menu-info">
              <span className="ax-user-menu-avatar ax-user-menu-avatar--lg">{initials}</span>
              <div className="ax-user-menu-info-text">
                <div className="ax-user-menu-name">{name}</div>
                <div className="ax-user-menu-email">{email}</div>
              </div>
            </div>
            <div className="ax-user-menu-divider" />

            {/* Actions */}
            <button
              className="ax-user-menu-item"
              onClick={() => {
                setOpen(false)
                onProfile?.()
              }}
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Profile
            </button>
            <button
              className="ax-user-menu-item"
              onClick={() => {
                setOpen(false)
                onSettings?.()
              }}
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
              Settings
            </button>
            <div className="ax-user-menu-divider" />

            {/* Sign out */}
            <button
              className={cn('ax-user-menu-item', 'ax-user-menu-item--danger')}
              onClick={() => {
                setOpen(false)
                onSignOut?.()
              }}
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
