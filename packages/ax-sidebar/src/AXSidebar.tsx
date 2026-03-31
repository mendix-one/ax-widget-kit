import type { ReactElement } from 'react'

import type { AXSidebarContainerProps } from '../typings/AXSidebarProps'

import { Sidebar } from './main/Sidebar'
import { SidebarIcon } from './main/SidebarIcon'

const defaultItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <SidebarIcon type="dashboard" /> },
  { id: 'analytics', label: 'Yield Analysis', icon: <SidebarIcon type="analytics" /> },
  { id: 'defects', label: 'Defect Analysis', icon: <SidebarIcon type="defects" /> },
  { id: 'lots', label: 'Lot Tracking', icon: <SidebarIcon type="lots" /> },
  { id: 'roadmap', label: 'Technology Roadmap', icon: <SidebarIcon type="roadmap" /> },
]

export function AXSidebar(props: AXSidebarContainerProps): ReactElement {
  return <Sidebar items={defaultItems}>{props.content}</Sidebar>
}
