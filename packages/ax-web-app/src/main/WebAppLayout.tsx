import { type ReactElement, type ReactNode, useCallback, useState } from 'react'

import { cn } from '@ax/shared'

interface WebAppLayoutProps {
  logo?: ReactNode
  tasksMenu?: ReactNode
  notifyMenu?: ReactNode
  userMenu?: ReactNode
  sidebar?: ReactNode
  content?: ReactNode
  agentChat?: ReactNode
}

type SidebarMode = 'show' | 'mini' | 'hide'

const RESIZE_HANDLE_WIDTH = 4

export function WebAppLayout({
  logo,
  tasksMenu,
  notifyMenu,
  userMenu,
  sidebar,
  content,
  agentChat,
}: WebAppLayoutProps): ReactElement {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('show')
  const [agentOpen, setAgentOpen] = useState(false)
  const [agentWidth, setAgentWidth] = useState(360)
  const [resizing, setResizing] = useState(false)

  const toggleSidebar = () => {
    setSidebarMode((prev) => (prev === 'show' ? 'mini' : prev === 'mini' ? 'hide' : 'show'))
  }

  const toggleAgent = () => setAgentOpen((prev) => !prev)

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setResizing(true)
      const startX = e.clientX
      const startW = agentWidth

      const onMouseMove = (ev: MouseEvent) => {
        setAgentWidth(Math.max(280, Math.min(600, startW + (startX - ev.clientX))))
      }

      const onMouseUp = () => {
        setResizing(false)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    [agentWidth],
  )

  const agentPanelWidth = agentOpen ? agentWidth + RESIZE_HANDLE_WIDTH : 0

  return (
    <div className="ax-webapp-root">
      {/* Left panel: header + sidebar + main */}
      <div
        className="ax-webapp-left"
        style={{ transition: resizing ? 'none' : 'width 0.25s ease-in-out' }}
      >
        {/* Header */}
        <header className="ax-webapp-header">
          <div className="ax-webapp-header-left">
            {logo && <div className="ax-webapp-logo">{logo}</div>}
            <button className="ax-webapp-menu-btn" onClick={toggleSidebar} type="button" aria-label="Toggle sidebar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>
          </div>
          <div className="ax-webapp-header-right">
            {agentChat && (
              <button
                className={cn('ax-webapp-icon-btn', agentOpen && 'ax-webapp-icon-btn--active')}
                onClick={toggleAgent}
                type="button"
                aria-label="Toggle agent"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13z" />
                </svg>
              </button>
            )}
            {tasksMenu && <div className="ax-webapp-header-slot">{tasksMenu}</div>}
            {notifyMenu && <div className="ax-webapp-header-slot">{notifyMenu}</div>}
            {userMenu && <div className="ax-webapp-header-slot">{userMenu}</div>}
          </div>
        </header>

        {/* Content row: sidebar + main */}
        <div className="ax-webapp-body">
          {sidebar && (
            <aside
              className={cn('ax-webapp-sidebar', `ax-webapp-sidebar--${sidebarMode}`)}
            >
              {sidebar}
            </aside>
          )}
          <main className="ax-webapp-main">{content}</main>
        </div>
      </div>

      {/* Right panel: agent chat */}
      {agentChat && agentOpen && (
        <div
          className="ax-webapp-agent"
          style={{
            width: agentPanelWidth,
            transition: resizing ? 'none' : 'width 0.25s ease-in-out',
          }}
        >
          <div className="ax-webapp-resize-handle" onMouseDown={handleResizeStart} />
          <div className="ax-webapp-agent-content" style={{ width: agentWidth, minWidth: agentWidth }}>
            {agentChat}
          </div>
        </div>
      )}
    </div>
  )
}
