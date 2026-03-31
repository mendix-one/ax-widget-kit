# AX Widget Kit — Mendix JavaScript Actions

JavaScript actions for communicating with AX widgets from Mendix nanoflows.

## Setup

1. Copy these `.js` files into your Mendix project's `javascriptsource/{module}/actions/` folder
2. Ensure at least one AX layout widget (`AXWebApp` or `AXAuthLayout`) is on the page — it initializes the event bus

## Actions

### AX_BroadcastEvent(eventType, payloadJson?)

Emit an event to **all** AX widgets on the page.

| Param | Type | Description |
|-------|------|-------------|
| `eventType` | `string` | Event type (e.g. `'theme-changed'`, `'refresh'`) |
| `payloadJson` | `string?` | Optional JSON payload |

```
AX_BroadcastEvent('refresh', '')
AX_BroadcastEvent('theme-changed', '{"mode":"dark"}')
```

### AX_EmitToWidget(widgetName, eventType, payloadJson?)

Emit an event to a **specific** widget instance.

| Param | Type | Description |
|-------|------|-------------|
| `widgetName` | `string` | Widget name from Studio Pro (e.g. `'AXAgentChat1'`) |
| `eventType` | `string` | Event type (e.g. `'open'`, `'reset'`) |
| `payloadJson` | `string?` | Optional JSON payload |

```
AX_EmitToWidget('AXAgentChat1', 'open', '')
AX_EmitToWidget('AXSigninForm1', 'reset', '')
```

### AX_ListenForEvent(topic, eventType, timeoutMs?)

Listen for a one-time event (async — returns a Promise).

| Param | Type | Description |
|-------|------|-------------|
| `topic` | `string` | `'ax:broadcast'` or `'ax:{widgetName}'` |
| `eventType` | `string` | Event type to wait for |
| `timeoutMs` | `number?` | Timeout (default: 10000ms) |

**Returns:** `Promise<string>` — payload JSON, or `''` on timeout.

### AX_EmitAndWait(widgetName, eventType, payloadJson?, timeoutMs?)

Request/response pattern: emit an event and wait for `{eventType}:response`.

| Param | Type | Description |
|-------|------|-------------|
| `widgetName` | `string` | Target widget name |
| `eventType` | `string` | Request event type |
| `payloadJson` | `string?` | Optional request payload |
| `timeoutMs` | `number?` | Timeout (default: 5000ms) |

**Returns:** `Promise<string>` — response payload JSON, or `''` on timeout.

### AX_IsEventBusReady()

Check if the event bus is initialized.

**Returns:** `boolean`

## Event Topics

| Topic | Pattern | Audience |
|-------|---------|----------|
| `ax:broadcast` | Common | All widgets |
| `ax:{widgetName}` | Private | Single widget instance |

## Browser Console

You can also emit events directly from the browser console for debugging:

```js
// Broadcast to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', { type: 'refresh' })

// Target specific widget
window.__AX_EVENT_BUS__.emit('ax:AXAgentChat1', { type: 'open' })

// Listen for events
window.__AX_EVENT_BUS__.on('*', (topic, data) => console.log(topic, data))
```
