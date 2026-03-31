import { type ReactElement, type ReactNode, useState } from 'react'

import { cn } from '@ax/shared'

interface NavItem {
  id: string
  label: string
  icon: ReactNode
  active?: boolean
}

interface SidebarProps {
  items: NavItem[]
  collapsed?: boolean
  children?: ReactNode
  onItemClick?: (id: string) => void
}

export function Sidebar({ items, collapsed = false, children, onItemClick }: SidebarProps): ReactElement {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  const handleClick = (id: string) => {
    setActiveId(id)
    onItemClick?.(id)
  }

  if (children) {
    return <div className="ax-sidebar-content">{children}</div>
  }

  return (
    <nav className="ax-sidebar-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={cn('ax-sidebar-item', activeId === item.id && 'ax-sidebar-item--active', collapsed && 'ax-sidebar-item--collapsed')}
          onClick={() => handleClick(item.id)}
          type="button"
          title={collapsed ? item.label : undefined}
        >
          <span className="ax-sidebar-item-icon">{item.icon}</span>
          {!collapsed && <span className="ax-sidebar-item-label">{item.label}</span>}
        </button>
      ))}
    </nav>
  )
}
