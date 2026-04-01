# AXToggle Button

> Toggle button group widget with MUI ToggleButtonGroup

## Properties

### General

#### Data

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Value | `attribute<String>` | -- | No | Attribute to bind the selected value |
| Options | `object[]` | -- | Yes | List of toggle button options. Each option has a **Value** (`string`) and an optional **Label** (`textTemplate`). |

**Options object properties:**

| Property | Type | Description |
|----------|------|-------------|
| Value | `string` | The option's value stored in the bound attribute when selected |
| Label | `textTemplate` | Display label shown on the toggle button. Falls back to the value if not set. |

#### Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Exclusive | `boolean` | `true` | Only allow one option to be selected at a time |
| Disabled | `boolean` | `false` | Disable all toggle buttons |
| Full width | `boolean` | `false` | Stretch buttons to fill the container |

#### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Color | `enumeration` | `primary` | Toggle button color theme. Options: `primary`, `secondary`, `success`, `warning`, `error`, `info` |
| Size | `enumeration` | `medium` | Toggle button size. Options: `small`, `medium`, `large` |
| Orientation | `enumeration` | `horizontal` | Layout direction of the toggle button group. Options: `horizontal`, `vertical` |

### Events

| Property | Type | Description |
|----------|------|-------------|
| On change | `action` | Action to execute when the selected value changes. Fires immediately when the user clicks a toggle button. |

## Variants / Options

**Exclusive mode:**
- **Exclusive = true** (default) -- Only one button can be selected at a time. Clicking an already-selected button is a no-op (the selection is enforced and cannot be deselected to empty).
- **Exclusive = false** -- Multiple buttons can be selected simultaneously. The bound value stores the result as a string.

**Color options:**
- **Primary** (default), **Secondary**, **Success**, **Warning**, **Error**, **Info** -- Applied as the active/selected button color.

**Size options:**
- **Small** -- Compact buttons with reduced padding.
- **Medium** (default) -- Standard button dimensions.
- **Large** -- Generous padding and larger text.

**Orientation:**
- **Horizontal** (default) -- Buttons are laid out side by side in a row.
- **Vertical** -- Buttons are stacked in a column.

**Full width:**
When enabled, toggle buttons stretch equally to fill the container width (horizontal) or height (vertical).

**Rendering details:**
- The widget renders a MUI `ToggleButtonGroup` containing individual `ToggleButton` components.
- Each option's label text is displayed on the button; if no label is provided, the value string is used instead.
- When `exclusive` is true, clicking a new button deselects the previous one. The `onChange` handler guards against null values (deselecting the only selected button), ensuring a value is always selected.

## Usage in Mendix

1. Place the **AXToggle Button** widget inside a data view (the widget requires entity context).
2. Bind the **Value** property to a `String` attribute that will hold the selected option's value.
3. Define the **Options** list in the widget properties:
   - Add one entry per toggle button.
   - Set each option's **Value** to the string that should be stored (e.g., `list`, `grid`, `table`).
   - Set each option's **Label** to the display text (e.g., `List View`, `Grid View`, `Table View`).
4. Enable **Exclusive** mode (default) for single-selection scenarios like view mode toggles.
5. Choose **Color**, **Size**, and **Orientation** to match your design.
6. Enable **Full width** to have buttons stretch across the container.
7. Attach an **On change** action to respond when the user changes the selection.

**Two-way binding:** When the user selects a toggle button, the bound String attribute is updated immediately with the option's value. The on-change action fires right after the attribute update.

## Event Bus

Each AXToggle Button instance subscribes to the AX event bus on two topics:

### Listening

| Topic | Event Type | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives all broadcast events from other widgets or nanoflows |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives events targeted at this specific widget instance |

The event handler is currently a placeholder -- extend it to handle custom event types such as `reset` or `select`.

## Example

### Studio Pro Configuration

1. Drag **AXToggle Button** onto a page inside a data view.
2. In the Properties pane:
   - **Value**: Select the `ViewMode` attribute (type String).
   - **Options**:
     - Value = `list`, Label = `List`
     - Value = `grid`, Label = `Grid`
     - Value = `table`, Label = `Table`
   - **Exclusive**: `true`
   - **Color**: `primary`
   - **Size**: `medium`
   - **Orientation**: `horizontal`
   - **Full width**: `false`
3. Under **Events**, set **On change** to a nanoflow `ACT_ViewModeChanged`.

### JavaScript Action

Send an event to a specific toggle button group instance via the global event bus:

```js
// Target a specific toggle button widget
window.__AX_EVENT_BUS__.emit('ax:AXToggleButton1', {
  type: 'select',
  payload: { value: 'grid' },
})

// Broadcast to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'form-reset',
})
```
