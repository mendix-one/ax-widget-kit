import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import { type ReactElement, type ReactNode, useState } from 'react'

interface NavItem {
  id: string
  label: string
  icon: ReactNode
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
    return <>{children}</>
  }

  return (
    <List>
      {items.map((item) => (
        <Tooltip key={item.id} title={collapsed ? item.label : ''} placement="right">
          <ListItemButton
            selected={activeId === item.id}
            onClick={() => handleClick(item.id)}
            sx={{
              justifyContent: collapsed ? 'center' : 'initial',
              '&.Mui-selected': {
                bgcolor: 'action.selected',
                color: 'primary.main',
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, justifyContent: 'center' }}>
              {item.icon}
            </ListItemIcon>
            {!collapsed && <ListItemText primary={item.label} />}
          </ListItemButton>
        </Tooltip>
      ))}
    </List>
  )
}
