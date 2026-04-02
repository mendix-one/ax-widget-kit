# AXUser Menu

> User menu widget with avatar, display mode toggle, and actions

## Properties

### General

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `userName` | Text template | `"Operator"` | Display name of the current user |
| `userEmail` | Text template | `"operator@amoza.ai"` | Email of the current user |

### Events

| Property | Type | Description |
|----------|------|-------------|
| `onSignOut` | Action | Action when user clicks sign out |
| `onProfile` | Action | Action when user clicks profile |
| `onSettings` | Action | Action when user clicks settings |

## Internal Store

The widget uses a MobX store (`UserMenuStore`) with the following internal state:

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Display name of the current user |
| `email` | `string` | Email address of the current user |
| `initials` | `string` (computed) | First two characters of the name, uppercased (used in avatar) |

### Store Actions

| Action | Description |
|--------|-------------|
| `setName(name)` | Updates the display name |
| `setEmail(email)` | Updates the email address |

## Usage in Mendix

1. In Studio Pro, drag the **AXUser Menu** widget into a page layout header (typically the rightmost element in a toolbar, after AXTasks Menu and AXNotify Menu).
2. Set **User name** to an expression referencing the current user's name (e.g., `$currentUser/Name`).
3. Set **User email** to an expression referencing the current user's email (e.g., `$currentUser/Email`).
4. Configure event actions:
   - **On sign out**: Trigger a sign-out microflow (e.g., call `mx.logout()`).
   - **On profile**: Navigate to the user's profile page.
   - **On settings**: Navigate to the application settings page.

The widget renders as a circular avatar button showing the user's initials. Clicking the avatar opens a dropdown menu with:

- **User info section**: Avatar, full name, and email address
- **Profile**: Menu item with person icon
- **Settings**: Menu item with gear icon
- **Sign out**: Menu item with logout icon, styled in error color (red)

## UI Details

- **Avatar**: 32px circle with primary background color, displays user initials (first 2 characters)
- **Dropdown**: 280px wide with user info header, divider, action items, and sign-out button
- **Sign out**: Highlighted in error color to indicate a destructive action
- **Menu items**: Each has a leading icon (`Person`, `Settings`, `Logout`)

## Event Bus

### Listening

| Topic | Event Action | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives broadcast events from all widgets |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives private events targeted at this widget instance |

The widget subscribes to the event bus via `useWidgetEvents` but does not currently handle specific event actions. The handler is a placeholder for future event-driven behavior (e.g., updating user info when a profile is modified).

### Emitting

This widget does not currently emit events to the bus.

## Example

### Studio Pro Configuration

1. Place the widget in a header bar container, rightmost position.
2. Set **User name** to `$currentUser/Name`.
3. Set **User email** to `$currentUser/Email`.
4. Set **On sign out** to a nanoflow that calls `mx.logout()`.
5. Set **On profile** to a nanoflow that opens the profile page: `Show page 'UserProfile'`.
6. Set **On settings** to a nanoflow that opens the settings page: `Show page 'AppSettings'`.

### JavaScript Action

To send an event to this widget from a Mendix JavaScript action:

```javascript
// Target a specific widget instance
const bus = window.__AX_EVENT_BUS__
if (bus) {
  bus.emit('ax:AXUserMenu1', { action: 'refresh-user', payload: { name: 'New Name' } })
}

// Broadcast to all widgets
if (bus) {
  bus.emit('ax:broadcast', { action: 'theme-changed', payload: { mode: 'dark' } })
}
```
