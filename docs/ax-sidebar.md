# AXSidebar

> Sidebar navigation widget with icon and label nav items

## Properties

### General

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | Widgets (slot) | *(none)* | Custom widgets to render in the sidebar. When provided, replaces the default navigation list. |

### Events

This widget has no configurable event properties in the XML manifest. Navigation is handled internally through the store's `onItemClick` callback.

## Internal Store

The widget uses a MobX store (`SidebarStore`) with the following internal state:

| Field | Type | Description |
|-------|------|-------------|
| `items` | `NavItem[]` | Array of navigation items (id, label, icon) |
| `activeId` | `string` | ID of the currently selected navigation item |

### NavItem Shape

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (e.g., `"dashboard"`, `"analytics"`) |
| `label` | `string` | Display label for the navigation item |
| `icon` | `ReactNode` | Icon element rendered alongside the label |

### Store Actions

| Action | Description |
|--------|-------------|
| `setItems(items)` | Replaces the navigation item list |
| `setActiveId(id)` | Sets the active/selected item |
| `selectItem(id)` | Sets active ID and triggers the `onItemClick` callback |

## Default Navigation Items

The widget initializes with these default navigation items:

| ID | Label | Icon |
|----|-------|------|
| `dashboard` | Dashboard | `DashboardIcon` |
| `analytics` | Yield Analysis | `BarChartIcon` |
| `defects` | Defect Analysis | `BugReportIcon` |
| `lots` | Lot Tracking | `FolderIcon` |
| `roadmap` | Technology Roadmap | `MapIcon` |

### Available Icon Types

The `SidebarIcon` component supports the following types: `dashboard`, `analytics`, `defects`, `lots`, `roadmap`, `info`.

## Usage in Mendix

1. In Studio Pro, drag the **AXSidebar** widget into a page layout, typically as the left-hand column of a responsive layout.
2. Optionally add custom widgets into the **Navigation content** slot to replace the default nav list.
3. If using the default navigation, the sidebar renders a vertical MUI `List` with `ListItemButton` entries.

The sidebar supports two display modes:

- **Expanded**: Shows both icon and label text for each navigation item.
- **Collapsed**: Shows only icons, with labels appearing as tooltips on hover.

The currently active item is visually highlighted with a selected background and primary color for both text and icon.

## UI Details

- **Component**: MUI `List` with `ListItemButton` elements
- **Active state**: `Mui-selected` style with `action.selected` background and `primary.main` color
- **Collapsed mode**: Icons centered, labels hidden, tooltips on hover via `Tooltip` placement right
- **Content slot**: When `content` is provided (via the Mendix widgets slot), the default list is bypassed entirely and children are rendered directly

## Event Bus

### Listening

| Topic | Event Type | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives broadcast events from all widgets |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives private events targeted at this widget instance |

The widget subscribes to the event bus via `useWidgetEvents` but does not currently handle specific event types. The handler is a placeholder for future event-driven behavior (e.g., programmatic navigation).

### Emitting

This widget does not currently emit events to the bus.

## Example

### Studio Pro Configuration

1. Place the widget in a sidebar container (left column of a layout grid).
2. To use **default navigation**: leave the content slot empty. The widget renders its built-in nav items.
3. To use **custom navigation**: drag other widgets (buttons, links, custom components) into the Navigation content slot.

### JavaScript Action

To send an event to this widget from a Mendix JavaScript action:

```javascript
// Target a specific widget instance
const bus = window.__AX_EVENT_BUS__
if (bus) {
  bus.emit('ax:AXSidebar1', { type: 'navigate', payload: { id: 'analytics' } })
}

// Broadcast to all widgets
if (bus) {
  bus.emit('ax:broadcast', { type: 'theme-changed', payload: { mode: 'dark' } })
}
```
