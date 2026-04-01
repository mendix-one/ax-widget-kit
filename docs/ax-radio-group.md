# AXRadio Group

> Radio group widget with MUI styling

## Properties

### General

#### Data

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Value | `attribute<String>` | -- | No | String attribute to bind the selected value |
| Label | `textTemplate` | -- | No | Label text for the radio group (rendered as a `FormLabel` above the options) |
| Options | `object[]` | -- | Yes | List of radio options. Each option has a **Value** (`string`) and an optional **Label** (`textTemplate`). |

**Options object properties:**

| Property | Type | Description |
|----------|------|-------------|
| Value | `string` | The option's value stored in the bound attribute when selected |
| Label | `textTemplate` | Display label shown next to the radio button. Falls back to the value if not set. |

#### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Row layout | `boolean` | `false` | Display options in a horizontal row instead of a vertical column |
| Color | `enumeration` | `primary` | Radio button color. Options: `primary`, `secondary`, `success`, `warning`, `error`, `info` |
| Size | `enumeration` | `medium` | Radio button size. Options: `small`, `medium` |
| Disabled | `boolean` | `false` | Disable the radio group |

### Events

| Property | Type | Description |
|----------|------|-------------|
| On change | `action` | Action to execute when the selected value changes. Fires immediately when a radio button is selected. |

## Variants / Options

**Layout:**
- **Column** (default, `Row layout` = false) -- Radio buttons are stacked vertically, one per line.
- **Row** (`Row layout` = true) -- Radio buttons are arranged horizontally in a single row, useful for short option lists.

**Color options:**
- **Primary** (default), **Secondary**, **Success**, **Warning**, **Error**, **Info** -- Applied to the radio button's filled circle.

**Size options:**
- **Small** -- Compact radio buttons.
- **Medium** (default) -- Standard size.

**Rendering details:**
- A `FormControl` wraps the entire group.
- If a **Label** is provided, it renders as a MUI `FormLabel` above the radio buttons.
- Each option is rendered as a `FormControlLabel` with a `Radio` control, making the label text clickable.

## Usage in Mendix

1. Place the **AXRadio Group** widget inside a data view (the widget requires entity context).
2. Bind the **Value** property to a `String` attribute that will hold the selected option's value.
3. Define the **Options** list in the widget properties:
   - Add one entry per radio option.
   - Set each option's **Value** to the string that should be stored (e.g., `small`, `medium`, `large`).
   - Set each option's **Label** to the display text (e.g., `Small`, `Medium`, `Large`).
4. Optionally add a **Label** for the group (e.g., `Select size`).
5. Toggle **Row layout** to display options horizontally when there are few choices.
6. Attach an **On change** action to respond when the user picks a different option.

**Two-way binding:** When the user selects a radio button, the bound String attribute is updated immediately with the option's value. The on-change action fires right after the attribute update.

## Event Bus

Each AXRadio Group instance subscribes to the AX event bus on two topics:

### Listening

| Topic | Event Type | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives all broadcast events from other widgets or nanoflows |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives events targeted at this specific widget instance |

The event handler is currently a placeholder -- extend it to handle custom event types such as `reset` or `select`.

## Example

### Studio Pro Configuration

1. Drag **AXRadio Group** onto a page inside a data view.
2. In the Properties pane:
   - **Value**: Select the `Priority` attribute (type String).
   - **Label**: Enter `Priority Level`.
   - **Options**:
     - Value = `low`, Label = `Low`
     - Value = `medium`, Label = `Medium`
     - Value = `high`, Label = `High`
   - **Row layout**: `true`
   - **Color**: `primary`
   - **Size**: `medium`
3. Under **Events**, set **On change** to a nanoflow `ACT_PriorityChanged`.

### JavaScript Action

Send an event to a specific radio group instance via the global event bus:

```js
// Target a specific radio group widget
window.__AX_EVENT_BUS__.emit('ax:AXRadioGroup1', {
  type: 'select',
  payload: { value: 'high' },
})

// Broadcast to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'form-reset',
})
```
