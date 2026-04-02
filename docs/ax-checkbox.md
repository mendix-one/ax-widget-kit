# AXCheckbox

> Checkbox widget with MUI styling

## Properties

### General

#### Data

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Checked | `attribute<Boolean>` | -- | No | Boolean attribute to bind the checked state |
| Label | `textTemplate` | -- | No | Label text for the checkbox |

#### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Color | `enumeration` | `primary` | Checkbox color. Options: `primary`, `secondary`, `success`, `warning`, `error`, `info`, `default` |
| Size | `enumeration` | `medium` | Checkbox size. Options: `small`, `medium` |
| Disabled | `boolean` | `false` | Disable the checkbox |

### Events

| Property | Type | Description |
|----------|------|-------------|
| On change | `action` | Action to execute when the checkbox value changes. Fires immediately when the user toggles the checkbox. |

## Variants / Options

**Color options:**
- **Primary** (default) -- Theme primary color for the check mark and box.
- **Secondary** -- Theme secondary color.
- **Success** -- Green.
- **Warning** -- Orange/amber.
- **Error** -- Red.
- **Info** -- Light blue.
- **Default** -- Neutral gray, inherits from the MUI default palette.

**Size options:**
- **Small** -- Compact checkbox with smaller hit area.
- **Medium** (default) -- Standard checkbox dimensions.

**Label rendering:**
The checkbox is wrapped in a MUI `FormControlLabel`, so the label text appears next to the checkbox and the entire row (checkbox + label) is clickable.

## Usage in Mendix

1. Place the **AXCheckbox** widget inside a data view (the widget requires entity context).
2. Bind the **Checked** property to a `Boolean` attribute on the entity.
3. Set the **Label** to describe the option (e.g., `I agree to the terms and conditions`).
4. Choose a **Color** that fits the context (e.g., `error` for a destructive opt-in).
5. Attach an **On change** action to react to toggles -- for example, a nanoflow that validates the form state or enables/disables a submit button.

**Two-way binding:** When the user checks or unchecks the box, the bound Boolean attribute is updated immediately via `setValue`. The on-change action fires right after the attribute update.

## Event Bus

Each AXCheckbox instance subscribes to the AX event bus on two topics:

### Listening

| Topic | Event Action | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives all broadcast events from other widgets or nanoflows |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives events targeted at this specific widget instance |

The event handler is currently a placeholder -- extend it to handle custom event actions such as `reset`, `check`, or `uncheck`.

## Example

### Studio Pro Configuration

1. Drag **AXCheckbox** onto a page inside a data view.
2. In the Properties pane:
   - **Checked**: Select the `AcceptTerms` attribute (type Boolean).
   - **Label**: Enter `I accept the terms and conditions`.
   - **Color**: `primary`
   - **Size**: `medium`
3. Under **Events**, set **On change** to a nanoflow `ACT_ToggleTerms`.

### JavaScript Action

Send an event to a specific checkbox instance via the global event bus:

```js
// Target a specific checkbox widget
window.__AX_EVENT_BUS__.emit('ax:AXCheckbox1', {
  type: 'check',
  payload: { checked: true },
})

// Broadcast to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'form-reset',
})
```
