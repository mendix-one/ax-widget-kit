# AXSwitch

> Switch toggle widget with MUI Switch

## Properties

### General

#### Data

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Checked | `attribute<Boolean>` | -- | No | Attribute to bind the switch checked state |
| Label | `textTemplate` | -- | No | Label displayed next to the switch |

#### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Color | `enumeration` | `primary` | Switch color theme. Options: `primary`, `secondary`, `success`, `warning`, `error`, `info` |
| Size | `enumeration` | `medium` | Switch size. Options: `small`, `medium` |
| Label placement | `enumeration` | `end` | Position of the label relative to the switch. Options: `end`, `start`, `top`, `bottom` |

#### Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Disabled | `boolean` | `false` | Disable the switch |

### Events

| Property | Type | Description |
|----------|------|-------------|
| On change | `action` | Action to execute when the switch is toggled. Fires immediately when the user flips the switch. |

## Variants / Options

**Color options:**
- **Primary** (default) -- Theme primary color for the thumb and track when checked.
- **Secondary** -- Theme secondary color.
- **Success** -- Green, indicating an "on" = good/active state.
- **Warning** -- Orange/amber.
- **Error** -- Red, useful for dangerous toggles.
- **Info** -- Light blue.

**Size options:**
- **Small** -- Compact switch with a smaller toggle track and thumb.
- **Medium** (default) -- Standard switch dimensions.

**Label placement:**
- **End** (default) -- Label appears to the right of the switch.
- **Start** -- Label appears to the left of the switch.
- **Top** -- Label appears above the switch.
- **Bottom** -- Label appears below the switch.

**Rendering details:**
- The switch is wrapped in a MUI `FormControlLabel`, making the entire row (switch + label) clickable.
- The `labelPlacement` prop controls where the label text is positioned relative to the switch control.

## Usage in Mendix

1. Place the **AXSwitch** widget inside a data view (the widget requires entity context).
2. Bind the **Checked** property to a `Boolean` attribute on the entity.
3. Set a **Label** to describe what the switch controls (e.g., `Enable notifications`, `Dark mode`).
4. Choose a **Color** to indicate the meaning of the on-state (e.g., `success` for activation, `error` for a dangerous setting).
5. Select **Label placement** to position the label relative to the switch (e.g., `start` for a settings panel where labels are on the left).
6. Attach an **On change** action to respond when the user toggles the switch.

**Two-way binding:** When the user flips the switch, the bound Boolean attribute is updated immediately. The on-change action fires right after the attribute update.

## Event Bus

Each AXSwitch instance subscribes to the AX event bus on two topics:

### Listening

| Topic | Event Type | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives all broadcast events from other widgets or nanoflows |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives events targeted at this specific widget instance |

The event handler is currently a placeholder -- extend it to handle custom event types such as `toggle`, `check`, or `uncheck`.

## Example

### Studio Pro Configuration

1. Drag **AXSwitch** onto a page inside a data view.
2. In the Properties pane:
   - **Checked**: Select the `IsActive` attribute (type Boolean).
   - **Label**: Enter `Enable feature`.
   - **Color**: `success`
   - **Size**: `medium`
   - **Label placement**: `end`
3. Under **Events**, set **On change** to a nanoflow `ACT_ToggleFeature`.

### JavaScript Action

Send an event to a specific switch instance via the global event bus:

```js
// Target a specific switch widget
window.__AX_EVENT_BUS__.emit('ax:AXSwitch1', {
  type: 'toggle',
})

// Broadcast to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'form-reset',
})
```
