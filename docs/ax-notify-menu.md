# AXNotify Menu

> Notifications menu widget with badge count and notification list

## Properties

### General

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | Text template | `"Notifications"` | Header title for the notifications dropdown |

### Events

| Property | Type | Description |
|----------|------|-------------|
| `onNotifyClick` | Action | Action when a notification item is clicked |

## Internal Store

The widget uses a MobX store (`NotifyMenuStore`) with the following internal state:

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Header title displayed in the dropdown |
| `items` | `NotifyItem[]` | Array of notification items |
| `unreadCount` | `number` (computed) | Count of notifications where `read === false` |

### NotifyItem Shape

| Field | Type | Description |
|-------|------|-------------|
| `id` | `number` | Unique identifier |
| `type` | `'danger' \| 'warning' \| 'info'` | Notification severity level |
| `title` | `string` | Notification title |
| `description` | `string` | Notification body text |
| `timestamp` | `string` | Human-readable time (e.g., "10 minutes ago") |
| `read` | `boolean` | Whether the notification has been read |

### Store Actions

| Action | Description |
|--------|-------------|
| `markRead(id)` | Marks a notification as read and triggers the `onNotifyClick` callback |
| `markAllRead()` | Marks all notifications as read |

## Usage in Mendix

1. In Studio Pro, drag the **AXNotify Menu** widget into a page layout header (typically placed alongside AXTasks Menu and AXUser Menu in a toolbar).
2. Configure the **Title** property with a text template (e.g., `"Notifications"` or a translatable string).
3. Set the **On notification click** action to a nanoflow or microflow that handles notification selection (e.g., navigate to the related entity).

The widget renders as a bell icon button with an error-colored badge showing the unread count. Clicking the icon opens a 400px-wide dropdown listing all notifications. Each notification is color-coded by severity:

- **Danger** (red border + error icon): Critical alerts requiring immediate attention
- **Warning** (amber border + warning icon): Issues that need review
- **Info** (blue border + info icon): Informational messages

Clicking a notification marks it as read and fires the configured action. A "Mark all as read" button in the header clears all unread indicators.

## UI Details

- **Icon**: `NotificationsNone` (MUI) with an error-colored badge for unread count
- **Dropdown**: 400px wide, max 520px height, scrollable notification list
- **Notification items**: Left border colored by severity type, highlighted background when unread
- **Unread indicator**: Small primary-colored dot next to unread notification titles
- **Severity icons**: `ErrorOutline` (danger), `WarningAmber` (warning), `InfoOutlined` (info)

## Event Bus

### Listening

| Topic | Event Action | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives broadcast events from all widgets |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives private events targeted at this widget instance |

The widget subscribes to the event bus via `useWidgetEvents` but does not currently handle specific event actions. The handler is a placeholder for future event-driven behavior (e.g., refreshing notifications from an external source).

### Emitting

This widget does not currently emit events to the bus.

## Example

### Studio Pro Configuration

1. Place the widget in a header bar container alongside other toolbar widgets.
2. Set **Title** to `'Notifications'` or a translatable text template.
3. Set **On notification click** to a nanoflow:
   - The nanoflow can navigate to a detail page for the related entity or open a follow-up dialog.

### JavaScript Action

To send an event to this widget from a Mendix JavaScript action:

```javascript
// Target a specific widget instance
const bus = window.__AX_EVENT_BUS__
if (bus) {
  bus.emit('ax:AXNotifyMenu1', { action: 'refresh', payload: {} })
}

// Broadcast to all widgets
if (bus) {
  bus.emit('ax:broadcast', { action: 'theme-changed', payload: { mode: 'dark' } })
}
```
