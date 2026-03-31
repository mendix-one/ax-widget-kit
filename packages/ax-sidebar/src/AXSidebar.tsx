import { type ReactElement, useState } from 'react'

import type { AXSidebarContainerProps } from '../typings/AXSidebarProps'

import { SidebarProvider } from './main/context'
import { Sidebar } from './main/Sidebar'
import { SidebarIcon } from './main/SidebarIcon'
import { SidebarStore } from './main/store'

const defaultItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <SidebarIcon type="dashboard" /> },
  { id: 'analytics', label: 'Yield Analysis', icon: <SidebarIcon type="analytics" /> },
  { id: 'defects', label: 'Defect Analysis', icon: <SidebarIcon type="defects" /> },
  { id: 'lots', label: 'Lot Tracking', icon: <SidebarIcon type="lots" /> },
  { id: 'roadmap', label: 'Technology Roadmap', icon: <SidebarIcon type="roadmap" /> },
]

export function AXSidebar(props: AXSidebarContainerProps): ReactElement {
  const [store] = useState(() => {
    const s = new SidebarStore()
    s.setItems(defaultItems)
    s.setActiveId(defaultItems[0]?.id ?? '')
    return s
  })

  return (
    <SidebarProvider store={store}>
      <Sidebar>{props.content}</Sidebar>
    </SidebarProvider>
  )
}
