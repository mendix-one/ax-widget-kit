# AXTasks Menu

> Tasks menu widget displaying urgent tasks with badge count

## Properties

### General

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | Text template | `"Urgent tasks"` | Header title for the tasks dropdown |

### Events

| Property | Type | Description |
|----------|------|-------------|
| `onTaskClick` | Action | Action when a task item is clicked |

## Internal Store

The widget uses a MobX store (`TasksMenuStore`) with the following internal state:

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Header title displayed in the dropdown |
| `items` | `TaskItem[]` | Array of task items (id, title, description, timestamp, done) |
| `pendingCount` | `number` (computed) | Count of tasks where `done === false` |

### Store Actions

| Action | Description |
|--------|-------------|
| `markDone(id)` | Marks a task as done and triggers the `onTaskClick` callback |
| `markAllDone()` | Marks all tasks as done |

## Usage in Mendix

1. In Studio Pro, drag the **AXTasks Menu** widget into a page layout header (typically placed next to AXNotify Menu and AXUser Menu in a toolbar).
2. Configure the **Title** property with a text template (e.g., a translatable string or expression).
3. Set the **On task click** action to a nanoflow or microflow that handles task selection (e.g., navigate to a task detail page).

The widget renders as an icon button with a badge showing the number of pending (not done) tasks. Clicking the icon opens a dropdown menu listing all tasks. Each task shows a title, description, and timestamp. Clicking a task marks it as done and fires the configured action. A "Mark all done" button in the header clears all pending tasks.

## UI Details

- **Icon**: `AssignmentLate` (MUI) with an error-colored badge for pending count
- **Dropdown**: 400px wide, max 520px height, scrollable task list
- **Task items**: Left border in error color, highlighted background when pending, strikethrough text when done
- **Unread indicator**: Small red dot next to pending task titles

## Event Bus

### Listening

| Topic | Event Type | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives broadcast events from all widgets |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives private events targeted at this widget instance |

The widget subscribes to the event bus via `useWidgetEvents` but does not currently handle specific event types. The handler is a placeholder for future event-driven behavior (e.g., refreshing tasks from an external source).

### Emitting

This widget does not currently emit events to the bus.

## Example

### Studio Pro Configuration

1. Place the widget in a header bar container.
2. Set **Title** to `'Urgent tasks'` or a translatable text template.
3. Set **On task click** to a nanoflow:
   - The nanoflow can show a detail page or call a microflow to process the task.

### JavaScript Action

To send an event to this widget from a Mendix JavaScript action:

```javascript
// Target a specific widget instance
const bus = window.__AX_EVENT_BUS__
if (bus) {
  bus.emit('ax:AXTasksMenu1', { type: 'refresh', payload: {} })
}

// Broadcast to all widgets
if (bus) {
  bus.emit('ax:broadcast', { type: 'theme-changed', payload: { mode: 'dark' } })
}
```
