import { type ReactElement, useState } from 'react'

import { cn } from '@ax/shared'

type NotifyType = 'danger' | 'warning' | 'info'

interface NotifyItem {
  id: number
  type: NotifyType
  title: string
  description: string
  timestamp: string
  read: boolean
}

interface NotifyMenuProps {
  title?: string
  notifications: NotifyItem[]
  onNotifyClick?: (id: number) => void
}

const typeColors: Record<NotifyType, string> = {
  danger: '#d32f2f',
  warning: '#ed6c02',
  info: '#0288d1',
}

const typeIcons: Record<NotifyType, string> = {
  danger: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
}

export function NotifyMenu({ title = 'Notifications', notifications, onNotifyClick }: NotifyMenuProps): ReactElement {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(notifications)
  const unreadCount = items.filter((n) => !n.read).length

  const handleMarkRead = (id: number) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    onNotifyClick?.(id)
  }

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="ax-notify-menu">
      <button className="ax-notify-menu-trigger" onClick={() => setOpen((p) => !p)} type="button" aria-label={title}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
        {unreadCount > 0 && <span className="ax-notify-menu-badge">{unreadCount}</span>}
      </button>

      {open && (
        <>
          <div className="ax-notify-menu-backdrop" onClick={() => setOpen(false)} />
          <div className="ax-notify-menu-dropdown">
            <div className="ax-notify-menu-header">
              <span className="ax-notify-menu-title">
                {title}
                {unreadCount > 0 && <span className="ax-notify-menu-count">{unreadCount}</span>}
              </span>
              <button
                className="ax-notify-menu-action"
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
                type="button"
              >
                Mark all as read
              </button>
            </div>
            <div className="ax-notify-menu-list">
              {items.map((n) => (
                <div
                  key={n.id}
                  className={cn('ax-notify-menu-item', n.read && 'ax-notify-menu-item--read')}
                  style={{ borderLeftColor: typeColors[n.type] }}
                  onClick={() => handleMarkRead(n.id)}
                >
                  <div className="ax-notify-menu-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={typeColors[n.type]}>
                      <path d={typeIcons[n.type]} />
                    </svg>
                  </div>
                  <div className="ax-notify-menu-item-body">
                    <div className="ax-notify-menu-item-title">
                      {n.title}
                      {!n.read && <span className="ax-notify-menu-dot" />}
                    </div>
                    <div className="ax-notify-menu-item-desc">{n.description}</div>
                    <div className="ax-notify-menu-item-time">{n.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
