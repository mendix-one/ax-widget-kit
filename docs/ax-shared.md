# @ax/shared

> Shared utilities, context helpers, theme system, and event bus for AX Widget Kit

This package (`packages/ax-shared`) provides the foundational infrastructure used by all AX widgets. It is not a widget itself but a library of shared code imported by each widget package.

## Exports

```typescript
// Context
export { createWidgetContext } from './context'

// Theme
export { AxThemeProvider } from './theme'
export { createAxTheme } from './theme'
export { defaultThemeOptions } from './theme'
export { getGlobalThemeTokens, parseThemeTokens, setGlobalThemeTokens } from './theme'

// Event Bus
export { emitEvent, getEventBus, initEventBus } from './eventbus'
export { AX_BROADCAST, type AxEvent, type AxEventHandler, widgetTopic } from './eventbus'
export { useWidgetEvents } from './eventbus'

// Utilities
export { cn } from './utils'
```

---

## createWidgetContext

Creates a typed React context + Provider + useStore hook for a MobX widget store. Every widget uses this to set up its store context.

### Signature

```typescript
function createWidgetContext<T>(displayName?: string): {
  Provider: React.FC<{ store: T; children: ReactNode }>
  useStore: () => T
}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `displayName` | `string` (optional) | Name used in React DevTools and error messages |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `Provider` | `React.FC` | React component that provides the store via context |
| `useStore` | `() => T` | Hook to access the store; throws if used outside the Provider |

### Usage

```typescript
import { createWidgetContext } from '@ax/shared'

class MyWidgetStore {
  title = 'Hello'
  // ...
}

const { Provider: MyWidgetProvider, useStore: useMyWidgetStore } =
  createWidgetContext<MyWidgetStore>('MyWidget')
```

In the container component:

```tsx
<MyWidgetProvider store={store}>
  <MyWidgetDisplay />
</MyWidgetProvider>
```

In the display component:

```tsx
const store = useMyWidgetStore()
```

---

## AxThemeProvider

Wraps children with MUI `ThemeProvider` + `CssBaseline` using the AX default theme. Every widget wraps its display tree with this component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `overrides` | `ThemeOptions` | *(none)* | Extra MUI theme overrides on top of defaults + global tokens |
| `isLayout` | `boolean` | `false` | If true, skips reading global tokens (used by layout widgets that set tokens) |
| `children` | `ReactNode` | *(required)* | Child components to render |

### Behavior

- **Layout widgets** (`isLayout=true`): Creates theme from `defaultThemeOptions` + `overrides` only. Layout widgets are responsible for calling `setGlobalThemeTokens()` to share theme configuration with child widgets.
- **Child widgets** (default): Reads global tokens from `window.__AX_THEME_TOKENS__` (set by the layout), then merges `defaultThemeOptions` + `globalTokens` + `overrides`.

### Usage

```tsx
import { AxThemeProvider } from '@ax/shared'

// In a child widget container
<AxThemeProvider>
  <MyWidgetDisplay />
</AxThemeProvider>

// In a layout widget container
<AxThemeProvider isLayout overrides={{ palette: { mode: 'dark' } }}>
  <LayoutContent />
</AxThemeProvider>
```

---

## Theme Utilities

### defaultThemeOptions

The base MUI `ThemeOptions` object used by all AX widgets. Defines:

| Category | Details |
|----------|---------|
| **Typography** | Font family: `Roboto, Arial, sans-serif`, base size: 14 |
| **Shape** | Border radius: 12 |
| **Palette** | Light mode, primary `#3F51B5` (indigo), secondary `#009688` (teal), plus success/warning/error/info |
| **Components** | Optimized ripple transitions, button/icon press animations (`scale(0.98)` / `scale(0.92)`) |

### createAxTheme

Creates a MUI theme by deep-merging `defaultThemeOptions` with any number of override layers.

```typescript
function createAxTheme(...overrides: (ThemeOptions | undefined)[]): Theme
```

Overrides are applied left to right using `deepmerge`. Undefined values are skipped.

```typescript
import { createAxTheme } from '@ax/shared'

// Default theme
const theme = createAxTheme()

// With overrides
const darkTheme = createAxTheme(
  { palette: { mode: 'dark' } },
  { shape: { borderRadius: 8 } }
)
```

### setGlobalThemeTokens

Stores theme tokens on `window.__AX_THEME_TOKENS__` so child widgets can read them.

```typescript
function setGlobalThemeTokens(tokens: ThemeOptions): void
```

Called by layout widgets (e.g., AXWebApp, AXAuthLayout) during initialization.

### getGlobalThemeTokens

Retrieves theme tokens from `window.__AX_THEME_TOKENS__`.

```typescript
function getGlobalThemeTokens(): ThemeOptions | undefined
```

Returns `undefined` if no layout widget has set tokens yet.

### parseThemeTokens

Parses a JSON string into `ThemeOptions`. Returns `undefined` on invalid input.

```typescript
function parseThemeTokens(json: string | undefined): ThemeOptions | undefined
```

Useful for reading theme configuration from Mendix string attributes or system settings.

---

## Event Bus

The event bus enables inter-widget communication using a lightweight pub/sub pattern built on [nanobus](https://github.com/choojs/nanobus). The bus instance is stored on `window.__AX_EVENT_BUS__`.

### Architecture

- **Layout widgets** call `initEventBus()` to create the bus.
- **Child widgets** call `getEventBus()` to connect to the existing bus.
- Events are published to **topics**:
  - `ax:broadcast` -- all widgets receive these events.
  - `ax:{widgetName}` -- only the named widget instance receives the event (e.g., `ax:AXSigninForm1`).

### AxEvent Interface

```typescript
interface AxEvent {
  type: string       // Event action type (e.g., 'reset', 'theme-changed', 'navigate')
  payload?: unknown  // Optional data payload
}
```

### AX_BROADCAST

```typescript
const AX_BROADCAST = 'ax:broadcast'
```

The broadcast topic constant. All widgets subscribed via `useWidgetEvents` receive events emitted to this topic.

### initEventBus

Initializes the global event bus. Idempotent -- if a bus already exists, it is returned as-is.

```typescript
function initEventBus(): Nanobus
```

Called by layout widgets (AXWebApp, AXAuthLayout) with `isLayout: true` in `useWidgetEvents`.

### getEventBus

Returns the global event bus, or `undefined` if not initialized.

```typescript
function getEventBus(): Nanobus | undefined
```

### emitEvent

Emits an event to a specific topic on the bus.

```typescript
function emitEvent(topic: string, event: { type: string; payload?: unknown }): void
```

```typescript
import { emitEvent, AX_BROADCAST, widgetTopic } from '@ax/shared'

// Broadcast to all widgets
emitEvent(AX_BROADCAST, { type: 'theme-changed', payload: { mode: 'dark' } })

// Send to a specific widget instance
emitEvent(widgetTopic('AXSigninForm1'), { type: 'reset' })
```

### widgetTopic

Builds a private topic name for a specific widget instance.

```typescript
function widgetTopic(widgetName: string): string
// Returns: `ax:${widgetName}`
```

### useWidgetEvents

React hook for subscribing to the event bus in the container layer. Every widget uses this hook.

```typescript
function useWidgetEvents(options: {
  widgetName: string
  onEvent: AxEventHandler
  isLayout?: boolean
}): void
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `widgetName` | `string` | *(required)* | Widget instance name from Mendix props (e.g., `'AXSigninForm1'`) |
| `onEvent` | `AxEventHandler` | *(required)* | Callback for events on both broadcast and private topics |
| `isLayout` | `boolean` | `false` | If true, calls `initEventBus()` to ensure the bus exists |

The hook subscribes to two topics:
1. `ax:broadcast` -- common topic, all widgets receive
2. `ax:{widgetName}` -- private topic, only this widget instance

```typescript
import { useWidgetEvents, type AxEvent } from '@ax/shared'

// In a child widget container
const handleEvent = useCallback((event: AxEvent) => {
  if (event.type === 'reset') {
    store.reset()
  }
}, [])

useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

// In a layout widget container
useWidgetEvents({ widgetName: props.name, onEvent: handleEvent, isLayout: true })
```

### JavaScript Action Example

The event bus is accessible from the browser console or Mendix JavaScript actions:

```javascript
// Broadcast to all AX widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'theme-changed',
  payload: { mode: 'dark' }
})

// Send to a specific widget
window.__AX_EVENT_BUS__.emit('ax:AXSigninForm1', { type: 'reset' })
```

---

## cn Utility

Shorthand for the [classnames](https://github.com/JedWatson/classnames) library. Merges CSS class strings conditionally.

```typescript
import { cn } from '@ax/shared'

cn('base', { active: true, disabled: false })
// => 'base active'

cn('btn', props.class, style?.className)
// => 'btn custom-class ...'
```
