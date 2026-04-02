# AXButton

> Button with MUI styling and configurable variant, color, and size

## Properties

### General

#### Label

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Label | `textTemplate` | -- | No | Button text |

#### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Variant | `enumeration` | `contained` | Visual variant of the button. Options: `contained`, `outlined`, `text` |
| Color | `enumeration` | `primary` | Color theme of the button. Options: `primary`, `secondary`, `success`, `warning`, `error`, `info` |
| Size | `enumeration` | `medium` | Size of the button. Options: `small`, `medium`, `large` |
| Disabled | `boolean` | `false` | Whether the button is disabled |
| Full width | `boolean` | `false` | Whether the button takes full container width |

### Events

| Property | Type | Description |
|----------|------|-------------|
| On click | `action` | Action to execute when the button is clicked |

## Variants / Options

**Variant styles:**
- **Contained** (default) -- Solid background with the chosen color. High-emphasis button for primary actions.
- **Outlined** -- Transparent background with a colored border. Medium-emphasis for secondary actions.
- **Text** -- No background or border, just colored text. Low-emphasis for tertiary actions or links.

**Color options:**
- **Primary** -- Uses the theme's primary color (typically blue).
- **Secondary** -- Uses the theme's secondary color.
- **Success** -- Green, suitable for confirm/save actions.
- **Warning** -- Orange/amber, suitable for caution actions.
- **Error** -- Red, suitable for delete/destructive actions.
- **Info** -- Light blue, suitable for informational actions.

**Size options:**
- **Small** -- Compact padding and font size.
- **Medium** (default) -- Standard button dimensions.
- **Large** -- Generous padding and larger font.

## Usage in Mendix

1. Place the **AXButton** widget inside a data view (the widget requires entity context).
2. Set the **Label** property to the desired button text (supports text templates for translatable strings).
3. Choose the **Variant** (`contained`, `outlined`, or `text`) to match the button's visual importance.
4. Select a **Color** to communicate the action's intent (e.g., `error` for delete, `success` for save).
5. Pick a **Size** appropriate to the layout.
6. Set **Full width** to `true` if the button should stretch to fill its container (useful in forms and dialogs).
7. Attach an **On click** action (nanoflow, microflow, or other action) to handle the button press.

## Event Bus

Each AXButton instance subscribes to the AX event bus on two topics:

### Listening

| Topic | Event Action | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives all broadcast events from other widgets or nanoflows |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives events targeted at this specific widget instance |

The event handler is currently a placeholder -- extend it to handle custom event actions such as `disable`, `set-loading`, or `trigger-click`.

## Example

### Studio Pro Configuration

1. Drag **AXButton** onto a page inside a data view.
2. In the Properties pane:
   - **Label**: Enter `Submit`.
   - **Variant**: `contained`
   - **Color**: `primary`
   - **Size**: `medium`
   - **Full width**: `true`
3. Under **Events**, set **On click** to a nanoflow `ACT_SubmitForm`.

### JavaScript Action

Send an event to a specific button instance via the global event bus:

```js
// Target a specific button widget
window.__AX_EVENT_BUS__.emit('ax:AXButton1', {
  type: 'trigger-click',
})

// Broadcast to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'form-submitted',
  payload: { success: true },
})
```
