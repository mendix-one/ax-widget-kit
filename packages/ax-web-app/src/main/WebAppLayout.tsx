import MenuIcon from '@mui/icons-material/Menu'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { type ReactElement, type ReactNode, useCallback, useState } from 'react'

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

const DRAWER_WIDTH_FULL = 240
const DRAWER_WIDTH_MINI = 64
const RESIZE_HANDLE_WIDTH = 4
const AGENT_TRANSITION = 'width 0.25s ease-in-out'

export function WebAppLayout({
  logo,
  tasksMenu,
  notifyMenu,
  userMenu,
  sidebar,
  content,
  agentChat,
}: WebAppLayoutProps): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('show')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [agentOpen, setAgentOpen] = useState(false)
  const [agentWidth, setAgentWidth] = useState(360)
  const [resizing, setResizing] = useState(false)

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev)
    } else {
      setSidebarMode((prev) => (prev === 'show' ? 'mini' : prev === 'mini' ? 'hide' : 'show'))
    }
  }

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

  const drawerWidth = sidebarMode === 'show' ? DRAWER_WIDTH_FULL : sidebarMode === 'mini' ? DRAWER_WIDTH_MINI : 0
  const agentPanelWidth = agentOpen ? agentWidth + RESIZE_HANDLE_WIDTH : 0

  return (
    <Box sx={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
      {/* Left panel: header + sidebar + main */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          transition: resizing ? 'none' : AGENT_TRANSITION,
        }}
      >
        {/* Header */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            zIndex: (t) => t.zIndex.drawer + 1,
          }}
        >
          <Toolbar variant="dense" sx={{ minHeight: 48 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, flexGrow: 1 }}>
              {logo}
              <IconButton onClick={toggleSidebar} size="small" sx={{ color: 'text.secondary' }}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {agentChat && (
                <Tooltip title="AI Assistant">
                  <IconButton
                    onClick={() => setAgentOpen((prev) => !prev)}
                    sx={{ color: agentOpen ? 'primary.main' : 'text.secondary' }}
                  >
                    <SmartToyOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
              {tasksMenu}
              {notifyMenu}
              {userMenu}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content row: sidebar + main */}
        <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* Sidebar */}
          {sidebar && !isMobile && (
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                transition: 'width 0.25s ease-in-out',
                '& .MuiDrawer-paper': {
                  position: 'relative',
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  overflowX: 'hidden',
                  transition: 'width 0.25s ease-in-out',
                },
              }}
            >
              {sidebar}
            </Drawer>
          )}

          {/* Mobile sidebar */}
          {sidebar && isMobile && (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              ModalProps={{ keepMounted: true }}
              sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH_FULL, boxSizing: 'border-box' } }}
            >
              {sidebar}
            </Drawer>
          )}

          {/* Main body */}
          <Box component="main" sx={{ flex: 1, overflowY: 'auto', minWidth: 0, p: { xs: 2, sm: 3 } }}>
            {content}
          </Box>
        </Box>
      </Box>

      {/* Right panel: agent chat (desktop) */}
      {agentChat && !isMobile && (
        <Box
          sx={{
            display: 'flex',
            flexShrink: 0,
            overflow: 'hidden',
            width: agentPanelWidth,
            transition: resizing ? 'none' : AGENT_TRANSITION,
          }}
        >
          <Box
            onMouseDown={handleResizeStart}
            sx={{
              width: RESIZE_HANDLE_WIDTH,
              flexShrink: 0,
              cursor: 'col-resize',
              bgcolor: 'divider',
              '&:hover': { bgcolor: 'primary.main' },
              transition: 'background-color 0.15s',
            }}
          />
          <Box
            sx={{
              width: agentWidth,
              minWidth: agentWidth,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderLeft: '1px solid',
              borderColor: 'divider',
            }}
          >
            {agentChat}
          </Box>
        </Box>
      )}

      {/* Mobile: agent as bottom drawer */}
      {agentChat && isMobile && (
        <Drawer
          variant="temporary"
          anchor="bottom"
          open={agentOpen}
          onClose={() => setAgentOpen(false)}
          sx={{ '& .MuiDrawer-paper': { height: '75dvh', borderRadius: '16px 16px 0 0' } }}
        >
          {agentChat}
        </Drawer>
      )}
    </Box>
  )
}
