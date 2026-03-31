import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { AxThemeProvider, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AXTasksMenuContainerProps } from '../typings/AXTasksMenuProps'

import { TasksMenuProvider } from './main/context'
import { TasksMenuStore } from './main/store'
import { TasksMenu } from './main/TasksMenu'

const sampleTasks = [
  {
    id: 1,
    title: 'Yield drop on Line 3',
    description: 'Overall yield dropped below 90% — investigate root cause and escalate.',
    timestamp: '15 minutes ago',
    done: false,
  },
  {
    id: 2,
    title: 'CMP tool calibration overdue',
    description: 'CMP-04 calibration is 2 days overdue. Schedule maintenance immediately.',
    timestamp: '2 hours ago',
    done: false,
  },
  {
    id: 3,
    title: 'Lot #W-4821 hold review',
    description: 'Lot placed on hold due to contamination flag — review and disposition.',
    timestamp: '5 hours ago',
    done: false,
  },
]

export function AXTasksMenu(props: AXTasksMenuContainerProps): ReactElement {
  const [store] = useState(() => new TasksMenuStore())

  useEffect(() => {
    store.setTitle(props.title?.value ?? 'Urgent tasks')
  }, [props.title?.value])

  useEffect(() => {
    store.setItems(sampleTasks)
  }, [])

  useEffect(() => {
    store.setOnTaskClick(props.onTaskClick?.canExecute ? () => props.onTaskClick?.execute() : undefined)
  }, [props.onTaskClick?.canExecute])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <AxThemeProvider>
      <TasksMenuProvider store={store}>
        <TasksMenu />
      </TasksMenuProvider>
    </AxThemeProvider>
  )
}
