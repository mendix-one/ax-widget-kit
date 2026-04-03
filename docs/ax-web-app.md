# AXWeb App

> Web application layout with header, sidebar, agent panel, and content area

## Properties

### General

#### Header

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| logo | Widgets (slot) | No | -- | Widget to display as the logo in the header |
| tasksMenu | Widgets (slot) | No | -- | Widget for the tasks menu in the header |
| notifyMenu | Widgets (slot) | No | -- | Widget for the notifications menu in the header |
| userMenu | Widgets (slot) | No | -- | Widget for the user menu in the header |

#### Navigation

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| sidebar | Widgets (slot) | No | -- | Widget for the sidebar navigation panel |

#### Content

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| content | Widgets (slot) | No | -- | Widgets to display in the main content area |

#### Theme

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| themeTokens | String | No | `""` | JSON string with MUI theme overrides (palette, typography, shape, etc.) |

#### Agent

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| agentChat | Widgets (slot) | No | -- | Widget for the agent chat panel |

## Usage in Mendix

Place the **AXWeb App** widget as the root layout widget on your page. It provides the full application shell: a top header bar with logo, task/notification/user menus, a collapsible sidebar for navigation, a main content area, and a resizable agent chat panel.

1. Drag `AXWeb App` onto your page layout.
2. Drop an `AXLogo` widget into the **Logo** slot.
3. Drop sidebar navigation, menu widgets, and your page content into the respective slots.
4. Optionally provide a **Theme tokens (JSON)** string to override the default MUI theme.

This is a **layout widget** -- it initializes the global AX event bus (`window.__AX_EVENT_BUS__`) that all child AX widgets use for inter-widget communication.

## Store

The internal `WebAppStore` (MobX) manages the following state:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| sidebarMode | `'show' \| 'mini' \| 'hide'` | `'show'` | Current sidebar display mode |
| mobileOpen | boolean | `false` | Whether the mobile drawer is open |
| agentOpen | boolean | `false` | Whether the agent chat panel is open |
| agentWidth | number | `360` | Width of the agent panel in pixels (clamped 280--600) |
| resizing | boolean | `false` | Whether the agent panel is being resized |

Computed getters:

| Getter | Returns | Description |
|--------|---------|-------------|
| drawerWidth | number | `240` (show), `64` (mini), or `0` (hide) |
| agentPanelWidth | number | `agentWidth + 4` when open, `0` when closed |

## Event Bus

### Listening (widget receives)

Events this widget handles on its private topic (`ax:{widgetName}`):

| Event Action | Payload | Description |
|------------|---------|-------------|
| `toggleSidebar` | -- | Cycles sidebar mode: show -> mini -> hide -> show |
| `toggleAgent` | -- | Toggles the agent chat panel open/closed |

The widget also listens on `ax:broadcast` for any broadcast events.

### Emitting

This widget does not emit events itself, but as the layout widget it **initializes** the global event bus that all other AX widgets connect to.

## Example

### Studio Pro Configuration

1. Create a page layout with the **AXWeb App** widget as the outermost container.
2. Place your logo widget in the **Logo** slot, navigation in **Sidebar**, and page content in **Main content**.
3. Set **Theme tokens (JSON)** to customize colors, typography, and spacing.

### JavaScript Action

```js
// Toggle the sidebar from a Mendix nanoflow (JavaScript action)
window.__AX_EVENT_BUS__.emit('ax:AXWebApp1', { action: 'toggleSidebar' })

// Toggle the agent chat panel
window.__AX_EVENT_BUS__.emit('ax:AXWebApp1', { action: 'toggleAgent' })
```

## Theme Tokens

Example JSON for the `themeTokens` property:

```json
{
  "palette": {
    "primary": { "main": "#1565C0" },
    "secondary": { "main": "#7B1FA2" },
    "background": { "default": "#F5F5F5" }
  },
  "typography": {
    "fontFamily": "'Inter', sans-serif"
  },
  "shape": {
    "borderRadius": 8
  }
}
```
