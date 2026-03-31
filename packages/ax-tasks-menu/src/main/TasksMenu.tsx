import { type ReactElement, useState } from 'react'

import { cn } from '@ax/shared'

interface TaskItem {
  id: number
  title: string
  description: string
  timestamp: string
  done: boolean
}

interface TasksMenuProps {
  title?: string
  tasks: TaskItem[]
  onTaskClick?: (id: number) => void
}

export function TasksMenu({ title = 'Urgent tasks', tasks, onTaskClick }: TasksMenuProps): ReactElement {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(tasks)
  const pendingCount = items.filter((t) => !t.done).length

  const handleToggle = () => setOpen((prev) => !prev)

  const handleMarkDone = (id: number) => {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, done: true } : t)))
    onTaskClick?.(id)
  }

  const handleMarkAllDone = () => {
    setItems((prev) => prev.map((t) => ({ ...t, done: true })))
  }

  return (
    <div className="ax-tasks-menu">
      <button className="ax-tasks-menu-trigger" onClick={handleToggle} type="button" aria-label={title}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zM19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 16H5V5h2v3h10V5h2v14z" />
        </svg>
        {pendingCount > 0 && <span className="ax-tasks-menu-badge">{pendingCount}</span>}
      </button>

      {open && (
        <>
          <div className="ax-tasks-menu-backdrop" onClick={() => setOpen(false)} />
          <div className="ax-tasks-menu-dropdown">
            <div className="ax-tasks-menu-header">
              <span className="ax-tasks-menu-title">
                {title}
                {pendingCount > 0 && <span className="ax-tasks-menu-count">{pendingCount}</span>}
              </span>
              <button
                className="ax-tasks-menu-action"
                onClick={handleMarkAllDone}
                disabled={pendingCount === 0}
                type="button"
              >
                Mark all done
              </button>
            </div>
            <div className="ax-tasks-menu-list">
              {items.map((task) => (
                <div
                  key={task.id}
                  className={cn('ax-tasks-menu-item', task.done && 'ax-tasks-menu-item--done')}
                  onClick={() => handleMarkDone(task.id)}
                >
                  <div className="ax-tasks-menu-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#d32f2f">
                      <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zM19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 16H5V5h2v3h10V5h2v14z" />
                    </svg>
                  </div>
                  <div className="ax-tasks-menu-item-body">
                    <div className="ax-tasks-menu-item-title">
                      {task.title}
                      {!task.done && <span className="ax-tasks-menu-dot" />}
                    </div>
                    <div className="ax-tasks-menu-item-desc">{task.description}</div>
                    <div className="ax-tasks-menu-item-time">{task.timestamp}</div>
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
