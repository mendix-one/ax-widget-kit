# AXAgent Chat

> Agent chat panel widget with conversation list and messaging

## Properties

### General

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | Text template | `"AI Assistant"` | Title displayed in the chat header |
| `welcomeMessage` | Text template | *(none)* | Initial greeting from the agent. When set, appears as the first message. When omitted, sample conversation data is used. |

### Events

| Property | Type | Description |
|----------|------|-------------|
| `onSendMessage` | Action | Action when user sends a message |

## Internal Store

The widget uses a MobX store (`AgentChatStore`) with the following internal state:

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Title displayed in the chat header |
| `messages` | `ChatMessage[]` | Array of chat messages |
| `input` | `string` | Current text in the input field |
| `canSend` | `boolean` (computed) | True when `input` is non-empty after trimming |

### ChatMessage Shape

| Field | Type | Description |
|-------|------|-------------|
| `id` | `number` | Unique identifier |
| `role` | `'user' \| 'agent'` | Message author role |
| `text` | `string` | Message content (supports line breaks via `\n`) |
| `time` | `string` | Formatted time string (e.g., `"09:01"`) |

### Store Actions

| Action | Description |
|--------|-------------|
| `setTitle(title)` | Updates the chat header title |
| `setInput(input)` | Updates the current input field value |
| `sendMessage()` | Sends the current input as a user message, clears the input, triggers `onSendMessage`, and simulates an agent reply after 800ms |

## Usage in Mendix

1. In Studio Pro, drag the **AXAgent Chat** widget into a page, typically in a right-side panel or a dedicated chat page.
2. Set the **Title** property (e.g., `"AI Assistant"` or a translatable string).
3. Optionally set the **Welcome message** property to customize the initial agent greeting. If left empty, the widget loads with a sample semiconductor manufacturing conversation.
4. Set the **On send message** action to a nanoflow or microflow that processes the user's message (e.g., forwards it to an AI backend).

The widget renders as a full-height chat panel with three sections:

- **Header**: Title with a robot icon (`SmartToy`)
- **Message area**: Scrollable conversation with user messages aligned right (primary color bubble) and agent messages aligned left (paper background with border, robot avatar)
- **Input area**: Multi-line text field with send button, supports Enter to send and Shift+Enter for new lines

## UI Details

- **Header**: 48px tall, `SmartToy` icon in primary color, title in subtitle2 typography
- **User messages**: Right-aligned, primary-colored bubble, no avatar
- **Agent messages**: Left-aligned, paper background with border, 28px primary-colored `SmartToy` avatar
- **Message timestamps**: Caption text below each message bubble
- **Input**: MUI `TextField` (multiline, max 4 rows), send button with `SendIcon`
- **Auto-scroll**: Message area scrolls to bottom when new messages are added
- **Simulated reply**: After sending a message, a placeholder agent reply appears after 800ms

## Event Bus

### Listening

| Topic | Event Action | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives broadcast events from all widgets |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives private events targeted at this widget instance |

The widget subscribes to the event bus via `useWidgetEvents` but does not currently handle specific event actions. The handler is a placeholder for future event-driven behavior (e.g., receiving agent responses pushed from the server).

### Emitting

This widget does not currently emit events to the bus.

## Example

### Studio Pro Configuration

1. Place the widget in a right-side panel or full-page container. The widget fills 100% of its parent height.
2. Set **Title** to `'AI Assistant'` or a dynamic expression.
3. Set **Welcome message** to `'Hello! How can I help you today?'` or leave empty for demo data.
4. Set **On send message** to a nanoflow that:
   - Reads the user's message text
   - Calls a microflow or REST API to get an AI response
   - Updates the widget's message list with the response

### JavaScript Action

To send an event to this widget from a Mendix JavaScript action:

```javascript
// Target a specific widget instance
const bus = window.__AX_EVENT_BUS__
if (bus) {
  bus.emit('ax:AXAgentChat1', {
    type: 'agent-reply',
    payload: { text: 'Here is the analysis result...' }
  })
}

// Broadcast to all widgets
if (bus) {
  bus.emit('ax:broadcast', { action: 'theme-changed', payload: { mode: 'dark' } })
}
```
