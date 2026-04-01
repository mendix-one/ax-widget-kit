# AXSelect

> Select dropdown widget with MUI styling

## Properties

### General

#### Data

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Value | `attribute<String>` | -- | No | String attribute to bind the selected value |
| Label | `textTemplate` | -- | No | Label text for the select field |
| Options | `object[]` | -- | Yes | List of select options. Each option has a **Value** (`string`) and an optional **Label** (`textTemplate`). |

**Options object properties:**

| Property | Type | Description |
|----------|------|-------------|
| Value | `string` | The option's value stored in the bound attribute when selected |
| Label | `textTemplate` | Display label shown in the dropdown. Falls back to the value if not set. |

#### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Variant | `enumeration` | `outlined` | Select field variant. Options: `outlined`, `filled`, `standard` |
| Size | `enumeration` | `small` | Select field size. Options: `small`, `medium` |
| Disabled | `boolean` | `false` | Disable the select |
| Full width | `boolean` | `true` | Expand to fill available width |
| Helper text | `textTemplate` | -- | Helper text displayed below the select |

### Events

| Property | Type | Description |
|----------|------|-------------|
| On change | `action` | Action to execute when the selected value changes. Fires immediately when the user selects a new option. |

## Variants / Options

**Variant styles:**
- **Outlined** (default) -- The select has a visible border around it, matching MUI's outlined TextField style.
- **Filled** -- The select has a filled background with an underline.
- **Standard** -- The select has only a bottom underline, the most minimal style.

**Size options:**
- **Small** (default) -- Compact select with reduced padding.
- **Medium** -- Standard select dimensions.

**Rendering details:**
- The widget uses MUI `FormControl`, `InputLabel`, `Select`, and `MenuItem` components.
- When a **Label** is provided, it renders as a floating `InputLabel` that animates up when the select is focused or has a value.
- Each option is rendered as a `MenuItem`.
- **Helper text** renders below the select using MUI `FormHelperText`, only when the value is non-empty.

## Usage in Mendix

1. Place the **AXSelect** widget inside a data view (the widget requires entity context).
2. Bind the **Value** property to a `String` attribute that will hold the selected option's value.
3. Define the **Options** list in the widget properties:
   - Add one entry per dropdown option.
   - Set each option's **Value** to the string that should be stored (e.g., `us`, `eu`, `apac`).
   - Set each option's **Label** to the display text (e.g., `United States`, `Europe`, `Asia Pacific`).
4. Set a **Label** for the select field (e.g., `Region`).
5. Choose the **Variant** and **Size** to match your form style.
6. Enable **Full width** (default) to have the select fill its container, or disable it for a fixed-width dropdown.
7. Optionally add **Helper text** to provide guidance (e.g., `Select your primary region`).
8. Attach an **On change** action to respond when the user picks a different option.

**Two-way binding:** When the user selects an option, the bound String attribute is updated immediately with the option's value. The on-change action fires right after the attribute update.

## Event Bus

Each AXSelect instance subscribes to the AX event bus on two topics:

### Listening

| Topic | Event Type | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives all broadcast events from other widgets or nanoflows |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives events targeted at this specific widget instance |

The event handler is currently a placeholder -- extend it to handle custom event types such as `reset` or `set-options`.

## Example

### Studio Pro Configuration

1. Drag **AXSelect** onto a page inside a data view.
2. In the Properties pane:
   - **Value**: Select the `Country` attribute (type String).
   - **Label**: Enter `Country`.
   - **Options**:
     - Value = `us`, Label = `United States`
     - Value = `jp`, Label = `Japan`
     - Value = `kr`, Label = `South Korea`
     - Value = `vn`, Label = `Vietnam`
   - **Variant**: `outlined`
   - **Size**: `small`
   - **Full width**: `true`
   - **Helper text**: Enter `Select your country`.
3. Under **Events**, set **On change** to a nanoflow `ACT_CountryChanged`.

### JavaScript Action

Send an event to a specific select instance via the global event bus:

```js
// Target a specific select widget
window.__AX_EVENT_BUS__.emit('ax:AXSelect1', {
  type: 'reset',
})

// Broadcast to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'form-reset',
})
```
